import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StudentSidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StudentSidePannel = ({ studyModeId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isTestOpen, setTestOpen] = useState(false);

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

  // Handle navigation with studyModeId check for online class
  const handleNavigation = (path) => {
    // For online class, ensure only online mode students can access
    if (path === '/StudentOnlineClass' && Number(studyModeId) !== 2) {
      console.warn("Access denied to Online Class for offline students.");
      return;
    }
    navigate(path);
  };

  const toggleTestMenu = () => {
    setTestOpen(!isTestOpen);
  };

  return (
    <div className="side-panel bg-green" style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/studentDashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentDashboard')}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </div>
          </div>
        </li>

        {/* Test Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${isTestOpen ? 'active' : ''}`}
            onClick={toggleTestMenu}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Test</span>
              <i className={`bi ${isTestOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isTestOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <div
                  className={`nav-link ${location.pathname === '/Test' ? 'active' : ''}`}
                  onClick={() => handleNavigation('/Test')}
                  style={{ marginLeft: '15px', cursor: 'pointer' }}
                >
                  <div className="icon-with-text" style={{ gap: '5px' }}>
                    <i className="bi bi-calendar"></i>
                    <span className="nav-text">Schedule Test</span>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${location.pathname === '/completedtest' ? 'active' : ''}`}
                  onClick={() => handleNavigation('/completedtest')}
                  style={{ marginLeft: '15px', cursor: 'pointer' }}
                >
                  <div className="icon-with-text" style={{ gap: '5px' }}>
                    <i className="bi bi-check2-circle"></i>
                    <span className="nav-text">Completed Test</span>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <div
            className={`nav-link ${location.pathname === '/studentCertificate' ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentCertificate')}
            style={{ cursor: 'pointer' }}
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
            style={{ cursor: 'pointer' }}
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
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </div>
        </li>

        {/* Online Class: Rendered only for online mode students */}
        {Number(studyModeId) === 1 && (
          <li className="nav-item">
            <div
              className={`nav-link ${location.pathname === '/StudentOnlineClass' ? 'active' : ''}`}
              onClick={() => handleNavigation('/StudentOnlineClass')}
              style={{ cursor: 'pointer' }}
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
            style={{ cursor: 'pointer' }}
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
