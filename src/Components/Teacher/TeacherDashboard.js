import React ,{useState ,useEffect}from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';

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
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
          <h2 className="fw-bold mb-4">Teacher Dashboard</h2>
          <Row className="g-4">
            {/* Summary Cards */}
            <Col md={4}>
              <Card className="dashboard-card text-center">
                <Card.Body>
                  <Card.Title>Total Students</Card.Title>
                  <Card.Text className="display-4 fw-bold text-primary">120</Card.Text>
                  <Button variant="primary">View Students</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="dashboard-card text-center">
                <Card.Body>
                  <Card.Title>Pending Assignments</Card.Title>
                  <Card.Text className="display-4 fw-bold text-warning">15</Card.Text>
                  <Button variant="warning">Manage Assignments</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="dashboard-card text-center">
                <Card.Body>
                  <Card.Title>Completed Quizzes</Card.Title>
                  <Card.Text className="display-4 fw-bold text-success">30</Card.Text>
                  <Button variant="success">View Quizzes</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className="dashboard-card">
                <Card.Body>
                  <h5 className="fw-bold">Announcements</h5>
                  <p>Post and manage announcements for students here.</p>
                  <Button variant="info">Go to Announcements</Button>
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
