import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import AdminHeader from '../Admin/AdminHeader';
import SidePannel from './SidePannel';
import '../Teacher/OnlineClassShedule.css'; // Custom CSS for styling

// Sample class data
const classSchedule = [
  { id: 1, name: 'Mathematics 101', date: '2024-12-01', time: '10:00 AM', instructor: 'Mr. Smith' },
  { id: 2, name: 'English Literature', date: '2024-12-02', time: '11:00 AM', instructor: 'Ms. Johnson' },
  { id: 3, name: 'Physics 201', date: '2024-12-03', time: '01:00 PM', instructor: 'Dr. Lee' },
  { id: 4, name: 'Computer Science', date: '2024-12-04', time: '02:00 PM', instructor: 'Prof. Brown' },
];

const teachers = [
  { id: 1, name: 'Mr. Smith' },
  { id: 2, name: 'Ms. Johnson' },
  { id: 3, name: 'Dr. Lee' },
  { id: 4, name: 'Prof. Brown' },
];

const OnlineClass = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [newClass, setNewClass] = useState({
    name: '',
    date: '',
    time: '',
    instructor: '',
    userType: 'Student', // Default is 'Student'
    teacherName: '', // Empty by default for Student
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(true); // Show sidebar by default on desktop
      } else {
        setSidebarVisible(false); // Hide sidebar by default on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to adjust initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    console.log('New class scheduled:', newClass);
    alert(`New class scheduled: ${newClass.name}`);
  };

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <SidePannel />}
        <Container className="main-container ">
        <div className="online-sticky-header">
        <h2>Schedule Class</h2>
        </div>

          <div className="sub-container">
            {/* Teacher's New Class Schedule Form */}
           
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
              {/* User Type Selection */}
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="userType"
                    value={newClass.userType}
                    onChange={handleChange}
                  >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </Form.Control>
                </Col>
              </Row>

              {/* Teacher Name Selection (only visible if Teacher is selected) */}
              {newClass.userType === 'Teacher' && (
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Teacher Name</Form.Label>
                    <Form.Control
                      as="select"
                      name="teacherName"
                      value={newClass.teacherName}
                      onChange={handleChange}
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.name}>
                          {teacher.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              )}

              <Button variant="success" type="submit">
                Schedule Class
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OnlineClass;
