import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def generate_answer(question: str, context: str) -> str:
    # model = genai.GenerativeModel("gemini-2.5-flash")..not working in free version
    # model = genai.GenerativeModel("gemini-2.0-flash")
    model = genai.GenerativeModel("gemini-2.5-flash-lite")
    prompt = f"""
You are an AI document assistant.

Answer the user's question using ONLY the context below.
If the answer is not in the context, say:
"I could not find the answer in the uploaded document."

Context:
{context}

Question:
{question}

Answer:
"""

    response = model.generate_content(prompt)
    return response.text