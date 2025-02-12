import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import StudentHeader from './StudentHeader';
import SidePannel from './StudnetSidebar';
import '../Teacher/OnlineClassShedule.css'; // Custom CSS for styling

// Sample class data
const classSchedule = [
  { 
    id: 1, 
    name: 'Mathematics 101', 
    date: '2024-12-01', 
    time: '10:00 AM', 
    duration: '1 hour', 
    instructor: 'Mr. Smith', 
    meetLink: 'https://meet.google.com/example1' 
  },
  { 
    id: 2, 
    name: 'English Literature', 
    date: '2024-12-02', 
    time: '11:00 AM', 
    duration: '1.5 hours', 
    instructor: 'Ms. Johnson', 
    meetLink: 'https://meet.google.com/example2' 
  },
  { 
    id: 3, 
    name: 'Physics 201', 
    date: '2024-12-03', 
    time: '01:00 PM', 
    duration: '2 hours', 
    instructor: 'Dr. Lee', 
    meetLink: 'https://meet.google.com/example3' 
  },
  { 
    id: 4, 
    name: 'Computer Science', 
    date: '2024-12-04', 
    time: '02:00 PM', 
    duration: '1 hour 30 minutes', 
    instructor: 'Prof. Brown', 
    meetLink: 'https://meet.google.com/example4' 
  },
];

const StudentOnlineClass = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Header with Sidebar Toggle */}
      <StudentHeader toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {isSidebarVisible && <SidePannel />}

        <Container className="main-container p-4 ">
          <div className="sub-container">
            {/* Updated Title aligned to the left */}
            <Row className="mb-4">
              <Col>
                <h2 className="fw-bold">Assigned Classes</h2>
              </Col>
            </Row>
            <Row>
              {classSchedule.map((cls) => (
                <Col md={6} lg={4} key={cls.id} className="mb-4">
                  <Card className="schedule-card">
                    <Card.Body>
                      <Card.Title className="text-success">{cls.name}</Card.Title>
                      <Card.Text>
                        <strong>Date:</strong> {cls.date} <br />
                        <strong>Time:</strong> {cls.time} <br />
                        <strong>Duration:</strong> {cls.duration} <br />
                        <strong>Instructor:</strong> {cls.instructor} <br />
                        <strong>Google Meet:</strong> <br />
                        <a href={cls.meetLink} target="_blank" rel="noopener noreferrer" className="text-success">
                          Join Meeting
                        </a>
                      </Card.Text>
                      <Button variant="success" onClick={() => alert(`Viewing details for ${cls.name}`)}>
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentOnlineClass;
