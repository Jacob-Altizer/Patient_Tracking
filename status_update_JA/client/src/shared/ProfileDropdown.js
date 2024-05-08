import React from 'react';
import './Navbar.css';

const ProfileDropdown = ({ handleState }) => {

  return (
    <div className="profile-dropdown">

      <button className="menu-item" onClick={() => handleState()}>
        My Profile
      </button>
      <br></br>
      <button className="menu-item" onClick={() => handleState()}>
        Settings
      </button>
      <hr></hr>
      <button className="menu-item" onClick={() => handleState()}>
        Sign Out
      </button>

    </div>
  );
};

export default ProfileDropdown;