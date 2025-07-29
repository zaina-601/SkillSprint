import api from './api';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (firstName, lastName, email, password) => {
  return api.post('/auth/register', { firstName, lastName, email, password });
};