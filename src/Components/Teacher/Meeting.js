import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import TeacherHeader from './TeacherHeader';
import TeacherSidePannel from './TeacherSidepannel';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateMeeting = () => {
  // Sidebar display states based on window width
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  // Meeting form state
  const [meetingData, setMeetingData] = useState({
    name: '',
    description: '',
    level: '0',
    date: '',
    time: '',
    startTime: '',
    endTime: '',
  });

  // Modal popup state
  const [showPopup, setShowPopup] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission: generate meeting link and show popup
  const handleSubmit = (e) => {
    e.preventDefault();
    const link = `https://meeting.example.com/${Date.now()}`;
    setMeetingLink(link);
    setShowPopup(true);
  };

  // Copy the meeting link to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
  };

  return (
    <div>
      {/* Header with sidebar toggle */}
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <TeacherSidePannel />}
        <Container className="main-container mt-4">
         <div className="sticky-header">
                     <Row style={{paddingTop:'15px'}}>
                       <Col>
                         <h2 className="fw-bold">Create Meeting</h2>
                       </Col>
                     </Row>
                   </div>
         
          <div className="sub-container">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={meetingData.name} 
                  onChange={handleChange} 
                  placeholder="Enter meeting name" 
                  required 
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type="text" 
                  name="description" 
                  value={meetingData.description} 
                  onChange={handleChange} 
                  placeholder="Enter description" 
                  required 
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Control 
                  as="select" 
                  name="level" 
                  value={meetingData.level} 
                  onChange={handleChange} 
                  required
                >
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={meetingData.date} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="time" 
                  value={meetingData.time} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="startTime" 
                  value={meetingData.startTime} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>End Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="endTime" 
                  value={meetingData.endTime} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Create Meeting
            </Button>
          </Form>

          {/* Modal Popup displaying the meeting link */}
          <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Meeting Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="d-flex">
                <FormControl value={meetingLink} readOnly />
                <Button variant="outline-secondary" onClick={handleCopy}>
                  Copy
                </Button>
              </InputGroup>
            </Modal.Body>
          </Modal>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CreateMeeting;
