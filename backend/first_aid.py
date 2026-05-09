def get_first_aid(symptoms):
    symptom_text = symptoms.lower()

    # Simple first-aid guidance logic

    if "fever" in symptom_text:
        return {
            "condition": "Fever",
            "first_aid": [
                "Drink plenty of water",
                "Take proper rest",
                "Use light food and stay hydrated",
                "Monitor temperature regularly"
            ],
            "warning": "If fever is high or lasts more than 2 days, consult a doctor."
        }

    if "burn" in symptom_text:
        return {
            "condition": "Burn Injury",
            "first_aid": [
                "Cool the burn with clean running water",
                "Do not apply ice directly",
                "Cover with a clean cloth",
                "Avoid breaking blisters"
            ],
            "warning": "For severe burns, seek immediate medical help."
        }

    if "cut" in symptom_text:
        return {
            "condition": "Cut / Wound",
            "first_aid": [
                "Clean the wound gently",
                "Apply antiseptic if available",
                "Cover with clean bandage",
                "Watch for signs of infection"
            ],
            "warning": "Deep wounds may require urgent medical attention."
        }

    return {
        "condition": "General Care",
        "first_aid": [
            "Stay calm",
            "Monitor symptoms carefully",
            "Avoid self-medication without advice"
        ],
        "warning": "Please consult a doctor if symptoms worsen."
    }