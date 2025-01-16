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
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true); // Show sidebar by default on desktop
      } else {
        setIsSidebarVisible(false); // Hide sidebar by default on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container  className="main-container p-4 min-vh-100">
        <div className="sub-container">
          <Row>
            <Col lg={9}>
              <h2 className="fw-bold mb-4">Teacher Dashboard</h2>
              <Row className="g-4">
                {/* Summary Cards */}
                <Col md={6} lg={3}>
                  <Card className="dashboard-card">
                    <Card.Body>
                      <FaUsers size={40} className="text-primary mb-3" />
                      <Card.Title>Total Students</Card.Title>
                      <Card.Text className="display-4 fw-bold text-primary">120</Card.Text>
                      <Button variant="primary">View Students</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="dashboard-card ">
                    <Card.Body>
                      <FaTasks size={40} className="text-warning mb-3" />
                      <Card.Title>Pending Assignments</Card.Title>
                      <Card.Text className="display-4 fw-bold text-warning">15</Card.Text>
                      <Button variant="warning">Manage Assignments</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="dashboard-card text-center">
                    <Card.Body>
                      <FaClipboardCheck size={40} className="text-success mb-3" />
                      <Card.Title>Completed Quizzes</Card.Title>
                      <Card.Text className="display-4 fw-bold text-success">30</Card.Text>
                      <Button variant="success">View Quizzes</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="dashboard-card text-center">
                    <Card.Body>
                      <FaBullhorn size={40} className="text-info mb-3" />
                      <Card.Title>Announcements</Card.Title>
                      <Card.Text>Post updates for your students.</Card.Text>
                      <Button variant="info">Go to Announcements</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            {/* Upcoming Classes Section */}
            <Col lg={3}>
              <h4 className="fw-bold mb-4">Upcoming Classes</h4>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Math Class</Card.Title>
                  <Card.Text>Date: 16th Jan | Time: 10:00 AM</Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Science Class</Card.Title>
                  <Card.Text>Date: 17th Jan | Time: 12:00 PM</Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>English Class</Card.Title>
                  <Card.Text>Date: 18th Jan | Time: 9:00 AM</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;
