import os
import ai_tools
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_chat import router as gemini_router

# Load environment variables
load_dotenv()

CSV_PATH = os.getenv("CSV_PATH", "career_recommendation_updated.csv")
PORT = int(os.getenv("PORT", 8000))

app = FastAPI(title="Career Recommendation API")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional: Gemini AI assistant
app.include_router(gemini_router)
app.include_router(ai_tools.router)

# Load dataset
try:
    df = pd.read_csv(CSV_PATH)
except Exception as e:
    raise Exception(f"Failed to load CSV: {e}")

# Helper
def clean(text):
    return [] if pd.isna(text) else [line.strip() for line in text.split('\n') if line.strip()]

# ======= API Models =======
class RecommendationRequest(BaseModel):
    programming_language: str
    experience_level: str

# ======= Endpoints =======

@app.post("/career-recommendation")
async def get_career_recommendation(request: RecommendationRequest):
    try:
        filtered = df[df['Programming Language'].str.lower() == request.programming_language.lower()]
        if filtered.empty:
            raise HTTPException(status_code=404, detail="No matching careers found.")

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
                    "advanced": clean(row.get('Advance Recommended Projects', '')) or clean(row.get('Advanced Recommended Projects', ''))
                }
            })

        return {
            "recommendation": f"{len(details)} careers found.",
            "details": details
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/career-to-languages")
async def get_languages_for_career(career: str = Query(...)):
    try:
        filtered = df[df['Career Path'].str.lower() == career.lower()]
        if filtered.empty:
            raise HTTPException(status_code=404, detail="No languages found for this career.")
        languages = filtered['Programming Language'].dropna().unique().tolist()
        return {"languages": sorted(languages)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/career-details")
async def get_detailed_path(
    career: str = Query(...),
    language: str = Query(...),
    level: str = Query(...)
):
    try:
        filtered = df[
            (df['Career Path'].str.lower() == career.lower()) &
            (df['Programming Language'].str.lower() == language.lower())
        ]
        if filtered.empty:
            raise HTTPException(status_code=404, detail="No matching result")

        row = filtered.iloc[0]
        return {
            "career": row['Career Path'],
            "programmingLanguage": row['Programming Language'],
            "description": row.get('Description', ''),
            "courses": clean(row.get(f'{level} Courses', '')),
            "certifications": clean(row.get(f'{level} Recommended Certifications', '')),
            "projects": clean(row.get(f'{level} Recommended Projects', '')) or clean(row.get(f'{level} Recommended Project', ''))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/all-career-paths")
async def get_all_careers():
    try:
        careers = df['Career Path'].dropna().unique().tolist()
        return {"careers": sorted(careers)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
