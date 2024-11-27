import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { RiLockPasswordLine, RiLogoutCircleRLine, RiAdminLine, RiGlobalLine } from 'react-icons/ri';
import '../../Style.css';

const StudentHeader = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // Toggle popup visibility
  const togglePopup = () => setShowPopup((prev) => !prev);

  // Close popup if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Logout Click
  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  // Handle Update Password Click
  const handleUpdatePassword = () => {
    alert('Redirecting to update password...');
  };

  return (
    <Navbar expand="lg" className="py-2 bg-custom shadow-sm">
      <Container fluid>
        <Row className="align-items-center w-100">
          <Col xs={4} md={3}>
            <Navbar.Brand className="text-success fw-bold">QUIZ</Navbar.Brand>
          </Col>
          <Col xs={4} md={5} className="text-center">
            <span className="fw-bold">Welcome, mahendran</span>{' '}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Col>
          <Col xs={4} md={4} className="d-flex justify-content-end align-items-center">

            <div className="position-relative" ref={popupRef}>
              <Button
                variant="link"
                onClick={togglePopup}
                className="text-decoration-none fw-bold d-flex align-items-center"
                style={{ color: '#333' }}
              >
                <RiAdminLine size={20} className="me-1" /> mahendran
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
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-secondary d-flex align-items-center"
                      onClick={handleUpdatePassword}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                    >

                    </li>
                    <li
                      className="dropdown-item px-3 py-2 fw-bold text-danger d-flex align-items-center"
                      onClick={handleLogout}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
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

export default StudentHeader;
