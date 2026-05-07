import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ChatWindow from "../components/ChatWindow";

function Home() {
  const [uploadedDoc, setUploadedDoc] = useState(null);

  return (
    <div className="container">
      <header>
        <h1>AI-Powered Document Query Assistant</h1>
        <p>Upload documents and ask AI-powered questions using RAG.</p>
      </header>

      <UploadBox onUploadSuccess={setUploadedDoc} />

      <ChatWindow docId={uploadedDoc?.doc_id} />
    </div>
  );
}

export default Home;