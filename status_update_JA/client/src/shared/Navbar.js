import React, { useState } from 'react';
import './Navbar.css';
import ProfileTile from './profileTile.js';
import ManageJobs from './manageJobs.js';

const Navbar = () => {

  const [dropdownState, setDropdownState] = useState(false)
  const [jobsFormState, setJobsFormState] = useState(false)

  function reverseDropdownState() {
    setDropdownState(!dropdownState);
  };

  function returnDropdownState() {
    return (dropdownState);
  };

  function reverseJobsFormState() {
    setJobsFormState(!jobsFormState);
  };

  function returnJobsFormState() {
    return (jobsFormState);
  };

  return (
    <nav className="navbar">
      <ul className="row navbar-comps justify-content-between gx-0 gy-0">
        <ManageJobs handleState={reverseJobsFormState} returnState={returnJobsFormState}/>
        <ProfileTile handleState={reverseDropdownState} returnState={returnDropdownState}/>
      </ul>
    </nav>
  );
};
export default Navbar;