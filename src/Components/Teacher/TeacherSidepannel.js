import React, { useState, useEffect } from 'react';
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

  // Update openMenus based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
   
    
    // Auto-expand Attendance menu if on related pages
    if (currentPath.includes('/attendance') || currentPath.includes('/approvedleave') || currentPath.includes('/attendanceData')) {
      setOpenMenus(prev => ({ ...prev, attendance: true }));
    }
    
    // Auto-expand Online Class menu if on related pages
    if (currentPath.includes('/meeting') || currentPath.includes('/assignclass') || currentPath.includes('/completedclass')) {
      setOpenMenus(prev => ({ ...prev, onlineClass: true }));
    }
    // Auto-expand Lesson Plan menu if on related pages
    if (currentPath.includes('/syllabus') || currentPath.includes('/topics') || currentPath.includes('/onlineClassShedule')) {
      setOpenMenus(prev => ({ ...prev, lessonPlan: true }));
    }
  }, [location.pathname]);

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

  // Check if current path is active for main or sub items
  const isPathActive = (path) => {
    return location.pathname === path;
  };

  // Check if a section is active (parent dropdown)
  const isSectionActive = (paths) => {
    return paths.some(path => location.pathname.includes(path));
  };

  return (
    <div className="side-panel">
      <div className="menu-content">
        <div className="menu-section">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/teacherDashboard" className={`nav-link ${isPathActive('/teacherDashboard') ? 'active' : ''}`}>
                <div className="icon-with-text">
                  <i className="bi bi-grid"></i>
                  <span className="nav-text">Dashboard</span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/studentdata" className={`nav-link ${isPathActive('/studentdata') ? 'active' : ''}`}>
                <div className="icon-with-text">
                  <i className="bi bi-person"></i>
                  <span className="nav-text">Student</span>
                </div>
              </Link>
            </li>

            {/* Online Class */}
            <li className="nav-item">
              <div 
                className={`nav-link ${isSectionActive(['/meeting','/assignclass', '/completedclass']) ? 'active' : ''}`} 
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
                    <Link to="/meeting" className={`nav-link ${isPathActive('/meeting') ? 'active-sub' : ''}`}>
                      ➤ Create Meeting
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/assignclass" className={`nav-link ${isPathActive('/assignclass') ? 'active-sub' : ''}`}>
                      ➤ Assigned Classes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/completedclass" className={`nav-link ${isPathActive('/completedclass') ? 'active-sub' : ''}`}>
                      ➤ Complete Classes
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Attendance */}
            <li className="nav-item">
              <div 
                className={`nav-link ${isSectionActive(['/attendance', '/approvedleave', '/attendanceData']) ? 'active' : ''}`} 
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
                    <Link to="/attendance" className={`nav-link ${isPathActive('/attendance') ? 'active-sub' : ''}`}>
                      ➤ Student Attendance
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/approvedleave" className={`nav-link ${isPathActive('/approvedleave') ? 'active-sub' : ''}`}>
                      ➤ Approve Leave
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/attendanceData" className={`nav-link ${isPathActive('/attendanceData') ? 'active-sub' : ''}`}>
                      ➤ Attendance By Date
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Lesson Plan */}
            <li className="nav-item">
              <div 
                className={`nav-link ${isSectionActive(['/syllabus', '/topics', '/onlineClassShedule']) ? 'active' : ''}`} 
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
                    <Link to="/syllabus" className={`nav-link ${isPathActive('/syllabus') ? 'active-sub' : ''}`}>
                      ➤ Syllabus
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/topics" className={`nav-link ${isPathActive('/topics') ? 'active-sub' : ''}`}>
                      ➤ Topic
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/onlineClassShedule" className={`nav-link ${isPathActive('/onlineClassShedule') ? 'active-sub' : ''}`}>
                      ➤ Lesson Plan
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Fee's */}
            <li className="nav-item">
              <Link to="/paymentHistory" className={`nav-link ${isPathActive('/paymentHistory') ? 'active' : ''}`}>
                <div className="icon-with-text">
                  <i className="bi bi-cash"></i>
                  <span className="nav-text">Fee's</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="logout-section" >
          <ul className="nav flex-column" >
            <li className="nav-item" >
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