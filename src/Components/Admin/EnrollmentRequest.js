import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Spinner, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchStudentEnrollmentRequest } from "../../redux/Services/api";
import { editStudentAction, getStudents ,fetchStudent} from "../../redux/Action/StudentAction";

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
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
          setRequests(response.data.searchAndListStudentResult || []);
          setFilteredRequests(response.data.searchAndListStudentResult || []);
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

  useEffect(() => {
    setFilteredRequests(
      requests.filter(
        (request) =>
          request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, requests]);

  const handleSelectRequest = (studentId) => {
    setSelectedRequestIds((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleApprove = async () => {
    if (selectedRequestIds.length > 0) {
      await updateStatus(1);
    }
  };

  const handleDeny = async () => {
    if (selectedRequestIds.length > 0) {
      await updateStatus(3);
    }
  };

  const updateStatus = async (statusId) => {
    try {
      if (selectedRequestIds.length === 1) {
        // If only one student is selected, fetch their details before updating
        const studentId = selectedRequestIds[0];
        await dispatch(fetchStudent(studentId));
        await dispatch(editStudentAction({ statusId }, studentId));
      } else if (selectedRequestIds.length > 1) {
        // If multiple students are selected, update all
        await Promise.all(
          selectedRequestIds.map((id) => dispatch(editStudentAction({ statusId }, id)))
        );
      }
  
      // Refresh student list after update
      dispatch(getStudents({ pageSize: studentsPerPage, pageNumber: currentPage + 1 }));
      toast.success("Status updated successfully!");
  
      // Reset selection
      setSelectedRequestIds([]);
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
            <Row className="align-items-center mb-4">
              <Col md={6}>
                <h2 className="fw-bold">Enrollment Request</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-between align-items-center">
                <InputGroup style={{ width: "70%" }}>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Button variant="success" onClick={handleApprove} disabled={selectedRequestIds.length === 0}>
                  Approve
                </Button>
                <Button variant="danger" onClick={handleDeny} disabled={selectedRequestIds.length === 0}>
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
                      {filteredRequests.map((request, index) => (
                        <tr key={request.id || index}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedRequestIds.includes(request.studentId)}
                              onChange={() => handleSelectRequest(request.studentId)}
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
