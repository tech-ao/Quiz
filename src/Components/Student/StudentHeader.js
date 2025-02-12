import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@mui/material';
import { Navbar, Row, Col, Button } from 'react-bootstrap';
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
import logo from "../../Components/images/Logo.png";
import '../Admin/adminHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudent } from '../../redux/Action/StudentAction';

const StudentHeader = ({ toggleSidebar }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve student data from the "students" slice as used in the dashboard.
  const { selectedStudent } = useSelector((state) => state.students);
  // Get the student name from the data (no fallback text).
  const studentName = selectedStudent?.data?.firstName || "";

  const togglePopup = () => setShowPopup((prev) => !prev);

  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    if (storedStudentId) {
      dispatch(fetchStudent(storedStudentId));
    }

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentId');
    navigate('/');
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleUpdatePassword = () => {
    alert('Redirecting to update password...');
    navigate('/update-password');
  };

  return (
    <Navbar expand="lg" className="header py-2">
      {/* Desktop Header: Visible on medium screens and above */}
      <Row className="align-items-center w-100 d-none d-md-flex">
        <Col md={3} className="d-flex align-items-center">
          <Link to="/studentDashboard">
            <img
              className="logo1 me-2"
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
            Welcome, {studentName}
            <span role="img" aria-label="wave"> 👋</span>
          </span>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center header-icon-group">
          <Button
            variant="outlined"
            title="Notification"
            className="me-2 action-button"
            onClick={() => navigate('/')}
          >
            <Badge
              badgeContent={10}
              color="secondary"
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              className="notification-badge"
            >
              <RiNotification3Line size={20} />
            </Badge>
          </Button>
          <Button
            variant="outlined"
            title="Website"
            className="me-2 action-button"
            onClick={() => window.open('https://mathgymint.com', '_blank')}
          >
            <RiGlobalLine size={20} />
          </Button>
          <div className="position-relative" ref={popupRef}>
            <Button
              variant="link"
              onClick={togglePopup}
              className="text-decoration-none fw-bold d-flex align-items-center admin-menu admin-text"
            >
              <RiAdminLine size={20} className="me-1" />
              <span className="admin-text">{studentName}</span>
            </Button>
            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate('/studentSettings')}
                  >
                    <RiLockPasswordLine size={18} className="me-2" /> Profile
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={handleUpdatePassword}
                  >
                    <RiRestartLine size={18} className="me-2" /> Password
                  </li>
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
        </Col>
      </Row>

      {/* Mobile Header: Visible on small screens */}
      <Row
        className="align-items-center w-100 d-flex d-md-none"
        style={{ padding: '0 5px', justifyContent: 'space-between' }}
      >
        {/* Left Group: Logo and Hamburger Icon */}
        <Col xs="auto" className="d-flex align-items-center">
          <Link to="/studentDashboard">
            <img
              className="logo1"
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
          <Button
            variant="link"
            onClick={toggleSidebar}
            style={{ padding: '0', marginLeft: '10px' }}
          >
            <RiMenu3Line size={20} />
          </Button>
        </Col>

        {/* Right Group: Notification, Website, and Student Profile Icons */}
        <Col xs="auto" className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={() => navigate('/')}
            style={{ padding: '10' }}
          >
            <Badge
              badgeContent={10}
              color="secondary"
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <RiNotification3Line size={18} />
            </Badge>
          </Button>
          <Button
            variant="link"
            onClick={() => window.open('https://mathgymint.com', '_blank')}
            style={{ padding: '0', marginLeft: '10px' }}
          >
            <RiGlobalLine size={18} />
          </Button>
          <div className="position-relative" style={{ marginLeft: '10px' }}>
            <Button
              variant="link"
              onClick={togglePopup}
              className="text-decoration-none fw-bold d-flex flex-column align-items-center"
              style={{ padding: '0' }}
            >
              <RiAdminLine size={18} />
              <span
                className="text-success"
                style={{ fontSize: '10px', marginTop: '2px' }}
              >
                {studentName}
              </span>
            </Button>
            {showPopup && (
              <div className="admin-popup">
                <ul className="list-unstyled m-0 p-2">
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={() => navigate('/studentSettings')}
                  >
                    <RiLockPasswordLine size={16} className="me-2" /> Profile
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center menu-item"
                    onClick={handleUpdatePassword}
                  >
                    <RiRestartLine size={16} className="me-2" /> Password
                  </li>
                  <li
                    className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center menu-item"
                    onClick={handleLogoutClick}
                  >
                    <RiLogoutCircleRLine size={16} className="me-2" /> Logout
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
              width: '300px',
              margin: '0 auto',
              padding: '20px',
              background: '#fff',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <h5>Are you sure you want to logout?</h5>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '15px'
              }}
            >
              <Button variant="danger" style={{ width: '100%' }} onClick={handleLogout}>
                Yes
              </Button>
              <Button variant="secondary" style={{ width: '100%' }} onClick={handleCancelLogout}>
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default StudentHeader;
