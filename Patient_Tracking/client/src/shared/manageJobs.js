import React from 'react';
import './Navbar.css'
import ManageJobsForm from '../ManageJobsForm/ManageJobsForm.js';

const ManageJobs = ({ handleState, returnState}) => {

  return (
    <>
      <button className="manage-jobs col-lg-2 col-md-3" onClick={() => handleState()}>Manage Jobs</button>
      {returnState() && <ManageJobsForm handleState={handleState} returnState={returnState}/>}
    </>
  );
};
export default ManageJobs;