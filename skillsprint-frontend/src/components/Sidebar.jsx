import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.svg';
import { RxDashboard } from 'react-icons/rx';
import { GoGoal } from 'react-icons/go';
import { IoLogOutOutline } from 'react-icons/io5';
import './Sidebar.css';

const Sidebar = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="SkillSprint Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <RxDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/goals" className="sidebar-link">
          <GoGoal size={20} />
          <span>All Goals</span>
        </NavLink>
        {/* Add more links here as you build more pages */}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-link logout-btn">
          <IoLogOutOutline size={22} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;