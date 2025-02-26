import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import TeacherHeader from './TeacherHeader';
import './Attendance.css'; // Import the CSS file
import 'bootstrap-icons/font/bootstrap-icons.css';

const AttendanceDataPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [classSelected, setClassSelected] = useState('Class 1');
  const [sectionSelected, setSectionSelected] = useState('A');
  const [attendanceDate, setAttendanceDate] = useState('2024-12-04');

  const attendance = [
    { id: 1, admission: '1001', roll: '0201', name: 'Hudson', status: 'Present', note: 'N/A' },
    { id: 2, admission: '1020', roll: '0204', name: 'Marlie', status: 'Absent', note: 'Sick' },
    { id: 3, admission: '120036', roll: '23620', name: 'Ayan Desai', status: 'Late', note: 'Traffic' },
    { id: 4, admission: '2152', roll: '0205', name: 'Kaylen', status: 'Holiday', note: 'Public Holiday' },
    { id: 5, admission: '7663', roll: '6230', name: 'Paul S. Bealer', status: 'Half Day', note: 'Family Emergency' },
    { id: 6, admission: '96302', roll: '221002', name: 'Jacob Bethell', status: 'Present', note: 'N/A' },
  ];

   const toggleSidebar = () => {
          setIsSidebarVisible((prev) => !prev);
        };
      
        useEffect(() => {
          const handleResize = () => {
            setIsSidebarVisible(window.innerWidth >= 768);
          };
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);

  // Function to render chip with different colors for status
  const renderStatusChip = (status) => {
    switch (status) {
      case 'Present':
        return <span className="status-chip present">Present</span>;
      case 'Late':
        return <span className="status-chip late">Late</span>;
      case 'Absent':
        return <span className="status-chip absent">Absent</span>;
      case 'Holiday':
        return <span className="status-chip holiday">Holiday</span>;
      case 'Half Day':
        return <span className="status-chip half-day">Half Day</span>;
      default:
        return <span className="status-chip">N/A</span>;
    }
  };

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
        <h2 className="fw-bold text-start mb-4" style={{marginTop:'24px'}}>Attendance By Date</h2>
          <div className="sub-container" >
            {/* Class, Section, and Attendance Date on Same Row */}
            <Row className="filter-section mb-4"  style={{width:"98%"}}>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Class *</Form.Label>
                  <Form.Control 
                    as="select"
                    value={classSelected}
                    onChange={(e) => setClassSelected(e.target.value)}
                  >
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Section *</Form.Label>
                  <Form.Control 
                    as="select"
                    value={sectionSelected}
                    onChange={(e) => setSectionSelected(e.target.value)}
                  >
                    <option>A</option>
                    <option>B</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Attendance Date *</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={attendanceDate} 
                    onChange={(e) => setAttendanceDate(e.target.value)} 
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Search Button */}
            <div className="filter-actions d-flex justify-content-end mb-6"  style={{width:"95%"}}>
              <Button variant="success" className="btn-search" onClick={() => console.log('Search clicked')}>
                Search
              </Button>
            </div>

            {/* Attendance Table */}
            <div className="attendance-list"  style={{width:"98%"}}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Admission No</th>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Attendance</th>
                    <th>Source</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.admission}</td>
                      <td>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>{renderStatusChip(student.status)}</td>
                      <td>Manual</td>
                      <td>{student.note}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AttendanceDataPage;
