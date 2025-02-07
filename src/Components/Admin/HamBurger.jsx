import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io"; // Close icon
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./hamBurger.css";

const HamBurger = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state
  const [isOnlineOpen, setIsOnlineOpen] = useState(false); // Online dropdown visibility
  const navigate = useNavigate();
  const location = useLocation();

  // Function to toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close state
  };

  // Function to handle menu item navigation and close the sidebar
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close sidebar after navigation
  };

  // Function to toggle the online dropdown
  const toggleOnlineDropdown = () => {
    setIsOnlineOpen(!isOnlineOpen); // Toggle the visibility of the "Online" dropdown
  };

  return (
    <>
      {/* Sidebar Toggle Button (Hamburger or Close icon) */}
      <button
        className="custom-sidebar-toggle left-toggle d-lg-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <IoMdClose /> : <RiMenu2Line />} {/* Show close or hamburger icon */}
      </button>

      {/* Sidebar - Only visible in small screens when hamburger icon is clicked */}
      {isOpen && (
        <div className="custom-sidebar custom-sidebar-small d-lg-none">
          <div className="custom-sidebar-header">
            {/* Close icon inside the sidebar */}
            <button className="custom-sidebar-close" onClick={toggleSidebar}>
              <IoMdClose />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="custom-sidebar-content">
            <ul>
              {/* Main Menu Items */}
              <li onClick={() => handleNavigation("/adminDashboard")}>Dashboard</li>
              <li onClick={() => handleNavigation("/listTeacher")}>Teacher</li>
              <li onClick={() => handleNavigation("/studentList")}>Students</li>
              <li onClick={() => handleNavigation("/enrollmentRequest")}>Enrollment Request</li>
              <li onClick={() => handleNavigation("/quiz")}>Quiz</li>
              <li onClick={() => handleNavigation("/questionListPage")}>Questions</li>

              {/* Online Dropdown */}
              <li onClick={toggleOnlineDropdown} className="dropdown-toggle">
                Online{" "}
                <i
                  className={`bi ${isOnlineOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`}
                />
                {isOnlineOpen && (
                  <ul className="nav flex-column sub-nav">
                    <li className="nav-item">
                      <Link
                        to="/AbacusKit"
                        className={`nav-link ${location.pathname === '/AbacusKit' ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="icon-with-text">
                          <i className="bi bi-file-earmark-person"></i>
                          <span className="nav-text">Abacus Kit</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/AbacusMath"
                        className={`nav-link ${location.pathname === '/AbacusMath' ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="icon-with-text">
                          <i className="bi bi-controller"></i>
                          <span className="nav-text">Abacus Math</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Other Menu Items */}
              <li onClick={() => handleNavigation("/adminAttendance")}>Attendance</li>
              <li onClick={() => handleNavigation("/adminSettings")}>Settings</li>
              <li onClick={() => handleNavigation("/notification")}>Notification</li>
            </ul>
          </div>
        </div>
      )}

      {/* Sidebar - Visible in Large Screens */}
      <div className="custom-sidebar d-none d-lg-block">
        <div className="custom-sidebar-header">
          {/* You can add a close button or any other header content */}
        </div>

        {/* Sidebar Content */}
        <div className="custom-sidebar-content">
          <ul>
            {/* Main Menu Items */}
            <li onClick={() => handleNavigation("/adminDashboard")}>Dashboard</li>
            <li onClick={() => handleNavigation("/listTeacher")}>Teacher</li>
            <li onClick={() => handleNavigation("/studentList")}>Students</li>
            <li onClick={() => handleNavigation("/enrollmentRequest")}>Enrollment Request</li>
            <li onClick={() => handleNavigation("/quiz")}>Quiz</li>
            <li onClick={() => handleNavigation("/questionListPage")}>Questions</li>

            {/* Online Dropdown */}
            <li onClick={toggleOnlineDropdown} className="dropdown-toggle">
              Online{" "}
              <i
                className={`bi ${isOnlineOpen ? "bi-chevron-down" : "bi-chevron-right"} dropdown-icon`}
              />
              {isOnlineOpen && (
                <ul className="nav flex-column sub-nav">
                  <li className="nav-item">
                    <Link
                      to="/AbacusKit"
                      className={`nav-link ${location.pathname === '/AbacusKit' ? 'active' : ''}`}
                    >
                      <div className="icon-with-text">
                        <i className="bi bi-file-earmark-person"></i>
                        <span className="nav-text">Abacus Kit</span>
                      </div>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/AbacusMath"
                      className={`nav-link ${location.pathname === '/AbacusMath' ? 'active' : ''}`}
                    >
                      <div className="icon-with-text">
                        <i className="bi bi-controller"></i>
                        <span className="nav-text">Abacus Math</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Other Menu Items */}
            <li onClick={() => handleNavigation("/adminAttendance")}>Attendance</li>
            <li onClick={() => handleNavigation("/adminSettings")}>Settings</li>
            <li onClick={() => handleNavigation("/notification")}>Notification</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamBurger;
