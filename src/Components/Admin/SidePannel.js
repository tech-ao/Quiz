import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './sidepannel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SidePanel = () => {
  const location = useLocation();

  return (
    <div className="side-panel">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/adminDashboard"
            className={`nav-link ${location.pathname === '/adminDashboard' ? 'active' : ''}`}
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
          >
            <div className="icon-with-text">
              <i className="bi bi-person"></i>
              <span className="nav-text">Students</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/enrollmentRequest"
            className={`nav-link ${location.pathname === '/enrollmentRequest' ? 'active' : ''}`}
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
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Quiz</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/questions"
            className={`nav-link ${location.pathname === '/questions' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-journal-text"></i>
              <span className="nav-text">Questions</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/studentReport"
            className={`nav-link ${location.pathname === '/studentReport' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-person"></i>
              <span className="nav-text">Student Report</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/topStudentReport"
            className={`nav-link ${location.pathname === '/topStudentReport' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-bar-graph"></i>
              <span className="nav-text">Top Student Report</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/settings"
            className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/moreSettings"
            className={`nav-link ${location.pathname === '/moreSettings' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-clipboard"></i>
              <span className="nav-text">More Settings</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
