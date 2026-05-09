from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from database import Base


# Users Table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(200), nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# Health Profile Table
class HealthProfile(Base):
    __tablename__ = "health_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    age = Column(Integer)
    gender = Column(String(50))
    weight = Column(String(50))

    allergies = Column(Text)
    previous_illnesses = Column(Text)
    diabetes = Column(String(50))
    blood_pressure = Column(String(50))
    smoking = Column(String(50))

    created_at = Column(DateTime(timezone=True), server_default=func.now())


# Symptom Prediction Logs
class SymptomLog(Base):
    __tablename__ = "symptom_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    symptoms = Column(Text)
    predicted_disease = Column(String(200))
    severity = Column(String(100))
    risk_score = Column(String(100))

    created_at = Column(DateTime(timezone=True), server_default=func.now())


# Skin Disease Reports
class SkinReport(Base):
    __tablename__ = "skin_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    image_path = Column(Text)
    prediction = Column(String(200))
    confidence = Column(String(100))
    severity = Column(String(100))

    created_at = Column(DateTime(timezone=True), server_default=func.now())


# Emergency Logs
class EmergencyLog(Base):
    __tablename__ = "emergency_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)

    symptoms = Column(Text)
    emergency_level = Column(String(100))
    action_taken = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())