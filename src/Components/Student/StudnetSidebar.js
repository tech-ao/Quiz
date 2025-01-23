import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './StudentSidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StudentSidePannel = ({ studyModeId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      console.log("Logging out...");
      navigate("/"); // Redirect to home or login page
    } 
  };

  return (
    <div className="side-panel bg-green" style={{ width: '250px', minHeight: '100vh' }}>
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
            to="/Test"
            className={`nav-link ${location.pathname === '/Test' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Test</span>
            </div>
          </Link>
        </li>
        
          <li className="nav-item">
            <Link
              to="/StudentOnlineClass"
              className={`nav-link ${location.pathname === '/StudentOnlineClass' ? 'active' : ''}`}
            >
              <div className="icon-with-text">
                <i className="bi bi-laptop"></i>
                <span className="nav-text">Online Class</span>
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
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault(); // Prevents unintended navigation
      handleLogout();
    }}
    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
  >
    <div className="icon-with-text">
      <i className="bi bi-box-arrow-right"></i>
      <span className="nav-text">Logout</span>
    </div>
  </a>
</li>
      </ul>
    </div>
  );
};

export default StudentSidePannel;
