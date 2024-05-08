import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './shared/Navbar.js';
import JobsTable from './jobsTable/jobsTable.js';
import ManageJobsForm from './ManageJobsForm/ManageJobsForm.js';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <main className="main-content">
        <JobsTable/>
      </main>
    </div>
  );
};

export default App;
