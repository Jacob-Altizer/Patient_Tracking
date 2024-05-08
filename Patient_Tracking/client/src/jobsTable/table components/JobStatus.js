import React, { useEffect, useState } from 'react';
import '../jobsTable.css';
import { useCookies, getCookie } from 'react-cookie';
import axios from 'axios';

const JobStatus = ({ jobID, initialServerState }) => {

  useEffect(() => {
    requestJobStatus()
  }, [])

  const [ cookies, setCookies, removeCookies ] = useCookies(['user-auth']);
  const [ jobCookies, setJobCookies, removeJobCookies ] = useCookies(['job-cookies'])

  const [ jobState, setJobState ] = useState(initialServerState);
  const [ isHovering, setIsHovering ] = useState(false);
  const [ jobStatePointer, setJobStatePointer ] = useState(0);

  const possibleJobStates = [
    "pending",
    "dispatched",
    "in-progress",
    "completed"
  ]

  function statusToServer(newStatus) {

    axios.post(`http://localhost:8080/update-job-status/f4153f4c-77f0-4d82-afeb-ae728ecf6357`, {jobID, newStatus})
      .then(response => {
        setJobState(response.data.newStatus)
        if (response.data.newStatus === "completed") {
          removeJobCookies(['job-cookies'])
        }
      })
  }

  function requestJobStatus() {
    axios.post(`http://localhost:8080/get-job-status/f4153f4c-77f0-4d82-afeb-ae728ecf6357`, {jobID})
      .then(response => {
        
      })
  }

  function handleMouseEnter() {
      setIsHovering(true);
      setTimeout(() => {
        setIsHovering(false)
      }, 2000);
  }

  function handleUserClick() {
    let newCookie = {
      jobID: jobID,
      username: cookies['user-auth'].user
    };

    setJobCookies('job-cookies', JSON.stringify(newCookie), {path: '/', maxAge: 86400});

    setJobStatePointer(jobStatePointer + 1);
    statusToServer(possibleJobStates[jobStatePointer]);
  }

  console.log(jobState)

  function jobStatusLookUp(jobState) {
    let button;

    if (jobState === "pending") {
      button = <button className="accept-button status-hover-btn" key={jobID} onClick={handleUserClick}>Accept</button>
    } else if (jobState === "dispatched") {
      button = <button className="dispatched-button status-hover-btn" key={jobID} onClick={handleUserClick}>In Progress</button>
    } else if (jobState === "in-progress") {
      button = <button className="in-progress-button status-hover-btn" key={jobID} onClick={handleUserClick}>Completed</button>
    }
      
    return button;
  }

  return (
    <>
      {isHovering ? jobStatusLookUp(jobState) : <span className={`status job-status status-${jobState}`} key={jobID} onMouseEnter={handleMouseEnter}>{jobState}</span>}
    </>
  );
}

export default JobStatus;