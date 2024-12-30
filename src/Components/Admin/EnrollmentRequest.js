import React, { useState ,useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Badge } from 'react-bootstrap';
import './EnrollmentRequest.css';
import Sidebar from '../Admin/SidePannel';
import AdminHeader from '../Admin/AdminHeader';

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
 
   const toggleSidebar = () => {
     setIsSidebarVisible((prev) => !prev);
   };
   useEffect(() => {
     const handleResize = () => {
       if (window.innerWidth >= 768) {
         setIsSidebarVisible(true); // Show sidebar by default on desktop
       } else {
         setIsSidebarVisible(false); // Hide sidebar by default on mobile
       }
     };
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [requests, setRequests] = useState([
    { id: 1, sNumber: '001', regNumber: 'REG123', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', gender: 'Male', status: 'Pending' },
    { id: 2, sNumber: '002', regNumber: 'REG124', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', gender: 'Female', status: 'Pending' },
    // More mock data...
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleSelectRequest = (id) => {
    setSelectedRequests((prevSelected) => 
      prevSelected.includes(id) ? prevSelected.filter((requestId) => requestId !== id) : [...prevSelected, id]
    );
  };

  const handleApproveSelected = () => {
    // Implement approve logic here
    alert('Approved selected requests: ' + selectedRequests.join(', '));
  };

  const handleRejectSelected = () => {
    // Implement reject logic here
    alert('Rejected selected requests: ' + selectedRequests.join(', '));
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Row className="mb-3">
              <Col md={8} className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" className="ml-2" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
              <Col md={4} className="d-flex justify-content-end">
                <Button variant="success" onClick={handleApproveSelected} className="ml-2">
                  Approve
                </Button>
                <Button variant="danger" onClick={handleRejectSelected} className="ml-2">
                  Reject
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>
                        <Form.Check
                          type="checkbox"
                          onChange={(e) => handleSelectRequest('all')}
                          checked={selectedRequests.length === requests.length}
                        />
                      </th>
                      <th>S.Number</th>
                      <th>Reg Number</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={selectedRequests.includes(request.id)}
                            onChange={() => handleSelectRequest(request.id)}
                          />
                        </td>
                        <td>{request.sNumber}</td>
                        <td>{request.regNumber}</td>
                        <td>{request.name}</td>
                        <td>{request.email}</td>
                        <td>{request.phone}</td>
                        <td>{request.gender}</td>
                        <td>
                          <Badge bg={request.status === 'Pending' ? 'warning' : 'success'}>{request.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EnrollmentRequestList;
