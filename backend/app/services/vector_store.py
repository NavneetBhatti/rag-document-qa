from app.db.pinecone_client import index
from app.services.embedding_service import get_embedding


def store_chunks(chunks, doc_id: str, filename: str):
    vectors = []

    for i, chunk in enumerate(chunks):
        embedding = get_embedding(chunk)

        vectors.append({
            "id": f"{doc_id}_{i}",
            "values": embedding,
            "metadata": {
                "doc_id": doc_id,
                "filename": filename,
                "chunk_index": i,
                "text": chunk,
            },
        })

    index.upsert(vectors=vectors)


def search_similar_chunks(question: str, doc_id: str = None, top_k: int = 5):
    question_embedding = get_embedding(question)

    pinecone_filter = None
    if doc_id:
        pinecone_filter = {"doc_id": {"$eq": doc_id}}

    results = index.query(
        vector=question_embedding,
        top_k=top_k,
        include_metadata=True,
        filter=pinecone_filter,
    )

    matches = results.get("matches", [])

    return [
        {
            "text": match["metadata"].get("text", ""),
            "filename": match["metadata"].get("filename", ""),
            "score": match.get("score", 0),
        }
        for match in matches
    ]