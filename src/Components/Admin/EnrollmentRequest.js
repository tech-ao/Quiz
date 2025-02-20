import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Spinner, InputGroup, Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchStudentEnrollmentRequest } from "../../redux/Services/api";
import ViewStudentPanel from "../Student/ViewStudent";

const BASE_URL = "http://santhwanamhhcs.in:8081/api";

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
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
      await updateStatus(2);
    }
  };

  const updateStatus = async (statusEnum) => {
    try {
      if (selectedRequestIds.length === 0) {
        toast.error("No students selected.");
        return;
      }

      const requestBody = {
        statusEnum,
        studentIdList: selectedRequestIds,
      };

      await axios.post(`${BASE_URL}/Student/UpdateStudentStatus`, requestBody, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
        },
      });
      toast.success("Status updated successfully!");

      setRequests((prev) =>
        prev.map((student) =>
          selectedRequestIds.includes(student.studentId)
            ? { ...student, statusName: statusEnum === 1 ? "Approved" : "Rejected" }
            : student
        )
      );
      setSelectedRequestIds([]);
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleOpenViewStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setShowViewStudent(true);
  };

  const handleCloseViewStudent = () => {
    setShowViewStudent(false);
    setSelectedStudentId(null);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4">
          <div className="sticky-header">
            <Row className="align-items-center">
              <Col md={6}><h2 className="fw-bold">Enrollment Request</h2></Col>
              <Col md={6} className="d-flex justify-content-between align-items-center">
                <Button variant="success" onClick={handleApprove}>Approve</Button>
                <Button variant="danger" onClick={handleDeny}>Reject</Button>
              </Col>
            </Row>
          </div>
          <div className="sub-container">
            {loading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request, index) => (
                    <tr key={request.id || index}>
                      <td><Form.Check type="checkbox" onChange={() => handleSelectRequest(request.studentId)} /></td>
                      <td>{indexOfFirstRequest + index + 1}</td>
                      <td>{request.studentId}</td>
                      <td>{request.firstName}</td>
                      <td>{request.email}</td>
                      <td>{request.phoneNumber}</td>
                      <td>{request.genderName}</td>
                      <td><Badge bg={request.statusName === "Pending" ? "warning" : "danger"}>{request.statusName}</Badge></td>
                      <td><Button variant="info" size="sm" onClick={() => handleOpenViewStudent(request.studentId)}>View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Pagination className="justify-content-center">
              <Pagination.Prev onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>{number + 1}</Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        </Container>
      </div>
      <ViewStudentPanel show={showViewStudent} onClose={handleCloseViewStudent} />
    </div>
  );
};

export default EnrollmentRequestList;
