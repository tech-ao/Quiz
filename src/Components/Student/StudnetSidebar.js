import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './StudentSidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StudentSidePannel = ({ studyModeId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/", { replace: true });
    setShowLogoutPopup(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  // Handle navigation with studyModeId check
  const handleNavigation = (path) => {
    if (path === '/StudentOnlineClass' && studyModeId === 2) {
      console.warn("Access denied to Online Class due to studyModeId restrictions.");
      return;
    }
    navigate(path);
  };

  return (
    <div className="side-panel bg-green" style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/studentDashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentDashboard')}
          >
            <div className="icon-with-text">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/Test' ? 'active' : ''}`}
            onClick={() => handleNavigation('/Test')}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Test</span>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/studentCertificate' ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentCertificate')}
          >
            <div className="icon-with-text">
              <i className="bi bi-award"></i>
              <span className="nav-text">Certificate</span>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/studentnotification' ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentnotification')}
          >
            <div className="icon-with-text">
              <i className="bi bi-bell"></i>
              <span className="nav-text">Notification</span>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/studentSettings' ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentSettings')}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </div>
        </li>

        {/* Online Class: Conditional Navigation */}
        {studyModeId !== 2 && (
          <li className="nav-item">
            <div
              className={`nav-link ${location.pathname === '/StudentOnlineClass' ? 'active' : ''}`}
              onClick={() => handleNavigation('/StudentOnlineClass')}
            >
              <div className="icon-with-text">
                <i className="bi bi-laptop"></i>
                <span className="nav-text">Online Class</span>
              </div>
            </div>
          </li>
        )}

        <li className="nav-item">
          <div
            className="nav-link logout-link"
            onClick={handleLogoutClick}
          >
            <div className="icon-with-text">
              <i className="bi bi-box-arrow-right"></i>
              <span className="nav-text">Logout</span>
            </div>
          </div>
        </li>
      </ul>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-confirmation-popup">
          <div className="popup-content">
            <h5>Are you sure you want to logout?</h5>
            <button onClick={handleLogout} className="btn btn-danger">Yes, Logout</button>
            <button onClick={handleCancelLogout} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSidePannel;
