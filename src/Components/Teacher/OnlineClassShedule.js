import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';
import './OnlineClassShedule.css'; // Custom CSS for styling

const ClassSchedule = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [newClass, setNewClass] = useState({
    name: '',
    date: '',
    time: '',
    instructor: '',
  });
  const [classSchedule, setClassSchedule] = useState([]);

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
    if (!newClass.name || !newClass.date || !newClass.time || !newClass.instructor) {
      alert('Please fill in all fields');
      return;
    }
    
    const newClassData = {
      id: classSchedule.length + 1,
      name: newClass.name,
      instructor: newClass.instructor,
      date: newClass.date,
      time: newClass.time,
    };

    setClassSchedule([...classSchedule, newClassData]);
    setNewClass({ name: '', date: '', time: '', instructor: '' });
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <h2 className="text-center mb-4">Schedule New Class</h2>
            <Form onSubmit={handleSubmit} className="text-center">
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label><strong>Class Name</strong></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newClass.name}
                    onChange={handleChange}
                    placeholder="Enter Class Name"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label><strong>Instructor</strong></Form.Label>
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
                  <Form.Label><strong>Date</strong></Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newClass.date}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label><strong>Time</strong></Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={newClass.time}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Button variant="success" type="submit" className="d-block mx-auto">
                Schedule Class
              </Button>
            </Form>

            <h2 className="text-center mb-4 mt-5">Class Schedule</h2>
            {classSchedule.length === 0 ? (
              <p className="text-center text-muted">No classes available</p>
            ) : (
              <Row>
                {classSchedule.map((cls) => (
                  <Col md={6} lg={4} key={cls.id} className="mb-4 d-flex justify-content-center">
                    <Card className="schedule-card flex-fill position-relative text-center">
                      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                        <Card.Text style={{ lineHeight: '2' }}>
                          <strong>Class Name:</strong> <span className="text-muted">{cls.name}</span>
                          <br />
                          <strong>Instructor Name:</strong> <span className="text-muted">{cls.instructor}</span>
                          <br />
                          <strong>Date:</strong> <span className="text-muted">{cls.date}</span>
                          <br />
                          <strong>Time:</strong> <span className="text-muted">{cls.time}</span>
                        </Card.Text>
                        <Button variant="success" className="mt-3">
                          Join Now
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ClassSchedule;
