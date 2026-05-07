import { useState } from "react";
import { uploadDocument } from "../services/api";

function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await uploadDocument(file);

      setMessage(`Uploaded successfully: ${data.filename}`);
      onUploadSuccess(data);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload Document</h2>

      <input
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UploadBox;