import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../../Style.css";
import StudentHeader from "./StudentHeader";
import StudentSidePannel from "./StudnetSidebar";
import { useLocation } from "react-router-dom";
import { getProfileData } from '../../redux/Action/ProfileAction';
import { getStudent } from "../../redux/Services/api";
import { useDispatch, useSelector } from 'react-redux';

const StudentDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [studentId, setStudentId] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = useSelector(state => state.profile);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);

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

  useEffect(() => {
    // Try to get studentId from location state first
    const storedStudentId = localStorage.getItem("studentId");

    if (location.state?.userData?.studentId) {
      const newStudentId = location.state.userData.studentId;
      localStorage.setItem("studentId", newStudentId); // Store in localStorage
      setStudentId(newStudentId);
    } else if (storedStudentId) {
      setStudentId(storedStudentId); // Use stored ID if available
    } else {
      setError("Student ID is missing");
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    if (!studentId) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentResponse = await getStudent(studentId);
        setStudentData(studentResponse.data);
        dispatch(getProfileData(studentId));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [studentId, dispatch]);

  if (!studentId) return <p className="text-danger">Error: Student ID is missing!</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  console.log(studentData, profile);

  const profileImage = profile.data?.data 
    ? `data:image/png;base64,${profile.data.data}`
    : "https://via.placeholder.com/150"; // Default placeholder

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} studentName={studentData.firstName} />
      <div className="d-flex">
        {isSidebarVisible && <StudentSidePannel studyModeId={studentData?.studyModeId} />}
        <Container className="main-container p-4 min-vh-100">
          <div className="sub-container">
            <Card className="mb-4 p-4">
              <Row className="align-items-center">
                <Col md={3} className="text-center">
                  <div
                    style={{
                      border: "5px solid #4caf50",
                      borderRadius: "50%",
                      padding: "5px",
                      display: "inline-block",
                    }}
                  >
                    <Image
                      src={profileImage}
                      roundedCircle
                      alt="Student"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  </div>
                </Col>

                <Col md={7}>
                  <Row>
                    <Col xs={6}><p><strong>Name:</strong> {studentData.firstName || "N/A"}</p></Col>
                    <Col xs={6}><p><strong>Date of Birth:</strong> {studentData.dob ? new Date(studentData.dob).toLocaleDateString('en-GB') : "N/A"}</p></Col>                  </Row>
                  <Row>
                    <Col xs={6}><p><strong>Email:</strong> {studentData.email || "N/A"}</p></Col>
                    <Col xs={6}><p><strong>Phone:</strong> {studentData.phoneNumber || "N/A"}</p></Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Row className="g-3">
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center bg-pink shadow">
                  <Card.Body>
                    <Card.Title>Total Marks</Card.Title>
                    <Card.Text>{studentData.totalMarks || 10}%</Card.Text> 
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <Card.Title>Attendance</Card.Title>
                    <Card.Text>{studentData.attendance || 20}%</Card.Text> 
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <Card.Title>Quizzes Completed</Card.Title>
                    <Card.Text>{studentData.quizzesCompleted || 30}</Card.Text> 
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <Card.Title>Rank</Card.Title>
                    <Card.Text>{studentData.rank || 3}</Card.Text> 
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
