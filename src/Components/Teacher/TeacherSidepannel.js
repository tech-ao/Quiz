import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './TeacherSidepannel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeacherSidePanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({
    onlineClass: false,
    attendance: false,
    lessonPlan: false,
    assignment: false
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherName");
    localStorage.removeItem("teacherId");
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <div className="side-panel">
      <div className="menu-content">
        <div className="menu-section">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/teacherDashboard" className={`nav-link ${location.pathname === '/teacherDashboard' ? 'active' : ''}`}>
                <div className="icon-with-text">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">Dashboard</span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/studentdata" className={`nav-link ${location.pathname === '/studentdata' ? 'active' : ''}`}>
                <div className="icon-with-text">
                  <i className="bi bi-person"></i>
                  <span className="nav-text">Student</span>
                </div>
              </Link>
            </li>

            {/* Online Class */}
            <li className="nav-item">
              <div className={`nav-link ${openMenus.onlineClass ? 'active' : ''}`} onClick={() => toggleMenu('onlineClass')} style={{ cursor: 'pointer' }}>
                <div className="icon-with-text">
                  <i className="bi bi-camera-video"></i>
                  <span className="nav-text">Online Class</span>
                  <i className={`bi ${openMenus.onlineClass ? 'bi-chevron-down' : 'bi-chevron-right'} dropdown-icon`}></i>
                </div>
              </div>
              {openMenus.onlineClass && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link to="/assignclass" className="nav-link">
                      ➤ Assigned Classes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/completedclass" className="nav-link">
                      ➤ Complete Classes
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Attendance */}
            <li className="nav-item">
              <div className={`nav-link ${openMenus.attendance ? 'active' : ''}`} onClick={() => toggleMenu('attendance')} style={{ cursor: 'pointer' }}>
                <div className="icon-with-text">
                  <i className="bi bi-calendar-check"></i>
                  <span className="nav-text">Attendance</span>
                  <i className={`bi ${openMenus.attendance ? 'bi-chevron-down' : 'bi-chevron-right'} dropdown-icon`}></i>
                </div>
              </div>
              {openMenus.attendance && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link to="/attendance" className="nav-link">
                      ➤ Student Attendance
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/approvalleave" className="nav-link">
                      ➤ Approve Leave
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/attendanceData" className="nav-link">
                      ➤ Attendance By Date
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Lesson Plan */}
            <li className="nav-item">
              <div className={`nav-link ${openMenus.lessonPlan ? 'active' : ''}`} onClick={() => toggleMenu('lessonPlan')} style={{ cursor: 'pointer' }}>
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
                      ➤ Syllabus
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/topics" className="nav-link">
                      ➤ Topic
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/onlineClassShedule" className="nav-link">
                      ➤ Lesson Plan
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Fee's */}
            <li className="nav-item">
              <Link to="/paymentHistory" className={`nav-link ${location.pathname === '/paymentHistory' ? 'active' : ''}`}>
                <div className="icon-with-text">
                  <i className="bi bi-cash"></i>
                  <span className="nav-text">Fee's</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="logout-section">
          <ul className="nav flex-column">
            <li className="nav-item">
              <div className="nav-link" onClick={() => setShowLogoutConfirm(true)} style={{ cursor: 'pointer' }}>
                <div className="icon-with-text log">
                  <i className="bi bi-box-arrow-right" style={{ color: 'white' }}></i>
                  <span className="nav-text" style={{ color: 'white' }}>Log Out</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="logout-confirmation-popup">
          <div className="popup-content">
            <h5>Are you sure you want to logout?</h5>
            <div className="popup-buttons">
              <button className="btn btn-danger w-100" onClick={handleLogout}>Yes</button>
              <button className="btn btn-secondary w-100" onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSidePanel;
