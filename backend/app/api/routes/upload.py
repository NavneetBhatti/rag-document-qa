import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.utils.file_loader import extract_text_from_file
from app.utils.text_splitter import split_text_into_chunks
from app.services.vector_store import store_chunks

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
            raise HTTPException(
                status_code=400,
                detail="No text found in document.",
            )

        chunks = split_text_into_chunks(text)

        doc_id = str(uuid.uuid4())

        store_chunks(
            chunks=chunks,
            doc_id=doc_id,
            filename=file.filename,
        )

        return {
            "message": "Document uploaded, processed, and stored successfully.",
            "doc_id": doc_id,
            "filename": file.filename,
            "content_type": file.content_type,
            "total_characters": len(text),
            "total_chunks": len(chunks),
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}",
        )