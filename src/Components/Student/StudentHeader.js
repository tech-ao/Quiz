import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine, RiAdminLine, RiGlobalLine } from 'react-icons/ri';
import '../../Style.css';
import logo from "../../Components/images/Logo.png";

const StudentHeader = ({ studentName }) => {
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
      navigate("/");
    }
  };

  return (
    <Navbar expand="lg" className="header py-2">
      <Container>
        <Row className="align-items-center w-100">
          {/* Logo Section */}
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
          </Col>

          {/* Centered Empty Space */}
          <Col md={5} className="d-none d-md-block text-center"></Col>

          {/* Action Buttons and User Info */}
          <Col xs={6} md={4} className="d-flex justify-content-end align-items-center">
            {/* Website Button */}
            <Button
              variant="outline-success"
              className="me-3 text-decoration-none"
              onClick={() => window.open("https://mathgymint.com", "_blank")}
            >
              <RiGlobalLine size={20} className="me-1" /> Website
            </Button>

            {/* User Info Dropdown */}
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
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = '#f8f9fa')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = '')
                      }
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
