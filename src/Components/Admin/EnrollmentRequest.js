import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchStudentEnrollmentRequest } from "../../redux/Services/api";
import { editStudentAction, getStudents } from "../../redux/Action/StudentAction";

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRequestId, setSelectedRequestId] = useState(null);  // Track selected student ID
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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

  const studentsPerPage = 15;
  useEffect(() => {
    const paginationDetail = {
      pageSize: studentsPerPage,
      pageNumber: currentPage + 1,
    };
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetchStudentEnrollmentRequest({ paginationDetail });
        if (response && response.data) {
          setRequests(response.data);
        } else {
          setError("Failed to fetch enrollment requests.");
        }
      } catch (err) {
        setError("An error occurred while fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [currentPage]);

  const handleSearch = () => {
    const filteredRequests = requests?.searchAndListStudentResult?.filter(
      (request) =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRequests(filteredRequests);
  };

  const handleSelectRequest = (studentId) => {
    // Toggle the checkbox selection for the clicked student ID
    setSelectedRequestId(selectedRequestId === studentId ? null : studentId); // If already selected, deselect; otherwise, select
  };

  const handleApprove = async () => {
    if (selectedRequestId) {
      await updateStatus(1);
    }
  };

  const handleDeny = async () => {
    if (selectedRequestId) {
      await updateStatus(3);
    }
  };

  const updateStatus = async (statusId) => {
    try {
      if (selectedRequestId) {
        await dispatch(editStudentAction({ statusId }, selectedRequestId)); // Pass the selected student ID for updating
        dispatch(getStudents({ pageSize: studentsPerPage, pageNumber: currentPage + 1 }));
        toast.success("Status updated successfully!");
        setSelectedRequestId(null); // Reset the selection after update
      }
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    }
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
                <Button variant="success" onClick={handleApprove} className="ml-2" disabled={selectedRequestId === null}>
                  Approve
                </Button>
                <Button variant="danger" onClick={handleDeny} className="ml-2" disabled={selectedRequestId === null}>
                  Reject
                </Button>
              </Col>
            </Row>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <Row>
                <Col>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Select</th>
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
                      {requests?.searchAndListStudentResult?.map((request, index) => (
                        <tr key={request.id || index}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedRequestId === request.studentId}  // Check if the current student ID is selected
                              onChange={() => handleSelectRequest(request.studentId)} // Toggle selection for the current student ID
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{request.studentId}</td>
                          <td>{request.firstName}</td>
                          <td>{request.email}</td>
                          <td>{request.phoneNumber}</td>
                          <td>{request.genderName}</td>
                          <td>
                            <Badge bg={request.statusName === "Pending" ? "warning" : "success"}>
                              {request.statusName}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EnrollmentRequestList;
