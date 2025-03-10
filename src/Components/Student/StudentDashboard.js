import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../../Style.css";
import StudentHeader from "./StudentHeader";
import StudentSidePannel from "./StudnetSidebar";
import { useLocation } from "react-router-dom";
import { getProfileData } from "../../redux/Action/ProfileAction";
import { getStudent } from "../../redux/Services/api";
import { useDispatch, useSelector } from "react-redux";

const StudentDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = useSelector((state) => state.profile);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  
    useEffect(() => {
      const handleResize = () => {
        // Sidebar visible only for screens 1024px and above
        setIsSidebarVisible(window.innerWidth >= 1024);
        setIsSmallScreen(window.innerWidth < 768);
        setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

 

  // Set studentId immediately from localStorage or location.state
  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    const newStudentId = location.state?.userData?.studentId || storedStudentId;

    if (newStudentId) {
      localStorage.setItem("studentId", newStudentId); // Store for persistence
      setStudentId(newStudentId);
    } else {
      setError("Student ID is missing");
      setLoading(false);
    }
  }, [location.state]);

  // Fetch student data only if studentId is available
  useEffect(() => {
    if (!studentId) {
      setLoading(false); // Stop loading if no studentId
      return;
    }

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

  // Profile image handling
  const profileImage = profile.data?.data
    ? `data:image/png;base64,${profile.data.data}`
    : "https://via.placeholder.com/150"; // Default placeholder

  // Compute the full name from firstName and lastName
  const fullName = `${studentData.firstName || ""} ${studentData.lastName || ""}`.trim();

  return (
    <div>
      {/* Pass fullName to the header */}
      <StudentHeader toggleSidebar={toggleSidebar} studentName={fullName || "Loading..."} />
      <div className="d-flex">
        {isSidebarVisible && <StudentSidePannel studyModeId={studentData?.studyModeId} />}
        <Container className="main-container ">

        <div className="sticky-header" style={{
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 1000,
            padding: "20px 0",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {fullName} Dashboard
          </div>
          <div className="sub-container">
            {error ? (
              <p className="text-danger">Error: {error}</p>
            ) : (
              <>
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
                        <Col xs={6}>
                          <p>
                            <strong>Name:</strong>{" "}
                            {fullName || "N/A"}
                          </p>
                        </Col>
                        <Col xs={6}>
                          <p>
                            <strong>Date of Birth:</strong>{" "}
                            {studentData.dob ? new Date(studentData.dob).toLocaleDateString('en-GB') : "N/A"}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6}>
                          <p>
                            <strong>Email:</strong> {studentData.email || "N/A"}
                          </p>
                        </Col>
                        <Col xs={6}>
                          <p>
                            <strong>Phone:</strong> {studentData.phoneNumber || "N/A"}
                          </p>
                        </Col>
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
              </>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
