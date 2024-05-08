import React, { useState, useEffect } from 'react';
import './ManageJobsForm.css';
import TransportFromSearch from './transportFromSearch.js';
import PatientSearch from './patientSearch.js';
import TransportToSearch from './transportToSearch.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import JobStatus from '../jobsTable/table components/JobStatus.js';

// const APIURL = process.env.APIURL;

const ManageJobsForm = ({ handleState }) => {

  const [ cookies, setCookies, removeCookies ] = useCookies(['user-auth']);

  const [searchField, setSearchField] = useState({
    from: "",
    to: "",
    mot: "",
  });

  const [patientName, setPatientName] = useState({
    patientName: "",
    patientID: "",
  });

  function handleFromChange(e) {
    setSearchField({
      ...searchField,
      from: e.target.value
    });
  };

  function handleDestinationChange(e) {
    setSearchField({
      ...searchField,
      to: e.target.value
    });
  }

  function handleFromClick(e) {
    setSearchField({
      ...searchField,
      from: e.target.innerHTML
    });
  };

  function handleDestinationClick(e) {
    setSearchField({
      ...searchField,
      to: e.target.innerHTML
    });
  };

  function handlePatientNameChange(e) {

    setPatientName({
      ...patientName,
      patientName: ((e.target.value).split(':')[0]),
      patientID: ((e.target.value).split(':'))[1]
    })
  };

  function handleMotChange(e) {
    setSearchField({
      ...searchField,
      mot: e.target.value
    });
  };

  function handleMotClick(e) {
    setSearchField({
      ...searchField,
      mot: e.target.innerHTML
    });
  };

  function handleCancel() {
    setPatientName({
      patientName: ""
    })
    setSearchField({
      from: "",
      to: ""
    });
    handleState()
  };

  function handleSubmit(e) {
    e.preventDefault();

    let date = new Date()
    let time = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    let confirmation = window.confirm("Are you sure you would like to submit this job?");

    if ((patientName.patientID || patientName.patientName || searchField.from || searchField.to || searchField.mot) && confirmation) {

      const jobData = {
        patient_id: patientName.patientID,
        patient_name: patientName.patientName,
        origin: searchField.from,
        destination: searchField.to,
        mot: searchField.mot,
        time_stamp: time,
      }
      const userData = {
        username: cookies['user-auth'].user,
      }

      const dataPacket = {
        jobData: jobData,
        userData: userData,
        jobStatus: "pending"
      }
  
      axios.post(`http://localhost:8080/new-job/f4153f4c-77f0-4d82-afeb-ae728ecf6357`, dataPacket)
        .then(response => {
          if (response.status === 202) {
            alert("job could not be added as patient is already part of another job")
          }

        });

      handleState()
    } else if (confirmation) { alert("All fields must be filled out") }
  }

  return (
    <>
      <div className="card jobs-form-card">
        <div className="row card-body gx-5 px-4">
          <div className="card-title text-center">
            <span>Manage Jobs</span>
          </div>
          <form className="jobs-form col-4" onSubmit={handleSubmit}>

            <div className="">
              <input type="text" id="patient-name" placeholder="Patient Name..." value={patientName.patientName} onChange={handlePatientNameChange} list="patient-names" autoComplete="off" required></input>
              <datalist id="patient-names">
                <PatientSearch itemFunction={handleFromClick} parentState={handleState}/>
              </datalist>
            </div>

            <div className="search-list-container">
              <label htmlFor="transport-from">Transport From:</label>
              <br/>
              <input type="text" id="transport-from" placeholder="Search..." value={searchField.from} onChange={handleFromChange} required></input>
              <ul className="search-area">
                <TransportFromSearch itemFunction={handleFromClick} parentState={handleState}/>
              </ul>
            </div>

            <div className="search-list-container">
              <label htmlFor="destination">Destination:</label>
              <br/>
              <input type="text" id="destination" placeholder="Search..." value={searchField.to} onChange={handleDestinationChange} required></input>
              <ul className="search-area">
                <TransportToSearch itemFunction={handleDestinationClick} parentState={handleState}/>
              </ul>
            </div>
            <div className="search-list-container">
              <label htmlFor="mot">Mode of Transport:</label>
              <br/>
              <input type="text" id="mot" placeholder="Search..." value={searchField.mot} onChange={handleMotChange} required></input>
              <ul className="search-area">
                <li className="search-item" key={"wheelchair"} onClick={handleMotClick}>Wheelchair</li>
                <li className="search-item" key={"bed"} onClick={handleMotClick}>Bed</li>
                <li className="search-item" key={"stretcher"} onClick={handleMotClick}>Stretcher</li>
              </ul>
            </div>
            <div className="row justify-content-between form-btn-container gx-3 px-3 py-2">
              <input className="form-button submit" type="submit" value="Submit"></input>
              <input className="form-button cancel" type="button" value="Cancel" onClick={handleCancel}></input>
            </div>

          </form>

          <div className="card preview-job-params col-5">
            <div className="card-body">
              
            </div>
          </div>

        </div>
      </div>

      <div className="backdrop"></div>
    </>
  );
};

export default ManageJobsForm;