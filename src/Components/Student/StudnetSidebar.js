import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StudentSidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StudentSidePannel = ({ studyModeId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [openMenus, setOpenMenus] = useState({
    test: false,
    onlineMeeting: false
  });
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Auto-expand menus based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    setOpenMenus(prev => ({
      ...prev,
      test: currentPath.includes('/Test') || currentPath.includes('/completedtest'),
      onlineMeeting: currentPath.includes('/assigned-class') || currentPath.includes('/completed_class')
    }));
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

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
<<<<<<< HEAD
    if (path === '/StudentOnlineClass' && Number(studyModeId) !== 2) {
=======
    if (path === '/student-assigned-class' && Number(studyModeId) !== 1) {
      // Changed from !== 2 to !== 2 for alignment with display condition
>>>>>>> 8b05349f963512c9d5cf63072d6903ed00e1eaf0
      console.warn("Access denied to Online Class for offline students.");
      return;
    }
    navigate(path);
  };

  const isPathActive = (path) => location.pathname === path;
  const isSectionActive = (paths) => paths.some(path => location.pathname.includes(path));

  return (
    <div className="side-panel bg-green" style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <div
            className={`nav-link ${isPathActive('/studentDashboard') ? 'active' : ''}`}
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
            className={`nav-link ${isSectionActive(['/Test', '/completedtest']) ? 'active' : ''}`}
            onClick={() => toggleMenu('test')}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Test</span>
              <i className={`bi ${openMenus.test ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.test && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <div
                  className={`nav-link ${isPathActive('/Test') ? 'active' : ''}`}
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
                  className={`nav-link ${isPathActive('/completedtest') ? 'active' : ''}`}
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
            className={`nav-link ${isPathActive('/studentCertificate') ? 'active' : ''}`}
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
            className={`nav-link ${isPathActive('/studentnotification') ? 'active' : ''}`}
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
            className={`nav-link ${isPathActive('/studentSettings') ? 'active' : ''}`}
            onClick={() => handleNavigation('/studentSettings')}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </div>
        </li>

<<<<<<< HEAD
        {/* Online Meeting Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${isSectionActive(['/assigned-class', '/completed_class']) ? 'active' : ''}`}
            onClick={() => toggleMenu('onlineMeeting')}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-laptop"></i>
              <span className="nav-text">Online Meeting</span>
              <i className={`bi ${openMenus.onlineMeeting ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          
          {openMenus.onlineMeeting && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <div
                  className={`nav-link ${isPathActive('/assigned-class') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/assigned-class')}
                  style={{ marginLeft: '15px', cursor: 'pointer' }}
                >
                  <div className="icon-with-text" style={{ gap: '5px' }}>
                    <i className="bi bi-people"></i>
                    <span className="nav-text">Assigned Class</span>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${isPathActive('/completed_class') ? 'active' : ''}`}
                  onClick={() => handleNavigation('/completed_class')}
                  style={{ marginLeft: '15px', cursor: 'pointer' }}
                >
                  <div className="icon-with-text" style={{ gap: '5px' }}>
                    <i className="bi bi-check2-circle"></i>
                    <span className="nav-text">Completed Class</span>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </li>
=======
     {/* Online Class: Rendered only for online mode students */}
{Number(studyModeId) === 1 && (
  <li className="nav-item">
    <div
      className={`nav-link ${location.pathname === '/student-assigned-class' ? 'active' : ''}`}
      onClick={() => handleNavigation('/student-assigned-class')}
      style={{ cursor: 'pointer' }}
    >
      <div className="icon-with-text">
        <i className="bi bi-laptop"></i>
        <span className="nav-text">Online Class</span>
      </div>
    </div>
  </li>
)}

>>>>>>> 8b05349f963512c9d5cf63072d6903ed00e1eaf0

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