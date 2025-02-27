import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import TeacherSidePanel from "./TeacherSidepannel";
import TeacherHeader from "./TeacherHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Approved.css";

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
    { id: 3, name: "Will Smith", date: "2025-02-21", reason: "Personal", status: "Pending" },
    { id: 4, name: "Alice Johnson", date: "2025-02-20", reason: "Vacation", status: "Pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalReason, setApprovalReason] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleShowModal = (request, status) => {
    setSelectedRequest(request);
    setNewStatus(status);
    setApprovalReason("");
    setShowModal(true);
  };

  const handleApprovalSubmit = () => {
    if (!approvalReason.trim()) {
      alert("Please enter a reason.");
      return;
    }

    setLeaveRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, status: newStatus, reason: approvalReason }
          : req
      )
    );

    setShowModal(false);
  };

  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.date.includes(searchTerm) ||
      request.reason.toLowerCase().includes(searchTerm) ||
      request.status.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-md-row">
        {isSidebarVisible && <TeacherSidePanel />}
        <Container className="main-container p-4 min-vh-100">
          <Row className="sub-container approveContainer" style={{width:"98%"}}>
            <Col md={12} style={{ marginTop: "24px" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">Approve Leave</h4>
              </div>

              <div className="d-flex justify-content-end align-items-center mb-3">
              <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: "200px" }}
                />
                </div>

              <div className="tableContainer">
                <Table striped bordered hover className="scrollable-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{index + 1}</td>
                        <td>{request.name}</td>
                        <td>{request.date}</td>
                        <td>{request.reason}</td>
                        <td>{request.status}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleShowModal(request, "Approved")}
                              className="me-2"
                            >
                              ✓
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleShowModal(request, "Rejected")}
                            >
                              ✗
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Reason Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{newStatus} Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="approvalReason">
            <Form.Label>Enter Reason:</Form.Label>
            <Form.Control
              type="text"
              value={approvalReason}
              onChange={(e) => setApprovalReason(e.target.value)}
              placeholder="Enter reason..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApprovalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ApprovalLeave;
