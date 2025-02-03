import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import logo from "../../Components/images/Logo.png";
import '../Admin/adminHeader.css';

const RegisterHeader = () => {
  return (
    <Navbar expand="lg" className="header py-2 fixed-header">
      <Container className="d-flex justify-content-between align-items-center w-100">
        {/* Logo with Dark Green Border */}
        <Link to="/" className="d-flex align-items-center">
          <img
            className="logo1 me-2 border-dark-green"
            src={logo}
            alt="Logo"
            style={{ cursor: 'pointer', maxWidth: '80px' }}
          />
        </Link>
        
        {/* Web Icon properly aligned to the top right */}
        <a href="https://mathgymint.com/" target="_blank" rel="noopener noreferrer" className="web-icon">
          <FaGlobe size={24} color="#000" />
        </a>
      </Container>
    </Navbar>
  );
};

export default RegisterHeader;
