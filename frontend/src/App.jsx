import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage'; // Actually the Landing Page now
import DataUploadPage from './pages/DataUploadPage';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected/Layout routes wrapped in Header/Footer block */}
        <Route path="/" element={
          <Layout>
            <UploadPage />
          </Layout>
        } />
        <Route path="/upload" element={
          <Layout>
            <DataUploadPage />
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
