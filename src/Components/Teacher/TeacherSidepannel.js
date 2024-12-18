import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Admin/sidepannel.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeacherSidePanel = () => {
  const location = useLocation();

  return (
    <div className="side-panel">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/teacherDashboard"
            className={`nav-link ${location.pathname === '/teacherDashboard' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/myStudents"
            className={`nav-link ${location.pathname === '/myStudents' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-person-bounding-box"></i>
              <span className="nav-text">My Students</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/assignments"
            className={`nav-link ${location.pathname === '/assignments' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-text"></i>
              <span className="nav-text">Assignments</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/quizzes"
            className={`nav-link ${location.pathname === '/quizzes' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Quizzes</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/announcements"
            className={`nav-link ${location.pathname === '/announcements' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-megaphone"></i>
              <span className="nav-text">Announcements</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/studentReports"
            className={`nav-link ${location.pathname === '/studentReports' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-bar-graph"></i>
              <span className="nav-text">Student Reports</span>
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
            to="/notifications"
            className={`nav-link ${location.pathname === '/notifications' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-bell"></i>
              <span className="nav-text">Notifications</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidePanel;
