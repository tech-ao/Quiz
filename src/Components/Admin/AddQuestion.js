import React, { useState, useEffect } from "react";
import { Card, Form, Button, InputGroup, Table, Image, Row, Col, Modal, Container } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./AddQuestion.css";
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";

const BASE_URL = "http://srimathicare.in:8081";
const ACCESS_TOKEN = "123";
const API_KEY = "3ec1b120-a9aa-4f52-9f51-eb4671ee1280";

const API_URL_CREATE = `${BASE_URL}/api/ImportExcel/CreateNewQuestion`;
const API_URL_DELETE = (id) => `${BASE_URL}/api/ImportExcel/DeleteQuestion?questionId=${id}`;
const API_URL_UPDATE = (id) => `${BASE_URL}/api/ImportExcel/UpdateQuestion`;
const API_URL_SEARCH = `${BASE_URL}/api/SearchAndList/SearchAndListQuestions`;

const AddQuestion = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [questions, setQuestions] = useState([]);
  const [filterLevel, setFilterLevel] = useState("null"); // State for filtering
  const [currentNumber, setCurrentNumber] = useState("");
  const [storedNumbers, setStoredNumbers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [level, setLevel] = useState(1); // State for creating questions
  const [answer, setAnswer] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch questions based on filterLevel
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(API_URL_SEARCH, {
          method: "POST",
          headers: {
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level: filterLevel === "All" ? null : filterLevel, // Send null for "All" levels
            pagination: {
              pageSize: 15,
              pageNumber: currentPage,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const result = await response.json();
        if (result.isSuccess) {
          setQuestions(result.data.questions || []);
          setTotalPages(Math.ceil(result.data.totalCount / 15));
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [filterLevel, currentPage]); // Re-fetch when filterLevel or currentPage changes

  const handleStoreNumber = () => {
    if (currentNumber.trim() !== "") {
      setStoredNumbers([...storedNumbers, currentNumber]);
      setCurrentNumber("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleStoreNumber();
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
  if (storedNumbers.length > 0 && answer.trim() !== "") {
    const newQuestion = {
      questions: storedNumbers.join(", "),
      answer: parseInt(answer),
      level: level, 
      note: note,
      image: imagePreview,
    };

    try {
      const response = await fetch(API_URL_CREATE, {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        toast.error("Failed to add question", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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

      // Show success toast
      toast.success("Question added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    }
  } else {
    alert("Please fill all fields.");
  }
};
  const handleReset = () => {
    setStoredNumbers([]);
    setAnswer("");
    setNote("");
    setImage(null);
    setImagePreview(null);
  };

  const handleDeleteQuestion = async (id) => {
    if (!id) {
      console.error("Error: questionId is undefined.");
      alert("Error: Unable to delete question. ID is missing.");
      return;
    }
  
    console.log("Deleting question with ID:", id);
  
    try {
      const response = await fetch(API_URL_DELETE(id), {
        method: "POST",
        headers: {
          "X-Api-Key": API_KEY,
          "AccessToken": ACCESS_TOKEN,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
  
      const result = await response.json();
      console.log("Question deleted successfully:", result);
  
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.questionId !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
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

  const handleSaveEdit = async () => {
    if (selectedQuestion) {
      try {
        const response = await fetch(API_URL_UPDATE(selectedQuestion.id), {
          method: "PUT",
          headers: {
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json",
            AccessToken: ACCESS_TOKEN,
          },
          body: JSON.stringify(selectedQuestion),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update question");
        }
  
        const result = await response.json();
        console.log("Question updated successfully:", result);
  
        // Fetch updated data from API instead of updating local state manually
        const updatedResponse = await fetch(API_URL_SEARCH, {
          method: "POST",
          headers: {
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level: filterLevel === "All" ? null : filterLevel,
            pagination: {
              pageSize: 15,
              pageNumber: currentPage,
            },
          }),
        });
  
        const updatedData = await updatedResponse.json();
        if (updatedData.isSuccess) {
          setQuestions(updatedData.data.questions || []);
        }
  
        setShowModal(false);
      } catch (error) {
        console.error("Error updating question:", error);
        alert("Failed to update question. Please try again.");
      }
    }
  };

  // Filter questions based on filterLevel
 const filteredQuestions =
  filterLevel === "All"
    ? questions
    : questions.filter((q) => parseInt(q.level) === parseInt(filterLevel));

  return (
    <div>
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isSidebarVisible && <Sidebar />}
        <Container className="main-container">
          <div className="sub-container">
            {/* Create Question Section */}
            <div className="mb-5">
              <Row className="sticky-title align-items-center mb-4">
                <Col>
                  <h2 className="fw-bold text-left">Create Questions</h2>
                </Col>
              </Row>

              <Card.Body className="p-3 card-spacing shadow">
                <Form.Label className="fw-bold mt-3">Select Level:</Form.Label>
                <Form.Select value={level} onChange={(e) => setLevel(parseInt(e.target.value))}>
                  {[...Array(6).keys()].map((i) => (
                    <option key={i} value={i + 1}>Level {i + 1}</option>
                  ))}
                </Form.Select>

                <Row className="g-4 mt-0">
                  <Col xs={12} md={6}>
                    <Form.Label className="fw-bold">Type Question:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="Enter a number"
                        value={currentNumber}
                        onChange={(e) => setCurrentNumber(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      <Button variant="success" className="plusicon" onClick={handleStoreNumber}>
                        <FaPlus />
                      </Button>
                    </InputGroup>
                    {storedNumbers.length > 0 && (
                      <p>
                        <strong>Question:</strong> {storedNumbers.join(", ")}
                      </p>
                    )}
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Label className="fw-bold">Upload Image:</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && (
                      <Image src={imagePreview} alt="Uploaded" fluid className="mt-2" width="100" height="100" />
                    )}
                  </Col>
                </Row>

                <Row className="g-4 mt-0">
                  <Col xs={12} md={6}>
                    <Form.Label className="fw-bold">Set Answer:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="fw-bold">Note:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Add a note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-5 gap-3 flex-wrap fw-bold">
                  <Button variant="success" onClick={handleSubmitQuestion}>
                    Submit
                  </Button>
                  <Button variant="outline-secondary" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button variant="danger" onClick={() => setStoredNumbers([])}>
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </div>
            <div>
            <Row className="sticky-title align-items-center ">
                <Col>
                  <h2 className="fw-bold text-left">Stored Questions</h2>
                </Col>
              </Row>

  <Card.Body className="p-3 card-spacing shadow">
    <Row className="align-items-center mb-2">
      <Col md={6}>
        <Card.Title className="text-primary fw-bold">Questions List</Card.Title>
      </Col>
      <Col md={2} className="text-md-end ms-auto">
        <Form.Select
          style={{ width: "150px" }}
          value={filterLevel}
          onChange={(e) =>
            setFilterLevel(e.target.value === "All" ? "All" : parseInt(e.target.value))
          }
        >
          <option value="All">All Levels</option>
          {[...Array(6).keys()].map((i) => (
            <option key={i} value={i + 1}>
              Level {i + 1}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  
    <div style={{
  height: "350px",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "thin",
  // border: "1px solid #ddd",
  // position: "relative",
  // borderRadius: "4px",
  // top:"5px"
}}>
  <Table  responsive ="md" >
    
    {/* Sticky Header */}
    <thead style={{
      position: "sticky",
      top: 0,

      background: "white",
      zIndex: 2,
      boxShadow: "0 2px 3px rgba(0,0,0,0.1)"
    }}>
      <tr className="fw-bold">
        <th className="align-middle">S.no</th>
        <th className="align-middle">Level</th>
        <th className="align-middle">Question</th>
        <th className="align-middle">Answer</th>
        <th className="align-middle text-center">Actions</th>
      </tr>
    </thead>

    {/* Scrollable Body */}
    <tbody>
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((q, index) => (
          <tr key={q.id}>
            <td className="align-middle">{index + 1}</td>
            <td className="align-middle">{q.level}</td>
            <td className="align-middle" style={{ whiteSpace: "pre-wrap" }}>{q.questions}</td>
            <td className="align-middle">{q.answer}</td>
            <td className="py-2 text-center">
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="me-2"
                onClick={() => handleEditQuestion(q)}
              >
                <FaEdit />
              </Button>
              <Button
  variant="outline-danger"
  size="sm"
  onClick={() => handleDeleteQuestion(q.questionId)} // Make sure q.questionId is defined
>
  <FaTrash />
</Button>

            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center py-4">
            No Data found for the selected level.
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>
  </Card.Body>
</div>



            {/* Edit Question Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label className="fw-bold">Level:</Form.Label>
                    <Form.Select
                      value={selectedQuestion?.level}
                      onChange={(e) =>
                        setSelectedQuestion({ ...selectedQuestion, level: parseInt(e.target.value) })
                      }
                    >
                      {[...Array(6).keys()].map((i) => (
                        <option key={i} value={i + 1}>Level {i + 1}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="fw-bold">Question:</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedQuestion?.questions || ""}
                      onChange={(e) =>
                        setSelectedQuestion({ ...selectedQuestion, questions: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="fw-bold">Answer:</Form.Label>
                    <Form.Control
                      type="number"
                      rows={2}
                      value={selectedQuestion?.answer || ""}
                      onChange={(e) =>
                        setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-3">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" className="ms-2" onClick={handleSaveEdit}>
                      Save
                    </Button>
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