import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import StudentHeader from './StudentHeader'; 
import Sidebar from './StudnetSidebar'; 
import { getProfileData } from '../../redux/Action/ProfileAction';
import { getStudent } from '../../redux/Services/api';
import './StudentNotification.css';

const StudentNotification = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Sidebar visibility state
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
   useEffect(() => {
     const handleResize = () => {
       setIsSidebarVisible(window.innerWidth >= 768);
     };
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);
  // Student data and state management
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || '');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle sidebar toggle with localStorage
  const toggleSidebar = () => {
    const newVisibility = !isSidebarVisible;
    setIsSidebarVisible(newVisibility);
    localStorage.setItem('isSidebarVisible', newVisibility);
  };

  // Sync studentId from location.state or localStorage
  useEffect(() => {
    const newStudentId = location.state?.userData?.studentId || localStorage.getItem('studentId');
    if (newStudentId && newStudentId !== studentId) {
      setStudentId(newStudentId);
      localStorage.setItem('studentId', newStudentId);
    }
  }, [location.state, studentId]);

  // Fetch student data when studentId updates
  useEffect(() => {
    if (!studentId) {
      setError('Student ID is missing');
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentResponse = await getStudent(studentId);
        setStudentData(studentResponse.data);
        dispatch(getProfileData(studentId));
      } catch (error) {
        setError(error.message || 'Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [studentId, dispatch]);

  // Handle window resize for sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      const shouldShowSidebar = window.innerWidth >= 768;
      setIsSidebarVisible(shouldShowSidebar);
      localStorage.setItem('isSidebarVisible', shouldShowSidebar);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar studyModeId={studentData?.studyModeId}/>}
        <Container className="main-container p-4 min-vh-100">
          <div className="sticky-header">
            <Row className="mb-4">
              <Col>
                <h2 className="fw-bold">Notifications</h2>
              </Col>
            </Row>
          </div>

          {loading && <Spinner animation="border" variant="primary" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && !error && studentData && (
            <div className="sub-container">
              <Row>
                {[...Array(5)].map((_, index) => (
                  <Col md={12} key={index} className="mb-3">
                    <Card className="shadow-sm notification-card" style={{ width: '95%' }}>
                      <Card.Body className="d-flex align-items-center justify-content-between">
                        <div>
                          <h5 className="fw-bold">
                            Notification Title {index + 1}
                          </h5>
                          <p className="text-muted">
                            This is a placeholder for notification content. Details of the notification will be displayed here.
                          </p>
                        </div>
                        <Button variant="success" className="btn-sm">
                          View
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default StudentNotification;
