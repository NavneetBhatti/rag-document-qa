import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const askQuestion = async ({ question, docId }) => {
  const response = await axios.post(`${API_BASE_URL}/query`, {
    question,
    doc_id: docId,
  });

  return response.data;
};