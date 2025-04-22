import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print("🔐 Loaded Gemini API Key:", api_key)

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found. Please check your .env file.")

genai.configure(api_key=api_key)

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/gemini-chat")
def gemini_chat(request: ChatRequest):
    try:
        model = genai.GenerativeModel("gemini-1.5-pro-002")
        chat = model.start_chat()
        response = chat.send_message(request.question)
        return {"answer": response.text}
    except Exception as e:
        print("❌ Gemini Chat Error:", e)
        raise HTTPException(status_code=500, detail="Failed to get Gemini response")
