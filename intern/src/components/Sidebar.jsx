import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <Link to="/"><div className="sidebar__item">Home</div></Link>
      <Link to="/profile"><div className="sidebar__item">Profile</div></Link>
      <Link to="/addfriends"><div className="sidebar__item">Suggestion Friends</div></Link>
      <div className="sidebar__item" onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default Sidebar;
