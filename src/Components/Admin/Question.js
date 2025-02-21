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
    { id: 1, level: 1, details: [{ question: "1 + 5 + 3", options: ["7", "12", "9", "10"], answer: "9" }] },
    { id: 2, level: 2, details: [] },
    { id: 3, level: 3, details: [] },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showDetailsContainer, setShowDetailsContainer] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSingleQuestionModal, setShowSingleQuestionModal] = useState(false);
  const [currentDetail, setCurrentDetail] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [file, setFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

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
    if (
      !currentDetail.question.trim() ||
      currentDetail.options.some((opt) => !opt.trim()) ||
      !currentDetail.answer.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    setSelectedQuestion((prev) => ({
      ...prev,
      details: editIndex !== null
        ? prev.details.map((detail, idx) =>
            idx === editIndex ? currentDetail : detail
          )
        : [...prev.details, currentDetail],
    }));
    setCurrentDetail({ question: "", options: ["", "", "", ""], answer: "" });
    setEditIndex(null);
    setShowEditModal(false);
  };

  const handleDeleteDetail = (index) => {
    setSelectedQuestion((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const handleEditDetail = (detail, index) => {
    setCurrentDetail(detail);
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === selectedQuestion.id ? selectedQuestion : q))
    );
    setShowDetailsContainer(false);
  };

  const handleAddQuestion = () => {
    if (!file) {
      alert("Please upload a file!");
      return;
    }

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
      } catch (error) {
        alert("Error reading file: Invalid JSON format.");
      }
    };
    reader.readAsText(file);
    setFile(null);
    setShowAddQuestionModal(false);
  };

  const handleAddSingleQuestion = () => {
    if (
      !currentDetail.question.trim() ||
      currentDetail.options.some((opt) => !opt.trim()) ||
      !currentDetail.answer.trim()
    ) {
      alert("All fields are required!");
      return;
    }
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        level: selectedLevel,
        details: [currentDetail],
      },
    ]);
    setCurrentDetail({ question: "", options: ["", "", "", ""], answer: "" });
    setShowSingleQuestionModal(false);
  };

  return (
    <div>
      <AdminHeader toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container p-4">
{/* Sticky Header */}
<div className="sticky-header">
    <Row className="align-items-center">
      <Col xs={6}>
        <h2>Question List</h2>
      </Col>
      <Col xs={6} className="text-end">
        <Button
          variant="success"
          style={{marginTop:"20px"}}
          onClick={() => setShowAddQuestionModal(true)}
        >
          Add Question
        </Button>
      </Col>
    </Row>
  </div>

          {!showDetailsContainer ? (
            
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Level</th>
                    <th>Total Questions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>Level {question.level}</td>
                      <td>{question.details.length}</td>
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
            
          ) : (
            <div>
              <Row className="align-items-center mb-4">
                <Col xs={6}>
                  <h3>Details for Level {selectedQuestion.level}</h3>
                </Col>
                <Col xs={6} className="text-end">
                  <Button
                    variant="success"
                    onClick={() => setShowSingleQuestionModal(true)}
                  >
                    Add Single Question
                  </Button>
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
                    <th>Question</th>
                    <th>Options</th>
                    <th>Answer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQuestion.details.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.question}</td>
                      <td>{detail.options.join(", ")}</td>
                      <td>{detail.answer}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEditDetail(detail, index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteDetail(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-end">
                <Button
                  variant="success"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Add Question Modal */}
      <Modal show={showAddQuestionModal} onHide={() => setShowAddQuestionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Questions (File)</Modal.Title>
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
            <Form.Group className="mb-3">
              <Form.Label>Upload Questions (JSON)</Form.Label>
              <Form.Control
                type="file"
                accept=".json"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddQuestionModal(false)}
          >
            Close
          </Button>
          <Button variant="success" onClick={handleAddQuestion}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Single Question Modal */}
      <Modal show={showSingleQuestionModal} onHide={() => setShowSingleQuestionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Single Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={currentDetail.question}
                onChange={(e) =>
                  setCurrentDetail((prev) => ({ ...prev, question: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Options</Form.Label>
              {currentDetail.options.map((option, idx) => (
                <Form.Control
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  className="mb-2"
                  value={option}
                  onChange={(e) =>
                    setCurrentDetail((prev) => {
                      const newOptions = [...prev.options];
                      newOptions[idx] = e.target.value;
                      return { ...prev, options: newOptions };
                    })
                  }
                />
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter answer"
                value={currentDetail.answer}
                onChange={(e) =>
                  setCurrentDetail((prev) => ({ ...prev, answer: e.target.value }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSingleQuestionModal(false)}
          >
            Close
          </Button>
          <Button variant="success" onClick={handleAddSingleQuestion}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Question Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={currentDetail.question}
                onChange={(e) =>
                  setCurrentDetail((prev) => ({ ...prev, question: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Options</Form.Label>
              {currentDetail.options.map((option, idx) => (
                <Form.Control
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  className="mb-2"
                  value={option}
                  onChange={(e) =>
                    setCurrentDetail((prev) => {
                      const newOptions = [...prev.options];
                      newOptions[idx] = e.target.value;
                      return { ...prev, options: newOptions };
                    })
                  }
                />
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter answer"
                value={currentDetail.answer}
                onChange={(e) =>
                  setCurrentDetail((prev) => ({ ...prev, answer: e.target.value }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
          >
            Close
          </Button>
          <Button variant="success" onClick={handleAddDetail}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuestionListPage;
