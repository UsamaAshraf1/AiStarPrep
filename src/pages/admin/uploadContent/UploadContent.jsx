import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuFileText, LuCloudUpload } from "react-icons/lu";
import axios from "../../../helper/api";

export default function UploadContent() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [docType, setDocType] = useState("");
  const [subject, setSubject] = useState("");
  const [documentLabel, setDocumentLabel] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const docTypeOptions = [
    "Sample Paper",
    "Mark Schema",
    "Papers with Solution",
    "Guideline",
    "Work Schema",
    "Syllabus",
  ];

  const subjectOptions = [
    "A Level Accounting (9706)",
    "A Level Biology (9700)",
    "A Level Business (9609)",
    "A Level Chemistry (9701)",
    "A Level Computer Science (9618)",
    "A Level Economics (9708)",
    "A Level History (9489)",
    "A Level Mathematics (9709)",
    "A Level Physics (9702)",
    "A Level Psychology (9990)",
    "O Level Biology (5090)",
    "O Level Chemistry (5070)",
    "O Level Computer Science (2210)",
    "O Level Economics (2281)",
    "O Level Mathematics (4024)",
    "O Level Physics (5054)",
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size should not exceed 10MB.");
        setFiles([]);
      } else {
        setFiles([selectedFile]);
        setError(null);
      }
    }
  };

  const uploadFile = async () => {
    if (!files.length || !docType || !subject || !documentLabel) {
      setError("Please complete all fields before uploading.");
      return;
    }
  
    setUploading(true);
    setError(null);
    setSuccessMessage("");
  
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file); // File is sent as FormData
    formData.append("file_name", documentLabel);
    formData.append("doc_type", docType);
    formData.append("subject", subject);
  
    try {
      const response = await axios.post('admin/process-pdf', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      toast.success(response.data.message || "File processed successfully!");
      setSuccessMessage(response.data.message);
      setFiles([]);
      setDocType("");
      setSubject("");
      setDocumentLabel("");
    } catch (err) {
      console.error("Axios error:", err);
      setError(err.response?.data?.error || "Error processing file");
    } finally {
      setUploading(false);
    }
  };
  
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold text-[#292929] mb-6">Upload File</h2>

      <div
        className={`relative rounded-lg border-2 border-dashed p-6 ${
          dragActive ? "border-[#0072CF] bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept=".pdf"
        />

        <div className="flex flex-col items-center text-center">
          {files.length === 0 ? (
            <>
              <LuCloudUpload className="w-12 h-12 text-[#0072CF] mb-4" />
              <p className="text-lg text-[#0072CF] mb-1">
                Upload a file PDF - Max 10MB
              </p>
            </>
          ) : (
            <>
              <LuFileText className="w-12 h-12 text-gray-600 mb-2" />
              <p className="text-lg text-gray-800">{files[0].name}</p>
              <p className="text-sm text-gray-500">
                {(files[0].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Select Document Category:
          </label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="">Select a category</option>
            {docTypeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {docType && (
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Select Subject:
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="">Select a subject</option>
            {subjectOptions.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {subject && (
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Enter Document Label:
          </label>
          <input
            type="text"
            placeholder="Enter document label (e.g., Chapter 1 - Thermodynamics)"
            value={documentLabel}
            onChange={(e) => setDocumentLabel(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={uploadFile}
          className={`px-6 py-2 rounded ${
            !files.length || !docType || !subject || !documentLabel
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#0072CF] text-white"
          }`}
          disabled={
            !files.length || !docType || !subject || !documentLabel || uploading
          }
        >
          {uploading ? "Uploading..." : "Save File"}
        </button>
      </div>

      {/* {successMessage && (
        <div className="mt-6 p-4 border border-green-400 bg-green-100 text-green-700 rounded-lg">
          <h3 className="text-xl font-bold">Success</h3>
          <p>{successMessage}</p>
        </div>
      )} */}
    </div>
  );
}
