import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute.js';
import JobsManager from './JobsManager.js';
import Login from './login.js';

function App() {
  return (
    <Router>
      <div className="App">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/jobs-manager" element={<JobsManager/>} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
