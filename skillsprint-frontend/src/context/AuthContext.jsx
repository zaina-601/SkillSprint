import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import Spinner from '../components/Spinner';

const AuthContext = createContext();

// Define GraphQL mutations
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id firstName email }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user { id firstName email }
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // useMutation hooks
  const [loginUser] = useMutation(LOGIN_MUTATION);
  const [registerUser] = useMutation(REGISTER_MUTATION);

  useEffect(() => {
    if (token) {
      // In a real app, you'd decode the token here to get user info
      setUser({ token });
    }
    setAuthLoading(false);
  }, [token]);

  const handleLogin = async (email, password) => {
    const { data } = await loginUser({ variables: { email, password } });
    const { token: authToken, user: loggedInUser } = data.login;
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(loggedInUser);
    navigate('/dashboard');
  };

  const handleRegister = async (firstName, lastName, email, password) => {
    const { data } = await registerUser({ variables: { firstName, lastName, email, password } });
    // After registering, we log them in automatically
    const { token: authToken, user: registeredUser } = data.register;
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(registeredUser);
    navigate('/dashboard'); // Navigate to dashboard directly
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const value = { user, token, handleLogin, handleLogout, handleRegister, loading: authLoading };

  if (authLoading) {
    return <div className="fullscreen-spinner"><Spinner /></div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;