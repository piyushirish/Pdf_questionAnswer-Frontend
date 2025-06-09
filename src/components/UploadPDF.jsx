import React, { useState, useRef } from 'react';
import { uploadPDF } from '../api';
import { toast } from "react-toastify";

const UploadPDF = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null); // 🔑 reference to hidden input

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setUploading(true);

    try {
      const res = await uploadPDF(selectedFile);
      onUploadSuccess(res.data.s3_url, selectedFile.name);
      toast.success("PDF uploaded successfully!");
    } catch (error) {
      setError(error.response?.data?.details);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = null; // clear file input for next selection
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click(); // 🧠 trigger hidden input
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Trigger button */}
      <button
        onClick={triggerFileSelect}
        disabled={uploading}
        className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition duration-200"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default UploadPDF;
