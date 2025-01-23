import React, { useState, useEffect } from "react";
import { Container, Card, Image, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Sidebar from "./StudnetSidebar";
import StudentHeader from "./StudentHeader";
import { FaEdit } from "react-icons/fa";
import BASE_URL from "../../redux/Services/Config";
import { editStudentAction, fetchStudent } from "../../redux/Action/StudentAction";
import SettingEdit from "./SettingEdit";
import "./StudentSettings.css";

const StudentSettings = () => {
  const dispatch = useDispatch();
  const { selectedStudent } = useSelector((state) => state.students);
  const studentData = selectedStudent?.data;

  // State management
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentId, setStudentId] = useState(null);

  // Sidebar toggle state
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleCloseEditStudent = () => {
    setShowEditStudent(false);
    setSelectedStudentId(null);
  };
  // Retrieve Student ID from Redux or LocalStorage
  useEffect(() => {
    let storedStudentId = localStorage.getItem("studentId");

    if (studentData?.userId) {
      setStudentId(storedStudentId);
      localStorage.setItem("studentId", storedStudentId);
    } else if (storedStudentId) {
      setStudentId(storedStudentId);
      dispatch(fetchStudent(storedStudentId));
    } else {
      setError("Student ID is missing!");
    }
  }, [dispatch, studentData?.userId]);

  // Fetch student profile image
  useEffect(() => {
    if (studentId) {
      axios
        .get(`${BASE_URL}/Profile/GetContentByUserId?userId=${studentId}`, {
          headers: {
            accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        })
        .then((response) => {
          const base64Image = response.data?.data;
          setProfileImage(base64Image);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load profile image");
          setLoading(false);
        });
    }
  }, [studentId]);

  // Open EditStudent component
  const handleOpenEditStudent = () => {
    if (studentId) {
      setSelectedStudentId(studentId);
      dispatch(editStudentAction(studentId));
      setShowEditStudent(true);
    }
  };

  // Close EditStudent component
  if (!studentId) return <p className="text-danger text-center">Error: Student ID is missing!</p>;

  return (
    <div>
      {/* Header with Sidebar Toggle */}
      <StudentHeader toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            {/* Header with Edit Icon */}
            <h1 className="d-flex justify-content-between align-items-center">
              Student Settings
              <FaEdit
                size={24}
                className="text-primary cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={handleOpenEditStudent}
              />
            </h1>

            <Card className="p-4">
              <Card.Body className="d-flex flex-column align-items-center">
                {/* Profile Image Section */}
                <div
                  style={{
                    border: "5px solid #4caf50",
                    borderRadius: "50%",
                    padding: "5px",
                    display: "inline-block",
                    height: "171px",
                  }}
                >
                  {loading ? (
                    <p>Loading image...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : profileImage ? (
                    <Image
                      src={`data:image/jpeg;base64,${profileImage}`}
                      alt="Profile"
                      roundedCircle
                      width="150"
                      height="150px"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>

                {/* Student Details Grid */}
                <Row className="mt-4 w-100">
                  <Col md={4}><strong>First Name:</strong><p>{studentData?.firstName || "N/A"}</p></Col>
                  <Col md={4}><strong>Last Name:</strong><p>{studentData?.lastName || "N/A"}</p></Col>
                  <Col md={4}><strong>Email:</strong><p>{studentData?.email || "N/A"}</p></Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}><strong>Phone:</strong><p>{studentData?.countryCode} {studentData?.phoneNumber || "N/A"}</p></Col>
                  <Col md={4}><strong>Date of Birth:</strong><p>{studentData?.dob || "N/A"}</p></Col>
                  <Col md={4}><strong>Gender:</strong><p>{studentData?.genderName || "N/A"}</p></Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}><strong>Register Number:</strong><p>{studentData?.registerNumber || "N/A"}</p></Col>
                  <Col md={4}><strong>Grade:</strong><p>{studentData?.gradeName || "N/A"}</p></Col>
                  <Col md={4}><strong>Status:</strong><p>{studentData?.statusName || "N/A"}</p></Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}><strong>Address:</strong><p>{studentData?.address || "N/A"}</p></Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>

      {/* EditStudent Component */}
      {showEditStudent && (
        <SettingEdit
          show={showEditStudent}
          onClose={handleCloseEditStudent} 
          studentId={selectedStudentId}
        />
      )}
    </div>
  );
};

export default StudentSettings;
