import React, { useState } from "react";
import { Navbar, Container, Modal, Button } from "react-bootstrap";
import "./aba.css";
import BeadDrawer from "./AbacusBeadsDraw"; 
import AbacusKit from "./Kit";
import { useAbacusQuestion } from "./AbacusQuestion";

const AbacusMath = () => {
  const {
    questionsData,
    Alphabhets,
    questions,
    questionLevelMapping,
    selectedQuestion,
    dummyQuestions,
    userAnswers,
    score,
    incorrectAnswers,
    unfilledInputs, 
    setUnfilledInputs,
    completedLevels, 
    setCompletedLevels,
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
    setUnfilledInputs([]); // Reset unfilled inputs state
  };

  const toggleStage = (stage) => {
    setOpenStage(openStage === stage ? null : stage);
    handleQuestionClick(stage - 1);
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

  const handleSubmit = () => {
    const scoreResult = handleSubmitAnswer();
    setScore(scoreResult);
    setShowResultModal(true);
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

        {selectedLevel && (
          <div className="abacus-level-section">
            {selectedLevel && <h2 className="abacus-level-heading">Level {selectedLevel}</h2>}
            {[1, 2, 3, 4, 5].map((stage) => {
              const levelKey = Alphabhets[stage]; // Get the level key (A, B, C, etc.)
              const isLocked = (stage === 4 && !completedLevels.A) || 
            (stage === 5 && (!completedLevels.A || !completedLevels.B || !completedLevels.C || !completedLevels.D));
            return (
                <div key={stage}>
                  <div
                    className={`abacus-stage ${isLocked ? "locked" : ""}`}
                    onClick={() => !isLocked && toggleStage(stage)}
                  >
                    Level {selectedLevel} ({Alphabhets[stage]})
                    {isLocked && <i className="bi bi-lock" aria-hidden="true"></i>}
                    {!isLocked && (
                      <i
                        className={`bi ${openStage === stage ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  {openStage === stage && !isLocked && (
  <div className="abacus-questions">
    {/* Render questions for the stage */}
    {stage === 1 && (
      <>
        <div
          className={`abacus-question-item ${selectedQuestion === 0 ? 'active' : ''}`}
          onClick={() => handleQuestionClick(0)}
        >
          <i className="bi-check-circle" aria-hidden="true"></i>
          Write The Beads Value
        </div>
        <div
          className={`abacus-question-item ${selectedQuestion === 1 ? 'active' : ''}`}
          onClick={() => handleQuestionClick(1)}
        >
          <i className="bi-check-circle" aria-hidden="true"></i>
          Draw a Beads For the Given Number
        </div>
        {/* Add the new questions here */}
        <div
          className={`abacus-question-item ${selectedQuestion === 2 ? 'active' : ''}`}
          onClick={() => handleQuestionClick(2)}
        >
          <i className="bi-check-circle" aria-hidden="true"></i>
          Write The Value For Given Beads
        </div>
        <div
          className={`abacus-question-item ${selectedQuestion === 3 ? 'active' : ''}`}
          onClick={() => handleQuestionClick(3)}
        >
          <i className="bi-check-circle" aria-hidden="true"></i>
          Draw The Beads
        </div>
      </>
    )}
    {stage === 2 && (
      <>
      <div
        className={`abacus-question-item ${selectedQuestion === 4 ? 'active' : ''}`}
        onClick={() => handleQuestionClick(4)}
      >
        <i className="bi-check-circle" aria-hidden="true"></i>
       Addition
      </div>
       <div
       className={`abacus-question-item ${selectedQuestion === 5 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(5)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Add The  Given Number
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 6 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(6)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Add The  Given Number
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 7 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(7)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Subtraction
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 8 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(8)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Subtract The Number
     </div>

     </>
    )}
    {stage === 3 && (
  <>
    <div
      className={`abacus-question-item ${selectedQuestion === 9 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(9)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Addition & Subtraction Beads 
    </div>
    <div
      className={`abacus-question-item ${selectedQuestion === 10 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(10)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Addition & Subtraction Values
    </div>
  </>
)}

  </div>
)}
                </div>
              );
            })}
          </div>
        )}
      </aside>
      {/* Main Content */}
      <main className="abacus-main-content">
        {showHeadingandIcon && (
          <h2
            className={`welcome-heading ${
              selectedQuestion !== null
                ? "at-top"
                : isHeadingAtTop
                ? "at-top"
                : "centered"
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
              
              {questions[selectedQuestion] === "Addition Beads" ||
              questions[selectedQuestion] === "Subtraction Beads" ? (
                <div className="beads-column-content">
                  {dummyQuestions.map((question, index) => (
                    <div key={index} className="beads-column-wrapper">
                      {/* Serial Number Outside the Beads Column */}
                      <div className="Serial-number-Addition">
                        {currentPage * beadsPerPage + index + 1}
                      </div>
                      <div className="beads-column-item">
                        <div className="beads-column-row">
                          <div className="beads-column">
                            <div className="koodu"></div>
                            {Array.from({ length: question.upper }, (_, i) => (
                              <div key={i} className="bead"></div>
                            ))}
                          </div>
                          <span>
                            {questions[selectedQuestion] === "Addition Beads"
                              ? "+"
                              : "-"}
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
                            onChange={(e) =>
                              handleAnswerChange(index, e.target.value)
                            }
                            placeholder=""
                            className={`answer-input ${
                              incorrectAnswers.includes(index)
                                ? "incorrect"
                                : unfilledInputs.includes(index)
                                ? "unfilled"
                                : ""
                            }`}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                ): questions[selectedQuestion] === "Addition & Subtraction Beads" ? (
                  <div className="beads-column-content">
                    {questionsData[selectedQuestion].beadCounts1.map((upper, index) => (
                      <div key={index} className="beads-column-wrapper">
                        <div className="Serial-number-Addition">
                          {index + 1}
                        </div>
                        <div className="beads-column-item">
                          <div className="beads-column-row">
                            <div className="beads-column">
                              <div className="koodu"></div>
                              {Array.from({ length: upper }, (_, i) => (
                                <div key={i} className="bead"></div>
                              ))}
                            </div>
                            <span>{index % 2 === 0 ? "+" : "-"}</span>
                            <div className="beads-column">
                              <div className="koodu"></div>
                              {Array.from(
                                { length: questionsData[selectedQuestion].beadCounts2[index] },
                                (_, i) => <div key={i} className="bead"></div>
                              )}
                            </div>
                          </div>
                          <div className="beads-column-input">
                            <input
                              type="text"
                              value={userAnswers[index] || ""}
                              onChange={(e) => handleAnswerChange(index, e.target.value)}
                              className={`answer-input ${
                                incorrectAnswers.includes(index) ? "incorrect" :
                                unfilledInputs.includes(index) ? "unfilled" : ""
                              }`}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              ) : questions[selectedQuestion] ===
                "Draw a Beads For the Given Number" ? (
                questionsData[selectedQuestion].givenNumber.map(
                  (number, index) => (
                    <div key={index} className="bead-draw-question">
                      <div className="serial-number">
                        {currentPage * beadsPerPage + index + 1}
                      </div>
                      <BeadDrawer
                        givenNumber={number}
                        onBeadDraw={(drawnNumber) =>
                          handleAnswerChange(index, drawnNumber.toString())
                        }
                        isIncorrect={incorrectAnswers.includes(index)} // Pass isIncorrect prop
                        isnotattend={unfilledInputs.includes(index)}
                      />
                    </div>
                  )
                )
              ) : // Default layout for other questions
              dummyQuestions && dummyQuestions.length > 0 ? (
                dummyQuestions
                  .slice(
                    currentPage * beadsPerPage,
                    (currentPage + 1) * beadsPerPage
                  )
                  .map((question, index) => (
                    <div key={index} className="question-item">
                      <div className="question-number">
                        {currentPage * beadsPerPage + index + 1}
                      </div>
                      <div className="abacus">
                        {!(
                          questions[selectedQuestion] === "Addition" ||
                          questions[selectedQuestion] === "Subtraction"||
                          questions[selectedQuestion] === "Addition & Subtraction Values"
                        ) && <div className="stick"></div>}
                        {/* Render numbers for Addition, otherwise render beads */}
                        {questions[selectedQuestion] === "Addition" ||
                        questions[selectedQuestion] === "Subtraction" ||
                        questions[selectedQuestion] === "Addition & Subtraction Values"? (
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
                            {
                              length:
                                questionsData[selectedQuestion].beadCounts[
                                  index
                                ] || 0,
                            },
                            (_, i) => <div key={i} className="bead"></div>
                          )
                        )}
                      </div>
                      <input
                        type="text"
                        value={
                          userAnswers[currentPage * beadsPerPage + index] || ""
                        }
                        onChange={(e) =>
                          handleAnswerChange(
                            currentPage * beadsPerPage + index,
                            e.target.value
                          )
                        }
                        className={`answer-input ${
                          incorrectAnswers.includes(
                            currentPage * beadsPerPage + index
                          )
                            ? "incorrect"
                            : unfilledInputs.includes(currentPage * beadsPerPage + index)
                            ? "unfilled"
                            : ""
                        }`}
                        required
                      />
                    </div>
                  ))
              ) : (
                "No questions available."
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </button>
          </div>
        )}{" "}
        <Modal
          show={showResultModal}
          onHide={() => setShowResultModal(false)}
          centered
          className="modal-popup"
        >
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
                <p style={{ color: "orange", fontWeight: "bold" }}>
                  Not Attended: {score?.notAttend}
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
          className={`abacus-game-icon-container ${
            isMinimized ? "minimized" : ""
          }`}
          onClick={handleGoToKit}
        >
          <i className="bi bi-controller" aria-hidden="true"></i>
        </div>
      )}
    </div>
  );
};

export default AbacusMath;  