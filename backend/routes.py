from fastapi import APIRouter, UploadFile, File, Depends, Form
from pydantic import BaseModel
from sqlalchemy.orm import Session

# Models & Auth
from models import User, SymptomLog, HealthProfile, SkinReport
from auth import create_user, authenticate_user
from database import get_db

# Services
from ml_models import predict_disease, predict_severity
from skin_model import predict_skin_disease
from chatbot import get_chatbot_response
from first_aid import get_first_aid
from hospital_service import (
    get_nearby_hospitals,
    get_nearby_ambulance
)

router = APIRouter()

# ========================
# TEST API
# ========================
@router.get("/api/test")
def test_api():
    return {"message": "HealthAI Pro APIs Working Successfully"}


# ========================
# DISEASE PREDICTION
# ========================
@router.post("/api/predict-disease")
def symptom_prediction(data: dict, db: Session = Depends(get_db)):
    result = predict_disease(data)

    user_id = int(data.get("user_id")) if data.get("user_id") else None

    predicted_disease = None
    if result.get("top_predictions"):
        predicted_disease = result["top_predictions"][0].get("disease")

    if user_id:
        log = SymptomLog(
            user_id=user_id,
            symptoms=str(data.get("symptoms")),
            predicted_disease=predicted_disease,
            severity=result.get("severity"),
            risk_score=str(result.get("risk_score"))
        )
        db.add(log)
        db.commit()

    return result


# ========================
# 🔥 COMBINED HISTORY (FIXED)
# ========================
@router.get("/api/user-reports")
def get_user_reports(user_id: int, db: Session = Depends(get_db)):

    symptom_reports = db.query(SymptomLog).filter(
        SymptomLog.user_id == user_id
    ).all()

    skin_reports = db.query(SkinReport).filter(
        SkinReport.user_id == user_id
    ).all()

    combined = []

    # Symptom reports
    for r in symptom_reports:
        combined.append({
            "id": r.id,
            "type": "symptom",
            "disease": r.predicted_disease,
            "severity": r.severity,
            "date": r.created_at
        })

    # Skin reports
    for s in skin_reports:
        combined.append({
            "id": s.id,
            "type": "skin",
            "disease": s.prediction,
            "severity": s.severity,
            "date": s.created_at
        })

    combined.sort(key=lambda x: x["date"], reverse=True)

    return {"reports": combined}


# ========================
# SKIN ANALYSIS (FIXED)
# ========================
@router.post("/api/skin-analysis")
async def skin_analysis(
    file: UploadFile = File(...),
    user_id: int = Form(...),   # ✅ FIXED HERE
    db: Session = Depends(get_db)
):
    result = predict_skin_disease(file)

    report = SkinReport(
        user_id=user_id,
        image_path=file.filename,
        prediction=result.get("prediction"),
        confidence=str(result.get("confidence")),
        severity=result.get("severity")
    )

    db.add(report)
    db.commit()

    return result


# ========================
# FIRST AID
# ========================
@router.post("/api/first-aid")
def first_aid(data: dict):
    return get_first_aid(data.get("symptoms", ""))


# ========================
# CHATBOT
# ========================
class ChatRequest(BaseModel):
    message: str


@router.post("/api/chatbot")
async def chatbot_api(request: ChatRequest):
    return get_chatbot_response(request.message)


# ========================
# HOSPITAL
# ========================
@router.get("/api/nearby-hospitals")
def nearby_hospitals(lat: float, lng: float):
    return get_nearby_hospitals(lat, lng)


@router.get("/api/nearby-ambulance")
def nearby_ambulance(lat: float, lng: float):
    return get_nearby_ambulance(lat, lng)


# ========================
# AUTH
# ========================
@router.post("/api/register")
def register_user(data: dict, db: Session = Depends(get_db)):
    user = create_user(db, data["full_name"], data["email"], data["password"])
    return {"user_id": user.id}


@router.post("/api/login")
def login_user(data: dict, db: Session = Depends(get_db)):
    user = authenticate_user(db, data["email"], data["password"])
    if not user:
        return {"error": "Invalid credentials"}

    return {
        "user_id": user.id,
        "name": user.full_name
    }


# ========================
# PROFILE
# ========================
@router.post("/api/save-profile")
def save_profile(data: dict, db: Session = Depends(get_db)):
    user_id = int(data.get("user_id"))

    existing = db.query(HealthProfile).filter(
        HealthProfile.user_id == user_id
    ).first()

    if existing:
        for field in data:
            if hasattr(existing, field):
                setattr(existing, field, data[field])
    else:
        db.add(HealthProfile(**data))

    db.commit()
    return {"message": "Profile saved"}


@router.get("/api/get-profile")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(HealthProfile).filter(
        HealthProfile.user_id == user_id
    ).first()

    return profile.__dict__ if profile else {}


# ========================
# DELETE
# ========================
@router.delete("/api/delete-report")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(SymptomLog).filter(
        SymptomLog.id == report_id
    ).first()

    if report:
        db.delete(report)
        db.commit()

    return {"message": "Deleted"}