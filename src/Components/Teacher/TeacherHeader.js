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

  return (
    <Navbar expand="lg" className="header py-2">
      {/* Desktop Header */}
      <Row className="align-items-center w-100 d-none d-md-flex">
        <Col md={3} className="d-flex align-items-center">
          <Link to="/teacherDashboard">
            <img className="logo1 me-2" src={logo} alt="Math Gym Logo" style={{ cursor: "pointer", maxWidth: "80px", borderRadius: "5px" }} />
          </Link>
        </Col>
        <Col md={5} className="text-center">
          <span className="fw-bold welcome-message">Welcome, Teacher</span>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center header-icon-group">
          <Button variant="link" title="Notification" className="me-2 action-button">
            <RiNotification3Line size={24} />
          </Button>
          <Button variant="link" title="Website" className="me-2 action-button" onClick={() => window.open("https://mathgymint.com", "_blank")}>
            <RiGlobalLine size={24} />
          </Button>
          
          {/* Profile Dropdown */}
          <div className="position-relative" ref={popupRef}>
            <Button variant="link" onClick={togglePopup} className="text-decoration-none fw-bold d-flex flex-column align-items-center">
              <span className="admin-text">Teacher</span>
              <img alt="Teacher" className="rounded-circle ms-2" style={{ width: "30px", height: "30px" }} />
            </Button>

            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item" onClick={() => navigate("/teacherProfile")}>
                    <RiLockPasswordLine size={ICON_SIZE} className="me-2" /> Profile
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item" onClick={() => navigate("/teacherChangePassword")}>
                    <RiRestartLine size={ICON_SIZE} className="me-2" /> Password
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item" onClick={handleLogoutClick}>
                    <RiLogoutCircleRLine size={ICON_SIZE} className="me-2" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Mobile Header */}
      <Row className="align-items-center w-100 d-flex d-md-none" style={{ padding: "0 5px" }}>
        <Col xs={3} className="d-flex align-items-center">
          <Button variant="link" onClick={toggleSidebar} style={{ padding: "0" }}>
            <RiMenu3Line size={20} />
          </Button>
        </Col>
        <Col xs={5} className="d-flex justify-content-start">
          <Link to="/teacherDashboard">
            <img src={logo} alt="Math Gym Logo" style={{ height: "35px", borderRadius: "5px" }} />
          </Link>
        </Col>
        <Col xs={4} className="d-flex justify-content-end align-items-center gap-1">
          <Button variant="link" style={{ padding: "3px" }}>
            <RiNotification3Line size={20} />
          </Button>
          <Button variant="link" onClick={() => window.open("https://mathgymint.com", "_blank")} style={{ padding: "3px" }}>
            <RiGlobalLine size={20} />
          </Button>
          
          {/* Mobile Profile Dropdown */}
          <div className="position-relative" ref={popupRef}>
            <Button variant="link" onClick={togglePopup} className="d-flex align-items-center" style={{ padding: "3px" }}>
              <img alt="Teacher" className="rounded-circle ms-1" style={{ width: "30px", height: "30px" }} />
              <span className="admin-text" style={{ fontSize: "12px", whiteSpace: "nowrap" }}>Teacher</span>
            </Button>

            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item" onClick={() => navigate("/")}>
                    <RiLockPasswordLine size={ICON_SIZE} className="me-2" /> Profile
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item" onClick={() => navigate("/")}>
                    <RiRestartLine size={ICON_SIZE} className="me-2" /> Password
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item" onClick={handleLogoutClick}>
                    <RiLogoutCircleRLine size={ICON_SIZE} className="me-2" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Navbar>
  );
};

export default TeacherHeader;
