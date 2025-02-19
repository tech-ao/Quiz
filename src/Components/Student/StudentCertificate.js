import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import SidePannel from "./StudnetSidebar";
import StudentHeader from "./StudentHeader";
import { FaEye, FaDownload } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfileData } from "../../redux/Action/ProfileAction";
import { getStudent } from "../../redux/Services/api";
import "./StudentCertificate.css";

const StudentCertificate = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [studentId, setStudentId] = useState(localStorage.getItem("studentId") || null);
  const [studentData, setStudentData] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const studentCertificates = [
    { id: 1, name: "Math Quiz", level: "Advanced", certifiedDate: "2024-01-15", percentage: "95%", school: "ABC Academy" },
    { id: 2, name: "Participate", level: "Intermediate", certifiedDate: "2024-01-10", percentage: "88%", school: "XYZ Institute" },
    { id: 3, name: "Rank Holder", level: "Beginner", certifiedDate: "2024-01-05", percentage: "90%", school: "Tech School" },
    { id: 4, name: "Zone level", level: "Advanced", certifiedDate: "2023-12-20", percentage: "97%", school: "Global Academy" },
  ];

  // Get studentId from state or localStorage without refresh
  useEffect(() => {
    const newStudentId = location.state?.userData?.studentId || localStorage.getItem("studentId");
    if (newStudentId && newStudentId !== studentId) {
      setStudentId(newStudentId);
      localStorage.setItem("studentId", newStudentId);
    }
  }, [location.state]);

  // Fetch student data when studentId updates
  useEffect(() => {
    if (!studentId) {
      setError("Student ID is missing");
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

  // Handle sidebar visibility for responsive design
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

  const handlePreview = (cert) => {
    alert(`Previewing certificate for ${cert.name}`);
  };

  const handleDownload = (cert) => {
    alert(`Downloading certificate for ${cert.name}`);
  };

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {isSidebarVisible && <SidePannel studyModeId={studentData?.studyModeId} />}

        <Container className="main-container p-4">
          <div className="sticky-header">
            <Row className="mb-4">
              <Col>
                <h2 className="fw-bold">Student Certificates</h2>
              </Col>
            </Row>
          </div>

          {loading && (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div className="text-center mt-5">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}

          {!loading && !error && (
            <div className="sub-container">
              <Row>
                {studentCertificates.map((cert) => (
                  <Col md={4} sm={6} xs={12} key={cert.id} className="mb-4">
                    <Card className="p-3 text-center shadow-sm">
                      <Card.Body>
                        <h5 className="text-success">{cert.name}</h5>
                        <p><strong>Level:</strong> {cert.level}</p>
                        <p><strong>Certified Date:</strong> {cert.certifiedDate}</p>
                        <p><strong>Percentage:</strong> {cert.percentage}</p>
                        <p><strong>School:</strong> {cert.school}</p>
                        <div className="d-flex justify-content-center gap-3">
                          <FaEye size={20} className="text-info cursor-pointer" onClick={() => handlePreview(cert)} />
                          <FaDownload size={20} className="text-success cursor-pointer" onClick={() => handleDownload(cert)} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default StudentCertificate;
