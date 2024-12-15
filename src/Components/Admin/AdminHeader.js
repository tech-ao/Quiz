import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiAdminLine,
  RiGlobalLine,
  RiMenu3Line,
} from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';
import '../../Style.css';
import './adminHeader.css';
import logo from "../../Components/images/Logo.png";

const Header = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // Toggle popup visibility
  const togglePopup = () => setShowPopup((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/adminlogin');
    }
  };

  // Redirect to Update Password
  const handleUpdatePassword = () => {
    alert('Redirecting to update password...');
    navigate('/update-password'); // Ensure the route exists in your application
  };

  return (
    <Navbar expand="lg" className="header py-2">
      <Container fluid>
        <Row className="align-items-center w-100">
          {/* Logo and Sidebar Toggle */}
          <Col xs={6} md={3} className="d-flex align-items-center">
            <Link to="/adminDashboard">
              <img
                className="logo1 me-2"
                src={logo}
                alt="Math Gym Logo"
                style={{ cursor: 'pointer', maxWidth: '100px' }}
              />
            </Link>
            <Navbar.Brand className="text-success fw-bold ms-2 d-none d-md-block">
              MATH GYM
            </Navbar.Brand>
            <Button
              variant="link"
              className="text-decoration-none fw-bold d-flex align-items-center ms-2 d-md-none"
              onClick={toggleSidebar}
              style={{ color: '#333' }}
            >
              <RiMenu3Line size={24} />
            </Button>
          </Col>

          {/* Welcome Message */}
          <Col xs={6} md={5} className="text-center d-none d-md-block">
            <span className="fw-bold">
              Welcome, Admin{' '}
              <span role="img" aria-label="wave">
                👋
              </span>
            </span>
          </Col>

          {/* Action Buttons */}
          <Col xs={6} md={4} className="d-flex justify-content-end align-items-center">
            {/* Notification Button */}
            <Button
              variant="outlined"
              title="Notification"
              className="me-2 d-none d-sm-block"
              onClick={() => window.open("https://mathgymint.com", "_blank")}
            >
              <RiNotification3Line size={20} />
            </Button>

            {/* Website Link */}
            <Button
              variant="outlined"
              title="Website"
              className="me-2 d-none d-sm-block"
              onClick={() => window.open("https://mathgymint.com", "_blank")}
            >
              <RiGlobalLine size={20} />
            </Button>

            {/* Admin Popup Menu */}
            <div className="position-relative" ref={popupRef}>
              <Button
                variant="link"
                onClick={togglePopup}
                className="text-decoration-none fw-bold d-flex align-items-center"
                style={{ color: '#333' }}
              >
                <RiAdminLine size={20} className="me-1" /> Admin
              </Button>
              {showPopup && (
                <div
                  className="position-absolute bg-white border rounded shadow"
                  style={{
                    top: '100%',
                    right: 0,
                    zIndex: 1050,
                    width: '200px',
                  }}
                >
                  <ul className="list-unstyled m-0 p-2">
                    {/* Profile Option */}
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center"
                      onClick={() => alert('Profile feature is coming soon!')}
                      style={menuItemStyle}
                    >
                      <RiLockPasswordLine size={18} className="me-2" /> Profile
                    </li>
                    {/* Update Password */}
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center"
                      onClick={handleUpdatePassword}
                      style={menuItemStyle}
                    >
                      <RiLockPasswordLine size={18} className="me-2" /> Update Password
                    </li>
                    {/* Logout */}
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center"
                      onClick={handleLogout}
                      style={menuItemStyle}
                    >
                      <RiLogoutCircleRLine size={18} className="me-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

// Common menu item styling for hover effects
const menuItemStyle = {
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.2s ease',
};

export default Header;
