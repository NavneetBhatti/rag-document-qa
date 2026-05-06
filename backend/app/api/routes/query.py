from fastapi import APIRouter, HTTPException

from app.models.schemas import QueryRequest
from app.services.rag_service import answer_question

router = APIRouter()


@router.post("/query")
def query_document(request: QueryRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question is required.")

    try:
        result = answer_question(
            question=request.question,
            doc_id=request.doc_id,
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Query failed: {str(e)}",
        )