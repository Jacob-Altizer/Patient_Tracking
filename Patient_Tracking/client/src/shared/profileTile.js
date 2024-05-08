import React from 'react';
import "./Navbar.css";
import ProfileDropdown from './ProfileDropdown.js';
import { useCookies } from 'react-cookie';

const ProfileTile = ({handleState, returnState }) => {

  const [ cookies ] = useCookies(['user-auth']);

  const userFname = cookies['user-auth'].fname;
  const userLname = cookies['user-auth'].lname;
  const userInitials = userFname[0] + userLname[0];

  return (
    <>
      <div className="btn-group profile-tile" role="group">
        <button className="profile-name" onClick={() => handleState()}>
          <span className="firstname">{userFname}</span>
          <br></br>
          <span className="lastname">{userLname}</span>
        </button>

        <button className="profile-status-light status-online">
          <span className="user-initials">{userInitials}</span>
        </button>

        {returnState() && <ProfileDropdown handleState={handleState}/>}
      </div>
    </>
  );
};

export default ProfileTile;