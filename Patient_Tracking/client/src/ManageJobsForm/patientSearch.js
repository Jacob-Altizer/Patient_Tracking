import React, { useState, useEffect } from "react";
import axios from "axios";
import api from '../shared/api/posts.js';

const PatientSearch = ({ itemFunction, captureID }) => {

  const [patients, setPatients] = useState([]);

  useEffect (() => {
    axios.get('http://localhost:8080/patients/f4153f4c-77f0-4d82-afeb-ae728ecf6357')
      .then(response => {
        const result = response.data.data;
        setPatients(result);
      });
  }, []);

  const patientListEl = [];

  for (let i = 0; i < patients.length; i++) {

    let patientID = patients[i].id;

    patientListEl.push(
    <option className="search-item" key={patientID} onClick={itemFunction}>{patients[i].patient_name}:{patientID}</option>)
  }

  return (
    <>
      {patientListEl}
    </>
  );
};

export default PatientSearch;