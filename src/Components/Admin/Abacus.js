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
            {[1, 2, 3, 4, 5,6].map((stage) => {
              const levelKey = Alphabhets[stage]; // Get the level key (A, B, C, etc.)
              const isLocked = (stage === 4 && !completedLevels.A) || 
            (stage === 5 && (!completedLevels.A || !completedLevels.B || !completedLevels.C || !completedLevels.D))||
            (stage === 6 && !completedLevels.E);
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
      Add & Sub the givenNumber
      </div>
      <div
      className={`abacus-question-item ${selectedQuestion === 11 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(11)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Add & Sub the Given Values 
    </div>
    <div
      className={`abacus-question-item ${selectedQuestion === 12 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(12)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Add & Sub the  Value
    </div>
    
  </>
)}
 {stage === 4 && (
      <>
      <div
        className={`abacus-question-item ${selectedQuestion === 13 ? 'active' : ''}`}
        onClick={() => handleQuestionClick(13)}
      >
        <i className="bi-check-circle" aria-hidden="true"></i>
       Write the number of beads ???
      </div>
       <div
       className={`abacus-question-item ${selectedQuestion === 14 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(14)}
     >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Draw the Abacus Beads???
     </div>
      <div
        className={`abacus-question-item ${selectedQuestion === 15 ? 'active' : ''}`}
        onClick={() => handleQuestionClick(15)}
      >
        <i className="bi-check-circle" aria-hidden="true"></i>
       Abacus Add Beads ???
      </div>
      <div
       className={`abacus-question-item ${selectedQuestion === 16 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(16)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Addition Operation
     </div>
       <div
       className={`abacus-question-item ${selectedQuestion === 17 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(17)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Abacus  Sub Beads ???
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 18 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(18)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
       Subtraction Operation
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 19 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(19)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
       Add & Sub two Values
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 20 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(20)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
       Add & Sub Three Values
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 21? 'active' : ''}`}
       onClick={() => handleQuestionClick(21)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
     Add & Sub Four Values
     </div>

     </>
    )}
     {stage === 5 && (
  <>
    <div
      className={`abacus-question-item ${selectedQuestion === 22 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(22)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Practice with Abacus
    </div>
    <div
      className={`abacus-question-item ${selectedQuestion === 23 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(23)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Practice with Abacus???
      </div>
      <div
      className={`abacus-question-item ${selectedQuestion === 24 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(24)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
      Addition & Subtraction Values 
    </div>
    <div
      className={`abacus-question-item ${selectedQuestion === 25 ? 'active' : ''}`}
      onClick={() => handleQuestionClick(25)}
    >
      <i className="bi-check-circle" aria-hidden="true"></i>
       Draw & Practice with Abacus
    </div>
    
  </>
)}
{stage === 6 && (
      <>
      <div
        className={`abacus-question-item ${selectedQuestion === 26 ? 'active' : ''}`}
        onClick={() => handleQuestionClick(26)}
      >
        <i className="bi-check-circle" aria-hidden="true"></i>
       Difficult Add & Sub
      </div>
       <div
       className={`abacus-question-item ${selectedQuestion === 27 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(27)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
      Difficult Four Row Add&Sub
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 28 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(28)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
       Difficult Three Row Add&Sub
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 29 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(29)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
       Draw the Difficult Beads
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 30 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(30)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
       Hard Digit Number
     </div>
     <div
       className={`abacus-question-item ${selectedQuestion === 31 ? 'active' : ''}`}
       onClick={() => handleQuestionClick(31)}
     >
       <i className="bi-check-circle" aria-hidden="true"></i>
        Add & Sub (Hard Digit) 
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
      {/* Main Content */}
<main className="abacus-main-content">
  {showHeadingandIcon && (
    <>
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
      <div className="welcome-img">
        <img src="/Welcome1.jpg" alt="Fun Abacus Image" />
      </div>
    </>


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
      className={`dummy-questions-container ${
        isMinimized || !showAbacusKit ? "minimized" : ""
      } ${showAbacusKit && !isMinimized ? "abacus-open" : ""}`}
    >
      <h3>{questions[selectedQuestion]}</h3>
      <div className="questio-wrapp">
        {questions[selectedQuestion] === "Addition Beads" ||
        questions[selectedQuestion] === "Subtraction Beads" ? (
          <div className="beads-column-content">
            {dummyQuestions && dummyQuestions.length > 0 ? (
              dummyQuestions.map((question, index) => {
                const bgClass = `bead-bg-${(Math.floor(index / 5) % 4) + 1}`;
                return (
                  <div key={index} className={`beads-column-wrapper ${bgClass}`}>
                    <div className="Serial-number-Addition">
                      {currentPage * beadsPerPage + index + 1}
                    </div>
                    <div className={`beads-column-item ${bgClass}`}>
                      <div className="beads-column-row">
                        <div className={`beads-column ${bgClass}`}>
                          <div className="koodu"></div>
                          {Array.from({ length: question.upper }, (_, i) => {
                            const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                            return (
                              <div key={i} className={`bead ${colorClass}`}></div>
                            );
                          })}
                        </div>
                        <span>
                          {questions[selectedQuestion] === "Addition Beads"
                            ? "+"
                            : "-"}
                        </span>
                        <div className={`beads-column ${bgClass}`}>
                          <div className="koodu"></div>
                          {Array.from({ length: question.lower }, (_, i) => {
                            const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                            return (
                              <div key={i} className={`bead ${colorClass}`}></div>
                            );
                          })}
                        </div>
                      </div>
                      {/* Render beadMiddle1 and beadMiddle2 if they exist */}
                      {question.middle1 !== undefined && (
                        <div className={`beads-column-row middle-${bgClass}`}>
                          <span>+</span>
                          <div className={`beads-column ${bgClass}`}>
                            <div className="koodu"></div>
                            {Array.from({ length: question.middle1 }, (_, i) => {
                              const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                              return (
                                <div key={i} className={`bead ${colorClass}`}></div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {question.middle2 !== undefined && (
                        <div className={`beads-column-row middle-${bgClass}`}>
                          <span>+</span>
                          <div className={`beads-column ${bgClass}`}>
                            <div className="koodu"></div>
                            {Array.from({ length: question.middle2 }, (_, i) => {
                              const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                              return (
                                <div key={i} className={`bead ${colorClass}`}></div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {/* Input for user answer */}
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
                );
              })
            ) : (
              <div>No questions available.</div>
            )}
          </div>   
      ):
        questions[selectedQuestion] === "Addition & Subtraction Beads" ? (
          <div className="beads-column-content">
            {questionsData[selectedQuestion].beadCounts1 &&
            questionsData[selectedQuestion].beadCounts1.length > 0 ? (
              questionsData[selectedQuestion].beadCounts1.map((upper, index) => {
                // Calculate the background class for this question
                const bgClass = `bead-bg-${(Math.floor(index / 5) % 4) + 1}`;
                return (
                  <div key={index} className={`beads-column-wrapper ${bgClass}`}>
                    <div className="Serial-number-Addition">
                      {index + 1}
                    </div>
                    <div className={`beads-column-item ${bgClass}`}>
                      <div className="beads-column-row">
                        {/* Upper Beads Column */}
                        <div className={`beads-column ${bgClass}`}>
                          <div className="koodu"></div>
                          {Array.from({ length: upper }, (_, i) => {
                            const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                            return (
                              <div key={i} className={`bead ${colorClass}`}></div>
                            );
                          })}
                        </div>
                        {/* Operator (+ or -) */}
                        <span>{index % 2 === 0 ? "+" : "-"}</span>
                        {/* Lower Beads Column */}
                        <div className={`beads-column ${bgClass}`}>
                          <div className="koodu"></div>
                          {Array.from(
                            { length: questionsData[selectedQuestion].beadCounts2[index] },
                            (_, i) => {
                              const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                              return (
                                <div key={i} className={`bead ${colorClass}`}></div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      {/* Input for user answer */}
                      <div className="beads-column-input">
                        <input
                          type="text"
                          value={userAnswers[index] || ""}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
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
                );
              })
            ) : (
              <div>No questions available.</div>
            )}
          </div>
      ) : questions[selectedQuestion] === "Draw a Beads For the Given Number" ? (
        questionsData[selectedQuestion].givenNumber &&
        questionsData[selectedQuestion].givenNumber.length > 0 ? (
          questionsData[selectedQuestion].givenNumber.map((number, index) => (
            <div
              key={index}
              className={`bead-draw-question bead-bg-${(index % 4) + 1}`}
            >
              <div className="serial-number">
                {currentPage * beadsPerPage + index + 1}
              </div>
              <BeadDrawer
                givenNumber={number}
                onBeadDraw={(drawnNumber) =>
                  handleAnswerChange(index, drawnNumber.toString())
                }
                isIncorrect={incorrectAnswers.includes(index)}
                isnotattend={unfilledInputs.includes(index)}
              />
            </div>
          ))
          
        ) : (
            <div>No questions available.</div>
          )
        )  : // Default layout for other questions
        dummyQuestions && dummyQuestions.length > 0 ? (
            dummyQuestions
              .slice(
                currentPage * beadsPerPage,
                (currentPage + 1) * beadsPerPage
              )
              .map((question, index) => {
                // Calculate the background class for this question
                const bgClass = `bead-bg-${(Math.floor(index / 5) % 4) + 1}`;
                return (
                  <div key={index} className={`question-item ${bgClass}`}>
                    <div className="question-number">
                      {currentPage * beadsPerPage + index + 1}
                    </div>
                    <div className={`abacus ${bgClass}`}>
                      {!(
                        questions[selectedQuestion] === "Addition" ||
                        questions[selectedQuestion] === "Subtraction" ||
                        questions[selectedQuestion] === "Addition & Subtraction Values"
                      ) && <div className="stick"></div>}
                      {/* Render numbers for Addition, otherwise render beads */}
                      {questions[selectedQuestion] === "Addition" ||
                      questions[selectedQuestion] === "Subtraction" ||
                      questions[selectedQuestion] === "Addition & Subtraction Values" ? (
                        <div className="addition-grid">
                          <div className="addition-row">
                            <span>{question.upper}</span>
                          </div>
                          {/* Render beadMiddle1 and beadMiddle2 if they exist */}
                          {question.middle1 !== undefined && (
                            <div className="addition-row">
                              <span>{question.middle1}</span>
                            </div>
                          )}
                          {question.middle2 !== undefined && (
                            <div className="addition-row">
                              <span>{question.middle2}</span>
                            </div>
                          )}
                          <div className="addition-row">
                            <span>{question.lower}</span>
                          </div>
                        </div>
                      ) : (
                        Array.from(
                          {
                            length:
                              questionsData[selectedQuestion].beadCounts[index] || 0,
                          },
                          (_, i) => {
                            const colorClass = `bead-color-${(Math.floor(i / 5) % 4) + 1}`;
                            return (
                              <div key={i} className={`bead ${colorClass}`}></div>
                            );
                          }
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
                        incorrectAnswers.includes(currentPage * beadsPerPage + index)
                          ? "incorrect"
                          : unfilledInputs.includes(currentPage * beadsPerPage + index)
                          ? "unfilled"
                          : ""
                      }`}
                      required
                    />
                  </div>
                );
              })
          ) : (
            <div>No questions available.</div>
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