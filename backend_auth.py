from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import BaseModel
import os
import shutil, tempfile, zipfile
import joblib
import cv2
import numpy as np
from skimage.feature import graycomatrix, graycoprops
from fastapi.responses import FileResponse, JSONResponse
from dotenv import load_dotenv
import uuid
import threading
import time
from typing import Dict, Any

load_dotenv()

# Config
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Database setup
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db")
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Job storage for progress tracking
jobs: Dict[str, Dict[str, Any]] = {}

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# JWT helpers
def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)



# User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

Base.metadata.create_all(bind=engine)

# Pydantic schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str



# FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    hashed_pw = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}



def extract_features(path):
    img = cv2.imread(path)
    if img is None:
        return None
    img = cv2.resize(img, (256, 256))
    ycbcr = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    hist = np.hstack([
        cv2.normalize(cv2.calcHist([ycbcr], [c], None, [64], [0,256]), None).flatten()
        for c in range(3)
    ])
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    glcm = graycomatrix(gray, [5], [0], 256, symmetric=True, normed=True)
    texture = [graycoprops(glcm, p)[0,0] for p in ("contrast","correlation","energy","homogeneity")]
    edges = cv2.Canny(gray, 100, 200)
    edge_density = np.sum(edges>0)/(256*256)
    return np.hstack([hist, texture, edge_density])

def process_images_job(job_id: str, img_paths: list):
    """Background job to process images"""
    try:
        model = joblib.load("rf_personality_model_sheet2_new.pkl")
        categories = ["Openness", "Conscientiousness", "Extraversion", "Neuroticism", "Agreeableness"]
        
        jobs[job_id]["status"] = "processing"
        jobs[job_id]["processed"] = 0
        jobs[job_id]["total"] = len(img_paths)
        
        # Create output directory
        output_dir = os.path.join(os.getcwd(), f"output_{job_id}")
        os.makedirs(output_dir, exist_ok=True)
        
        # Process each image
        for i, img_path in enumerate(img_paths):
            features = extract_features(img_path)
            if features is not None:
                pred = model.predict([features])[0]
                cat_dir = os.path.join(output_dir, pred)
                os.makedirs(cat_dir, exist_ok=True)
                shutil.copy(img_path, cat_dir)
            
            jobs[job_id]["processed"] = i + 1
            time.sleep(0.1)  # Simulate processing time
        
        # Create ZIP file
        zip_path = os.path.join(os.getcwd(), f"result_{job_id}.zip")
        with zipfile.ZipFile(zip_path, "w") as zipf:
            for cat in os.listdir(output_dir):
                cat_folder = os.path.join(output_dir, cat)
                for fname in os.listdir(cat_folder):
                    fpath = os.path.join(cat_folder, fname)
                    zipf.write(fpath, arcname=os.path.join(cat, fname))
        
        jobs[job_id]["status"] = "completed"
        jobs[job_id]["zip_path"] = zip_path
        
        # Clean up output directory
        shutil.rmtree(output_dir)
        
    except Exception as e:
        jobs[job_id]["status"] = "error"
        jobs[job_id]["error"] = str(e)

@app.post("/classify-images/")
async def classify_images(files: list[UploadFile] = File(...)):
    # Generate job ID
    job_id = str(uuid.uuid4())
    
    # Initialize job status
    jobs[job_id] = {
        "status": "uploading",
        "processed": 0,
        "total": 0,
        "done": False
    }
    
    # Save uploaded files
    img_paths = []
    temp_dir = os.path.join(os.getcwd(), f"temp_{job_id}")
    os.makedirs(temp_dir, exist_ok=True)
    
    for file in files:
        img_path = os.path.join(temp_dir, os.path.basename(file.filename))
        with open(img_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        img_paths.append(img_path)
    
    jobs[job_id]["total"] = len(img_paths)
    
    # Start background processing
    thread = threading.Thread(target=process_images_job, args=(job_id, img_paths))
    thread.daemon = True
    thread.start()
    
    return JSONResponse(content={"job_id": job_id})

@app.get("/progress/{job_id}")
async def get_progress(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs[job_id]
    return {
        "processed": job["processed"],
        "total": job["total"],
        "done": job["status"] == "completed",
        "status": job["status"]
    }

@app.get("/result/{job_id}")
async def get_result(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs[job_id]
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Job not completed")
    
    zip_path = job.get("zip_path")
    if not zip_path or not os.path.exists(zip_path):
        raise HTTPException(status_code=404, detail="Result file not found")
    
    # Clean up job data after serving
    def cleanup():
        time.sleep(5)  # Wait 5 seconds before cleanup
        if job_id in jobs:
            del jobs[job_id]
        if os.path.exists(zip_path):
            os.remove(zip_path)
    
    thread = threading.Thread(target=cleanup)
    thread.daemon = True
    thread.start()
    
    return FileResponse(zip_path, filename="categorized_images.zip") 