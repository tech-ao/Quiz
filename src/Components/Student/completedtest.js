import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import SidePannel from "./StudnetSidebar";
import StudentHeader from "./StudentHeader";
import { getProfileData } from "../../redux/Action/ProfileAction";
import { getStudent } from "../../redux/Services/api";
import "./completedtest.css"; // Updated CSS file name

const CompletedTest = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [tests, setTests] = useState([
    { id: 1, name: "Math Quiz", level: 1, date: "2025-01-25", duration: "30 mins", totalQuestions: 10, details: [] },
    { id: 2, name: "Science Test", level: 2, date: "2025-01-26", duration: "45 mins", totalQuestions: 15, details: [] },
    { id: 3, name: "English Exam", level: 3, date: "2025-01-27", duration: "60 mins", totalQuestions: 20, details: [] },
    { id: 1, name: "Math Quiz", level: 1, date: "2025-01-25", duration: "30 mins", totalQuestions: 10, details: [] },
    { id: 2, name: "Science Test", level: 2, date: "2025-01-26", duration: "45 mins", totalQuestions: 15, details: [] },
    { id: 3, name: "English Exam", level: 3, date: "2025-01-27", duration: "60 mins", totalQuestions: 20, details: [] },
  ]);
  const [selectedTest, setSelectedTest] = useState(null);

  const [studentId, setStudentId] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div>
      <StudentHeader toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {isSidebarVisible && <SidePannel studyModeId={studentData?.studyModeId} />}

        <Container className="main-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <div className="sticky-header">
                <Row className="mb-4">
                  <Col>
                    <h2 className="fw-bold">Completed Test</h2>
                  </Col>
                </Row>
              </div>

              <div className="sub-container">
                <ListGroup className="test-list">
                  {tests.map((test) => (
                    <ListGroup.Item
                      key={test.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="test-info">
                        <div className="fw-bold">{test.name}</div>
                        <small className="text-muted">Date: {test.date}</small>
                        <small className="text-muted" style={{ marginLeft: "15px" }}>
                          Level: {test.level}
                        </small>
                        <small className="text-muted" style={{ marginLeft: "15px" }}>
                          Duration: {test.duration}
                        </small>
                        <small className="text-muted" style={{ marginLeft: "15px" }}>
                          Questions: {test.totalQuestions}
                        </small>
                      </div>
                      <div className="test-action">
                        <FaEye style={{ cursor: "pointer",marginRight:"20px" }} onClick={() => setSelectedTest(test)} />
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </>
          )}
        </Container>
      </div>

      {/* Modal for Full Test Details */}
      <Modal show={selectedTest !== null} onHide={() => setSelectedTest(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTest?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Date:</strong> {selectedTest?.date}</p>
          <p><strong>Level:</strong> {selectedTest?.level}</p>
          <p><strong>Duration:</strong> {selectedTest?.duration}</p>
          <p><strong>Questions:</strong> {selectedTest?.totalQuestions}</p>
          <hr />
          {selectedTest?.details && selectedTest.details.length > 0 ? (
            selectedTest.details.map((q, index) => (
              <div key={index} className="mb-3">
                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                <ul>
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <p><strong>Answer:</strong> {q.answer}</p>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompletedTest;
