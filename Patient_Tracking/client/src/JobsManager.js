import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './shared/Navbar.js';
import JobsTable from './jobsTable/jobsTable.js';

function JobsManager() {
  return (
    <div className="jobs-manager-container">
      <Navbar/>
      <JobsTable/>
    </div>
  );
};

export default JobsManager;
