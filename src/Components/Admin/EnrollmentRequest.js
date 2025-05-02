import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Badge,
  Spinner,
  Pagination,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchStudentEnrollmentRequest } from "../../redux/Services/api";
import ViewStudentPanel from "../Student/ViewStudent";
import { FiEye, FiMail } from "react-icons/fi";
import BASE_URL from "../../redux/Services/Config";
import { fetchStudent } from "../../redux/Action/StudentAction";

const EnrollmentRequestList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAppoveModal, setShowAppoveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const studentsPerPage = 10;

  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      request.firstName.toLowerCase().includes(searchLower) ||
      request.email.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastRequest = currentPage * studentsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - studentsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / studentsPerPage);

  useEffect(() => {
    const paginationDetail = {
      pageSize: studentsPerPage,
      pageNumber: currentPage,
    };
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetchStudentEnrollmentRequest({ isCompetition: false, paginationDetail });
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
    if (selectedRequestIds.length === 0) {
      toast.error("Please select the students.");
      return;
    }
    const success = await updateStatus(1, remark);
    if (success) {
      setShowAppoveModal(false);
      setRemark("");
    }
  };

  const handleDeny = async () => {
    if (selectedRequestIds.length === 0) {
      toast.error("Please select the students.");
      return;
    }
    const success = await updateStatus(2, remark);
    if (success) {
      setShowRejectModal(false);
      setRemark("");
    }
  };

  const updateStatus = async (statusEnum, remarkText) => {
    try {
      if (selectedRequestIds.length === 0) {
        toast.error("No students selected.");
        return false;
      }

      const requestBody = {
        statusEnum,
        studentIdList: selectedRequestIds,
        remark: remarkText,
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
      return true;
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      return false;
    }
  };

  const handleOpenViewStudent = (studentId) => {
    setSelectedStudentId(studentId);
    dispatch(fetchStudent(studentId));
    setShowViewStudent(true);
  };

  const handleCloseViewStudent = () => {
    setShowViewStudent(false);
    setSelectedStudentId(null);
  };

  const handleOpenAppoveModal = () => {
    setShowAppoveModal(true);
    setRemark("");
  };
  const handleCloseAppoveModal = () => {
    setShowAppoveModal(false);
    setRemark("");
  };

  const handleOpenRejectModal = () => {
    setShowRejectModal(true);
    setRemark("");
  };
  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
    setRemark("");
  };

  const handleEmailAction = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sticky-header">
            <Row className="align-items-center" style={{ marginTop: "20px" }}>
              <Col md={6}>
                <h2 className="fw-bold">Student Enrollment Request</h2>
              </Col>
              <Col md={6} className="d-flex justify-content-end align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Search name or email"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ maxWidth: "400px", marginRight: "5px" }}
                />
                <Button variant="success" onClick={handleOpenAppoveModal} style={{ marginRight: "5px" }}>
                  Approve
                </Button>
                <Button variant="danger" onClick={handleOpenRejectModal}>
                  Reject
                </Button>
              </Col>
            </Row>
          </div>
          <div className="sub-container">
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
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
                      <td>
                        <Form.Check type="checkbox" onChange={() => handleSelectRequest(request.studentId)} />
                      </td>
                      <td>{indexOfFirstRequest + index + 1}</td>
                      <td>{request.studentId}</td>
                      <td>{request.firstName}</td>
                      <td>{request.email}</td>
                      <td>{request.phoneNumber}</td>
                      <td>{request.genderName}</td>
                      <td>
                        <Badge bg={request.statusName === "Pending" ? "warning" : "danger"}>
                          {request.statusName}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Button variant="transparent" size="sm" onClick={() => handleOpenViewStudent(request.studentId)}>
                            <FiEye />
                          </Button>
                          <Button variant="transparent" size="sm" onClick={() => handleEmailAction(request.email)}>
                            <FiMail />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Pagination className="justify-content-center">
              <Pagination.Prev onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        </Container>
      </div>

      <ViewStudentPanel show={showViewStudent} onClose={handleCloseViewStudent} />

      <Modal show={showAppoveModal} onHide={handleCloseAppoveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to approve the selected students?</p>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAppoveModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={handleCloseRejectModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to reject the selected students?</p>
          <Form.Group controlId="rejectRemark">
            <Form.Label>Remark (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter any remarks here..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeny}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EnrollmentRequestList;
