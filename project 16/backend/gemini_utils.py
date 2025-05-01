
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro-002")
def generate_gemini_response(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text.strip() if hasattr(response, "text") else "No response generated."
    except Exception as e:
        return f"⚠️ Gemini Error: {str(e)}"
