import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Spinner, InputGroup, Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchStudentEnrollmentRequest } from "../../redux/Services/api";

const BASE_URL = "http://santhwanamhhcs.in:8081/api";

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const studentsPerPage = 10;
  const indexOfLastRequest = currentPage * studentsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - studentsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(requests.length / studentsPerPage);

  useEffect(() => {
    const paginationDetail = {
      pageSize: studentsPerPage,
      pageNumber: currentPage,
    };
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetchStudentEnrollmentRequest({ paginationDetail });
        if (response && response.data) {
          setRequests(response.data.searchAndListStudentResult || []);
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

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sticky-header">
            <Row className="align-items-center">
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
                <Button variant="success">Approve</Button>
                <Button variant="danger">Reject</Button>
              </Col>
            </Row>
          </div>

          <div className="sub-container">
            <Row>
              <Col style={{marginTop:"30px"}}>
                <Table striped bordered hover responsive >
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
                    {currentRequests.map((request, index) => (
                      <tr key={request.id || index}>
                        <td>
                          <Form.Check type="checkbox" />
                        </td>
                        <td>{indexOfFirstRequest + index + 1}</td>
                        <td>{request.studentId}</td>
                        <td>{request.firstName}</td>
                        <td>{request.email}</td>
                        <td>{request.phoneNumber}</td>
                        <td>{request.genderName}</td>
                        <td>
                          <Badge bg={request.statusName === "Pending" ? "warning" : "danger"}>{request.statusName}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} />
                  {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} />
                </Pagination>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EnrollmentRequestList;
