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
  RiMenu3Line,
} from 'react-icons/ri';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './adminHeader.css';
import logo from "../../Components/images/Logo.png";

const Header = ({ toggleSidebar }) => {
  const ICON_SIZE = 30;

  // Use a default empty object if state.admin is undefined.
  const { selectedAdmin } = useSelector((state) => state.admin || {});
  const adminFullName = selectedAdmin?.data
    ? `${selectedAdmin.data.firstName} ${selectedAdmin.data.lastName}`
    : "Admin";

  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Separate refs for desktop and mobile popup menus.
  const desktopPopupRef = useRef(null);
  const mobilePopupRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Use a ref to track previous pathname so that we only auto-collapse when the route changes.
  const prevPathnameRef = useRef(location.pathname);

  // Toggle the admin popup menu.
  const togglePopup = () => setShowPopup(prev => !prev);

  // Click-outside handler for the popup.
  useEffect(() => {
    const handleClickOutside = (event) => {
      const desktopClicked =
        desktopPopupRef.current && desktopPopupRef.current.contains(event.target);
      const mobileClicked =
        mobilePopupRef.current && mobilePopupRef.current.contains(event.target);
      if (!desktopClicked && !mobileClicked) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // When the location changes (e.g. a sidebar item is clicked), collapse the mobile header and hide the sidebar.
  useEffect(() => {
    if (location.pathname !== prevPathnameRef.current) {
      if (isMobileExpanded && toggleSidebar) {
        toggleSidebar(); // Hide the sidebar.
      }
      setIsMobileExpanded(false);
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, isMobileExpanded, toggleSidebar]);

  // Handlers for logout, update password, and profile.
  const handleLogoutClick = () => {
    setShowPopup(false);
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    navigate('/adminlogin');
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleUpdatePassword = () => {
    alert('Redirecting to change password...');
    navigate('/reset-password');
  };

  const handleProfile = () => {
    navigate('/adminSettings');
  };

  // Hamburger click toggles the mobile header state and calls toggleSidebar.
  const handleHamburgerClick = () => {
    const newState = !isMobileExpanded;
    setIsMobileExpanded(newState);
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <Navbar expand="lg" className="header py-2">
      {/* ===== Desktop Header ===== */}
      <Row className="align-items-center w-100 d-none d-md-flex">
        <Col md={3} className="d-flex align-items-center">
          <Link to="/adminDashboard">
            <img
              className="logo1 me-2 border-dark-green"
              src={logo}
              alt="Math Gym Logo"
              style={{ 
                cursor: 'pointer', 
                maxWidth: '80px', 
                border: '1px solid #000', 
                borderRadius: '5px' 
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
        <Col md={4} className="d-flex justify-content-end align-items-center">
          <div className="admin-icon" style={{ display: 'flex', alignItems: 'center' }}>
            <button
              title="Notification"
              className="d-sm-block action-button"
              onClick={() => navigate('/notification')}
              style={{ background: 'none', border: 'none' }}
            >
              <Badge
                badgeContent={10}
                color="secondary"
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                className="notification-badge"
              >
                <RiNotification3Line size={ICON_SIZE} />
              </Badge>
            </button>
            <Button
              variant="outlined"
              title="Website"
              className="me-2 d-sm-block action-button"
              onClick={() => window.open('https://mathgymint.com', '_blank')}
            >
              <RiGlobalLine size={ICON_SIZE} />
            </Button>
            <div className="position-relative" ref={desktopPopupRef}>
              <button
                variant="link"
                onClick={togglePopup}
                style={{ background: 'none', border: 'none' }}
              >
                <span className="admin-text">
                  <RiAdminLine size={ICON_SIZE} className="me-1" />
                  <br />
                  Admin
                </span>
              </button>
              {showPopup && (
                <div className="admin-popup">
                  <ul className="list-unstyled m-0 p-2">
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                      onClick={handleProfile}
                    >
                      <RiLockPasswordLine size={ICON_SIZE} className="me-2" /> Profile
                    </li>
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                      onClick={handleUpdatePassword}
                    >
                      <RiRestartLine size={ICON_SIZE} className="me-2" /> Password
                    </li>
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
                      onClick={handleLogoutClick}
                    >
                      <RiLogoutCircleRLine size={ICON_SIZE} className="me-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* ===== Mobile Header ===== */}
      <Row
        className="align-items-center w-100 d-flex d-md-none"
        style={{ padding: '0 10px', justifyContent: 'space-between' }}
      >
        {/* Left Group: Hamburger icon, and if expanded, show logo */}
        <Col xs="auto" className="d-flex align-items-center" style={{ flexShrink: 0 }}>
          {isMobileExpanded && (
            <Link to="/adminDashboard">
              <img
                className="logo1 me-2 border-dark-green"
                src={logo}
                alt="Math Gym Logo"
                style={{
                  cursor: 'pointer',
                  maxWidth: '60px',
                  border: '1px solid #000',
                  borderRadius: '5px'
                }}
              />
            </Link>
          )}
          <Button
            variant="link"
            onClick={handleHamburgerClick}
            style={{ padding: '0' }}
          >
            <RiMenu3Line size={ICON_SIZE} />
          </Button>
        </Col>

        {/* Right Group: Action Icons (always visible and consistently sized) */}
        <Col xs="auto" className="d-flex align-items-center" style={{ flexShrink: 0 }}>
          <Button
            variant="link"
            onClick={() => navigate('/notification')}
            style={{ padding: '10px' }}
          >
            <Badge
              badgeContent={10}
              color="secondary"
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <RiNotification3Line size={ICON_SIZE} />
            </Badge>
          </Button>
          <Button
            variant="link"
            onClick={() => window.open('https://mathgymint.com', '_blank')}
            style={{ padding: '0', marginLeft: '10px' }}
          >
            <RiGlobalLine size={ICON_SIZE} />
          </Button>
          <div
            className="position-relative"
            ref={mobilePopupRef}
            style={{ marginLeft: '10px' }}
          >
            <Button
              variant="link"
              onClick={togglePopup}
              className="text-decoration-none fw-bold d-flex flex-column align-items-center"
              style={{ padding: '0' }}
            >
              <RiAdminLine size={ICON_SIZE} />
              <span className="text-success" style={{ fontSize: '10px', marginTop: '2px' }}>
                Admin
              </span>
            </Button>
            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={handleProfile}
                  >
                    <RiLockPasswordLine size={ICON_SIZE} className="me-2" /> Profile
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={handleUpdatePassword}
                  >
                    <RiRestartLine size={ICON_SIZE} className="me-2" /> Password
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
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

      {/* ===== Logout Confirmation Popup ===== */}
      {showLogoutConfirm && (
        <div className="logout-confirmation-popup">
          <div className="popup-content">
            <h5>Are you sure you want to logout?</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <Button variant="danger" style={{ width: '100%' }} onClick={handleLogout}>Yes</Button>
              <Button variant="secondary" style={{ width: '100%' }} onClick={handleCancelLogout}>No</Button>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default Header;