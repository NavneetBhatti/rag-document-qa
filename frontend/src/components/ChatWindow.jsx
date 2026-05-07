import { useState } from "react";
import { askQuestion } from "../services/api";

function ChatWindow({ docId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");
      setSources([]);

      const data = await askQuestion({
        question,
        docId,
      });

      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (error) {
      setAnswer(error.response?.data?.detail || "Query failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Ask Questions</h2>

      {!docId && (
        <p className="warning">Upload a document first before asking questions.</p>
      )}

      {/* {docId && <p className="doc-id">Document ID: {docId}</p>} */}

      <textarea
        placeholder="Ask a question from your document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={!docId}
      />

      <button onClick={handleAsk} disabled={!docId || loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div className="answer-box">
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="sources">
          <h3>Sources</h3>
          {sources.map((source, index) => (
            <div className="source" key={index}>
              <p>{source.text}</p>
              <small>Score: {source.score?.toFixed(3)}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatWindow;