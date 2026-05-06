from app.services.vector_store import search_similar_chunks
from app.services.llm_service import generate_answer


def answer_question(question: str, doc_id: str = None):
    chunks = search_similar_chunks(question=question, doc_id=doc_id)

    context = "\n\n".join([chunk["text"] for chunk in chunks])

    answer = generate_answer(question=question, context=context)

    return {
        "answer": answer,
        "sources": chunks,
    }