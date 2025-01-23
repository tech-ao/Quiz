import React, { useState, useEffect } from "react";
import { Container, Card, Image, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Sidebar from "./StudnetSidebar"; // Ensure correct import
import StudentHeader from "./StudentHeader"; // Ensure correct import
import { FaEdit } from "react-icons/fa"; // Edit icon
import BASE_URL from "../../redux/Services/Config";
import { editStudentAction, fetchStudent } from "../../redux/Action/StudentAction"; // Updated API calls
import EditStudent from "./EditStudent"; // Import EditStudent component
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

  // Retrieve Student ID from Redux or LocalStorage
  useEffect(() => {
    let storedStudentId = localStorage.getItem("studentId");

    if (studentData?.userId) {
      setStudentId(storedStudentId);
      localStorage.setItem("studentId", storedStudentId); // Store if not already saved
    } else if (storedStudentId) {
      setStudentId(storedStudentId);
      dispatch(fetchStudent(storedStudentId)); // Fetch student details
    } else {
      setError("Student ID is missing!");
    }
  }, [dispatch, studentData?.userId]);

  // Format Date of Birth
  const formatDate = (dob) => (dob ? new Date(dob).toISOString().split("T")[0] : "N/A");

  // Fetch student profile image
  useEffect(() => {
    if (studentId) {
      axios
        .get(`${BASE_URL}/Profile/GetContentByUserId?userId=${studentId}`, {
          headers: {
            accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280", // Replace with actual API key
            AccessToken: "123", // Replace with actual access token
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
      dispatch(editStudentAction(studentId)); // Fetch student details for editing
      setShowEditStudent(true);
    }
  };

  // Close EditStudent component & refresh student list
  const handleCloseEditStudent = () => {
    setShowEditStudent(false);
    setSelectedStudentId(null);
    // dispatch(fetchStudent()); // Refresh student list after editing
  };

  if (!studentId) return <p className="text-danger text-center">Error: Student ID is missing!</p>;

  return (
    <div>
      <StudentHeader />
      <div className="d-flex">
        <Sidebar />
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
                      src={`data:image/jpeg;base64,${profileImage}`} // Display base64 image
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
                  <Col md={4}><strong>Date of Birth:</strong><p>{formatDate(studentData?.dob)}</p></Col>
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
        <EditStudent
          show={showEditStudent}
          handleClose={handleCloseEditStudent}
          studentId={selectedStudentId}
        />
      )}
    </div>
  );
};

export default StudentSettings;
