from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import router

app = FastAPI(
    title="HealthAI Pro API",
    description="Smart Medical Assistance Platform Backend",
    version="1.0.0"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Test Route
@app.get("/")
def home():
    return {
        "message": "HealthAI Pro Backend Running Successfully"
    }

# All API Routes
app.include_router(router)