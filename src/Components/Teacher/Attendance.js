import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';
import './Attendance.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AttendancePage = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('2024-12-04');
  const [studentName, setStudentName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [previousRecords, setPreviousRecords] = useState([]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleSubmit = () => {
    if (studentName && registerNumber && selectedClass && selectedSection && attendanceDate) {
      setPreviousRecords([...attendanceRecords]);
      const newRecord = {
        id: attendanceRecords.length + 1,
        name: studentName,
        registerNumber: registerNumber,
        class: selectedClass,
        section: selectedSection,
        date: attendanceDate,
        status: attendanceStatus,
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
      setStudentName('');
      setRegisterNumber('');
      setAttendanceStatus('Present');
    }
  };

  const handleUndo = () => {
    if (attendanceRecords.length > 0) {
      setAttendanceRecords(attendanceRecords.slice(0, -1));
    }
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="align-items-center mb-4 text-center">
              <Col xs={12}>
                <h2 className="fw-bold">Attendance</h2>
              </Col>
            </Row>

            <Row className="filter-section mb-3 text-center">
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Class *</Form.Label>
                  <Form.Control as="select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="">Select Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Section *</Form.Label>
                  <Form.Control as="select" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Attendance Date *</Form.Label>
                  <Form.Control type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4 justify-content-center text-center">
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Student Name *</Form.Label>
                  <Form.Control type="text" placeholder="Enter student name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Register Number *</Form.Label>
                  <Form.Control type="text" placeholder="Enter register number" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Attendance Status *</Form.Label>
                  <Form.Control as="select" value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} className="d-flex justify-content-center mt-3">
                <Button variant="success" className="btn-submit px-3 py-1 me-2" onClick={handleSubmit}>Submit</Button>
                <Button variant="secondary" className="px-3 py-1" onClick={handleUndo} disabled={attendanceRecords.length === 0}>Undo</Button>
              </Col>
            </Row>

            <div className="attendance-list">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Register Number</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Date</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record.id}</td>
                        <td>{record.name}</td>
                        <td>{record.registerNumber}</td>
                        <td>{record.class}</td>
                        <td>{record.section}</td>
                        <td>{record.date}</td>
                        <td>{record.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AttendancePage;
