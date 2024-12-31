import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';
import './OnlineClassShedule.css'; // Custom CSS for styling

// Sample class data
const classSchedule = [
  { id: 1, name: 'Mathematics 101', date: '2024-12-01', time: '10:00 AM', instructor: 'Mr. Smith' },
  { id: 2, name: 'English Literature', date: '2024-12-02', time: '11:00 AM', instructor: 'Ms. Johnson' },
  { id: 3, name: 'Physics 201', date: '2024-12-03', time: '01:00 PM', instructor: 'Dr. Lee' },
  { id: 4, name: 'Computer Science', date: '2024-12-04', time: '02:00 PM', instructor: 'Prof. Brown' },
];

const ClassSchedule = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [newClass, setNewClass] = useState({
    name: '',
    date: '',
    time: '',
    instructor: '',
  });

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new class to schedule (you can integrate an API to save it)
    console.log('New class scheduled:', newClass);
    alert(`New class scheduled: ${newClass.name}`);
  };

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            {/* Teacher's New Class Schedule Form */}
            <h2 className="text-center mb-4">Schedule New Class</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Class Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newClass.name}
                    onChange={handleChange}
                    placeholder="Enter Class Name"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Instructor</Form.Label>
                  <Form.Control
                    type="text"
                    name="instructor"
                    value={newClass.instructor}
                    onChange={handleChange}
                    placeholder="Enter Instructor Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newClass.date}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={newClass.time}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Button variant="success" type="submit">
                Schedule Class
              </Button>
            </Form>

            {/* Class Schedule List */}
            <h2 className="text-center mb-4 mt-5">Class Schedule</h2>
            <Row>
              {classSchedule.map((cls) => (
                <Col md={6} lg={4} key={cls.id} className="mb-4">
                  <Card className="schedule-card">
                    <Card.Body>
                      <Card.Title>{cls.name}</Card.Title>
                      <Card.Text>
                        <strong>Date:</strong> {cls.date}
                        <br />
                        <strong>Time:</strong> {cls.time}
                        <br />
                        <strong>Instructor:</strong> {cls.instructor}
                      </Card.Text>
                      <Button variant="primary" onClick={() => alert(`Joining ${cls.name}`)}>
                        Join Class
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

export default ClassSchedule;
