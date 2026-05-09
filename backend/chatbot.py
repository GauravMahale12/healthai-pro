import google.generativeai as genai


GEMINI_API_KEY = "AIzaSyBQXApGEgTeUcaKjz21wjdJDLp_6L-kb3o"

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Use supported latest model
model = genai.GenerativeModel("gemini-2.5-flash")


def get_chatbot_response(user_message):
    try:
        prompt = f"""
You are a professional AI medical assistant.

Rules:
- Give safe, short, and helpful medical guidance
- Do not claim exact diagnosis
- If symptoms are serious, recommend doctor consultation
- If emergency symptoms like chest pain, unconsciousness,
  heavy bleeding, or breathing difficulty occur,
  recommend calling ambulance service (108)

User question:
{user_message}
"""

        response = model.generate_content(prompt)

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "reply": "Unable to get AI response right now.",
            "error": str(e)
        }