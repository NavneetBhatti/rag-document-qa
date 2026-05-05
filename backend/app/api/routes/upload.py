from fastapi import APIRouter, UploadFile, File, HTTPException

from app.utils.file_loader import extract_text_from_file
from app.utils.text_splitter import split_text_into_chunks

router = APIRouter()


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    allowed_types = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, TXT, and DOCX files are supported.",
        )

    try:
        text = await extract_text_from_file(file)

        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in document.")

        chunks = split_text_into_chunks(text)

        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "total_characters": len(text),
            "total_chunks": len(chunks),
            "chunks": chunks[:5],  # preview only
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))