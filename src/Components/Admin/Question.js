import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import "./Question.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

const QuestionListPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 768
  );
  const [questions, setQuestions] = useState([
    { id: 1, level: 1, details: [1, -4, 3, 7, -3, 2] },
    { id: 2, level: 2, details: [2, -5, 6, 8, -2, 4] },
    { id: 3, level: 3, details: [3, -6, 7, 9, -1, 5] },
    { id: 4, level: 4, details: [4, -7, 8, 10, 0, 6] },
    { id: 5, level: 5, details: [5, -8, 9, 11, 1, 7] },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showDetailsContainer, setShowDetailsContainer] = useState(false);
  const [newDetail, setNewDetail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewDetails = (question) => {
    setSelectedQuestion(question);
    setShowDetailsContainer(true);
  };

  const handleAddDetail = () => {
    if (!newDetail.trim()) {
      alert("Please enter a valid detail!");
      return;
    }
    setSelectedQuestion((prev) => ({
      ...prev,
      details: [...prev.details, newDetail],
    }));
    setNewDetail("");
  };

  const handleSaveChanges = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === selectedQuestion.id ? selectedQuestion : q))
    );
    setShowDetailsContainer(false);
  };

  const handleModalUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data)) {
          throw new Error("Invalid file format. Expected an array of questions.");
        }
        setQuestions((prev) => [
          ...prev,
          ...data.map((q, index) => ({
            id: prev.length + index + 1,
            level: selectedLevel,
            details: q.details || [],
          })),
        ]);
        setUploadError("");
        setShowModal(false);
      } catch (error) {
        setUploadError("Error reading file: Invalid JSON format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4 min-vh-100">
          {!showDetailsContainer ? (
            <div>
              <Row className="align-items-center mb-4">
                <Col>
                  <h2>Question List</h2>
                </Col>
                <Col className="text-end">
                  <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                  >
                    Add Question
                  </Button>
                </Col>
              </Row>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>Level {question.level}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleViewDetails(question)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div>
              <Row className="align-items-center mb-4">
                <Col>
                  <h3>Details for Level {selectedQuestion.level}</h3>
                </Col>
                <Col className="text-end">
                  <Button
                    variant="secondary"
                    onClick={() => setShowDetailsContainer(false)}
                  >
                    Back
                  </Button>
                </Col>
              </Row>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedQuestion.details.join(", ")}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() =>
                          setSelectedQuestion((prev) => ({
                            ...prev,
                            details: [],
                          }))
                        }
                      >
                        Clear All
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Form className="mt-4">
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter new detail"
                      value={newDetail}
                      onChange={(e) => setNewDetail(e.target.value)}
                    />
                  </Col>
                  <Col className="text-end">
                    <Button variant="success" onClick={handleAddDetail}>
                      Add Detail
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div className="text-end mt-4">
                <Button variant="success" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Modal for Adding Questions */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Level</Form.Label>
              <Form.Select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Questions (JSON)</Form.Label>
              <Form.Control
                type="file"
                accept=".json"
                onChange={handleModalUpload}
              />
            </Form.Group>
            {uploadError && <div className="text-danger mt-2">{uploadError}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuestionListPage;
