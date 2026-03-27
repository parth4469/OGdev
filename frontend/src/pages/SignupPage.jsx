import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { registerUser } from '../services/api';
import './Auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to register. Please try again.');
    } finally {
      if (!success) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-logo">
          <span className="auth-logo-icon">🔪</span>
          <span className="auth-logo-text">SubSlasher</span>
        </div>
        
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Join us to take control of your subscriptions.</p>

        {error && <div className="auth-message error">{error}</div>}
        {success && <div className="auth-message success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="auth-input" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              placeholder="Email address" 
              className="auth-input" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="input-group">
            <FiLock className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              className="auth-input" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <motion.button 
            type="submit" 
            className="auth-btn"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            disabled={loading}
          >
            {loading ? <span className="auth-spinner"></span> : 'Create Account'}
          </motion.button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Log In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
