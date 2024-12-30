import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Spinner } from "react-bootstrap";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchStudentEnrollmentRequest } from "../../redux/Services/api";

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(0);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, []);

  console.log(requests.searchAndListStudentResult);
  
  const handleSearch = () => {
    // Filter requests based on the search term
    const filteredRequests = requests.searchAndListStudentResult.filter(
      (request) =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRequests(filteredRequests);
  };

  const handleSelectRequest = (id) => {
    setSelectedRequests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((requestId) => requestId !== id)
        : [...prevSelected, id]
    );
  };

  const handleApproveSelected = () => {
    alert("Approved selected requests: " + selectedRequests.join(", "));
  };

  const handleRejectSelected = () => {
    alert("Rejected selected requests: " + selectedRequests.join(", "));
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
                        <th>
                          <Form.Check
                            type="checkbox"
                            onChange={(e) => handleSelectRequest("all")}
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
                      {requests.searchAndListStudentResult.map((request , index) => (
                        <tr key={request.id || index}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedRequests.includes(request.id)}
                              onChange={() => handleSelectRequest(request.id)}
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
