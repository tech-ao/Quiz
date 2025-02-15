import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@mui/material";
import { Navbar, Row, Col, Button } from "react-bootstrap";
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiAdminLine,
  RiGlobalLine,
  RiMenu3Line,
  RiRestartLine,
} from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../Components/images/Logo.png";
import "../Admin/adminHeader.css";
import UpdatePassword from "../Student/UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../../redux/Action/StudentAction";

const Header = ({ toggleSidebar }) => {
  // Use a constant to set a uniform (increased) icon size for all icons.
  const ICON_SIZE = 30;

  // Local state variables:
  // - showPopup: toggles the admin popup.
  // - showLogoutConfirm: toggles the logout confirmation.
  // - isMobileExpanded: controls whether the mobile left group is expanded (logo is visible) or collapsed.
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const popupRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedAdmin } = useSelector((state) => state.admin || {});
  const adminFullName = selectedAdmin?.data
    ? `${selectedAdmin.data.firstName} ${selectedAdmin.data.lastName}`
    : "Admin";

  const togglePopup = () => setShowPopup((prev) => !prev);


  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

const togglePasswordPopup = () => {
  setShowPasswordPopup((prev) => !prev);
};

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      dispatch(fetchStudent(storedStudentId));
    }
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentId");
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
          <Link to="/adminDashboard">
            <img
              className="logo1 me-2"
              src={logo}
              alt="Math Gym Logo"
              style={{
                cursor: "pointer",
                maxWidth: "80px",
                border: "1px solid #000",
                borderRadius: "5px",
              }}
            />
          </Link>
          <Navbar.Brand className="text-success fw-bold ms-2">
            MATH GYM
          </Navbar.Brand>
        </Col>
        <Col md={5} className="text-center">
          <span className="fw-bold welcome-message">
            Welcome, {adminFullName} <span role="img" aria-label="wave">👋</span>
          </span>
        </Col>
        <Col
          md={4}
          className="d-flex justify-content-end align-items-center header-icon-group"
        >
          <Button
            variant="outlined"
            title="Notification"
            className="me-2 action-button"
            onClick={() => navigate("/notification")}
          >
            <Badge
              badgeContent={10}
              color="secondary"
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              className="notification-badge"
            >
              <RiNotification3Line size={ICON_SIZE} />
            </Badge>
          </Button>
          <Button
            variant="outlined"
            title="Website"
            className="me-2 action-button"
            onClick={() => window.open("https://mathgymint.com", "_blank")}
          >
            <RiGlobalLine size={ICON_SIZE} />
          </Button>
          <div className="position-relative" ref={popupRef}>
          <Button
  variant="link"
  onClick={togglePopup}
  className="text-decoration-none fw-bold d-flex align-items-center admin-menu admin-text"
    >
  <RiAdminLine size={ICON_SIZE} className="me-1" />
  <span className="admin-text">{adminFullName}</span>
</Button>  {/* <-- Closing tag moved here */} 

{showPopup && (
  <div className="admin-popup">
    <ul className="list-unstyled m-0 p-2">
      <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
        onClick={() => navigate("/adminSettings")}
      >
        <RiLockPasswordLine size={ICON_SIZE} className="me-2" /> Profile
      </li>
      <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
        onClick={() => { togglePasswordPopup(); setShowPopup(false); }}
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
      <Row
        className="align-items-center w-100 d-flex d-md-none"
        style={{ padding: "0 5px", justifyContent: "space-between" }}
      >
        <Col xs="auto" className="d-flex align-items-center">
          {isMobileExpanded && (
            <Link to="/adminDashboard">
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
            onClick={() => navigate("/notification")}
            style={{ padding: "5px", marginRight: "10px" }} // Adjust padding for proper spacing
          >
            <Badge
              badgeContent={10}
              color="secondary"
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <RiNotification3Line
                // size={ICON_SIZE}
                style={{ fontSize: window.innerWidth <= 767 ? "24px" : "24px" }}
              />
            </Badge>
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
              <RiAdminLine
                style={{ fontSize: window.innerWidth <= 767 ? "24px" : "24px" }}
              />
              <span
                className="text-success"
                style={{
                  fontSize: window.innerWidth <= 767 ? "10px" : "10px",
                  marginTop: "2px",
                }}
              >
               {adminFullName}
              </span>
            </Button>
            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate("/adminSettings")}
                  >
                    <RiLockPasswordLine
                      style={{
                        fontSize: window.innerWidth <= 767 ? "18px" : "24px",
                      }}
                      className="me-2"
                    />{" "}
                    Profile
                  </li>
                  <li className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item" style={{width:'198px'}}
                  onClick={()=>{togglePasswordPopup();
                    setShowPopup(false);}}
                  >
                    <RiRestartLine
                      style={{
                        fontSize: window.innerWidth <= 767 ? "18px" : "24px", }}
                      className="me-2"
                    />{" "}
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
                    />{" "}
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
      {/* Password Change Popup */}
{showPasswordPopup && (
  <UpdatePassword onClose={togglePasswordPopup} />
)}
    </Navbar>
  );
};

export default Header;
