import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import { uploadTransactions } from '../services/api';
import './DataUploadPage.css';

const DataUploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
    setIsUploading(true);
    setError(null);
    try {
      const response = await uploadTransactions(file);
      navigate('/dashboard', { state: { analysisData: response } });
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to analyze the file. Please try submitting again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-data-page">
      {/* Decorative ambient background glows mirroring the home page */}
      <div className="ambient-backgrounds">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="ambient-orb orb-indigo"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="ambient-orb orb-violet"
        />
        <div className="ambient-core" />
      </div>

      <div className="upload-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card upload-card"
        >
          <div className="upload-card-header">
            <span className="upload-badge">Secure Sync</span>
            <h2>Import Your Data</h2>
            <p>Upload your JSON or CSV transaction history. SubSlasher processes your files locally to ensure maximum privacy.</p>
          </div>

          <div className="upload-mount">
            <FileUpload onUpload={handleUpload} isUploading={isUploading} />
            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-flag">{error}</motion.div>}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default DataUploadPage;
