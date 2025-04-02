import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const SidePannel = ({ isOpen, closeSidePanel }) => {
  const [isAttendanceOpen, setAttendanceOpen] = useState(false);
  const [isOnlineOpen, setOnlineOpen] = useState(false);
  const [isScheduleOpen, setSchedule] = useState(false);
  const [isEnrollmentOpen, setEnrollmentOpen] = useState(false);
  const [isQuestionOpen, setQuestionOpen] = useState(false); // New state for Questions dropdown
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isQuizOpen ,setQuizOpen]=useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  // Close the panel when clicking outside
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".side-panel") && isOpen) {
      closeSidePanel();
    }
  };

  const toggleOnlineMenu = () => {
    setOnlineOpen(!isOnlineOpen);
  };
  const toggleScheduleMenu = () => {
    setSchedule(!isScheduleOpen);
  };

  const toggleAttendanceMenu = () => {
    setAttendanceOpen(!isAttendanceOpen);
  };

  const toggleEnrollmentMenu = () => {
    setEnrollmentOpen(!isEnrollmentOpen);
  };

  const toggleQuestionMenu = () => {
    setQuestionOpen(!isQuestionOpen);
  };
  
  const toggleQuizMenu = () => {
    setQuizOpen(!isQuizOpen);
  };


  // Show Logout Confirmation Popup
  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  // Handle Logout
  const handleLogout = () => {
    setShowLogoutPopup(false);
    localStorage.removeItem("userToken"); // Remove authentication token
    navigate("/adminLogin"); // Redirect to login page
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
    <div className={`side-panel ${isOpen ? "open" : ""}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/adminDashboard"
            className={`nav-link ${location.pathname === "/adminDashboard" ? "active" : ""}`}
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
            className={`nav-link ${location.pathname === "/listTeacher" ? "active" : ""}`}
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
            className={`nav-link ${location.pathname === "/studentList" ? "active" : ""}`}
            onClick={closeSidePanel}
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
            className={`nav-link ${isEnrollmentOpen ? "active" : ""}`}
            onClick={toggleEnrollmentMenu}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-book"></i>
              <span className="nav-text">Enrollment Request</span>
              <i className={`bi ${isEnrollmentOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isEnrollmentOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/enrollmentRequest"
                  className={`nav-link ${location.pathname === "/enrollmentRequest" ? "active" : ""}`}
                  onClick={closeSidePanel}
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
                  className={`nav-link ${location.pathname === "/teacherEnrollment" ? "active" : ""}`}
                  onClick={closeSidePanel}
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


        {/*Quiz Dropdown*/}
        
           <li className="nav-item">
          <div
            className={`nav-link ${isQuizOpen ? "active" : ""}`}
            onClick={toggleQuizMenu}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-question-circle"></i>
              <span className="nav-text">Quiz</span>
              <i className={`bi ${isQuizOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isQuizOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/ScheduleForm"
                  className={`nav-link ${location.pathname ==="/ScheduleForm" ? "active" : ""}`}
                  onClick={closeSidePanel}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-clock"></i>
                    <span className="nav-text">Schedule Time</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Questions Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${isQuestionOpen ? "active" : ""}`}
            onClick={toggleQuestionMenu}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-question-circle"></i>
              <span className="nav-text">Questions</span>
              <i className={`bi ${isQuestionOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isQuestionOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/addQuestion"
                  className={`nav-link ${location.pathname === "/addQuestion" ? "active" : ""}`}
                  onClick={closeSidePanel}
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
                  className={`nav-link ${location.pathname === "/ImportQuestion" ? "active" : ""}`}
                  onClick={closeSidePanel}
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
            className={`nav-link ${isScheduleOpen ? "active" : ""}`}
            onClick={toggleScheduleMenu}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-question-circle"></i>
              <span className="nav-text">Schedule Class</span>
              <i className={`bi ${isScheduleOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isScheduleOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/Createmeeting"
                  className={`nav-link ${location.pathname === "/Cretemeeting" ? "active" : ""}`}
                  onClick={closeSidePanel}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-plus-circle"></i>
                    <span className="nav-text">Create Meeting</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/AssignedClass"
                  className={`nav-link ${location.pathname === "/AssignedClass" ? "active" : ""}`}
                  onClick={closeSidePanel}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                    <i className="bi bi-plus-circle"></i>
                    <span className="nav-text">Assigned Classes</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/CompleteClass"
                  className={`nav-link ${location.pathname === "/CompleteClass" ? "active" : ""}`}
                  onClick={closeSidePanel}
                  style={{ marginLeft: "15px" }}
                >
                  <div className="icon-with-text" style={{ gap: "5px" }}>
                  <i className="bi bi-upload"></i>
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
            className={`nav-link ${isOnlineOpen ? "active" : ""}`}
            onClick={toggleOnlineMenu}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-calendar2-check"></i>
              <span className="nav-text">Online</span>
              <i className={`bi ${isOnlineOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isOnlineOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/onlineClass"
                  className={`nav-link ${location.pathname === "/onlineClass" ? "active" : ""}`}
                  onClick={closeSidePanel}
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
                  className={`nav-link ${location.pathname === "/AbacusMath" ? "active" : ""}`}
                  onClick={closeSidePanel}
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
            className={`nav-link ${isAttendanceOpen ? "active" : ""}`}
            onClick={toggleAttendanceMenu}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-with-text">
              <i className="bi bi-file-earmark-bar-graph"></i>
              <span className="nav-text">Attendance</span>
              <i className={`bi ${isAttendanceOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`} />
            </div>
          </div>
          {isAttendanceOpen && (
            <ul className="nav flex-column sub-nav">
              <li className="nav-item">
                <Link
                  to="/teacherAttendance"
                  className={`nav-link ${location.pathname === "/teacherAttendance" ? "active" : ""}`}
                  onClick={closeSidePanel}
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
                  className={`nav-link ${location.pathname === "/studentAttendance" ? "active" : ""}`}
                  onClick={closeSidePanel}
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

        <li className="nav-item">
          <Link
            to="/notification"
            className={`nav-link ${location.pathname === "/notification" ? "active" : ""}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-bell"></i>
              <span className="nav-text">Notification</span>
            </div>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/adminSettings"
            className={`nav-link ${location.pathname === "/adminSettings" ? "active" : ""}`}
            onClick={closeSidePanel}
          >
            <div className="icon-with-text">
              <i className="bi bi-gear"></i>
              <span className="nav-text">Settings</span>
            </div>
          </Link>
        </li>
        <li className="nav-item" onClick={handleLogoutClick}>
          <button  className="nav-link btn-link">
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
