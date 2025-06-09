import React, { useState } from "react";
import UploadPDF from "./components/UploadPdf";
import QASection from "./components/QaSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [uploadedPdf, setUploadedPdf] = useState({ url: "", name: "" });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex justify-between items-center w-full mb-4 gap-4">
        <div className="flex items-center space-x-2">
          <img src="/aH0aUDpSiUrVC1nwJAwiUCXUtU.svg" alt="logo" className="h-10" />
        </div>
        <UploadPDF
          onUploadSuccess={(url, name) => setUploadedPdf({ url, name })}
        />
      </div>

      <div className="bg-gray-50 w-full rounded-xl p-4 sm:p-6 flex flex-col flex-1" style={{ minHeight: '500px' }}>
        <QASection s3Url={uploadedPdf.url} filename={uploadedPdf.name} />
      </div>
    </div>
  );
}

export default App;
