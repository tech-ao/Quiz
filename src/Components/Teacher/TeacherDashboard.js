import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUsers, FaTasks, FaClipboardCheck, FaBullhorn } from "react-icons/fa";
import TeacherSidePanel from "./TeacherSidepannel";
import AdminHeader from "../Admin/AdminHeader";

const TeacherDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <h2 className="fw-bold mb-4">Teacher Dashboard</h2>
            
            {/* First row of cards */}
            <Row className="g-4 dashboard-card-container">
              <Col md={6} lg={3} className="d-flex">
                <Card className="dashboard-card flex-grow-1">
                  <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                    <div className="dashboard-card-header">
                      <FaUsers className="dashboard-icon text-primary" />
                      <span className="dashboard-title">Total Students</span>
                    </div>
                    <Card.Text className="display-4 fw-bold text-primary">120</Card.Text>
                    <Button variant="primary" className="dashboard-button">View Students</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} className="d-flex">
                <Card className="dashboard-card flex-grow-1">
                  <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                    <div className="dashboard-card-header">
                      <FaTasks className="dashboard-icon text-warning" />
                      <span className="dashboard-title">Pending Assignments</span>
                    </div>
                    <Card.Text className="display-4 fw-bold text-warning">15</Card.Text>
                    <Button variant="warning" className="dashboard-button">Manage Assignments</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} className="d-flex">
                <Card className="dashboard-card flex-grow-1">
                  <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                    <div className="dashboard-card-header">
                      <FaClipboardCheck className="dashboard-icon text-success" />
                      <span className="dashboard-title">Completed Quizzes</span>
                    </div>
                    <Card.Text className="display-4 fw-bold text-success">30</Card.Text>
                    <Button variant="success" className="dashboard-button">View Quizzes</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} className="d-flex">
                <Card className="dashboard-card flex-grow-1">
                  <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                    <div className="dashboard-card-header">
                      <FaBullhorn className="dashboard-icon text-info" />
                      <span className="dashboard-title">Announcements</span>
                    </div>
                    <Card.Text>Post updates for your students.</Card.Text>
                    <Button variant="info" className="dashboard-button">Go to Announcements</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Upcoming Classes Section */}
            <h4 className="fw-bold mt-4 mb-3">Upcoming Classes</h4>
            <div className="d-flex flex-wrap gap-3 upcoming-classes-container">
              <Card className="class-card large-class-card">
                <Card.Body>
                  <Card.Title>Math Class</Card.Title>
                  <Card.Text>Date: 16th Jan | Time: 10:00 AM</Card.Text>
                </Card.Body>
              </Card>
              <Card className="class-card large-class-card">
                <Card.Body>
                  <Card.Title>Science Class</Card.Title>
                  <Card.Text>Date: 17th Jan | Time: 12:00 PM</Card.Text>
                </Card.Body>
              </Card>
              <Card className="class-card large-class-card">
                <Card.Body>
                  <Card.Title>English Class</Card.Title>
                  <Card.Text>Date: 18th Jan | Time: 9:00 AM</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;
