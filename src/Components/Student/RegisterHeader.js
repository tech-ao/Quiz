import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import logo from "../../Components/images/Logo.png";
import '../Admin/adminHeader.css';

const RegisterHeader = () => {
  return (
    <Navbar expand="lg" className="header py-2 fixed-header">
      <Container className="d-flex align-items-center w-100">
        {/* Left: Logo */}
        <div className="d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center">
            <img
              className="logo1 me-2 border-dark-green"
              src={logo}
              alt="Logo"
              style={{ 
                cursor: 'pointer', 
                maxWidth: '80px', 
                border: '1px solid #000', 
                borderRadius: '5px' 
              }}
            />
          </Link>
        </div>
        {/* Center: Welcome Text with responsive font size */}
        <div className="flex-grow-1 text-center">
          <span 
            className="fw-bold welcome-message" 
            style={{ fontSize: 'calc(14px + 1vw)' }}
          >
            Welcome MathGym
          </span>
        </div>
        {/* Right: Web Icon in success color */}
        <div className="d-flex align-items-center">
          <a 
            href="https://mathgymint.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="web-icon"
          >
            <FaGlobe size={24} color="#198754" />
          </a>
        </div>
      </Container>
    </Navbar>
  );
};

export default RegisterHeader;
