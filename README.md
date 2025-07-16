# PersonaFit-AI-Powered-Personality-Based-Fashion-Recommendation-Web-App
PersonaFit is a web app that uses AI to classify and organize fashion images by personality traits, helping users discover styles that match the Big Five personality dimensions.
PersonaFit is a full-stack web application that leverages machine learning to classify and organize fashion images based on the Big Five personality traits. Users can register, log in, and upload folders of dress images. The backend, built with FastAPI, uses a trained Random Forest model to analyze each image and predict which personality trait it best matches (Openness, Conscientiousness, Extraversion, Agreeableness, or Neuroticism). The images are then automatically sorted into folders by trait and returned to the user as a downloadable ZIP file.

The frontend, built with React and Material-UI, provides a modern, mobile-responsive interface for seamless user experience on both desktop and mobile devices.

**Key Features:**
- User authentication (register/login)
- Upload a folder of dress images for analysis
- AI-powered personality trait prediction for each image
- Automatic segregation of images into personality-based folders
- Download results as a ZIP file
- Fully mobile-responsive design

**Tech Stack:**
- **Frontend:** React, Material-UI
- **Backend:** FastAPI, Uvicorn, SQLAlchemy
- **ML Model:** Random Forest (scikit-learn, joblib)
- **Image Processing:** OpenCV, scikit-image

This project demonstrates the application of AI and psychology in the fashion industry, providing personalized insights for retailers and consumers alike.
