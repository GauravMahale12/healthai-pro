import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
import os

# Load Trained Skin Model

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Model path inside backend/ml/
MODEL_PATH = os.path.join(BASE_DIR, "ml", "skin_model.h5")

# Load model safely
model = load_model(MODEL_PATH, compile=False)

# Disease Classes

class_names = [
    "Acne",
    "Eczema",
    "Herpes",
    "Fungal Infection",
    "Rosacea"
]

# Prediction Function

def predict_skin_disease(image_file):
    try:

        # Open image
        image = Image.open(image_file.file).convert("RGB")

        # Resize image
        image = image.resize((150, 150))

        # Convert to array
        image_array = np.array(image)

        # Normalize image
        image_array = image_array / 255.0

        # Expand dimensions for model
        image_array = np.expand_dims(image_array, axis=0)

        # Predict
        prediction = model.predict(image_array)

        # Get highest prediction
        predicted_index = int(np.argmax(prediction))

        # Confidence score
        confidence = float(np.max(prediction)) * 100

        # Disease name
        predicted_disease = class_names[predicted_index]

        # Severity Logic

        if confidence > 80:
            severity = "High"

        elif confidence > 50:
            severity = "Moderate"

        else:
            severity = "Low"

        # Final Response

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