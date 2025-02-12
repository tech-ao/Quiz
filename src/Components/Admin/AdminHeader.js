import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@mui/material';
import { Navbar, Row, Col, Button } from 'react-bootstrap';
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiAdminLine,
  RiGlobalLine,
  RiRestartLine,
} from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';
import './adminHeader.css'; // Import media query styles
import logo from "../../Components/images/Logo.png";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Logout confirmation popup
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const togglePopup = () => setShowPopup((prev) => !prev);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show logout confirmation popup
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Logout handler
  const handleLogout = () => {
    navigate('/adminlogin');
    setShowLogoutConfirm(false); 
  };

  // Cancel logout
  const handleCancelLogout = () => {
    setShowLogoutConfirm(false); 
  };

  // Update password handler
  const handleUpdatePassword = () => {
    alert('Redirecting to change password...');
    navigate('/reset-password');
  };

  // Profile handler (without alert)
  const handleProfile = () => {
    navigate('/adminSettings');
  };

  return (
    <Navbar expand="lg" className="header py-2">
      <Row className="align-items-center w-100">
        {/* Logo */}
        <Col xs={6} md={3} className="d-flex align-items-center">
          <Link to="/adminDashboard">
            <img
              className="logo1 me-2"
              src={logo}
              alt="Math Gym Logo"
              style={{ cursor: 'pointer', maxWidth: '80px' }}
            />
          </Link>
          <Navbar.Brand className="text-success fw-bold ms-2 d-none d-md-block">
            MATH GYM
          </Navbar.Brand>
        </Col>

        {/* Welcome Message */}
        <Col xs={12} md={5} className="text-center d-none d-md-block">
          {/* Optional welcome message */}
        </Col>

        {/* Action Buttons */}
        <Col xs={6} md={4} className="d-flex justify-content-end align-items-center" style={{ paddingLeft: '270px' }}>
          <div className="admin-icon" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

            {/* Notification Button */}
            <button
              variant="outlined"
              title="Notification"
              className="d-sm-block action-button"
              onClick={() => navigate('/notification')}
            >
              <Badge
                badgeContent={10}
                color="secondary"
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                className="notification-badge"
              >
                <RiNotification3Line className="admin-text" size={20} />
              </Badge>
            </button>

            {/* Website Link */}
            <Button
              variant="outlined"
              title="Website"
              className="me-2 d-sm-block action-button"
              onClick={() => window.open('https://mathgymint.com', '_blank')}
            >
              <RiGlobalLine className="admin-text" size={20} />
            </Button>

            {/* Admin Popup Menu */}
            <div className="position-relative" ref={popupRef}>
              <button variant="link" onClick={togglePopup}>
                <span className="admin-text">
                  <RiAdminLine size={20} className="me-1 admin-text" /><br/>Admin
                </span>
              </button>

              {showPopup && (
                <div className="admin-popup">
                  <ul className="list-unstyled m-0 p-2">
                    {/* Profile Option */}
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                      onClick={handleProfile}
                    >
                      <RiLockPasswordLine size={18} className="me-2" /> Profile
                    </li>
                    {/* Update Password */}
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                      onClick={handleUpdatePassword}
                    >
                      <RiRestartLine size={18} className="me-2" /> Password
                    </li>
                    {/* Logout */}
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
                      onClick={handleLogoutClick}
                    >
                      <RiLogoutCircleRLine size={18} className="me-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="logout-confirmation-popup">
          <div className="popup-content">
            <h5>Are you sure you want to logout?</h5>
            <Button variant="danger" onClick={handleLogout}>Yes</Button>
            <Button variant="secondary" onClick={handleCancelLogout}>No</Button>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
