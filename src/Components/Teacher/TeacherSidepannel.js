import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './TeacherSidepannel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeacherSidePanel = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    onlineClass: false,
    attendance: false,
    lessonPlan: false,
    assignment: false
  });

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <div className="side-panel">
        <div className="menu-content">
        <div className="menu-section">
          <ul className="nav flex-column">
            {/* Dashboard */}
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                <div className="icon-with-text">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">Dashboard</span>
                </div>
              </Link>
            </li>

            {/* Student */}
            <li className="nav-item">
              <Link
                to="/student"
                className={`nav-link ${location.pathname === '/student' ? 'active' : ''}`}
              >
                <div className="icon-with-text">
                  <i className="bi bi-person"></i>
                  <span className="nav-text">Student</span>
                </div>
              </Link>
            </li>

            {/* Online Class with dropdown */}
            <li className="nav-item">
              <div
                className={`nav-link ${openMenus.onlineClass ? 'active' : ''}`}
                onClick={() => toggleMenu('onlineClass')}
                style={{ cursor: 'pointer' }}
              >
                <div className="icon-with-text">
                  <i className="bi bi-camera-video"></i>
                  <span className="nav-text">Online Class</span>
                  <i className={`bi ${openMenus.onlineClass ? 'bi-chevron-down' : 'bi-chevron-right'} dropdown-icon`}></i>
                </div>
              </div>
              {openMenus.onlineClass && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link to="/assigned-classes" className="nav-link">
                      <span className="sub-nav-text">Assigned Classes</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/complete-classes" className="nav-link">
                      <span className="sub-nav-text">Complete Classes</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Attendance */}
            <li className="nav-item">
              <div
                className={`nav-link ${openMenus.attendance ? 'active' : ''}`}
                onClick={() => toggleMenu('attendance')}
                style={{ cursor: 'pointer' }}
              >
                <div className="icon-with-text">
                  <i className="bi bi-calendar-check"></i>
                  <span className="nav-text">Attendance</span>
                  <i className={`bi ${openMenus.attendance ? 'bi-chevron-down' : 'bi-chevron-right'} dropdown-icon`}></i>
                </div>
              </div>
              {openMenus.attendance && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link to="/student-attendance" className="nav-link">
                      <span className="sub-nav-text">Student Attendance</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/approve-leave" className="nav-link">
                      <span className="sub-nav-text">Approve Leave</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/attendance-by-date" className="nav-link">
                      <span className="sub-nav-text">Attendance By Date</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Lesson Plan */}
            <li className="nav-item">
              <div
                className={`nav-link ${openMenus.lessonPlan ? 'active' : ''}`}
                onClick={() => toggleMenu('lessonPlan')}
                style={{ cursor: 'pointer' }}
              >
                <div className="icon-with-text">
                  <i className="bi bi-book"></i>
                  <span className="nav-text">Lesson Plan</span>
                  <i className={`bi ${openMenus.lessonPlan ? 'bi-chevron-down' : 'bi-chevron-right'} dropdown-icon`}></i>
                </div>
              </div>
              {openMenus.lessonPlan && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link to="/syllabus" className="nav-link">
                      <span className="sub-nav-text">Syllabus</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/topic" className="nav-link">
                      <span className="sub-nav-text">Topic</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/lesson-plan" className="nav-link">
                      <span className="sub-nav-text">Lesson Plan</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Assignment */}
            <li className="nav-item">
              <div
                className={`nav-link ${openMenus.assignment ? 'active' : ''}`}
                onClick={() => toggleMenu('assignment')}
                style={{ cursor: 'pointer' }}
              >
                <div className="icon-with-text">
                  <i className="bi bi-file-text"></i>
                  <span className="nav-text">Assignment</span>
                  <i className={`bi ${openMenus.assignment ? 'bi-chevron-down' : 'bi-chevron-right'} dropdown-icon`}></i>
                </div>
              </div>
              {openMenus.assignment && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link to="/assignment-list" className="nav-link">
                      <span className="sub-nav-text">Assignment List</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/completed-assignments" className="nav-link">
                      <span className="sub-nav-text">Completed Assignments</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Fee's */}
            <li className="nav-item">
              <Link
                to="/fees"
                className={`nav-link ${location.pathname === '/fees' ? 'active' : ''}`}
              >
                <div className="icon-with-text">
                  <i className="bi bi-cash"></i>
                  <span className="nav-text">Fee's</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div className="logout-section">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              <div className="icon-with-text" style={{justifyContent:'center'}}>
                <i className="bi bi-box-arrow-right" style={{color:'white'}}></i>
                <span className="nav-text" style={{color:'white'}}>Log Out</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherSidePanel;