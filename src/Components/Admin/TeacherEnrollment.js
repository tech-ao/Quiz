import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Spinner, Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchTeacher } from "../../redux/Action/TeacherAction";
import axios from "axios";
import "./EnrollmentRequest.css";
import Sidebar from "../Admin/SidePannel";
import AdminHeader from "../Admin/AdminHeader";
import { fetchTeacherEnrollmentRequest } from "../../redux/Services/api";
import ViewTeacherPanel from "../ViewTeacher"; // Optional: teacher view panel
import { FiEye, FiMail } from "react-icons/fi";
import BASE_URL from "../../redux/Services/Config";
import { Modal } from "react-bootstrap";

const TeacherEnrollment = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showViewTeacher, setShowViewTeacher] = useState(false);
  const [teacherData, setTeacherData] = useState(null); 
   const [showAppoveModal, setShowAppoveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
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

  const teachersPerPage = 10; // For pagination

  // Filter requests by search term (matching teacher name or email)
  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (request.firstName || "").toLowerCase().includes(searchLower) ||
      (request.email || "").toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastRequest = currentPage * teachersPerPage;
  const indexOfFirstRequest = indexOfLastRequest - teachersPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / teachersPerPage);

  useEffect(() => {
    const paginationDetail = {
      pageSize: teachersPerPage,
      pageNumber: currentPage,
    };
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetchTeacherEnrollmentRequest({ paginationDetail });
        if (response && response.data) {
          setRequests(response.data.searchAndListTeacherResult || []);
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

  const handleSelectRequest = (teacherId) => {
    setSelectedRequestIds((prevSelected) =>
      prevSelected.includes(teacherId)
        ? prevSelected.filter((id) => id !== teacherId)
        : [...prevSelected, teacherId]
    );
  };

  const handleApprove = async () => {
    if (selectedRequestIds.length > 0) {
      await updateStatus(1);
    } else {
      toast.error("No teachers selected.");
    }
  };

  const handleDeny = async () => {
    if (selectedRequestIds.length > 0) {
      await updateStatus(2);
    } else {
      toast.error("No teachers selected.");
    }
  };

  const handleOpenAppoveModal = () => {
    //setSelectedTeacherId(teacherId);
    setShowAppoveModal(true);
  };
  const handleCloseAppoveModal = () => {
    setShowAppoveModal(false);
    // setSelectedTeacherId(null);
  };

  // reject fuction 

  const handleOpenRejectModal = () => {
    //setSelectedTeacherId(teacherId);
    setShowRejectModal(true);
  };
  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
    // setSelectedTeacherId(null);
  };

  const updateStatus = async (statusEnum) => {
    try {
      if (!selectedRequestIds || selectedRequestIds.length === 0) {
        toast.error("No teachers selected.");
        return;
      }
  
      const requestBody = {
        statusEnum,
        teacherIdsList: selectedRequestIds,
      };
  
      await axios.post(`${BASE_URL}/Teacher/UpdateTeacherStatus`, requestBody, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          AccessToken: "123",
          "Content-Type": "application/json",
        },
      });
  
      toast.success("Status updated successfully!");
  
      // Remove updated teachers from the pending enrollment list.
      setRequests((prev) =>
        prev.filter((teacher) => !selectedRequestIds.includes(teacher.teacherId))
      );
      setSelectedRequestIds([]);
    } catch (error) {
      console.error("Error updating status:", error.response ? error.response.data : error.message);
      toast.error("Failed to update status. Please try again.");
    }
  };
  
  const handleOpenViewTeacher = async (teacherId) => {
    try {
      const response = await dispatch(fetchTeacher(teacherId));
      if (response && response.data) {
        setTeacherData(response.data);
        setShowViewTeacher(true);
      } else {
        toast.error("Invalid API response format.");
      }
    } catch (error) {
      console.error("Error fetching teacher details:", error);
      toast.error("Failed to fetch teacher details.");
    }
  };

  const handleEmailAction = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCloseViewTeacher = () => {
    setShowViewTeacher(false);
    setTeacherData(null); // Reset teacher data when closing the view
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
                <h2 className="fw-bold">Teacher Enrollment Request</h2>
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
                <Button variant="success" onClick={handleOpenAppoveModal}style={{ marginRight: "5px" }}>
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
                    <th>Name</th>
                    <th>Date Of Birth</th>
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
                        <Form.Check
                          type="checkbox"
                          onChange={() => handleSelectRequest(request.teacherId)}
                        />
                      </td>
                      <td>{indexOfFirstRequest + index + 1}</td>
                      <td>{request.fullName}</td>
                      <td>
                        {request.dob 
                            ? new Date(request.dob).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: '2-digit', 
                                day: '2-digit' 
                            }) 
                            : 'N/A'}
                      </td>
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
                          <Button variant="transparent" size="sm" onClick={() => handleOpenViewTeacher(request.teacherId)}>
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
      <ViewTeacherPanel show={showViewTeacher} onClose={handleCloseViewTeacher} teacherData={teacherData} />

      <Modal show={showAppoveModal} onHide={handleCloseAppoveModal}>
              <Modal.Header closeButton>
                <Modal.Title>Approve Students</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to approve the selected students?
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
                Are you sure you want to reject the selected students?
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

export default TeacherEnrollment;