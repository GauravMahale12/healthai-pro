import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
import os

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "skin_model.h5")

model = load_model(MODEL_PATH)

# Classes
class_names = [
    "Acne",
    "Eczema",
    "Herpes",
    "Fungal Infection",
    "Rosacea"
]


def predict_skin_disease(image_file):
    try:
        # Read image
        image = Image.open(image_file.file).convert("RGB")

        # Resize
        image = image.resize((150, 150))

        # Normalize
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # Predict
        prediction = model.predict(image_array)

        predicted_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction)) * 100

        predicted_disease = class_names[predicted_index]

        # 🔥 Add severity logic (simple rule)
        if confidence > 80:
            severity = "High"
        elif confidence > 50:
            severity = "Moderate"
        else:
            severity = "Low"

        # ✅ FINAL STANDARD RESPONSE
        return {
            "prediction": predicted_disease,
            "confidence": f"{confidence:.2f}%",
            "severity": severity,
            "doctor_recommendation": "Consult Dermatologist",
            "note": "AI-assisted prediction only. Not a medical diagnosis."
        }

    except Exception as e:
        return {
            "prediction": None,
            "confidence": None,
            "severity": None,
            "error": str(e),
            "message": "Unable to analyze skin image"
        }