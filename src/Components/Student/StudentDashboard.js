import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import "../../Style.css";
import StudentHeader from "./StudentHeader";
import Header from "../Admin/AdminHeader";
import StudentSidePannel from "./StudnetSidebar";
import { useLocation } from "react-router-dom";
import { getProfileData } from '../../redux/Action/ProfileAction';
import { getStudent } from "../../redux/Services/api";
import { useDispatch, useSelector } from 'react-redux';

const StudentDashboard = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const dispatch = useDispatch();

  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = useSelector(state => state.profile);
  console.log(profile);

  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  
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

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch student data via getStudent API
        const studentResponse = await getStudent(userData.studentId);
        setStudentData(studentResponse.data); // Update studentData with the API response

        dispatch(getProfileData(userData.studentId));

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [userData.studentId, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(studentData, profile);

  // Check if profile data contains the base64 string correctly
  const profileImage = profile.data && typeof profile.data === 'string' 
    ? profile.data 
    : profile.data?.imageBase64 || null;  // Assuming profile.data.imageBase64 contains the image

  return (
 
    <div>
    {/* Admin Header with Toggle Sidebar */}
    <StudentHeader toggleSidebar={toggleSidebar} />
    <div className="d-flex">
      {isSidebarVisible &&  <StudentSidePannel studyModeId={studentData?.studyModeId} />}
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
                    {profileImage ? (
                      <Image
                        src={profileImage.startsWith("data:image")
                          ? profileImage // If base64 string is already in correct format
                          : `data:image/jpeg;base64,${profileImage}`} 
                        roundedCircle
                        alt="Student"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src="https://via.placeholder.com/150" 
                        roundedCircle
                        alt="Student"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </Col>

                <Col md={7}>
                  <Row>
                    <Col xs={6}>
                      <p>
                        <strong>Name:</strong> {studentData.firstName || "N/A"}
                      </p>
                    </Col>
                    <Col xs={6}>
                      <p>
                        <strong>Date of Birth:</strong> {studentData.dob || "N/A"}
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

                <Col md={2} className="text-center">
                  <Button variant="success">Edit</Button>
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
