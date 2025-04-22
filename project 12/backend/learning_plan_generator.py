# learning_plan_generator.py
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google.generativeai import GenerativeModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter()

class PlanRequest(BaseModel):
    language: str
    level: str

@router.post("/generate-learning-plan")
def generate_learning_plan(request: PlanRequest):
    try:
        model = GenerativeModel("gemini-1.5-pro-002")
        prompt = (
            f"Create a personalized learning plan for someone wanting to learn {request.language} "
            f"at a {request.level} level. Break it into clear, progressive steps or modules "
            f"including topics, goals, and example resources."
        )
        chat = model.start_chat()
        response = chat.send_message(prompt)
        return {"plan": response.text}
    except Exception as e:
        print("Gemini Learning Plan Error:", e)
        raise HTTPException(status_code=500, detail="Failed to generate learning plan.")
