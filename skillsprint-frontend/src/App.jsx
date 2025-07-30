import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routing/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import useAuth from './hooks/useAuth';
function App() {
const { user } = useAuth();
return (
<Routes>
<Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
<Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
  <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
  
  <Route element={<ProtectedRoute />}>
    <Route 
      path="/dashboard" 
      element={<DashboardPage title="Dashboard" />} 
    />
    
    <Route 
      path="/goals" 
      element={<DashboardPage title="All Goals" />} 
    />
  </Route>
</Routes>
);
}
export default App;