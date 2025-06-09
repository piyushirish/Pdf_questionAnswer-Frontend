import React, { useState } from "react";
import { askQuestion } from "../api";

const QASection = ({ s3Url, filename }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const s3Key = s3Url?.split(".com/")[1]; // guard in case s3Url is undefined

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setError(null);

    try {
      const res = await askQuestion(s3Key, question);
      setAnswer(res.data.answer);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col flex-1 w-full">
      {filename && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700">Ask from: {filename}</h4>
          <div className="mt-2 text-gray-800 break-words whitespace-pre-wrap">
            {question && (
              <>
                <strong>Q:</strong> {question}
                <br />
                <strong>A:</strong> {answer || "Awaiting response..."}
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-auto">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Ask"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default QASection;
