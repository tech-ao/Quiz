import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import TeacherSidePanel from './TeacherSidepannel';
import AdminHeader from '../Admin/AdminHeader';
import './Announcements.css'; // Import the CSS file
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
    { id: 4, title: 'Field Trip Announcement', description: '0205A field trip is scheduled for November 1st. Permission slips are due by October 25th.'},
    { id: 5, title: 'Exam Schedule Released', description: 'The exam schedule for the upcoming semester has been released. Please check your email.' },
   
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const calculateTargetId = (date) => {
    const baseDate = new Date('2025-01-17');
    const selected = new Date(date);
    const differenceInDays = Math.floor((selected - baseDate) / (1000 * 60 * 60 * 24));
    return differenceInDays + 1; // ID starts from 1
  };

  const handleSearch = () => {
    const targetId = calculateTargetId(selectedDate);
    const filtered = announcements.filter((announcement) => announcement.id === targetId);
    setFilteredData(filtered);
    setDataVisible(true);
  };

  

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <h2 className="fw-bold text-center mb-4">Announcements</h2>
            <Row className="filter-section mb-4">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Announcement Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="filter-actions d-flex justify-content-start mb-4">
              <Button className="btn-search" onClick={handleSearch}>
                Search
              </Button>
            </div>

            {isDataVisible && filteredData.length > 0 && (
              <div className="announcement-list">
                <Table responsive>
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
