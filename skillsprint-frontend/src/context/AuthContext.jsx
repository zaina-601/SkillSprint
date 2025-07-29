import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../api/auth.service';
import Spinner from '../components/Spinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, [token]);

  const handleLogin = async (email, password) => {
    const { data } = await AuthService.login(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ token: data.token });
    navigate('/dashboard');
  };

  const handleRegister = async (firstName, lastName, email, password) => {
    await AuthService.register(firstName, lastName, email, password);
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const value = { user, token, handleLogin, handleLogout, handleRegister, loading };

  if (loading) {
    return (
      <div className="fullscreen-spinner">
        <Spinner />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;