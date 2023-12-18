// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/"><div className="sidebar__item">Home</div></Link>
      <Link to="/profile"><div className="sidebar__item">Profile</div></Link>
      <div className="sidebar__item">Notifications</div>
      <div className="sidebar__item">Settings</div>
      <div className="sidebar__item">Logout</div>
    </div>
  );
};

export default Sidebar;
