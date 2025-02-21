import React, { useRef, useState, useEffect } from "react";
import { Navbar, Row, Col, Button } from "react-bootstrap";
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiGlobalLine,
  RiMenu3Line,
  RiRestartLine,
} from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Components/images/Logo.png";
import "../Admin/adminHeader.css";

const TeacherHeader = ({ toggleSidebar }) => {
  const ICON_SIZE = 30;

  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const togglePopup = () => setShowPopup((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherName");
    localStorage.removeItem("teacherId");
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <Navbar expand="lg" className="header py-2">
      {/* Desktop Header */}
      <Row className="align-items-center w-100 d-none d-md-flex">
        <Col md={3} className="d-flex align-items-center">
          <Link to="/teacherDashboard">
            <img 
              className="logo1 me-2" 
              src={logo} 
              alt="Math Gym Logo" 
              style={{ 
                cursor: "pointer", 
                maxWidth: "80px", 
                border: "1px solid #000",
                borderRadius: "5px" 
              }} 
            />
          </Link>
          <Navbar.Brand className="text-success fw-bold ms-2">
            MATH GYM
          </Navbar.Brand>
        </Col>
        <Col md={5} className="text-center">
          <span className="fw-bold welcome-message">Welcome, Teacher <span role="img" aria-label="wave">👋</span></span>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center header-icon-group">
          <Button variant="outlined" title="Notification" className="me-2 action-button">
            <RiNotification3Line size={24} />
          </Button>
          <Button 
            variant="outlined" 
            title="Website" 
            className="me-2 action-button"
            onClick={() => window.open("https://mathgymint.com", "_blank")}
          >
            <RiGlobalLine size={24} />
          </Button>
          
          <div className="position-relative" ref={popupRef}>
            <Button 
              variant="link" 
              onClick={togglePopup} 
              className="text-decoration-none fw-bold d-flex align-items-center admin-menu admin-text"
            >
              <span className="admin-text">Teacher</span>
            </Button>

            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate("/teacherProfile")}
                  >
                    <RiLockPasswordLine size={ICON_SIZE} className="me-2" /> Profile
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate("/teacherChangePassword")}
                  >
                    <RiRestartLine size={ICON_SIZE} className="me-2" /> Password
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
                    onClick={handleLogoutClick}
                  >
                    <RiLogoutCircleRLine size={ICON_SIZE} className="me-2" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Mobile Header */}
      <Row className="align-items-center w-100 d-flex d-md-none" style={{ padding: "0 5px", justifyContent: "space-between", marginRight:'15px' }}>
        <Col xs="auto" className="d-flex align-items-center">
          {isMobileExpanded && (
            <Link to="/teacherDashboard">
              <img
                className="logo1 me-2"
                src={logo}
                alt="Math Gym Logo"
                style={{
                  cursor: "pointer",
                  maxWidth: "60px",
                  border: "1px solid #000",
                  borderRadius: "5px",
                }}
              />
            </Link>
          )}
          <Button
            variant="link"
            onClick={() => {
              setIsMobileExpanded((prev) => !prev);
              toggleSidebar();
            }}
            style={{ padding: "0" }}
          >
            <RiMenu3Line size={ICON_SIZE} />
          </Button>
        </Col>

        <Col xs="auto" className="d-flex align-items-center">
          <Button
            variant="link"
            style={{ padding: "5px", marginRight: "10px" }}
          >
            <RiNotification3Line
              style={{ fontSize: window.innerWidth <= 767 ? "24px" : "24px" }}
            />
          </Button>
          <Button
            variant="link"
            onClick={() => window.open("https://mathgymint.com", "_blank")}
            style={{ padding: "0", marginLeft: "10px" }}
          >
            <RiGlobalLine
              style={{ fontSize: window.innerWidth <= 767 ? "24px" : "24px" }}
            />
          </Button>
          <div className="position-relative" style={{ marginLeft: "10px" }}>
            <Button
              variant="link"
              onClick={togglePopup}
              className="text-decoration-none fw-bold d-flex flex-column align-items-center"
              style={{ padding: "0" }}
            >
              <span
                className="text-success"
                style={{
                  fontSize: window.innerWidth <= 767 ? "10px" : "10px",
                  marginTop: "2px",
                }}
              >
                Teacher
              </span>
            </Button>
            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate("/teacherProfile")}
                  >
                    <RiLockPasswordLine
                      style={{
                        fontSize: window.innerWidth <= 767 ? "18px" : "24px",
                      }}
                      className="me-2"
                    />
                    Profile
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate("/teacherChangePassword")}
                  >
                    <RiRestartLine
                      style={{
                        fontSize: window.innerWidth <= 767 ? "18px" : "24px",
                      }}
                      className="me-2"
                    />
                    Password
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
                    onClick={handleLogoutClick}
                  >
                    <RiLogoutCircleRLine
                      style={{
                        fontSize: window.innerWidth <= 767 ? "18px" : "24px",
                      }}
                      className="me-2"
                    />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="logout-confirmation-popup">
          <div
            className="popup-content"
            style={{
              width: "300px",
              margin: "0 auto",
              padding: "20px",
              background: "#fff",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h5>Are you sure you want to logout?</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <Button
                variant="danger"
                style={{ width: "100%" }}
                onClick={handleLogout}
              >
                Yes
              </Button>
              <Button
                variant="secondary"
                style={{ width: "100%" }}
                onClick={handleCancelLogout}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default TeacherHeader;