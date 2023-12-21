import React from 'react';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

const Header = () => {
  // Get the username from session storage
  const userName = sessionStorage.getItem('isLoggedin') === 'true' ? sessionStorage.getItem('userName') : 'user';

  return (
    <div >
      <div className="left flex items-center justify-between px-4 py-2 border-b border-borderColor sticky top-0 bg-bg text-textColor">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="text-xl font-bold text-logo">social</span>
        </Link>
        <HomeOutlinedIcon className="text-xl" />
  
          <WbSunnyOutlinedIcon className="text-xl cursor-pointer"  />
        
        <GridViewOutlinedIcon className="text-xl" />
        <div className="search flex items-center gap-2 border border-borderColor rounded-md px-2 py-1">
          <SearchOutlinedIcon className="text-textColor" />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none text-textColor" />
        </div>
      </div>
      <div className="right flex items-center justify-between gap-4 px-4 py-2 bg-bg text-textColor">
        <PersonOutlinedIcon className="text-xl" />
        <EmailOutlinedIcon className="text-xl" />
        <NotificationsOutlinedIcon className="text-xl" />
        <div className="user flex items-center gap-2">
      
          <span className="text-base">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
