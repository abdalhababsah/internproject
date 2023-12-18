import React from 'react';
import img from "../images/feed-2.jpg";
import img1 from "../images/social logo.png";


const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src={img1} alt="Logo" />
      <div className="header__search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="header__user">
        <img src={img} alt="User" />
        <p>ibrahim hasan</p>
      </div>
    </div>
  );
};

export default Header;
