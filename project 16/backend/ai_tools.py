from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import aiofiles
import os
import re
from gemini_utils import generate_gemini_response

router = APIRouter()

class ResumeRequest(BaseModel):
    resume_text: str

class LearningPathRequest(BaseModel):
    interest: str
    known_languages: list
    goal: str

def clean_markdown(text):
    # Remove all ** * # symbols globally
    return re.sub(r'[*#]+', '', text)

@router.post("/ai-tools/resume-analyzer")
async def resume_analyzer(data: ResumeRequest):
    prompt = f"""Analyze the following resume text and provide recommendations:

{data.resume_text}"""
    result = generate_gemini_response(prompt)
    cleaned_result = clean_markdown(result)
    return {"response": cleaned_result}


@router.post("/ai-tools/learning-path-generator")
async def learning_path_generator(data: LearningPathRequest):
    prompt = f"""Generate a detailed step-by-step learning path for someone interested in {data.interest}, 
who knows {', '.join(data.known_languages)}, and has the goal '{data.goal}'. 
Include courses, certifications, and key milestones."""
    result = generate_gemini_response(prompt)
    cleaned_result = clean_markdown(result)
    return {"response": cleaned_result}

@router.post("/ai-tools/resume-upload")
async def resume_upload(file: UploadFile = File(...)):
    extension = os.path.splitext(file.filename)[1].lower()
    temp_path = f"temp_uploaded{extension}"

    async with aiofiles.open(temp_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

    extracted_text = ""
    try:
        if extension == ".pdf":
            from PyPDF2 import PdfReader
            reader = PdfReader(temp_path)
            extracted_text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
        elif extension == ".docx":
            import docx
            doc = docx.Document(temp_path)
            extracted_text = "\n".join([para.text for para in doc.paragraphs])
        else:
            return {"error": "Unsupported file format"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        os.remove(temp_path)

    return {"extracted_text": extracted_text if extracted_text else "Could not extract text."}
