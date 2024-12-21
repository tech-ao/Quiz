import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import { Link } from 'react-router-dom';
import './StudentSidebar.css'
 
import 'bootstrap-icons/font/bootstrap-icons.css';

const StudentSidePannel = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();  // Initialize navigate hook for routing

  const toggleSidePanel = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Redirect to the desired page ("/adminlogin" or another)
      navigate("/");  // You can change this to any path you want
    }
  };

  return (
    <div className="d-flex">
      <button
        className="toggle-btn btn btn-success d-md-none"
        onClick={toggleSidePanel}
      >
        {isOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
      </button>
      <div
        className={`side-panel bg-green ${isOpen ? 'd-block' : 'd-none'} d-md-block`}
        style={{ width: '250px', minHeight: '100vh' }}
      >
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/studentDashboard"
              className={`nav-link ${location.pathname === '/studentDashboard' ? 'active' : ''}`}
            >
              <div className="icon-with-text">
              <i className="bi bi-grid"></i> 
              <span className="nav-text">Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/studentTest"
              className={`nav-link ${location.pathname === '/studentTest' ? 'active' : ''}`}
            >
              <div className="icon-with-text">
              <i className="bi bi-patch-question"></i> 
              <span className="nav-text">Test</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/studentCertificate"
              className={`nav-link ${location.pathname === '/studentCertificate' ? 'active' : ''}`}
            >
              <div className="icon-with-text">
              <i className="bi bi-award"></i>
              <span className="nav-text">Certificate</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/studentSettings"
              className={`nav-link ${location.pathname === '/studentSettings' ? 'active' : ''}`}
            >
              <div className="icon-with-text">
              <i className="bi bi-gear"></i> 
              <span className="nav-text">Settings</span>
            </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              onClick={handleLogout}  // Trigger logout confirmation
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <div className="icon-with-text">
              <i className="bi bi-box-arrow-right"></i> 
              <span className="nav-text">Logout</span>
            </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentSidePannel;
