import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './sidepannel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SidePanel = ({ isOpen, closeSidePanel }) => {
  const location = useLocation();

  // Close the panel when clicking outside
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.side-panel') && isOpen) {
      closeSidePanel();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/adminDashboard"
            className={`nav-link ${location.pathname === '/adminDashboard' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/listTeacher"
            className={`nav-link ${location.pathname === '/listTeacher' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-person"></i>
              <span className="nav-text">Teacher</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/studentList"
            className={`nav-link ${location.pathname === '/studentList' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-person-bounding-box"></i>
              <span className="nav-text">Students</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/enrollmentRequest"
            className={`nav-link ${location.pathname === '/enrollmentRequest' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-book"></i>
              <span className="nav-text">Enrollment Request</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/quiz"
            className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Quiz</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/questionListPage"
            className={`nav-link ${location.pathname === '/questionListPage' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-journal-text"></i>
              <span className="nav-text">Questions</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/onlineClass"
            className={`nav-link ${location.pathname === '/onlineClass' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-person"></i>
              <span className="nav-text">Online Class</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/adminAttendance"
            className={`nav-link ${location.pathname === '/adminAttendance' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-bar-graph"></i>
              <span className="nav-text">Attendance</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/adminSettings"
            className={`nav-link ${location.pathname === '/adminSettings' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/AbacusMath"
            className={`nav-link ${location.pathname === '/AbacusMath' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-controller"></i>
              <span className="nav-text">Abacus</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/notification"
            className={`nav-link ${location.pathname === '/notification' ? 'active' : ''}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-bell"></i>
              <span className="nav-text">Notification</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
