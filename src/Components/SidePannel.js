import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Style.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation();

  const toggleSidePanel = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex">
      <button
        className="toggle-btn btn btn-primary d-md-none"
        onClick={toggleSidePanel}
      >
        {isOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
      </button>
      <div
        className={`side-panel bg-light ${
          isOpen ? 'd-block' : 'd-none'
        } d-md-block`}
        style={{ width: '250px', minHeight: '100vh' }}
      >
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/adminDashboard"
              className={`nav-link ${location.pathname === '/adminDashboard' ? 'active' : ''}`}
            >
              <i className="bi bi-grid"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/listTeacher"
              className={`nav-link ${location.pathname === '/listTeacher' ? 'active' : ''}`}
            >
              <i className="bi bi-person"></i> Teacher
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/studentList"
              className={`nav-link ${location.pathname === '/studentList' ? 'active' : ''}`}
            >
              <i className="bi bi-person"></i> Students
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/quiz"
              className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}
            >
              <i className="bi bi-patch-question"></i> Quiz
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/questions"
              className={`nav-link ${location.pathname === '/questions' ? 'active' : ''}`}
            >
              <i className="bi bi-journal-text"></i> Questions
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/studentReport"
              className={`nav-link ${location.pathname === '/studentReport' ? 'active' : ''}`}
            >
              <i className="bi bi-file-earmark-person"></i> Student Report
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/topStudentReport"
              className={`nav-link ${location.pathname === '/topStudentReport' ? 'active' : ''}`}
            >
              <i className="bi bi-file-earmark-bar-graph"></i> Top Student Report
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/settings"
              className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
            >
              <i className="bi bi-gear"></i> Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/moreSettings"
              className={`nav-link ${location.pathname === '/moreSettings' ? 'active' : ''}`}
            >
              <i className="bi bi-clipboard"></i> More Settings
            </Link>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default SidePanel;
