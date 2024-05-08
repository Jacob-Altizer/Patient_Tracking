import React, { useState, useEffect } from "react";
import axios from "axios";
import api from '../shared/api/posts.js';

const TransportFromSearch = ({ itemFunction }) => {

  const [patients, setPatients] = useState([]);
  // const [patientsListEl, setPatientsListEl] = useState([]);

  useEffect (() => {
    axios.get('http://localhost:8080/patients/f4153f4c-77f0-4d82-afeb-ae728ecf6357')
      .then(response => {
        const result = response.data.data;
        setPatients( result );
      });
  }, []);

  const patientListEl = [];

  for (let i = 0; i < patients.length; i++) {
    patientListEl.push(
    <li className="search-item" key={patients[i].room_no} onClick={itemFunction}>Room {patients[i].room_no}</li>)
  }

  return (
    <>
      {patientListEl}
    </>
  );
};

export default TransportFromSearch;