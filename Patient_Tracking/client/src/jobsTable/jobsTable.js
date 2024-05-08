import React, { useState, useEffect } from "react";
import "./jobsTable.css";
import JobStatus from "./table components/JobStatus";
import axios from "axios";

const JobsTable = () => {

  const [jobs, setJobs] = useState([]);

  useEffect (() => {
    axios.get(`http://localhost:8080/jobs/f4153f4c-77f0-4d82-afeb-ae728ecf6357`)
      .then(response => {
        const result = response.data.dataToSend;
        setJobs(result);
      })
  }, [])

  const jobsTableRow = [];

  for (let i = 0; i < jobs.length; i++) {

    let f_name = (jobs[i].patient_name).split(" ")[0]
    let l_name = (jobs[i].patient_name).split(" ")[1]

    jobsTableRow.push(
      <tr className="text-center" key={jobs[i].id}>
        <td className="status-cell">
          <JobStatus jobID={jobs[i].id} initialServerState={jobs[i].job_status} />
        </td>
        <td className="patient">
          <span className="patient-fname">{f_name}</span>
          &nbsp;
          <span className="patient-lname">{l_name}</span>
        </td>
        <td className="current-location">{jobs[i].origin}</td>
        <td className="destination">{jobs[i].destination}</td>
        <td className="isolation standard-isolation">{jobs[i].isolation}</td>
        <td className="mot">{jobs[i].mot}</td>
        <td className="update-time">
          <span className="job-created-time">{jobs[i].creation_time}</span>
          <span className="update-time-divider">&nbsp;|&nbsp;</span>
          <span className="job-updated-time">{jobs[i].update_time}</span>
        </td>
      </tr>)
  }

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
        {jobsTableRow}
      </tbody>
    </table>
  );
};

export default JobsTable;

