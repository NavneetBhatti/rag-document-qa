import { useState } from "react";
import { askQuestion } from "../services/api";

function ChatWindow({ docId, setParentAnswer, setParentSources }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setParentAnswer("");
      setParentSources([]);

      const data = await askQuestion({
        question,
        docId,
      });

      setParentAnswer(data.answer);
      setParentSources(data.sources || []);
    } catch (error) {
      setParentAnswer(error.response?.data?.detail || "Query failed.");
      setParentSources([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-block">
      <div className="section-title">
        <span>02</span>
        <h2>Ask a question</h2>
      </div>

      {!docId && (
        <p className="warning">Upload a document first before asking questions.</p>
      )}

      <textarea
        placeholder="What does this document say about...?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={!docId}
      />

      <div className="ask-footer">
        <small>⌘ + ↵ TO ASK</small>

        <button onClick={handleAsk} disabled={!docId || loading}>
          {loading ? "Thinking..." : "Ask"}
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;