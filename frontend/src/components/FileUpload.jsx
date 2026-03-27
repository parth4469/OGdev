import React, { useState } from 'react';
import './FileUpload.css';
import { MdCloudUpload } from 'react-icons/md';

const FileUpload = ({ onUpload, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const submitUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="file-upload-container">
      <div 
        className={`file-upload-zone ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <MdCloudUpload className="upload-icon" />
        <p className="upload-text">
          Drag & drop your transaction file (JSON/CSV)<br/>
          or click to browse
        </p>
        <input 
          type="file" 
          id="file-upload" 
          multiple={false} 
          onChange={handleChange} 
          accept=".csv, .json"
        />
        <label htmlFor="file-upload" className="browse-btn">
          Browse Files
        </label>

        {file && (
          <div className="selected-file fade-in">
            <span className="file-name">{file.name}</span>
            <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
          </div>
        )}
      </div>
      
      <button 
        className="analyze-btn" 
        disabled={!file || isUploading}
        onClick={submitUpload}
      >
        {isUploading ? <span className="spinner"></span> : "Analyze Subscriptions"}
      </button>
    </div>
  );
};

export default FileUpload;
