import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Style.css'; // Import custom CSS for styling
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SidePanel = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="side-panel">
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
  );
};

export default SidePanel;
