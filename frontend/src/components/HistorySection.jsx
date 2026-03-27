import React, { useEffect, useState } from 'react';
import { MdInsertDriveFile, MdCheckCircle } from 'react-icons/md';
import { getFileHistory } from '../services/api';
import './Sections.css';

const HistorySection = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getFileHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="section-card fade-in">
      <h3 className="section-title">Upload History</h3>
      {loading ? (
        <p className="loading-text">Loading history...</p>
      ) : (
        <ul className="history-list">
          {history.map(item => (
            <li key={item.id} className="history-item">
              <div className="history-icon-wrapper">
                <MdInsertDriveFile className="history-file-icon" />
              </div>
              <div className="history-item-details">
                <span className="history-filename">{item.filename}</span>
                <span className="history-date">Uploaded on {item.date}</span>
              </div>
              <div className="history-status">
                <MdCheckCircle className="status-icon" />
                <span>{item.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySection;
