import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';
import './Attendance.css'; // Import the CSS file
import 'bootstrap-icons/font/bootstrap-icons.css';

const AttendancePage = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [attendance, setAttendance] = useState(
    Array(6).fill({ status: 'Present', note: '' }) // Mock data for 6 students
  );
  const [bulkStatus, setBulkStatus] = useState('Present');

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleStatusChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    if (status === 'Present') {
      updatedAttendance[index].note = ''; // Clear the note when the status is set to Present
    }
    setAttendance(updatedAttendance);
  };

  const handleNoteChange = (index, note) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].note = note;
    setAttendance(updatedAttendance);
  };

  const applyBulkStatus = () => {
    if (bulkStatus) {
      const updatedAttendance = attendance.map((record) => ({
        ...record,
        status: bulkStatus,
      }));
      setAttendance(updatedAttendance);
    }
  };

  return (
    <div>
      {/* Admin Header with Toggle Sidebar */}
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            {/* Class, Section, and Attendance Date on Same Row */}
            <Row className="filter-section mb-4">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Class *</Form.Label>
                  <Form.Control as="select">
                    <option>Class 1</option>
                    <option>Class 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Section *</Form.Label>
                  <Form.Control as="select">
                    <option>A</option>
                    <option>B</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Attendance Date *</Form.Label>
                  <Form.Control type="date" defaultValue="2024-12-04" />
                </Form.Group>
              </Col>
            </Row>

            {/* Search Button */}
            <div className="filter-actions d-flex justify-content-end mb-4">
              <Button className="btn-search">Search</Button>
            </div>

            {/* Bulk Attendance Actions */}
            <div className="attendance-actions mb-4">
              <div className="set-all-attendance">
                <span>Set attendance for all students as:</span>
                {/* Bulk attendance dropdown */}
                <Form.Control
                  as="select"
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value)}
                >
                  {['Present', 'Late', 'Absent', 'Holiday', 'Half Day'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Control>
              </div>
              <Button className="btn-save-top" onClick={applyBulkStatus}>
                Apply Bulk Status
              </Button>
            </div>

            {/* Attendance Table */}
            <div className="attendance-list">
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
                  {[
                    { id: 1, admission: '1001', roll: '0201', name: 'Hudson' },
                    { id: 2, admission: '1020', roll: '0204', name: 'Marlie' },
                    { id: 3, admission: '120036', roll: '23620', name: 'Ayan Desai' },
                    { id: 4, admission: '2152', roll: '0205', name: 'Kaylen' },
                    { id: 5, admission: '7663', roll: '6230', name: 'Paul S. Bealer' },
                    { id: 6, admission: '96302', roll: '221002', name: 'Jacob Bethell' },
                  ].map((student, index) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.admission}</td>
                      <td>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>
                        {/* Select field for Attendance */}
                        <Form.Control
                          as="select"
                          value={attendance[index].status}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                        >
                          {['Present', 'Late', 'Absent', 'Holiday', 'Half Day'].map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </Form.Control>
                      </td>
                      <td>Manual</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={attendance[index].note}
                          onChange={(e) => handleNoteChange(index, e.target.value)}
                          disabled={attendance[index].status === 'Present'} // Disable the note field for "Present" status
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="btn-save">Save Attendance</Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AttendancePage;
