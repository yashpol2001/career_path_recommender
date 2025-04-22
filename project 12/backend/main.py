import os
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_chat import router as gemini_router
from resume_analyzer import router as resume_router
from learning_plan_generator import router as plan_router


load_dotenv()

CSV_PATH = os.getenv("CSV_PATH", "career_recommendation_updated.csv")
PORT = int(os.getenv("PORT", 8000))

app = FastAPI(title="Career Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gemini_router)

app.include_router(resume_router)

app.include_router(plan_router)


try:
    df = pd.read_csv(CSV_PATH)
except Exception as e:
    raise Exception(f"Failed to load CSV: {e}")

class RecommendationRequest(BaseModel):
    programming_language: str
    experience_level: str

def split_and_clean(text):
    if pd.isna(text):
        return []
    return [item.strip() for item in text.split('\n') if item.strip()]

@app.post("/career-recommendation")
async def get_career_recommendation(request: RecommendationRequest):
    try:
        filtered = df[df['Programming Language'].str.lower() == request.programming_language.lower()]

        if filtered.empty:
            raise HTTPException(status_code=404, detail="No matching careers found.")

        def clean(text):
            return [] if pd.isna(text) else [line.strip() for line in text.split('\n') if line.strip()]

        details = []

        for _, row in filtered.iterrows():
            details.append({
                "programmingLanguage": row['Programming Language'],
                "career": row['Career Path'],
                "description": row.get('Description', ''),
                "courses": {
                    "beginner": clean(row.get('Beginner Courses', '')),
                    "intermediate": clean(row.get('Intermediate Courses', '')),
                    "advanced": clean(row.get('Advanced Courses', ''))
                },
                "certifications": {
                    "beginner": clean(row.get('Beginner Recommended Certifications', '')),
                    "intermediate": clean(row.get('Intermediate Recommended Certifications', '')),
                    "advanced": clean(row.get('Advanced Recommended Certifications', ''))
                },
                "projects": {
                    "beginner": clean(row.get('Beginner Recommended Projects', '')),
                    "intermediate": clean(row.get('Intermediate Recommended Projects', '')),
                    "advanced": clean(row.get('Advance Recommended Projects', ''))
                }
            })

        return {
            "recommendation": f"{len(details)} careers found.",
            "details": details
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
