import React, { useState } from "react";
import { Navbar, Container, Modal, Button } from "react-bootstrap";
import "./aba.css";
import AbacusKit from "./Kit";
import { useAbacusQuestion } from "./AbacusQuestion";

const AbacusMath = () => {
  const {
    questionsData,
    Alphabhets,
    questions,
    selectedQuestion,
    dummyQuestions,
    userAnswers,
    score,
    setScore,
    handleQuestionClick,
    handleAnswerChange,
    handleSubmitAnswer,
  } = useAbacusQuestion();

  const [isMinimized, setIsMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showAbacusKit, setShowAbacusKit] = useState(false);
  const [showHeadingandIcon, setShowHeadingandIcon] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openStage, setOpenStage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHeadingAtTop, setIsHeadingAtTop] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setOpenStage(null);
    setIsSidebarVisible(true);
  };

  const toggleStage = (stage) => {
    setOpenStage(openStage === stage ? null : stage);
    handleQuestionClick(stage - 1); // stage 1 corresponds to index 0, stage 2 to index 1, etc.
  };

  const handleGoToKit = () => {
    setShowHeadingandIcon(false);
    setShowAbacusKit(true);
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

  const beadsPerPage = 20;
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
          <i className="bi-arrow-left" aria-hidden="true"></i> Back
        </a>
        <div className="abacus-header-content">
          <select
            className="abacus-level-dropdown"
            onChange={(e) => {
              handleLevelChange(e);
              setIsSidebarVisible(true);
            
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

          <Navbar expand="lg" className="abacus-sticky-top">
            <Container>
              <Navbar.Toggle aria-controls="navbar-content" className="border-0 ms-auto" />
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
  <div className="sidebar-close-icon" onClick={() => setIsSidebarVisible(false)}>
    <i className="bi bi-x"></i>
  </div>

  {selectedLevel !== null && (
    <div className="abacus-level-section">
      <h2 className="abacus-level-heading">Level {selectedLevel}</h2>
      {[1, 2, 3, 4, 5].map((stage) => (
        <div key={stage}>
          <div className="abacus-stage" onClick={() => toggleStage(stage)}>
            Level {selectedLevel} ({Alphabhets[stage]})
            <i className={`bi ${openStage === stage ? 'bi-chevron-down' : 'bi-chevron-right'}`} aria-hidden="true"></i>
          </div>
          {openStage === stage && (
            <div className="abacus-questions">
              {/* Level A (1) */}
              {stage === 1 && (
                <div
                  className={`abacus-question-item ${selectedQuestion === 0 ? 'active' : ''}`}
                  onClick={() => handleQuestionClick(0)} // Index 0 corresponds to "Write The Beads Value"
                >
                  <i className="bi-check-circle" aria-hidden="true"></i>
                  Write The Beads Value
                </div>
              )}
              {/* Level B (2) */}
              {stage === 2 && (
                <div
                  className={`abacus-question-item ${selectedQuestion === 1 ? 'active' : ''}`}
                  onClick={() => handleQuestionClick(1)} // Index 1 corresponds to "Draw a Beads For the Given Number"
                >
                  <i className="bi-check-circle" aria-hidden="true"></i>
                  Draw a Beads For the Given Number
                </div>
              )}
              {/* Level C (3) */}
              {stage === 3 && (
                <div
                  className={`abacus-question-item ${selectedQuestion === 2 ? 'active' : ''}`}
                  onClick={() => handleQuestionClick(2)} // Index 2 corresponds to "Draw and write the beads value"
                >
                  <i className="bi-check-circle" aria-hidden="true"></i>
                  Draw and write the beads value
                </div>
              )}
              {/* Level D (4) */}
              {stage === 4 && (
                <>
                  <div
                    className={`abacus-question-item ${selectedQuestion === 3 ? 'active' : ''}`}
                    onClick={() => handleQuestionClick(3)} // Index 3 corresponds to "Addition"
                  >
                    <i className="bi-check-circle" aria-hidden="true"></i>
                    Addition
                  </div>
                  <div
                    className={`abacus-question-item nested ${selectedQuestion === 4 ? 'active' : ''}`}
                    onClick={() => handleQuestionClick(4)} // Index 4 corresponds to "Addition Beads"
                  >
                    <i className="bi-check-circle" aria-hidden="true"></i>
                    Addition Beads
                  </div>
                </>
              )}
              {/* Level E (5) */}
              {stage === 5 && (
                <>
                  <div
                    className={`abacus-question-item ${selectedQuestion === 5 ? 'active' : ''}`}
                    onClick={() => handleQuestionClick(5)} // Index 5 corresponds to "Subtraction"
                  >
                    <i className="bi-check-circle" aria-hidden="true"></i>
                    Subtraction
                  </div>
                  <div
                    className={`abacus-question-item nested ${selectedQuestion === 6 ? 'active' : ''}`}
                    onClick={() => handleQuestionClick(6)} // Index 6 corresponds to "Subtraction Beads"
                  >
                    <i className="bi-check-circle" aria-hidden="true"></i>
                    Subtraction Beads
                  </div>
                </>
              )}
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
      className={`welcome-heading ${
        selectedQuestion !== null ? "at-top" : isHeadingAtTop ? "at-top" : "centered"
      }`}
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
{selectedQuestion !== null && questionsData[selectedQuestion] && (
  <div
    className={`dummy-questions-container 
      ${isMinimized || !showAbacusKit ? "minimized" : ""} 
      ${showAbacusKit && !isMinimized ? "abacus-open" : ""}`}
  >
    <h3>{questions[selectedQuestion]}</h3>
    <div className="questio-wrapp">
      {questions[selectedQuestion] === "Addition Beads" || questions[selectedQuestion] === "Subtraction Beads" ? (
        // Specific layout for "Addition Beads" and "Subtraction Beads"
        
          <div className="beads-column-content">
            {dummyQuestions.map((question, index) => (
              <div key={index} className="beads-column-item">
                <div className="beads-column-row">
                  <div className="beads-column">
                  <div className="koodu"></div>
                    {Array.from({ length: question.upper }, (_, i) => (
                      <>
                    
                      <div key={i} className="bead"></div>
                      </>
                    ))}
                  </div>
                  <span>
                  {questions[selectedQuestion] === "Addition Beads" ? "+" : "-"}
                  </span>
                  <div className="beads-column">
                  <div className="koodu"></div>
                    {Array.from({ length: question.lower }, (_, i) => (
                      <div key={i} className="bead"></div>
                    ))}
                  </div>
                </div>
                <div className="beads-column-input">
                  <input
                    type="text"
                    value={userAnswers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder=""
                  />
                </div>
              </div>
            ))}
          </div>
    
      ) : (
        // Default layout for other questions
        dummyQuestions && dummyQuestions.length > 0
          ? dummyQuestions
              .slice(currentPage * beadsPerPage, (currentPage + 1) * beadsPerPage)
              .map((question, index) => (
                <div key={index} className="question-item">
                  <div className="question-number">
                    {currentPage * beadsPerPage + index + 1}
                  </div>
                  <div className="abacus">
                    <div className="stick"></div>
                    {/* Render numbers for Addition, otherwise render beads */}
                    {questions[selectedQuestion] === "Addition" ||
                    questions[selectedQuestion] === "Subtraction" ? (
                      <div className="addition-grid">
                        <div className="addition-row">
                          <span>{question.upper}</span>
                        </div>
                        <div className="addition-row">
                          <span>{question.lower}</span>
                        </div>
                      </div>
                    ) : (
                      Array.from(
                        { length: questionsData[selectedQuestion].beadCounts[index] || 0 },
                        (_, i) => (
                          <div key={i} className="bead"></div>
                        )
                      )
                    )}
                  </div>
                  <input
                    type="text"
                    value={userAnswers[currentPage * beadsPerPage + index] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentPage * beadsPerPage + index, e.target.value)
                    }
                    placeholder=""
                    className="answer-input"
                  />
                </div>
              ))
          : "No questions available."
      )}
    </div>
    <button
      onClick={() => {
        const scoreResult = handleSubmitAnswer();
        setScore(scoreResult);
        setShowResultModal(true);
      }}
      className="submit-button"
    >
      Submit
    </button>
  </div>
)}   <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered className="modal-popup">
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
      {showHeadingandIcon && (
        <div
          className={`abacus-game-icon-container ${isMinimized ? "minimized" : ""}`}
          onClick={handleGoToKit}
        >
          <i className="bi bi-controller" aria-hidden="true"></i>
        </div>
      )}
    </div>
  );
};

export default AbacusMath;