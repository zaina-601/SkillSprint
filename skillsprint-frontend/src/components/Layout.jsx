import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content-area">{children}</main>
    </div>
  );
};

export default Layout;