import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import AdminHeader from '../Admin/AdminHeader';
import TeacherSidePannel from './SidePannel';
import '../Teacher/OnlineClassShedule.css';

const BASE_URL= 'http://srimathicare.in:8081/api';
const API_KEY ='3ec1b120-a9aa-4f52-9f51-eb4671ee1280';

const getUserData = () => {
  const storedData = localStorage.getItem('userData');
  return storedData ? JSON.parse(storedData) : {};
};

const OnlineClass = () => {
  const userData = getUserData();
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [students, setStudents] = useState([]);
  const [teachersList, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newClass, setNewClass] = useState({
    name: userData.email || '',
    date: '',
    time: '',
    instructor: userData.teacherId || '',
    userType: 'All', 
    teacherName: '',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    fetchStudents();
    fetchTeachers();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListStudent`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        },
        body: JSON.stringify({ paginationDetail: { pageSize: 100, pageNumber: 1 } })
      });

      const data = await response.json();
      const studentList = data?.data?.searchAndListStudentResult || [];
      setStudents(studentList);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/SearchAndList/SearchAndListTeacher`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        },
        body: JSON.stringify({ paginationDetail: { pageSize: 100, pageNumber: 1 } })
      });

      const data = await response.json();
      const teacherList = data?.data?.searchAndListTeacherResult || [];
      setTeachers(teacherList);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let studentIds = [];
    let teacherIds = [];
    let adminIds = [1]; 
    
    if (newClass.userType === 'All') {
      teacherIds = teachersList.map(teacher => teacher.teacherId);
      studentIds = students.map(student => student.studentId);
    } else if (newClass.userType === 'Teachers') {
      teacherIds = teachersList.map(teacher => teacher.teacherId);
      studentIds = []; 
    } else if (newClass.userType === 'Students') {
      studentIds = students.map(student => student.studentId);
      teacherIds = [];
    }

    const payload = {
      id: 0, 
      name: newClass.name,
      instructor: newClass.instructor,
      description: `${newClass.name} class by ${newClass.instructor}`,
      date: new Date(newClass.date).toISOString(),
      createdBy: userData.id || 1,
      createdByRole: 1, 
      time: newClass.time,
      meetingLink: 'https://meet.google.com/qhw-ifuc-zan',
      studentIds: studentIds.length > 0 ? studentIds : [0],
      teacherIds: teacherIds.length > 0 ? teacherIds : [0],
      adminIds: adminIds,
      createdFrom: 1,
      timeStamp: new Date().toISOString(),
      isDeleted: false,
      objectId: 'default-obj-id'
    };

    try {
      const response = await fetch(`${BASE_URL}/Classess/Create`, {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      alert(`Class scheduled successfully: ${newClass.name}`);
      console.log('API Response:', result);
      
      setNewClass({
        name: userData.email || '',
        date: '',
        time: '',
        instructor: userData.teacherId || '',
        userType: 'All',
        teacherName: '',
      });
    } catch (err) {
      console.error('Failed to schedule class:', err);
      alert('Failed to schedule class. Please try again later.');
    }
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePannel />}
        <Container className="main-container">
          <div className="online-sticky-header">
            <h2>Schedule Class</h2>
          </div>
          <div className="sub-container">
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
                    required
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
                    required
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
                    required
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={newClass.time}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="userType"
                    value={newClass.userType}
                    onChange={handleChange}
                  >
                    <option value="All">All</option>
                    <option value="Teachers">Teachers Only</option>
                    <option value="Students">Students Only</option>
                  </Form.Control>
                  <Form.Text className="text-muted">
                    Admin will always be included in all class schedules.
                  </Form.Text>
                </Col>
              </Row>
          
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