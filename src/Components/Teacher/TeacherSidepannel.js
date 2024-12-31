import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './TeacherSidepannel.css'; // Make sure this has your updated styles
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeacherSidePanel = () => {
  const location = useLocation();
  const [isAttendanceOpen, setAttendanceOpen] = useState(false);

  const toggleAttendanceMenu = () => {
    setAttendanceOpen(!isAttendanceOpen);
  };

  return (
    <div className="side-panel">
      <ul className="nav flex-column">
        {/* Dashboard */}
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

        {/* My Students */}
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

        {/* Attendance Menu */}
        <li className="nav-item">
          <div
            className={`nav-link ${isAttendanceOpen ? 'active' : ''}`}
            onClick={toggleAttendanceMenu}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon-with-text">
              <i className="bi bi-calendar2-check"></i>
              <span className="nav-text">Attendance</span>
              <i
                className={`bi ${
                  isAttendanceOpen ? 'bi-chevron-down' : 'bi-chevron-right'
                } dropdown-icon`}
              ></i>
            </div>
          </div>
          {isAttendanceOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/attendance"
                  className={`nav-link ${
                    location.pathname === '/attendance' ? 'active' : ''
                  }`}
                >
                  <div className="icon-with-text">
                    <i className="bi bi-clipboard-data"></i>
                    <span className="sub-nav-text">Student Attendance</span>
                  </div>
                </Link>
              </li>
            
              <li className="nav-item">
                <Link
                  to="/attendanceData"
                  className={`nav-link ${
                    location.pathname === '/attendanceData' ? 'active' : ''
                  }`}
                >
                  <div className="icon-with-text">
                    <i className="bi bi-calendar-event"></i>
                    <span className="sub-nav-text">Attendance By Date</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link
            to="/onlineClassShedule"
            className={`nav-link ${location.pathname === '/onlineClassShedule' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Online Class</span>
            </div>
          </Link>
        </li>

        {/* Quizzes */}
        <li className="nav-item">
          <Link
            to="/paymentHistory"
            className={`nav-link ${location.pathname === '/paymentHistory' ? 'active' : ''}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-patch-question"></i>
              <span className="nav-text">Payment History</span>
            </div>
          </Link>
        </li>

        {/* Announcements */}
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
      </ul>
    </div>
  );
};

export default TeacherSidePanel;
