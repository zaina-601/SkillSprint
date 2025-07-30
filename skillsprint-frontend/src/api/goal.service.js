import api from './api';

export const getAllGoals = () => api.get('/goals');
export const createGoal = (goalData) => api.post('/goals', goalData);
export const updateGoal = (id, goalData) => api.put(`/goals/${id}`, goalData); 
export const deleteGoal = (id) => api.delete(`/goals/${id}`);