import React, { useState } from 'react';
import './Navbar.css';
import { useCookies } from 'react-cookie';

const ProfileDropdown = ({ handleState }) => {

  const [ cookies, setCookies, removeCookies ] = useCookies(['user-auth']);

  function handleSignOut(e) {
    e.stopPropagation();
    handleState();
    removeCookies('user-auth');
  }

  return (
    <div className="profile-dropdown">

      <button className="menu-item" key={"profile"}>
        My Profile
      </button>
      <br></br>
      <button className="menu-item" key={"settings"}>
        Settings
      </button>
      <hr></hr>
      <button className="menu-item" key={"menu-item"} onClick={handleSignOut}>
        Sign Out
      </button>

    </div>
  );
};

export default ProfileDropdown;