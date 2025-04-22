# resume_analyzer.py (PDF-aware)
import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from google.generativeai import GenerativeModel
import google.generativeai as genai
from dotenv import load_dotenv
import tempfile

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

from PyPDF2 import PdfReader

router = APIRouter()

def extract_text_from_pdf(file: UploadFile) -> str:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name
    reader = PdfReader(tmp_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

@router.post("/analyze-resume")
async def analyze_resume(resume: UploadFile = File(...)):
    try:
        extension = resume.filename.split('.')[-1].lower()

        if extension == 'pdf':
            text = extract_text_from_pdf(resume)
        else:
            contents = await resume.read()
            text = contents.decode("utf-8", errors="ignore")

        model = GenerativeModel("gemini-1.5-pro-002")
        prompt = f"Analyze the following resume text and give improvement suggestions, keyword matches, and ATS tips:\n\n{text}"
        chat = model.start_chat()
        response = chat.send_message(prompt)

        return {"analysis": response.text}
    except Exception as e:
        print("Resume analysis error:", e)
        raise HTTPException(status_code=500, detail="Failed to analyze resume.")
