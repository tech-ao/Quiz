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

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleCloseEditStudent = () => {
    setShowEditStudent(false);
    setSelectedStudentId(null);
  };

  // Retrieve Student ID and Fetch Data
  useEffect(() => {
    let storedStudentId = localStorage.getItem("studentId");

    if (studentData?.userId) {
      setStudentId(studentData.userId);
      localStorage.setItem("studentId", studentData.userId);
    } else if (storedStudentId) {
      setStudentId(storedStudentId);
      dispatch(fetchStudent(storedStudentId));
    } else {
      setError("Student ID is missing!");
    }
  }, [dispatch, studentData?.userId]);

  // Fetch profile image only when studentId is available
  useEffect(() => {
    if (!studentId) return;

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Profile/GetContentByUserId?userId=${studentId}`, {
          headers: {
            accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        });

        if (response.data?.data) {
          setProfileImage(response.data.data);
        } else {
          setProfileImage(null);
        }
      } catch (err) {
        setError("Failed to load profile image");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [studentId]);

  // Open EditStudent component
  const handleOpenEditStudent = () => {
    if (studentId) {
      setSelectedStudentId(studentId);
      dispatch(editStudentAction(studentId));
      setShowEditStudent(true);
    }
  };

  if (!studentId) {
    return <p className="text-danger text-center">Error: Student ID is missing!</p>;
  }

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {isSidebarVisible && <Sidebar studyModeId={studentData?.studyModeId}/>}
        <Container className="main-container p-4 min-vh-100">           
          {/* Moved Sticky Header to main-container */}
          <div className="sticky-header d-flex justify-content-between align-items-center">
            <h2 className="fw-bold text-dark">Student Settings</h2>
            <FaEdit
              size={24}
              className="text-primary cursor-pointer"
              onClick={handleOpenEditStudent}
            />
          </div>
          <div className="sub-container">
           

            <Card className="p-4">
              <Card.Body className="d-flex flex-column align-items-center">
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

                <Row className="mt-4 w-100">
                  <Col md={4}>
                    <strong>First Name:</strong>
                    <p>{studentData?.firstName || "N/A"}</p>
                  </Col>
                  <Col md={4}>
                    <strong>Last Name:</strong>
                    <p>{studentData?.lastName || "N/A"}</p>
                  </Col>
                  <Col md={4}>
                    <strong>Email:</strong>
                    <p>{studentData?.email || "N/A"}</p>
                  </Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}>
                    <strong>Phone:</strong>
                    <p>{studentData?.countryCode} {studentData?.phoneNumber || "N/A"}</p>
                  </Col>
                  <Col md={4}>
                    <strong>Date of Birth:</strong>
                    <p>
                      {studentData?.dob 
                        ? new Date(studentData.dob).toLocaleDateString('en-GB')
                        : "N/A"}
                    </p>
                  </Col>
                  <Col md={4}>
                    <strong>Gender:</strong>
                    <p>{studentData?.genderName || "N/A"}</p>
                  </Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}>
                    <strong>Register Number:</strong>
                    <p>{studentData?.registerNumber || "N/A"}</p>
                  </Col>
                  <Col md={4}>
                    <strong>Grade:</strong>
                    <p>{studentData?.gradeName || "N/A"}</p>
                  </Col>
                  <Col md={4}>
                    <strong>Status:</strong>
                    <p>{studentData?.statusName || "N/A"}</p>
                  </Col>
                </Row>

                <Row className="mt-3 w-100">
                  <Col md={4}>
                    <strong>Address:</strong>
                    <p>{studentData?.address || "N/A"}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>

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
