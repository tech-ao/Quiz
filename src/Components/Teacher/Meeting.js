import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import AdminHeader from '../Admin/AdminHeader';
import SidePannel from './TeacherSidepannel';
import '../Teacher/OnlineClassShedule.css';

const teachers = [
  { id: 1, name: 'Mr. Smith' },
  { id: 2, name: 'Ms. Johnson' },
  { id: 3, name: 'Dr. Lee' },
  { id: 4, name: 'Prof. Brown' },
];

const getUserData = () => {
  const storedData = localStorage.getItem('userData');
  return storedData ? JSON.parse(storedData) : {};
};

const OnlineClass = () => {
  const userData = getUserData();
  console.log(userData)

  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    date: '',
    time: '',
    instructor: userData.teacherId || '',
    userType: 'Student',
    teacherName: '',
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [includeAllStudents, setIncludeAllStudents] = useState(false);
  const [includeAdmin, setIncludeAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    fetchStudents();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://srimathicare.in:8081/api/SearchAndList/SearchAndListStudent', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280'
        },
        body: JSON.stringify({
          "paginationDetail": {
            "pageSize": 100,
            "pageNumber": 1
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const result = await response.json();
      console.log('API result:', result);
  
      const studentsArray = result?.data?.searchAndListStudentResult ?? [];
  
      if (!Array.isArray(studentsArray)) {
        console.error('Expected an array for searchAndListStudentResult but got:', studentsArray);
        setStudents([]);
      } else {
        setStudents(studentsArray);
      }
  
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };
  
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

  const handleStudentSelect = (e) => {
    const studentId = parseInt(e.target.value);
    if (studentId) {
      const selectedStudent = students.find(student => student.studentId === studentId);
      if (selectedStudent && !selectedStudents.some(student => student.studentId === studentId)) {
        setSelectedStudents([...selectedStudents, selectedStudent]);
      }
    }
  };

  const removeSelectedStudent = (studentId) => {
    setSelectedStudents(selectedStudents.filter(student => student.studentId !== studentId));
  };

  const handleIncludeAllStudents = (e) => {
    setIncludeAllStudents(e.target.checked);
    if (e.target.checked) {
      setSelectedStudents([]);
    }
  };

  const handleIncludeAdmin = (e) => {
    setIncludeAdmin(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let studentIds = [];
    
    if (includeAllStudents) {
      studentIds = students.map(student => student.studentId);
    } else {
      studentIds = selectedStudents.map(student => student.studentId);
    }

    studentIds = [...studentIds, 1056]; // Example ID to include

    if (includeAdmin) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.teacherId && !studentIds.includes(parsedUserData.teacherId)) {
          studentIds.push(parsedUserData.teacherId);
        }
      }
    }

    const payload = {
      id: 1068,
      name: newClass.name,
      instructor: newClass.instructor,
      description: `${newClass.name} class by ${newClass.instructor}`,
      date: new Date(newClass.date).toISOString(),
      createdBy: 1,
      time: newClass.time,
      meetingLink: 'https://meet.google.com/xut-strx-bvb',
      studentIds: studentIds, 
      createdFrom: 1,
      timeStamp: new Date().toISOString(),
      isDeleted: false,
      objectId: 'default-obj-id'
    };
    
    try {
      const response = await fetch('http://srimathicare.in:8081/api/Classess/Create', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': '3ec1b120-a9aa-4f52-9f51-eb4671ee1280'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      alert(`Class scheduled successfully: ${newClass.name}`);
      console.log('API Response:', result);
      
      // Reset form
      setNewClass({
        name: '',
        date: '',
        time: '',
        instructor: '',
        userType: 'Student',
        teacherName: '',
      });
      setSelectedStudents([]);
      setIncludeAllStudents(false);
      setIncludeAdmin(false);
    } catch (err) {
      console.error('Failed to schedule class:', err);
      alert('Failed to schedule class. Please try again later.');
    }
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <SidePannel />}
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

              {newClass.userType === 'Student' && (
                <>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Check
                        type="checkbox"
                        id="include-all-students"
                        label="Include All Students"
                        checked={includeAllStudents}
                        onChange={handleIncludeAllStudents}
 />
                    </Col>
                    <Col md={6}>
                      <Form.Check
                        type="checkbox"
                        id="include-admin"
                        label="Include Admin"
                        checked={includeAdmin}
                        onChange={handleIncludeAdmin}
                      />
                    </Col>
                  </Row>
                  
                  {!includeAllStudents && (
                    <>
                      <Row>
                        <Col md={6} className="mb-3">
                          <Form.Label>Select Students</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={handleStudentSelect}
                            disabled={loading || includeAllStudents}
                          >
                            <option value="">Select a student</option>
                            {students.map((student) => (
                              <option key={student.studentId} value={student.studentId}>
                                {student.email} - {student.firstName} {student.lastName}
                              </option>
                            ))}
                          </Form.Control>
                          {loading && <div className="mt-2">Loading students...</div>}
                        </Col>
                      </Row>
                      
                      {selectedStudents.length > 0 && (
                        <Row className="mb-3">
                          <Col md={12}>
                            <Card>
                              <Card.Header>Selected Students</Card.Header>
                              <Card.Body>
                                <ul className="list-group">
                                  {selectedStudents.map((student) => (
                                    <li key={student.studentId} className="list-group-item d-flex justify-content-between align-items-center">
                                      {student.email} - {student.firstName} {student.lastName}
                                      <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => removeSelectedStudent(student.studentId)}
                                      >
                                        Remove
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      )}
                    </>
                  )}
                </>
              )}

              {includeAdmin && (
                <Row className="mb-3">
                  <Col md={12}>
                    <Card bg="light">
                      <Card.Header>Admin Included</Card.Header>
                      <Card.Body>
                        <p className="mb-0">Admin will be included in this class session.</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}

              <Button variant="success" type="submit" className="mt-3">
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