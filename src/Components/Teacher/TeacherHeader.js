import React from "react";
import { Navbar, Row, Col, Button } from "react-bootstrap";
import { RiMenu3Line, RiGlobalLine, RiNotification3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../Components/images/Logo.png";
import "../Admin/adminHeader.css";

const TeacherHeader = ({ toggleSidebar }) => {
  return (
    <Navbar expand="lg" className="header py-2">
      {/* Desktop Header */}
      <Row className="align-items-center w-100 d-none d-md-flex">
        <Col md={3} className="d-flex align-items-center">
          <Link to="/teacherDashboard">
            <img className="logo1 me-2" src={logo} alt="Math Gym Logo" style={{ cursor: "pointer", maxWidth: "80px", borderRadius: "5px" }} />
          </Link>
        </Col>
        <Col md={5} className="text-center">
          <span className="fw-bold welcome-message">Welcome back, Teacher</span>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center header-icon-group">
          <Button variant="link" title="Notification" className="me-2 action-button">
            <RiNotification3Line size={24} />
          </Button>
          <Button variant="link" title="Website" className="me-2 action-button" onClick={() => window.open("https://mathgymint.com", "_blank") }>
            <RiGlobalLine size={24} />
          </Button>
          <Button variant="link" className="text-decoration-none fw-bold d-flex align-items-center">
            <span className="admin-text">(Teacher Name)</span>
            <img alt="Teacher" className="rounded-circle ms-2" />
          </Button>
        </Col>
      </Row>

      {/* Mobile Header */}
      <Row className="align-items-center w-100 d-flex d-md-none" style={{ padding: "0 5px", justifyContent: "space-between" }}>
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="link" onClick={toggleSidebar} style={{ padding: "0" }}>
            <RiMenu3Line size={24} />
          </Button>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="link" style={{ padding: "5px", marginRight: "10px" }}>
            <RiNotification3Line size={24} />
          </Button>
          <Button variant="link" onClick={() => window.open("https://mathgymint.com", "_blank")} style={{ padding: "0", marginLeft: "10px" }}>
            <RiGlobalLine size={24} />
          </Button>
          <Button variant="link" className="text-decoration-none fw-bold d-flex flex-column align-items-center" style={{ padding: "0", marginLeft: "10px" }}>
            <span className="text-success" style={{ fontSize: "10px", marginTop: "2px" }}>(Teacher Name)</span>
            <img src="https://via.placeholder.com/40" alt="Teacher" className="rounded-circle" />
          </Button>
        </Col>
      </Row>
    </Navbar>
  );
};

export default TeacherHeader;
