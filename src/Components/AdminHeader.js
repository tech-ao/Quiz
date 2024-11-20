import React from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import '../Style.css'
import { FaUser, FaCoins, FaBell, FaGift } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar expand="lg" className="py-2 bg-custom">
      <Container fluid>
        <Row className="align-items-center w-100">
          <Col xs={4} md={3}>
            <Navbar.Brand className="text-success fw-bold">QUIZ</Navbar.Brand>
          </Col>
          <Col xs={4} md={5} className="text-center">
            <span className="fw-bold">Welcome, Admin</span> <span role="img" aria-label="wave">👋</span>
          </Col>
          <Col xs={4} md={4} className="d-flex justify-content-end align-items-center">
            
          <Col md={6} className="d-flex justify-content-end gap-3">
          <Button variant="link">🌐 Website</Button>
          <Button variant="link">👤 Admin</Button>
          
        </Col>
            {/* <div className="icon-btn me-2">
              <FaBell size={20} />
            </div> */}
            
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
