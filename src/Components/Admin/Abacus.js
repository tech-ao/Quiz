import React, { useState } from "react";
import { Navbar, Container, Modal, Button } from "react-bootstrap";
import "./aba.css"; // Import the updated CSS file
import AbacusKit from "./Kit";

const AbacusMath = () => {
  const [question, setQuestions] = useState([]); // Store 10 random questions
  const [userAnswers, setUserAnswers] = useState(Array(10).fill("")); // Store user's answers
  const [score, setScore] = useState(null); // Store correct and incorrect count
  const [showResultModal, setShowResultModal] = useState(false); // State for Modal
  const [dummyQuestions, setDummyQuestions] = useState([]); // Stores dummy questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for sidebar visibility
  const [showAbacusKit, setShowAbacusKit] = useState(false);
  const [showHeadingandIcon, setShowHeadingandIcon] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openStage, setOpenStage] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track selected question
  const [currentPage, setCurrentPage] = useState(0); // State for pagination
  const [isHeadingAtTop, setIsHeadingAtTop] = useState(false); // State to manage heading position

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setOpenStage(null); // Reset open stage when level changes
    setSelectedQuestion(null); // Reset selected question
    setIsSidebarVisible(true); // Show sidebar when a level is selected
  };

  const toggleStage = (stage) => {
    setOpenStage(openStage === stage ? null : stage);
    setSelectedQuestion(null); // Reset selected question when toggling stages
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index); // Set selected question index
    setCurrentQuestionIndex(0); // Reset to first question
    setUserAnswers(Array(10).fill("")); // Clear previous inputs
    setScore({ correct: 0, incorrect: 0 });
    setIsHeadingAtTop(true); // Move heading to the top when a question is selected

    // Set dummy questions and bead counts based on the selected question
    const { beadCounts, correctAnswers } = questionsData[index] || { beadCounts: [], correctAnswers: [] };
    setDummyQuestions(beadCounts.map((count) => `🟤`.repeat(count))); // Generate questions with bead counts
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    const correctAnswers = questionsData[selectedQuestion].correctAnswers; // Get correct answers for the selected question

    let correctCount = 0;
    let incorrectCount = 0;

    userAnswers.forEach((answer, index) => {
      if (answer.trim() === correctAnswers[index]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    setScore({ correct: correctCount, incorrect: incorrectCount });
    setShowResultModal(true);
  };

  const handleGoToKit = () => {
    setShowHeadingandIcon(false);
    setShowAbacusKit(true); // Show AbacusKit inside main content
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
    setShowHeadingandIcon((prev) => !prev);
  };

  const handleClose = () => {
    setShowHeadingandIcon(true);
    setShowAbacusKit(false);
    console.log("Abacus closed");
  };

  const questionsData = {
    0: {
      beadCounts: [1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
      correctAnswers: ["1", "3", "2", "4", "2", "1", "3", "2", "4", "5"], // Correct answers for Q1
    },
    1: {
      beadCounts: [2, 4, 6, 8, 0, 2, 4, 6, 8, 0],
      correctAnswers: ["2", "4", "6", "8", "0", "2", "4", "6", "8", "0"], // Correct answers for Q2
    },
    2: {
      beadCounts: [3, 6, 4, 2, 5, 8, 1, 4, 2, 3],
      correctAnswers: ["3", "6", "4", "2", "5", "8", "1", "4", "2", "3"], // Correct answers for Q3
    },
    3: {
      beadCounts: [4, 8, 2, 6, 2, 4, 2, 3, 6, 4], // Bead counts for Q4
      correctAnswers: ["4", "8", "2", "6", "2", "4", "2", "3", "6", "4"], // Correct answers for Q4
    },
    4: {
      beadCounts: [5, 1, 5, 2, 5, 0, 5, 0, 5, 5], // Bead counts for Q5
      correctAnswers: ["5", "1", "5", "2", "5", "0", "5", "0", "5", "5"], // Correct answers for Q5
    },
    5: {
      beadCounts: [6, 1, 1, 2, 0, 3, 2, 4, 4, 0], // Bead counts for Q6
      correctAnswers: ["6", "1", "1", "2", "0", "3", "4", "4", "4", "0"], // Correct answers for Q6
    },
  };

  const Alphabhets = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
  };

  const questions = [
    "Write The Beads Value",
    "Draw a Beads For the Given Number",
    "Write The Value For the Given Beads",
    "Show the Beads Value",
    "Addition and Subtraction",
    "Practice Question",
  ];

  const questionImages = [
    "/Q1.jpg", // Replace with actual image paths
    "/Q2.jpeg",
    "/Q9.jpg",
    "/Q4.jpg",
    "/Q5.jpg",
    "/Q6.jpg",
    "/Q7.jpg",
  ];

  const beadsPerPage = 10;
  const totalPages = Math.ceil(dummyQuestions.length / beadsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="abacus-app-container">
      {/* Header */}
      <header className="abacus-header">
        <a href="/adminDashboard" className="abacus-back-button">
          <i className="bi-arrow-left" aria-hidden="true"></i> {/* Back icon */}
          Back
        </a>
        <div className="abacus-header-content">
          <select
            className="abacus-level-dropdown"
            onChange={(e) => {
              handleLevelChange(e); // Handle level change
              setIsSidebarVisible(true); // Show sidebar when a level is selected
            }}
          >
            <option value="">Select Level</option>
            <option value="0">Level 0</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
          </select>

          {/* Navigation Items in Header */}
          <Navbar expand="lg" className="abacus-sticky-top">
            <Container>
              {/* Hamburger Toggle on Right */}
              <Navbar.Toggle aria-controls="navbar-content" className="border-0 ms-auto" />

              {/* Sliding Menu on Right */}
              <Navbar.Collapse id="navbar-content" className="justify-content-end">
                <div className="abacus-nav-items">
                  <div className="abacus-nav-item">
                    <i className="bi-book-fill" style={{ color: "#f31383", marginRight: "6px" }}></i>
                    <span className="abacus-nav-text">Learning path</span>
                  </div>
                  <div className="abacus-nav-item">
                    <i className="bi-file-earmark-text-fill" style={{ color: "#87CEEB", marginRight: "6px" }}></i>
                    <span className="abacus-nav-text">Random Worksheets</span>
                  </div>
                  <div className="abacus-nav-item">
                    <i className="bi-arrow-up" style={{ color: "#00008B", marginRight: "6px" }}></i>
                    <span className="abacus-nav-text">Mental Accelerator</span>
                  </div>
                  <div className="abacus-nav-item">
                    <i className="bi-pencil-square" style={{ color: "#FFA500", marginRight: "6px" }}></i>
                    <span className="abacus-nav-text">Examination</span>
                  </div>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`abacus-sidebar ${isSidebarVisible ? 'active' : ''}`}>
        {/* Close Icon for Mobile View */}
        <div className="sidebar-close-icon" onClick={() => setIsSidebarVisible(false)}>
          <i className="bi bi-x"></i> {/* Close icon */}
        </div>

        {selectedLevel !== null && (
          <div className="abacus-level-section">
            <h2 className="abacus-level-heading">Level {selectedLevel}</h2>
            {[1, 2, 3, 4, 5].map((stage) => (
              <div key={stage}>
                <div className="abacus-stage" onClick={() => toggleStage(stage)}>
                  Level {selectedLevel} ({Alphabhets[stage]}) {/* Display sub-levels like Level 1 (A), Level 1 (B), etc. */}
                  <i className={`bi ${openStage === stage ? 'bi-chevron-down' : 'bi-chevron-right'}`} aria-hidden="true"></i>
                </div>
                {openStage === stage && (
                  <div className="abacus-questions">
                    {questions.map((question, index) => (
                      <div
                        key={index}
                        className={`abacus-question-item ${selectedQuestion === index ? 'active' : ''}`}
                        onClick={() => handleQuestionClick(index)}
                      >
                        <i className="bi-check-circle" aria-hidden="true"></i>
                        {question}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="abacus-main-content">
        {showHeadingandIcon && (
          <h2
            className={`welcome-heading ${isHeadingAtTop ? "at-top" : "centered"}`}
          >
            Welcome to Abacus Math! Explore and learn with us.
          </h2>
        )}
        {showAbacusKit && (
          <>
            <AbacusKit
              isMinimized={isMinimized}
              onMinimize={handleMinimize}
              onClose={handleClose}
            />
          </>
        )}
        {/* Display Dummy Questions When a Question is Selected */}
        {selectedQuestion !== null && (
          <div
            className={`dummy-questions-container 
              ${isMinimized || !showAbacusKit ? "minimized" : ""} 
              ${showAbacusKit && !isMinimized ? "abacus-open" : ""}`}
          >
            <h3>{questions[selectedQuestion]}</h3>
            <div className="questio-wrapp">
              {dummyQuestions
                .slice(currentPage * beadsPerPage, (currentPage + 1) * beadsPerPage)
                .map((question, index) => (
                  <div key={index} className="question-item">
                    {/* Display the question number (index) above the bead box */}
                    <div className="question-number">
                      {currentPage * beadsPerPage + index + 1}
                    </div>
                    {/* Render Abacus with dynamic bead count */}
                    <Abacus beadCount={questionsData[selectedQuestion].beadCounts[index]} />
                    <input
                      type="text"
                      value={userAnswers[currentPage * beadsPerPage + index]}
                      onChange={(e) => handleAnswerChange(currentPage * beadsPerPage + index, e.target.value)}
                      placeholder=""
                      className="answer-input"
                    />
                  </div>
                ))}
              <button onClick={handleSubmitAnswer} className="submit-button">
                Submit
              </button>
            </div>
          </div>
        )}
        {/* Result Modal */}
        <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered className="modal-popup">
          <Modal.Header closeButton>
            <Modal.Title>Quiz Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "center" }}>
              <h4 style={{ color: score?.correct > 0 ? "green" : "red" }}>
                {score?.correct > 0 ? "Correct! 🎉" : "Incorrect! 😞"}
              </h4>
              <div style={{ marginTop: "20px" }}>
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Correct Answers: {score?.correct}
                </p>
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Incorrect Answers: {score?.incorrect}
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowResultModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
      {/* Minimized Abacus Icon (If minimized, still show an icon to restore) */}
      {showHeadingandIcon && (
        <div
          className={`abacus-game-icon-container ${isMinimized ? "minimized" : ""}`}
          onClick={handleGoToKit}
        >
          <i className="bi bi-controller" aria-hidden="true"></i> {/* Game icon */}
        </div>
      )}
    </div>
  );
};

const Abacus = ({ beadCount }) => {
  return (
    <div className="abacus">
      {/* Render beads dynamically based on beadCount */}
      <AbacusColumn count={beadCount} />
    </div>
  );
};

const AbacusColumn = ({ count }) => {
  return (
    <div className="abacus-column">
      <div className="stick"></div>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bead"></div>
      ))}
    </div>
  );
};

export default AbacusMath;