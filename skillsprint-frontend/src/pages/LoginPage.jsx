import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await handleLogin(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container-split">
      <div className="auth-panel-left">
        <h1>Welcome to SkillSprint</h1>
        <p>Track your learning goals, manage tasks, and accelerate your growth.</p>
      </div>
      <div className="auth-panel-right">
        <div className="auth-card">
          <div className="auth-header">
            <h2>User Login</h2>
          </div>
          <form onSubmit={onSubmit} className="auth-form">
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <Spinner /> : 'Login'}
            </button>
          </form>
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;