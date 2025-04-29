import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sidepannel.css";

const SidePannel = ({ isOpen, closeSidePanel }) => {
  const [openMenus, setOpenMenus] = useState({
    attendance: false,
    online: false,
    schedule: false,
    enrollment: false,
    question: false,
    quiz: false
  });
  
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-expand menus based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    setOpenMenus(prev => ({
      ...prev,
      attendance: currentPath.includes('/teacherAttendance') || currentPath.includes('/studentAttendance'),
      online: currentPath.includes('/onlineClass') || currentPath.includes('/AbacusMath'),
      schedule: currentPath.includes('/Createmeeting') || currentPath.includes('/AssignedClass') || currentPath.includes('/CompleteClass'),
      enrollment: currentPath.includes('/enrollmentRequest') || currentPath.includes('/teacherEnrollment'),
      question: currentPath.includes('/addQuestion') || currentPath.includes('/ImportQuestion'),
      quiz: currentPath.includes('/ScheduleForm')
    }));
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  // Check if current path is active
  const isPathActive = (path) => {
    return location.pathname === path;
  };

  // Check if a section is active
  const isSectionActive = (paths) => {
    return paths.some(path => location.pathname.includes(path));
  };

  // Show Logout Confirmation Popup
  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  // Handle Logout
  const handleLogout = () => {
    setShowLogoutPopup(false);
    localStorage.removeItem("userToken");
    navigate("/adminLogin");
  };

  // Cancel Logout
  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".side-panel") && isOpen) {
        closeSidePanel();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={`admin-side-panel ${isOpen ? "open" : ""}`}>
      <ul className="nav flex-column">
        {/* Dashboard */}
        <li className="nav-item">
          <Link
            to="/adminDashboard"
            className={`nav-link ${isPathActive("/adminDashboard") ? "active" : ""}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-grid"></i>
              <span className="nav-text">Dashboard</span>
            </div>
          </Link>
        </li>

        {/* Teacher */}
        <li className="nav-item">
          <Link
            to="/listTeacher"
            className={`nav-link ${isPathActive("/listTeacher") ? "active" : ""}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-person"></i>
              <span className="nav-text">Teacher</span>
            </div>
          </Link>
        </li>

        {/* Students */}
        <li className="nav-item ">
          <Link
            to="/studentList"
            className={`nav-link ${isPathActive("/studentList") ? "active" : ""}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-person-bounding-box"></i>
              <span className="nav-text">Students</span>
            </div>
          </Link>
        </li>

        {/* Enrollment Request Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${isSectionActive(["/enrollmentRequest", "/teacherEnrollment"]) ? "active" : ""}`}
            onClick={() => toggleMenu("enrollment")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-book"></i>
              <span className="nav-text">Enrollment Request</span>
              <i className={`bi ${openMenus.enrollment ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.enrollment && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/enrollmentRequest"
                  className={`nav-link ${isPathActive("/enrollmentRequest") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-person-bounding-box"></i>
                    <span className="nav-text">Student</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/teacherEnrollment"
                  className={`nav-link ${isPathActive("/teacherEnrollment") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-person"></i>
                    <span className="nav-text">Teacher</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

      

        {/* Questions Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${isSectionActive(["/addQuestion", "/ImportQuestion"]) ? "active" : ""}`}
            onClick={() => toggleMenu("question")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-question-circle"></i>
              <span className="nav-text">Questions</span>
              <i className={`bi ${openMenus.question ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.question && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/addQuestion"
                  className={`nav-link ${isPathActive("/addQuestion") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-plus-circle"></i>
                    <span className="nav-text">Add Question</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/ImportQuestion"
                  className={`nav-link ${isPathActive("/ImportQuestion") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-upload"></i>
                    <span className="nav-text">Import Question</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Schedule Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${isSectionActive(["/Createmeeting", "/AssignedClass", "/CompleteClass"]) ? "active" : ""}`}
            onClick={() => toggleMenu("schedule")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-question-circle"></i>
              <span className="nav-text">Schedule Class</span>
              <i className={`bi ${openMenus.schedule ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.schedule && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/Createmeeting"
                  className={`nav-link ${isPathActive("/Createmeeting") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-camera-video"></i>
                    <span className="nav-text">Create Meeting</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/AssignedClass"
                  className={`nav-link ${isPathActive("/AssignedClass") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-people"></i>
                    <span className="nav-text">Assigned Classes</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/CompleteClass"
                  className={`nav-link ${isPathActive("/CompleteClass") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-check-circle"></i>
                    <span className="nav-text">Complete Classes</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Online Menu */}
        <li className="nav-item">
          <div
            className={`nav-link ${isSectionActive(["/onlineClass", "/AbacusMath"]) ? "active" : ""}`}
            onClick={() => toggleMenu("online")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-calendar2-check"></i>
              <span className="nav-text">Online</span>
              <i className={`bi ${openMenus.online ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.online && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/onlineClass"
                  className={`nav-link ${isPathActive("/onlineClass") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-file-earmark-person"></i>
                    <span className="nav-text">Online Class</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/AbacusMath"
                  className={`nav-link ${isPathActive("/AbacusMath") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-controller"></i>
                    <span className="nav-text">Abacus</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Attendance Menu */}
        <li className="nav-item">
          <div
            className={`nav-link ${isSectionActive(["/teacherAttendance", "/studentAttendance"]) ? "active" : ""}`}
            onClick={() => toggleMenu("attendance")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-bar-graph"></i>
              <span className="nav-text">Attendance</span>
              <i className={`bi ${openMenus.attendance ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.attendance && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/teacherAttendance"
                  className={`nav-link ${isPathActive("/teacherAttendance") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-person"></i>
                    <span className="nav-text">Teacher</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/studentAttendance"
                  className={`nav-link ${isPathActive("/studentAttendance") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-person-bounding-box"></i>
                    <span className="nav-text">Student</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* FeesPayment */}
        <li className="nav-item">
          <Link
            to="/FeesPayment"
            className={`nav-link ${isPathActive("/FeesPayment") ? "active" : ""}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-person"></i>
              <span className="nav-text">Fees</span>
            </div>
          </Link>
        </li>

        {/* Notification */}
        <li className="nav-item">
          <Link
            to="/notification"
            className={`nav-link ${isPathActive("/notification") ? "active" : ""}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-bell"></i>
              <span className="nav-text">Notification</span>
            </div>
          </Link>
        </li>

        {/* Settings */}
        <li className="nav-item">
          <Link
            to="/adminSettings"
            className={`nav-link ${isPathActive("/adminSettings") ? "active" : ""}`}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </Link>
        </li>

          {/* Quiz Dropdown */}
          <li className="nav-item">
          <div
            className={`nav-link ${isPathActive("/ScheduleForm") ? "active" : ""}`}
            onClick={() => toggleMenu("quiz")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-question-circle"></i>
              <span className="nav-text">Quiz</span>
              <i className={`bi ${openMenus.quiz ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {openMenus.quiz && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/ScheduleForm"
                  className={`nav-link ${isPathActive("/ScheduleForm") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-clock"></i>
                    <span className="nav-text">Schedule Time</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/RegisteredStudents"
                  className={`nav-link ${isPathActive("/RegisteredStudents") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                  <i className="bi bi-person-bounding-box"></i>
                    <span className="nav-text">Registered Students</span>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/examList"
                  className={`nav-link ${isPathActive("/examList") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                  <i className="bi bi-person-bounding-box"></i>
                    <span className="nav-text">Exam List</span>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/competionEnrollment"
                  className={`nav-link ${isPathActive("/competionEnrollment") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                  <i className="bi bi-person-bounding-box"></i>
                    <span className="nav-text">competion Enrollment Request</span>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/competionPaymentHistory"
                  className={`nav-link ${isPathActive("/competionPaymentHistory") ? "active-sub" : ""}`}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                  <i className="bi bi-person-bounding-box"></i>
                    <span className="nav-text">competion PaymentHistory</span>
                  </div>
                </Link>
              </li>

              

            </ul>
          )}
        </li>

        {/* Logout */}
        <li className="nav-item" onClick={handleLogoutClick}>
          <button className="nav-link btn-link">
            <div className="icon-with-text">
              <i className="bi bi-box-arrow-right"></i>
              <span className="nav-text">Logout</span>
            </div>
          </button>
        </li>
      </ul>

      {showLogoutPopup && (
        <div className="logout-confirmation-popup">
          <div className="popup-content">
            <h5>Are you sure you want to logout?</h5>
            <button onClick={handleLogout} className="btn btn-danger">
              Yes, Logout
            </button>
            <button onClick={handleCancelLogout} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePannel;