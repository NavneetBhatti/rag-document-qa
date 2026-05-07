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
    <div className="upload-block">
      <div className="section-title">
        <span>01</span>
        <h2>Upload a document</h2>
      </div>

      <label className="upload-zone">
        <input
          type="file"
          accept=".pdf,.txt,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="upload-icon">↥</div>

        <div className="upload-text">
          <strong>{file ? file.name : "Choose a file or drop here"}</strong>
          <small>PDF · TXT · DOCX</small>
        </div>

        <div className="upload-arrow">→</div>
      </label>

      <button className="upload-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UploadBox;