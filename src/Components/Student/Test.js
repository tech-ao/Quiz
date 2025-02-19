import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SidePannel from "./StudnetSidebar";
import StudentHeader from "./StudentHeader";
import { getProfileData } from "../../redux/Action/ProfileAction";
import { getStudent } from "../../redux/Services/api";
import "./Test.css"; // Ensure this file includes the sticky header styles

const Test = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [tests, setTests] = useState([
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
      setIsSidebarVisible(window.innerWidth >= 768);
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

        <Container className="main-container p-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <div className="sticky-header">
                <Row className="mb-4">
                  <Col>
                    <h2 className="fw-bold">Test List</h2>
                  </Col>
                </Row>
              </div>

              <div className="sub-container">
                {!selectedTest ? (
                  <Row>
                    {tests.map((test) => (
                      <Col md={4} key={test.id} className="mb-4">
                        <Card className="shadow-sm p-3">
                          <Card.Body>
                            <Card.Title className="fw-bold">{test.name}</Card.Title>
                            <Card.Text>
                              <strong>Date:</strong> {test.date}<br />
                              <strong>Level:</strong> {test.level}<br />
                              <strong>Duration:</strong> {test.duration}<br />
                              <strong>Questions:</strong> {test.totalQuestions}
                            </Card.Text>
                            <Button variant="success" onClick={() => setSelectedTest(test)}>
                              View Test
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div>
                    <Button variant="secondary" className="mb-3" onClick={() => setSelectedTest(null)}>
                      Back to Tests
                    </Button>
                    <h3 className="fw-bold">{selectedTest.name}</h3>
                    <p><strong>Date:</strong> {selectedTest.date}</p>
                    <p><strong>Level:</strong> {selectedTest.level}</p>
                    <p><strong>Duration:</strong> {selectedTest.duration}</p>
                    <p><strong>Questions:</strong> {selectedTest.totalQuestions}</p>
                    <hr />
                    {selectedTest.details.length > 0 ? (
                      selectedTest.details.map((q, index) => (
                        <Card className="mb-3" key={index}>
                          <Card.Body>
                            <Card.Text>
                              <strong>Q{index + 1}:</strong> {q.question}
                            </Card.Text>
                            <ul>
                              {q.options.map((opt, idx) => (
                                <li key={idx}>{opt}</li>
                              ))}
                            </ul>
                            <p><strong>Answer:</strong> {q.answer}</p>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p>No questions available.</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Test;
