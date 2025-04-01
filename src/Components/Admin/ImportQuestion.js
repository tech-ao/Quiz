<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Card, Form, Button, InputGroup, Table, Image, Row, Col, Modal, Container } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./AddQuestion.css";
=======
import React, { useState, useEffect, useRef } from "react";
import { FaFileUpload, FaDownload } from "react-icons/fa";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import "./ImportQuestion.css";
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f
import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

<<<<<<< HEAD
const BASE_URL = "http://srimathicare.in:8081";
const ACCESS_TOKEN = "123";
const API_KEY = "3ec1b120-a9aa-4f52-9f51-eb4671ee1280";

const API_URL_CREATE = `${BASE_URL}/api/ImportExcel/CreateNewQuestion`;
const API_URL_DELETE = (id) => `${BASE_URL}/api/ImportExcel/DeleteQuestion/${id}`;
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
=======
const ImportQuestion = () => {
  const API_URL_IMPORT = "http://srimathicare.in:8081/api/ImportExcel/ImportQuestion";
  const API_URL_GET_QUESTIONS = "http://srimathicare.in:8081/api/SearchAndList/SearchAndListQuestions";

  const fileInputRef = useRef(null);
  const [level, setLevel] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 1024);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
      setIsSmallScreen(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL_GET_QUESTIONS, {
        method: "POST",
        headers: {
          "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: level,
          pagination: {
            pageSize: 100,
            pageNumber: 1,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const result = await response.json();
      if (result.isSuccess) {
        setUploadedQuestions(result.data.questions || []);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f

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

<<<<<<< HEAD
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
    try {
      const response = await fetch(API_URL_DELETE(id), {
        method: "DELETE",
=======
    setIsLoading(true);
    setUploadStatus("Uploading...");

    try {
      const questionBase64 = await convertExcelToBase64(excelFile);

      const requestBody = {
        questionBase64: questionBase64,
        title: title,
        level: level, 
        description: description, 
      };

      const response = await fetch(API_URL_IMPORT, {
        method: "POST",
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f
        headers: {
          "X-Api-Key": API_KEY,
          AccessToken: ACCESS_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      const result = await response.json();
<<<<<<< HEAD
      console.log("Question deleted successfully:", result);

      // Update local state
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
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

=======
      setUploadStatus("Questions uploaded successfully!");
      
      // Fetch and display the newly uploaded questions
      await fetchQuestions();
      
      setExcelFile(null);
      setTitle("");
      setDescription("");
      setLevel(1);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading questions:", error);
      setUploadStatus("Failed to upload questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSampleFile = () => {
    // Sample data that matches your actual question structure
    const sampleData = [
      ["Sno", "Questions", "Answer", "Level", "Title", "Description"],
      [
        "1", 
        "1,-2,2,3,2,5,6,-1", 
        "2", 
        "1", 
        "Sample Title 1", 
        "This is a sample description for question 1"
      ],
      [
        "2", 
        "1,2,3,4,5,6,7,8,9", 
        "9", 
        "1", 
        "Sample Title 2", 
        "This is a sample description for question 2"
      ],
      [
        "3", 
        "10,20,30,40,50", 
        "50", 
        "2", 
        "Sample Title 3", 
        "This is a sample description for question 3"
      ]
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SampleQuestions");
    
    // Format the header row
    if (!ws['!cols']) ws['!cols'] = [];
    ws['!cols'][0] = { width: 5 };  // Sno column width
    ws['!cols'][1] = { width: 20 }; // Questions column width
    ws['!cols'][2] = { width: 10 }; // Answer column width
    ws['!cols'][3] = { width: 8 };  // Level column width
    ws['!cols'][4] = { width: 15 }; // Title column width
    ws['!cols'][5] = { width: 25 }; // Description column width
  
    XLSX.writeFile(wb, "Question_Import_Template.xlsx");
  };
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f
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

<<<<<<< HEAD
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
=======
              <div className="Content-box">
                <div className="upload-box">
                  <label htmlFor="excelFile">Excel Questions file (.xlsx)</label>
                  <input
                    type="file"
                    id="excelFile"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    ref={fileInputRef} 
                  />

                  <div className="button-group">
                    <button 
                      className="upload-btn" 
                      onClick={handleUpload}
                      disabled={isLoading}
                    >
                      {isLoading ? "Uploading..." : "Upload Excel file"}
                    </button>
                    <button className="download-btn" onClick={downloadSampleFile}>
                      📥 Download Sample File
                    </button>
                  </div>
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f
                </div>
              </Card.Body>
            </div>
            <div>
            <Row className="sticky-title align-items-center ">
                <Col>
                  <h2 className="fw-bold text-left">Stored Questions</h2>
                </Col>
              </Row>

<<<<<<< HEAD
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
                onClick={() => handleDeleteQuestion(q.id)}
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
=======
                {uploadStatus && <p className={`status-message ${uploadStatus.includes("Failed") ? "error" : "success"}`}>{uploadStatus}</p>}
                
                <div className="new-field d-flex align-items-center">
                  <div className="form-group">
                    <label htmlFor="level">Select Level:</label>
                    <select
                      id="level"
                      value={level}
                      onChange={(e) => setLevel(Number(e.target.value))} 
                    >
                      <option value={1}>Level 1</option>
                      <option value={2}>Level 2</option>
                      <option value={3}>Level 3</option>
                      <option value={4}>Level 4</option>
                      <option value={5}>Level 5</option>
                      <option value={6}>Level 6</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      placeholder="Enter title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      placeholder="Add description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Display Uploaded Questions Table */}
                {uploadedQuestions.length > 0 && (
                  <div className="uploaded-questions-table">
                    <h3>Uploaded Questions (Level {level})</h3>
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uploadedQuestions.map((question, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{question.questions}</td>
                              <td>{question.answer}</td>
                              <td>{question.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="instructions">
                  <h3>How to convert CSV into Unicode (For Non-English)</h3>
                  <ol>
                    <li>Fill the data in an Excel sheet with the given format.</li>
                    <li>Save the file as <strong>Unicode Text (*.txt)</strong>.</li>
                    <li>Open the .txt file in Notepad.</li>
                    <li>Replace Tab space with a comma ( , ).</li>
                    <li>Save the file again with a .txt extension and change encoding to <strong>UTF-8</strong>.</li>
                    <li>Change the file extension from .txt to .csv.</li>
                    <li>Now, use this file to import questions.</li>
                  </ol>
                  <a href="#" className="more-info">For more info</a>
                </div>
              </div>
            </main>
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f
          </div>
        </Container>
      </div>
    </div>
  );
};
<<<<<<< HEAD

export default AddQuestion;
=======
export default ImportQuestion;
>>>>>>> b648c1962e863e0930d6c9214ceb2b2308d11d2f
