import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';
import './TeacherSettings.css';
import { getStudent } from '../../redux/Services/api'; // Import the getStudent function

const TeacherSettings = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [adminData, setAdminData] = useState(null); // State for admin data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

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

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        // Fetch admin data via getStudent API
        const adminResponse = await getStudent(1); // Adjust this if you need to pass an ID
        setAdminData(adminResponse.data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  
  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="mb-4">
              <Col md={8}>
                <h2 className="fw-bold">Teacher Settings</h2>
              </Col>
            </Row>
            <Row className='Admin-Name-row'>
              <Col md={6} className='Admin-Name-row'>
                <Card className="admin-card">
                  <Card.Header className="card-header">Teacher Details</Card.Header>
                  <Card.Body>
                    <Card.Title>Teacher Name</Card.Title>
                    <Card.Text>
                      Email: {adminData?.email || "N/A"} {/* Display fetched email */}
                    </Card.Text>
                    <Card.Text>
                      Phone: {adminData?.phone || "N/A"} {/* Display fetched phone */}
                    </Card.Text>
                    <Card.Text>
                      Role: {adminData?.role || "N/A"} {/* Display fetched role */}
                    </Card.Text>
                    <Button variant="success" className="mt-3">Edit Details</Button>
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

export default TeacherSettings;
