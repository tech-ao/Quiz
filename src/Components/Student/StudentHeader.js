import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { RiLogoutCircleRLine, RiAdminLine, RiGlobalLine } from 'react-icons/ri';
import '../../Style.css';
import logo from "../../Components/images/Logo.png";
import { useNavigate } from 'react-router-dom';

const StudentHeader = ({studentName }) => {
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
    alert('are you sure want to logout');
    navigate("/")
  };


  return (
    <Navbar expand="lg" className="header">
      <Container fluid>
        <Row className="align-items-center w-100">
          <Col xs={6} md={3} className="d-flex align-items-center">
            <img className="logo1 me-2" src={logo} alt="Math Gym Logo" style={{ width: '50px', height: '50px' }} />
            <Navbar.Brand className="text-success fw-bold">MATH GYM</Navbar.Brand>
          </Col>
          <Col md={5} className="d-none d-md-block text-center"></Col>
          <Col xs={6} md={4} className="d-flex justify-content-end align-items-center">
            <Button
              variant="outline-success"
              className="me-3 text-decoration-none"
              onClick={() => window.location.href = "https://mathgymint.com"}
            >
              <RiGlobalLine size={20} className="me-1" /> Website
            </Button>
            <div className="position-relative" ref={popupRef}>
              <Button
                variant="link"
                onClick={togglePopup}
                className="text-decoration-none fw-bold d-flex align-items-center"
                style={{ color: '#333' }}
              >
                <RiAdminLine size={20} className="me-1" /> {studentName}
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
