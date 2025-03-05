import React, { useState, useEffect } from "react";
import { Card, Form, Button, InputGroup, Table, Image, Row, Col, Modal, Container } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./AddQuestion.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";


 const AddQuestion = () => {
 const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [questions, setQuestions] = useState([]);
  const [filterLevel, setFilterLevel] = useState("All");
  const [currentNumber, setCurrentNumber] = useState("");
  const [storedNumbers, setStoredNumbers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [level, setLevel] = useState("Level 1");
  const [answer, setAnswer] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [questionSetId, setQuestionSetId] = useState("");
  const [no, setNo] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://santhwanamhhcs.in:8081/api/ImportExcel/GetQuestionSet", {
          method: "GET",
          headers: {
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            AccessToken: "123",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const result = await response.json();
        if (result.isSuccess) {
          setQuestions(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleStoreNumber = () => {
    if (currentNumber.trim() !== "") {
      console.log("Adding number:", currentNumber); // Debugging log
      setStoredNumbers([...storedNumbers, currentNumber]);
      setCurrentNumber("");
    } else {
      console.log("Current number is empty, not adding."); // Debugging log
    }
  };

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitQuestion = async () => {
    console.log("Stored Numbers:", storedNumbers); 
    console.log("Answer:", answer); 

    if (storedNumbers.length > 0 && answer.trim() !== "" && questionSetId.trim() !== "" && no.trim() !== "") {
      const newQuestion = {
        questionSetId: parseInt(questionSetId), 
        no: parseInt(no), 
        questions: storedNumbers.join(", "),
        answer: parseInt(answer), 
        level: level,
        note: note,
        image: imagePreview,
      };

      try {
        const response = await fetch("http://santhwanamhhcs.in:8081/api/ImportExcel/CreateNewQuestion", {
          method: "POST",
          headers: {
            Accept: "text/plain",
            "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        });

        if (!response.ok) {
          throw new Error("Failed to add question");
        }

        const result = await response.json();
        console.log("Question added successfully:", result);

        // Update local state
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setStoredNumbers([]);
        setAnswer("");
        setNote("");
        setImage(null);
        setImagePreview(null);
        setQuestionSetId("");
        setNo("");
      } catch (error) {
        console.error("Error adding question:", error);
        alert("Failed to add question. Please try again.");
      }
    } else {
      alert("Please fill all fields."); // Alert if fields are empty
    }
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion({ ...question });
    setImagePreview(question.image || null);
    setShowModal(true);
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedQuestion({ ...selectedQuestion, image: URL.createObjectURL(file) });
    }
  };

  const handleSaveEdit = () => {
    if (selectedQuestion) {
      const updatedQuestions = questions.map((q) =>
        q.id === selectedQuestion.id ? selectedQuestion : q
      );
      setQuestions(updatedQuestions);
      setShowModal(false);
    }
  };

  const filteredQuestions = filterLevel === "All" ? questions : questions.filter(q => q.level === filterLevel);

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            <Row className="sticky-title align-items-center mb-4">
              <Col>
                <h2 className="fw-bold text-left"> Questions List</h2>
              </Col>
            </Row>

            {/* Create Question Form */}
            <Card.Body className="p-3 mb-5 card-spacing shadow">
              <Card.Title className="text-primary fw-bold mb-4">Create Questions</Card.Title>
              <Form.Label className="fw-bold mt-3">Select Level:</Form.Label>
              <Form.Select value={level} onChange={(e) => setLevel(e.target.value)}>
                {[...Array(6).keys()].map(i => <option key={i} value={`Level ${i + 1}`}>Level {i + 1}</option>)}
              </Form.Select>

              <Row className="g-4 mt-0">
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Question Set ID:</Form.Label>
                  <Form.Control type="number" placeholder="Enter Question Set ID" value={questionSetId} onChange={(e) => setQuestionSetId(e.target.value)} />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">No:</Form.Label>
                  <Form.Control type="number" placeholder="Enter No" value={no} onChange={(e) => setNo(e.target.value)} />
                </Col>
              </Row>

              <Row className="g-4 mt-0">
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Type Question:</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" placeholder="Enter a number" value={currentNumber} onChange={(e) => setCurrentNumber(e.target.value)} />
                    <Button variant="success" className="plusicon" onClick={handleStoreNumber}><FaPlus /></Button>
                  </InputGroup>
                  {storedNumbers.length > 0 && <p><strong>Question:</strong> {storedNumbers.join(", ")}</p>}
                </Col>

                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Upload Image:</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                  {imagePreview && <Image src={imagePreview} alt="Uploaded" fluid className="mt-2" width="100" height="100" />}
                </Col>
              </Row>

              <Row className="g-4 mt-0">
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Set Answer:</Form.Label>
                  <Form.Control type="text" placeholder="Enter the answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="fw-bold">Note:</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)} />
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-5 gap-3 flex-wrap fw-bold">
                <Button variant="success" onClick={handleSubmitQuestion}>Submit</Button>
                <Button variant="outline-secondary" onClick={() => { setStoredNumbers([]); setAnswer(""); setNote(""); setQuestionSetId(""); setNo(""); }}>Reset</Button>
                <Button variant="danger" onClick={() => setStoredNumbers([])}>Cancel</Button>
              </div>
            </Card.Body>

            {/* Stored Questions Table */}
            <Card.Body className="p-3 card-spacing shadow">
              <Col md={6}>
                <Card.Title className="text-primary fw-bold mb-4">Stored Questions</Card.Title>
              </Col>
              <Col md={6} className="text-md-end">
                <Form.Select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} style={{ width: "230px" }}>
                  <option value="All">All Levels</option>
                  {[...Array(6).keys()].map(i => <option key={i} value={`Level ${i + 1}`}>Level {i + 1}</option>)}
                </Form.Select>
              </Col>

              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table striped bordered hover responsive>
                  <thead style={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
                    <tr className="fw-bold">
                     {/* Changed from # to Question ID */}
                      <th>#</th> {/* Added Question Set ID */}
                      <th>Level</th>
                      <th>Question</th> {/* Changed from Title to Question */}
                      <th>Answer</th> {/* Changed from Description to Answer */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map((q, index) => (
                        <tr key={q.id}>
                          {/* Display Question ID */}
                          <td>{q.questionSetId}</td> {/* Display Question Set ID */}
                          <td>{q.level}</td>
                          <td>{q.questions}</td> {/* Display Question */}
                          <td>{q.answer}</td> {/* Display Answer */}
                          <td className="py-3">
                            <Button variant="outlined" size="sm" className="ms-2" onClick={() => handleEditQuestion(q)}><FaEdit /></Button>
                            <Button variant="outlined" size="sm" className="ms-2" onClick={() => handleDeleteQuestion(q.id)}><FaTrash /></Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No Data found for the selected level.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>

            {/* Edit Question Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label className="fw-bold">Level:</Form.Label>
                    <Form.Select value={selectedQuestion?.level} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, level: e.target.value })}>
                      {[...Array(6).keys()].map(i => <option key={i} value={`Level ${i + 1}`}>Level {i + 1}</option>)}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="fw-bold">Question:</Form.Label>
                    <Form.Control type="text" value={selectedQuestion?.questions || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questions: e.target.value })} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="fw-bold">Answer:</Form.Label>
                    <Form.Control as="textarea" rows={2} value={selectedQuestion?.answer || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })} />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-3">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" className="ms-2" onClick={handleSaveEdit}>Save</Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddQuestion;