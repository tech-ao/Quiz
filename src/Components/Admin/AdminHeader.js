import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@mui/material';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiAdminLine,
  RiGlobalLine,
  RiMenu3Line,
  RiRestartLine,
} from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';
import './adminHeader.css'; // Import media query styles
import logo from "../../Components/images/Logo.png";

const Header = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/adminlogin');
    }
  };

  const handleUpdatePassword = () => {
    alert('Redirecting to update password...');
    navigate('/update-password');
  };

  return (
    <Navbar expand="lg" className="header py-2">

      <Row className="align-items-center w-100">
        {/* Logo and Sidebar Toggle */}
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
          <Button
            variant="link"
            className="text-decoration-none fw-bold d-flex align-items-center taggleAdminbut ms-2 d-md-none toggle-button header-icon"
            onClick={toggleSidebar}
          >
            <RiMenu3Line size={24} />
          </Button>
        </Col>

        {/* Welcome Message */}
        <Col xs={12} md={5} className="text-center d-none d-md-block">
          {/* <span className="fw-bold welcome-message">
            Admin{' '}
            <span role="img" aria-label="wave">
              👋
            </span>
          </span> */}
        </Col>

        {/* Action Buttons */}
        <Col xs={6} md={4} className="d-flex justify-content-end align-items-center header-icon-group">
          {/* Notification Button */}
          <Button
            variant="outlined"
            title="Notification"
            className="me-2 d-sm-block action-button"
            onClick={() => navigate('/notification')}
          >
            <Badge
              badgeContent={10} // Replace with dynamic count if available
              color="secondary"
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className="notification-badge"
            >
              <RiNotification3Line size={20} />
            </Badge>
          </Button>

          {/* Website Link */}
          <Button
            variant="outlined"
            title="Website"
            className="me-2 d-sm-block action-button"
            onClick={() => window.open("https://mathgymint.com", "_blank")}
          >
            <RiGlobalLine size={20} />
          </Button>

          {/* Admin Popup Menu */}
          <div className="position-relative" ref={popupRef}>
            <Button
              variant="link"
              onClick={togglePopup}
              className="text-decoration-none fw-bold d-flex align-items-center admin-menu admin-text"
            >
              <RiAdminLine size={20} className="me-1" />
              <span className="admin-text">Admin</span>
            </Button>

            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  {/* Profile Option */}
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => alert('Profile feature is coming soon!')}
                  >
                    <RiLockPasswordLine size={18} className="me-2" /> Profile
                  </li>
                  {/* Update Password */}
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={handleUpdatePassword}
                  >
                    {/* <i className="bi bi-arrow-clockwise ms-auto"></i> Reset Icon */}
                    <RiRestartLine size={18} className="me-2"/> Password
                    {/* <span className="me-2">Password</span> */}
                  </li>
                  {/* Logout */}
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
                    onClick={handleLogout}
                  >
                    <RiLogoutCircleRLine size={18} className="me-2" /> Logout
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

export default Header;
