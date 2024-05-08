import React, { useState, useEffect } from "react";
import axios from "axios";
import api from '../shared/api/posts.js';

const TransportToSearch = ({ itemFunction }) => {

  const [departments, setDepartments] = useState([]);

  useEffect (() => {
    axios.get('http://localhost:8080/departments/f4153f4c-77f0-4d82-afeb-ae728ecf6357')
      .then(response => {
        const result = response.data.data;
        setDepartments( result );
      });
  }, []);

  const departmentsListEl = [];

  for (let i = 0; i < departments.length; i++) {

    if (departments[i].room_count <= 1) {
        departmentsListEl.push(
        <li className="search-item" key={departments[i].d_name} onClick={itemFunction}>{departments[i].d_name}</li>)
        
    } else {
        const customLiElement = [];
        for (let j = 0; j < departments[i].room_count; j++) {
            customLiElement.push(
            <li className="search-item" key={(departments[i].d_name) + (j + 1)} onClick={itemFunction}>{departments[i].d_name} Rm {j + 1}</li>)
        }
        departmentsListEl.push(customLiElement)
    }
  }

  return (
    <>
      {departmentsListEl}
    </>
  );
};

export default TransportToSearch;