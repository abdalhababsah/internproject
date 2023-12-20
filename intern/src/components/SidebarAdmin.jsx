// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { ReactComponent as DashboardIcon } from './icons/dashboard.svg';
// import { ReactComponent as UsersIcon } from './icons/users.svg';
// Import other icons similarly

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      {/* Logo and title */}
      <a href="#" className="text-white flex items-center space-x-2 px-4">
        {/* Replace with your logo svg */}
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          {/* Your SVG content */}
        </svg>
        <span className="text-2xl font-extrabold">ADMIN PANEL</span>
      </a>
      
      {/* Nav items */}
      <nav>
        <NavLink exact to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500">
          <div className="flex items-center">
            {/* <DashboardIcon className="w-6 h-6" /> */}
            <span className="ml-4">Dashboard</span>
          </div>
        </NavLink>
        <NavLink to="/admin/roles" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500">
          {/* Your Icon and Text for Roles */}
        </NavLink>
        <NavLink to="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white" activeClassName="bg-blue-500">
          <div className="flex items-center">
            {/* <UsersIcon className="w-6 h-6" /> */}
            <span className="ml-4">Users</span>
          </div>
        </NavLink>
        {/* Repeat for other nav items */}
      </nav>
    </div>
  );
};

export default Sidebar;
