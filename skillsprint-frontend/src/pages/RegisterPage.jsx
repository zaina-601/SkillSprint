import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import './LoginPage.css'; // We are correctly re-using the CSS

const RegisterPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleRegister } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await handleRegister(formData.firstName, formData.lastName, formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // --- This is the updated JSX structure ---
  return (
    <div className="auth-container-split">
      <div className="auth-panel-left">
        <h1>Join SkillSprint</h1>
        <p>Start your journey of continuous improvement today. Sign up is fast and easy.</p>
      </div>
      <div className="auth-panel-right">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
          </div>
          <form onSubmit={onSubmit} className="auth-form">
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange} required />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <Spinner /> : 'Register'}
            </button>
          </form>
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;