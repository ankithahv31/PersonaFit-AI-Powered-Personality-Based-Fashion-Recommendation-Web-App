# PersonaFit: AI-Powered Personality-Based Fashion Recommendation Web App

PersonaFit is a web app that uses AI to classify and organize fashion images by personality traits, helping users discover styles that match the Big Five personality dimensions.

## Features
- User authentication (register/login)
- Upload folders of dress images for analysis
- AI-powered personality trait prediction
- Automatic image segregation by personality traits
- Download results as organized ZIP files
- Mobile-responsive design

## Tech Stack
- **Frontend:** React, Material-UI
- **Backend:** FastAPI, SQLAlchemy
- **ML Model:** Random Forest (scikit-learn)
- **Image Processing:** OpenCV, scikit-image

## Setup
1. Clone the repository
2. Install backend dependencies: `pip install fastapi uvicorn`
3. Install frontend dependencies: `cd personality-frontend && npm install`
4. Start backend: `python -m uvicorn backend_auth:app --reload --port 8000`
5. Start frontend: `cd personality-frontend && npm start`
6. Open http://localhost:3000 