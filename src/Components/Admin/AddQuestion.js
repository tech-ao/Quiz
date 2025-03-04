import React, { useState, useEffect } from "react";
import { Card, Form, Button, InputGroup, Table, Image, Row, Col, Modal, Container } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./AddQuestion.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
// import { toggleSidebar, isSidebarVisible } from "./SidebarState";


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

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(storedQuestions);
  }, []);

  const handleStoreNumber = () => {
    if (currentNumber.trim() !== "") {
      setStoredNumbers([...storedNumbers, currentNumber]);
      setCurrentNumber("");
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

  const handleSubmitQuestion = () => {
    if (storedNumbers.length > 0 && answer.trim() !== "") {
      const newQuestion = {
        id: questions.length + 1,
        level,
        question: storedNumbers.join(", "),
        answer,
        note,
        image: imagePreview,
      };

      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));

      setStoredNumbers([]);
      setAnswer("");
      setNote("");
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
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
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));
      setShowModal(false);
    }
  };
  const filteredQuestions = filterLevel === "All" ? questions : questions.filter(q => q.level === filterLevel);

  return (
    
    <div>
  <AdminHeader toggleSidebar={toggleSidebar} />
  <div className="d-flex">
    {isSidebarVisible && <Sidebar />}
    <Container className="main-container" >
      <div className="sub-container" >
        {/* Admin Dashboard Title */}
        <Row className="sticky-title align-items-center mb-4">
          <Col>
            <h2 className="fw-bold text-left"> Questions List</h2>
          </Col>
        </Row>

        {/* Create Question Form */}
        {/* <Card className="card-spacing shadow p-5 mb-5" style={{ backgroundColor: "rgba(226, 228, 228, 0.836)" }}> */}
          <Card.Body className="p-3  mb-5 card-spacing shadow">
          <Card.Title className="text-primary fw-bold mb-4">Create Questions</Card.Title>
            {/* Select Level */}
            <Form.Label className="fw-bold mt-3">Select Level:</Form.Label>
            <Form.Select value={level} onChange={(e) => setLevel(e.target.value)}>
              {[...Array(6).keys()].map(i => <option key={i} value={`Level ${i+1}`}>Level {i+1}</option>)}
            </Form.Select>

            {/* Input Fields */}
            <Row className="g-4 mt-0">
              <Col xs={12} md={6}>
                <Form.Label className="fw-bold">Type Question:</Form.Label>
                <InputGroup>
                  <Form.Control type="number" placeholder="Enter a number" value={currentNumber} onChange={(e) => setCurrentNumber(e.target.value)} />
                  <Button variant="success " className="plusicon" onClick={handleStoreNumber}><FaPlus /></Button>
                </InputGroup>
                {storedNumbers.length > 0 && <p><strong>Question:</strong> {storedNumbers.join(", ")}</p>}
              </Col>

              <Col xs={12} md={6}>
                <Form.Label className="fw-bold">Upload Image:</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && <Image src={imagePreview} alt="Uploaded" fluid className="mt-2" width="100" height="100" />}
              </Col>
            </Row>

            {/* Answer & Note */}
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

            {/* Buttons */}
            <div className="d-flex justify-content-end  mt-5 gap-3 flex-wrap fw-bold">
              <Button variant="success" onClick={handleSubmitQuestion}>Submit</Button>
              <Button variant="outline-secondary" onClick={() => { setStoredNumbers([]); setAnswer(""); setNote(""); }}>Reset</Button>
              <Button variant="danger" onClick={handleSubmitQuestion}>Cancel</Button>
            </div>
          </Card.Body>
        {/* </Card> */}

        {/* Stored Questions Table */}
        {/* <Card className="card-spacing shadow p-5" style={{ backgroundColor: "rgba(226, 228, 228, 0.836)" }}> */}
          <Card.Body className="p-3  card-spacing shadow">
            {/* <Row className="mb-4"> */}
              <Col md={6}>
                <Card.Title className="text-primary fw-bold mb-4">Stored Questions</Card.Title>
              </Col>
              <Col md={6} className="text-md-end">
                <Form.Select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} style={{ width: "230px" }}>
                  <option value="All">All Levels</option>
                  {[...Array(6).keys()].map(i => <option key={i} value={`Level ${i+1}`}>Level {i+1}</option>)}
                </Form.Select>
              </Col>
            {/* </Row> */}

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table striped bordered hover responsive>
                <thead style={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
                  <tr className="fw-bold">
                    <th>#</th>
                    <th>Level</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Note</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{q.level}</td>
                        <td>{q.question}</td>
                        <td>{q.answer}</td>
                        <td>{q.note}</td>
                        <td>{q.image && <Image src={q.image} alt="No Image" width="50" height="50" />}</td>
                        <td className="py-3">
                          <Button variant="outlined" size="sm" className="ms-2" onClick={() => handleEditQuestion(q)}><FaEdit /></Button>
                          <Button variant="outlined" size="sm" className="ms-2" onClick={() => handleDeleteQuestion(q.id)}><FaTrash /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No Data found for the selected level.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        {/* </Card> */}

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
                  {[...Array(6).keys()].map(i => <option key={i} value={`Level ${i+1}`}>Level {i+1}</option>)}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">Question:</Form.Label>
                <Form.Control type="text" value={selectedQuestion?.question || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, question: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">Answer:</Form.Label>
                <Form.Control type="text" value={selectedQuestion?.answer || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">Note:</Form.Label>
                <Form.Control as="textarea" rows={2} value={selectedQuestion?.note || ""} onChange={(e) => setSelectedQuestion({ ...selectedQuestion, note: e.target.value })} />
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