import React, { useState } from 'react';
import './ManageJobsForm.css';

const ManageJobsForm = ({ handleState }) => {

  const [searchField, setSearchField] = useState({
    from: "",
    to: ""
  });

  const [patientName, setPatientName] = useState({
    patientName: "",
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
      patientName: e.target.value
    })
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

  return (
    <>
      <div className="card jobs-form-card">
        <div className="row card-body gx-5 px-4">
          <div className="card-title text-center">
            <span>Manage Jobs</span>
          </div>
          <form className="jobs-form col-4">

            <div className="">
              <input type="text" id="patient-name" placeholder="Patient Name..." value={patientName.patientName} onChange={handlePatientNameChange} list="patient-names"></input>
              <datalist id="patient-names">
                <option>Jane Johnson 207</option>
                <option>John Doe 402</option>
                <option>Alex George ER 14</option>
              </datalist>
            </div>

            <div className="search-list-container">
              <label for="transport-from">Transport From:</label>
              <br/>
              <input type="text" id="transport-from" placeholder="Search..." value={searchField.from} onChange={handleFromChange}></input>
              <ul className="search-area">
                <li className="search-item" onClick={handleFromClick}>Room 207</li>
                <li className="search-item" onClick={handleFromClick}>Room 402</li>
                <li className="search-item" onClick={handleFromClick}>Emergency Room 14</li>
              </ul>
            </div>

            <div className="search-list-container">
              <label for="destination">Destination:</label>
              <br/>
              <input type="text" id="destination" placeholder="Search..." value={searchField.to} onChange={handleDestinationChange}></input>
              <ul className="search-area">
                <li className="search-item" onClick={handleDestinationClick}>Ultrasound Room 2</li>
                <li className="search-item" onClick={handleDestinationClick}>Magnetic Resonance Imaging</li>
                <li className="search-item" onClick={handleDestinationClick}>Radiology Room 4</li>
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