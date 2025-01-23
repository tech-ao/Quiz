import React from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { RiMenu3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from "../../Components/images/Logo.png";
import '../Admin/adminHeader.css';

const RegisterHeader = ({ toggleSidebar }) => {
  return (
    <Navbar expand="lg" className="header py-2">
    
        <Row className="align-items-center w-100">
          {/* Logo and Sidebar Toggle */}
          <Col xs={6} md={3} className="d-flex align-items-center">
            <Link to="/">
              <img
                className="logo1 me-2"
                src={logo}
                alt="Logo"
                style={{ cursor: 'pointer', maxWidth: '80px' }}
              />
            </Link>
            <Button
              variant="link"
              className="text-decoration-none fw-bold d-flex align-items-center ms-2 d-md-none toggle-button header-icon"
              onClick={toggleSidebar}
            >
              <RiMenu3Line size={24} />
            </Button>
          </Col>
        </Row>
    
    </Navbar>
  );
};

export default RegisterHeader;
