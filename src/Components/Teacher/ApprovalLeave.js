import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "bootstrap/dist/css/bootstrap.min.css";

const ApprovalLeave = () => {
     const [isSidebarVisible, setIsSidebarVisible] = useState(
        window.innerWidth >= 768
      );
    
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
    
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "John Doe", date: "2025-02-22", reason: "Sick Leave", status: "Pending" },
    { id: 2, name: "Jane Smith", date: "2025-02-21", reason: "Family Emergency", status: "Pending" },
  ]);

  const [attendance, setAttendance] = useState([
    { id: 1, name: "John Doe", date: "2025-02-22", status: "Present" },
    { id: 2, name: "Jane Smith", date: "2025-02-22", status: "Absent" },
  ]);

  const [selectedDate, setSelectedDate] = useState("");

  const handleApproval = (id, newStatus) => {
    setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const filteredAttendance = selectedDate
    ? attendance.filter(entry => entry.date === selectedDate)
    : attendance;

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
    <Container className="main-container p-4 min-vh-100">
      <Row  className="sub-container">
        <Col md={6}>
          <h4>Leave Approval</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.date}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === "Pending" && (
                      <>
                        <Button variant="success" size="sm" onClick={() => handleApproval(request.id, "Approved")}>
                          Approve
                        </Button>{" "}
                        <Button variant="danger" size="sm" onClick={() => handleApproval(request.id, "Rejected")}>
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        
        <Col md={6}>
          <h4>Attendance by Date</h4>
          <Form.Group className="mb-3">
            <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.name}</td>
                    <td>{entry.date}</td>
                    <td>{entry.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No records found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  );
};

export default ApprovalLeave;
