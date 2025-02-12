import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Form, InputGroup } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';
import './Announcements.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Announcement = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2025-01-17');
  const [filteredData, setFilteredData] = useState([
    { id: 1, title: 'Parent-Teacher Meeting', description: 'Join us for a parent-teacher meeting to discuss student progress and upcoming events.' },
  ]);
  const [isDataVisible, setDataVisible] = useState(true);

  const announcements = [
    { id: 1, title: 'Parent-Teacher Meeting', description: 'Join us for a parent-teacher meeting to discuss student progress and upcoming events.' },
    { id: 2, title: 'School Holiday Notice', description: 'Please note that there will be no school on October 20th due to a public holiday.' },
    { id: 3, title: 'New Curriculum Updates', description: 'We have updated the curriculum for the upcoming semester. Please review the changes.' },
    { id: 4, title: 'Field Trip Announcement', description: 'A field trip is scheduled for November 1st. Permission slips are due by October 25th.'},
    { id: 5, title: 'Exam Schedule Released', description: 'The exam schedule for the upcoming semester has been released. Please check your email.' },
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleSearch = () => {
    const filtered = announcements.filter(announcement => announcement.id === 1);
    setFilteredData(filtered);
    setDataVisible(true);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container" style={{ marginRight: '40px' }}>
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h2 className="fw-bold">Announcements</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-start">
                <InputGroup style={{ width: '70%' }}>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </InputGroup>
                <Button variant="success" className="ms-3" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
            </Row>

            {isDataVisible && filteredData.length > 0 && (
              <div style={{ overflowX: 'hidden' }}>
                <Table className="w-100" style={{ marginRight: '40px' }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((announcement) => (
                      <tr key={announcement.id}>
                        <td>{announcement.id}</td>
                        <td>{announcement.title}</td>
                        <td>{announcement.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {isDataVisible && filteredData.length === 0 && (
              <p>No announcements found for the selected date.</p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Announcement;
