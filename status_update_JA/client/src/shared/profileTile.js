import React, { useState } from 'react';
import "./Navbar.css";
import ProfileDropdown from './ProfileDropdown.js';

const ProfileTile = ({handleState, returnState }) => {

  return (
    <>
      <div className="btn-group profile-tile" role="group">
        <button className="profile-name" onClick={() => handleState()}>
          <span className="firstname">Jacob</span>
          <br></br>
          <span className="lastname">Altizer</span>
        </button>

        <button className="profile-status-light status-online">
          <span className="user-initials">JA</span>
        </button>

        {returnState() && <ProfileDropdown handleState={handleState}/>}
      </div>
    </>
  );
};

export default ProfileTile;