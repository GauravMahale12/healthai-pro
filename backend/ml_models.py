import joblib
import os
import pandas as pd


# -----------------------------------
# Load trained model files
# -----------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ML_FOLDER = os.path.join(BASE_DIR, "..", "ml")

model = joblib.load(os.path.join(ML_FOLDER, "disease_model.pkl"))
symptom_encoder = joblib.load(os.path.join(ML_FOLDER, "symptom_encoder.pkl"))
label_encoder = joblib.load(os.path.join(ML_FOLDER, "label_encoder.pkl"))

severity_file = os.path.join(ML_FOLDER, "Symptom-severity.csv")
severity_df = pd.read_csv(severity_file)


# -----------------------------------
# Severity Score Function
# -----------------------------------

def calculate_severity(symptoms):
    total_score = 0

    cleaned = [
        str(symptom).strip().lower()
        for symptom in symptoms
    ]

    for symptom in cleaned:
        match = severity_df[
            severity_df["Symptom"].str.lower() == symptom
        ]

        if not match.empty:
            total_score += int(match.iloc[0]["weight"])

    if total_score >= 15:
        return "High Risk", f"{total_score}/100"

    elif total_score >= 8:
        return "Medium Risk", f"{total_score}/100"

    return "Low Risk", f"{total_score}/100"


# -----------------------------------
# Emergency Override
# -----------------------------------

def emergency_override(symptoms):
    cleaned = [
        str(symptom).strip().lower()
        for symptom in symptoms
    ]

    if (
        "chest pain" in cleaned
        and "sweating" in cleaned
        and "breathing issue" in cleaned
    ):
        return {
            "severity": "EMERGENCY",
            "risk_score": "95/100",
            "doctor_recommendation": "Immediate Emergency Care Required"
        }

    return None


# -----------------------------------
# Top 3 Disease Prediction
# -----------------------------------

def predict_disease(data):
    symptoms = data.get("symptoms", [])

    cleaned_symptoms = [
        str(symptom).strip().lower()
        for symptom in symptoms
    ]

    severity, risk_score = calculate_severity(cleaned_symptoms)

    # -----------------------------------
    # 1. HEART EMERGENCY RULE
    # -----------------------------------
    if (
        "chest pain" in cleaned_symptoms
        and "sweating" in cleaned_symptoms
        and "breathing issue" in cleaned_symptoms
    ):
        return {
            "top_predictions": [
                {
                    "disease": "Possible Heart Attack",
                    "confidence": "Critical Priority"
                }
            ],
            "severity": "EMERGENCY",
            "risk_score": "95/100",
            "doctor_recommendation": "Immediate Emergency Care Required",
            "note": (
                "Emergency symptoms detected. "
                "Please seek immediate hospital care."
            )
        }

    # -----------------------------------
    # 2. DENGUE RULE
    # -----------------------------------
    if (
        "fever" in cleaned_symptoms
        and "body_pain" in cleaned_symptoms
        and "headache" in cleaned_symptoms
        and (
            "vomiting" in cleaned_symptoms
            or "rash" in cleaned_symptoms
        )
    ):
        return {
            "top_predictions": [
                {"disease": "Dengue", "confidence": "78%"},
                {"disease": "Viral Fever", "confidence": "15%"},
                {"disease": "Typhoid", "confidence": "7%"}
            ],
            "severity": "High Risk",
            "risk_score": "82/100",
            "doctor_recommendation": "Urgent Physician Visit + CBC Test",
            "note": "Please consult a doctor immediately for confirmation."
        }

    # -----------------------------------
    # 3. TYPHOID RULE
    # -----------------------------------
    if (
        "fever" in cleaned_symptoms
        and "vomiting" in cleaned_symptoms
        and (
            "stomach_pain" in cleaned_symptoms
            or "fatigue" in cleaned_symptoms
        )
    ):
        return {
            "top_predictions": [
                {"disease": "Typhoid", "confidence": "72%"},
                {"disease": "Gastroenteritis", "confidence": "18%"},
                {"disease": "Viral Fever", "confidence": "10%"}
            ],
            "severity": "Medium to High",
            "risk_score": "74/100",
            "doctor_recommendation": "Visit General Physician",
            "note": "Doctor consultation is strongly recommended."
        }

    # -----------------------------------
    # 4. VIRAL FEVER / FLU RULE
    # -----------------------------------
    if (
        "fever" in cleaned_symptoms
        and "headache" in cleaned_symptoms
        and (
            "cough" in cleaned_symptoms
            or "sore_throat" in cleaned_symptoms
            or "fatigue" in cleaned_symptoms
            or "body_pain" in cleaned_symptoms
        )
    ):
        return {
            "top_predictions": [
                {"disease": "Viral Fever", "confidence": "72%"},
                {"disease": "Flu", "confidence": "18%"},
                {"disease": "Common Cold", "confidence": "10%"}
            ],
            "severity": severity,
            "risk_score": risk_score,
            "doctor_recommendation": "Visit General Physician",
            "note": "Please consult a doctor for confirmation."
        }

    # -----------------------------------
    # 5. ASTHMA RULE
    # -----------------------------------
    if (
        "cough" in cleaned_symptoms
        and "breathing issue" in cleaned_symptoms
    ):
        return {
            "top_predictions": [
                {"disease": "Bronchial Asthma", "confidence": "76%"},
                {"disease": "Respiratory Infection", "confidence": "16%"},
                {"disease": "Pneumonia", "confidence": "8%"}
            ],
            "severity": "Medium Risk",
            "risk_score": "68/100",
            "doctor_recommendation": "Consult Pulmonologist",
            "note": "Breathing issues should not be ignored."
        }

    # -----------------------------------
    # 6. SKIN RULE
    # -----------------------------------
    if (
        "itching" in cleaned_symptoms
        and "skin_rash" in cleaned_symptoms
    ):
        return {
            "top_predictions": [
                {"disease": "Fungal Infection", "confidence": "85%"},
                {"disease": "Allergy", "confidence": "10%"},
                {"disease": "Psoriasis", "confidence": "5%"}
            ],
            "severity": severity,
            "risk_score": risk_score,
            "doctor_recommendation": "Consult Dermatologist",
            "note": "Please consult a dermatologist for confirmation."
        }

    # -----------------------------------
    # 7. FOOD POISONING RULE
    # -----------------------------------
    if (
        "vomiting" in cleaned_symptoms
        and "stomach_pain" in cleaned_symptoms
    ):
        return {
            "top_predictions": [
                {"disease": "Gastroenteritis", "confidence": "68%"},
                {"disease": "Food Poisoning", "confidence": "22%"},
                {"disease": "Typhoid", "confidence": "10%"}
            ],
            "severity": "Medium Risk",
            "risk_score": "70/100",
            "doctor_recommendation": "Visit General Physician",
            "note": "Please consult a doctor if symptoms worsen."
        }

    # -----------------------------------
    # 8. MIGRAINE RULE
    # -----------------------------------
    if (
        "headache" in cleaned_symptoms
        and "vomiting" in cleaned_symptoms
    ):
        return {
            "top_predictions": [
                {"disease": "Migraine", "confidence": "74%"},
                {"disease": "Gastric Headache", "confidence": "16%"},
                {"disease": "Viral Fever", "confidence": "10%"}
            ],
            "severity": "Medium Risk",
            "risk_score": "60/100",
            "doctor_recommendation": "Visit General Physician / Neurologist",
            "note": "Consult a doctor if headache becomes severe."
        }

    # -----------------------------------
    # 9. ML MODEL FALLBACK
    # -----------------------------------
    encoded_input = symptom_encoder.transform(
        [cleaned_symptoms]
    )

    probabilities = model.predict_proba(encoded_input)[0]
    top_indices = probabilities.argsort()[-3:][::-1]

    top_predictions = []

    for idx in top_indices:
        disease = label_encoder.inverse_transform([idx])[0]
        confidence = round(probabilities[idx] * 100, 2)

        top_predictions.append({
            "disease": disease,
            "confidence": f"{confidence}%"
        })

    return {
        "top_predictions": top_predictions,
        "severity": severity,
        "risk_score": risk_score,
        "doctor_recommendation": "Visit General Physician",
        "note": (
            "AI-generated prediction using ML fallback. "
            "Please consult a doctor for confirmation."
        )
    }
    symptoms = data.get("symptoms", [])

    cleaned_symptoms = [
        str(symptom).strip().lower()
        for symptom in symptoms
    ]

    # -----------------------------------
    # Emergency Override
    # -----------------------------------

    emergency_result = emergency_override(cleaned_symptoms)
    if emergency_result:
        return {
            "top_predictions": [
                {
                    "disease": "Possible Cardiac Emergency",
                    "confidence": "High Priority"
                }
            ],
            **emergency_result,
            "note": (
                "AI-generated alert only. "
                "Please seek immediate medical help."
            )
        }

    # -----------------------------------
    # Smart Rule Engine (High Priority)
    # -----------------------------------

    # Fever / Flu Rule
    if (
        "fever" in cleaned_symptoms
        and "cough" in cleaned_symptoms
        and "fatigue" in cleaned_symptoms
    ):
        severity, risk_score = calculate_severity(cleaned_symptoms)

        return {
            "top_predictions": [
                {
                    "disease": "Viral Fever",
                    "confidence": "72%"
                },
                {
                    "disease": "Flu",
                    "confidence": "18%"
                },
                {
                    "disease": "Common Cold",
                    "confidence": "10%"
                }
            ],
            "severity": severity,
            "risk_score": risk_score,
            "doctor_recommendation": "Visit General Physician",
            "note": (
                "AI-assisted prediction using medical rules + ML support. "
                "Please consult a doctor for confirmation."
            )
        }

    # Skin Rule
    if (
        "itching" in cleaned_symptoms
        and "skin_rash" in cleaned_symptoms
    ):
        severity, risk_score = calculate_severity(cleaned_symptoms)

        return {
            "top_predictions": [
                {
                    "disease": "Fungal Infection",
                    "confidence": "85%"
                },
                {
                    "disease": "Allergy",
                    "confidence": "10%"
                },
                {
                    "disease": "Psoriasis",
                    "confidence": "5%"
                }
            ],
            "severity": severity,
            "risk_score": risk_score,
            "doctor_recommendation": "Consult Dermatologist",
            "note": (
                "AI-assisted prediction using medical rules + ML support. "
                "Please consult a dermatologist."
            )
        }

    # Stomach Rule
    if (
        "vomiting" in cleaned_symptoms
        and "stomach_pain" in cleaned_symptoms
    ):
        severity, risk_score = calculate_severity(cleaned_symptoms)

        return {
            "top_predictions": [
                {
                    "disease": "Gastroenteritis",
                    "confidence": "68%"
                },
                {
                    "disease": "Food Poisoning",
                    "confidence": "22%"
                },
                {
                    "disease": "Typhoid",
                    "confidence": "10%"
                }
            ],
            "severity": severity,
            "risk_score": risk_score,
            "doctor_recommendation": "Visit General Physician",
            "note": (
                "AI-assisted prediction using medical rules + ML support. "
                "Please consult a doctor if symptoms worsen."
            )
        }

    # -----------------------------------
    # ML Prediction Fallback
    # -----------------------------------

    encoded_input = symptom_encoder.transform(
        [cleaned_symptoms]
    )

    probabilities = model.predict_proba(encoded_input)[0]
    top_indices = probabilities.argsort()[-3:][::-1]

    top_predictions = []

    for idx in top_indices:
        disease = label_encoder.inverse_transform([idx])[0]
        confidence = round(probabilities[idx] * 100, 2)

        top_predictions.append({
            "disease": disease,
            "confidence": f"{confidence}%"
        })

    severity, risk_score = calculate_severity(cleaned_symptoms)

    return {
        "top_predictions": top_predictions,
        "severity": severity,
        "risk_score": risk_score,
        "doctor_recommendation": "Visit General Physician",
        "note": (
            "AI-generated prediction using trained ML model. "
            "This is not a substitute for professional medical advice."
        )
    }
    symptoms = data.get("symptoms", [])

    # Emergency override first
    emergency_result = emergency_override(symptoms)
    if emergency_result:
        return {
            "top_predictions": [
                {
                    "disease": "Possible Cardiac Emergency",
                    "confidence": "High Priority"
                }
            ],
            **emergency_result,
            "note": (
                "AI-generated alert only. "
                "Please seek immediate medical help."
            )
        }

    cleaned_symptoms = [
        str(symptom).strip().lower()
        for symptom in symptoms
    ]

    encoded_input = symptom_encoder.transform(
        [cleaned_symptoms]
    )

    probabilities = model.predict_proba(encoded_input)[0]

    top_indices = probabilities.argsort()[-3:][::-1]

    top_predictions = []

    for idx in top_indices:
        disease = label_encoder.inverse_transform([idx])[0]
        confidence = round(probabilities[idx] * 100, 2)

        top_predictions.append({
            "disease": disease,
            "confidence": f"{confidence}%"
        })

    severity, risk_score = calculate_severity(symptoms)

    # Basic doctor mapping
    top_disease = top_predictions[0]["disease"].lower()

    if "fungal" in top_disease or "psoriasis" in top_disease:
        doctor = "Consult Dermatologist"
    elif "heart" in top_disease:
        doctor = "Consult Cardiologist Immediately"
    else:
        doctor = "Visit General Physician"

    return {
        "top_predictions": top_predictions,
        "severity": severity,
        "risk_score": risk_score,
        "doctor_recommendation": doctor,
        "note": (
            "AI-generated prediction only. "
            "This is not a substitute for professional medical advice."
        )
    }


# -----------------------------------
# Predict Severity API
# -----------------------------------

def predict_severity(data):
    symptoms = data.get("symptoms", [])

    emergency_result = emergency_override(symptoms)
    if emergency_result:
        return emergency_result

    severity, risk_score = calculate_severity(symptoms)

    return {
        "severity": severity,
        "risk_score": risk_score,
        "action": "Please consult a doctor if symptoms worsen"
    }