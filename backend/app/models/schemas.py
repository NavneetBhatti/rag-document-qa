from pydantic import BaseModel
from typing import Optional


class QueryRequest(BaseModel):
    question: str
    doc_id: Optional[str] = None