import React from "react";
import "./jobsTable.css";
import JobStatus from "./table components/JobStatus";


const JobsTable = () => {
  return (
    <table className="jobs-table">
      <thead>
        <tr className="table-head text-center">
          <th className="font-weight-light col-1">Status</th>
          <th className="font-weight-light col-1">Patient</th>
          <th className="font-weight-light col-2">Current Location</th>
          <th className="font-weight-light col-1">Destination</th>
          <th className="font-weight-light col-1">Isolation</th>
          <th className="font-weight-light col-1">MOT</th>
          <th className="font-weight-light col-2">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td className="status-cell">
            <JobStatus>
              <span className="status status-pending">pending</span>
            </JobStatus>
          </td>
          <td className="patient">
            <span className="patient-fname">Jane</span>
            &nbsp;
            <span className="patient-lname">Johnson</span>
          </td>
          <td className="current-location">Room 207</td>
          <td className="destination">Radiology Room 4</td>
          <td className="isolation standard-isolation">Standard</td>
          <td className="mot">Wheelchair</td>
          <td className="update-time">
            <span className="job-created-time">12:58</span>
            <span className="update-time-divider">&nbsp;|&nbsp;</span>
            <span className="job-updated-time">13:02</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default JobsTable;

