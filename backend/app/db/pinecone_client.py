import os
from pinecone import Pinecone

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "rag-doc-index"

index = pc.Index(index_name)