import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ChatWindow from "../components/ChatWindow";

function Home() {
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);

  return (
    <div className="app">
      <div className="container">
        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">▣</div>
            <span>GroundedAI</span>
          </div>

          {/* <span className="version">V 0.1 — BETA</span> */}
        </nav>

        <section className="hero-grid">
          <div className="hero-content">
            <div className="pill">✣ LLM-Powered Retrieval-Augmented Generation</div>

            <h1>
              Grounded AI  <span>answers</span> from your documents
            </h1>

            <p>
               RAG powered by semantic search, vector embeddings, and LLM reasoning.
               Drop in a PDF and ask anything. Every answer comes back with the
              exact passages it leaned on — so you can trust, verify, and dig
              deeper.
            </p>
          </div>

          <div className="query-panel">
            <UploadBox onUploadSuccess={setUploadedDoc} />

            <ChatWindow
              docId={uploadedDoc?.doc_id}
              setParentAnswer={setAnswer}
              setParentSources={setSources}
            />
          </div>
        </section>

        <section className="answer-panel">
          <div className="answer-heading">
            <span></span>
            <h3>Answer</h3>
          </div>

          {!answer && sources.length === 0 && (
            <div className="empty-state">
              <div>
                 <div>✣</div> 
                 <p>Your answer will appear here, with citations below.</p></div>
            </div>
          )}

          {answer && (
            <div className="answer-box">
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
        </section>
      </div>
      <footer>Built with React · FastAPI · Gemini · Pinecone</footer>
    </div>
  );
}

export default Home;