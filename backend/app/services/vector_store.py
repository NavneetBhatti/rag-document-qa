from app.db.pinecone_client import index
from app.services.embedding_service import get_embedding


def store_chunks(chunks, doc_id: str):
    vectors = []

    for i, chunk in enumerate(chunks):
        embedding = get_embedding(chunk)

        vectors.append({
            "id": f"{doc_id}_{i}",
            "values": embedding,
            "metadata": {
                "text": chunk
            }
        })

    index.upsert(vectors=vectors)