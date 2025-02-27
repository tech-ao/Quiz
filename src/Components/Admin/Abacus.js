import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import "./aba.css"; // Import the updated CSS file
import AbacusKit from "./Kit";

const AbacusMath = () => {
  const [dummyQuestions, setDummyQuestions] = useState([]); // Stores dummy questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [userAnswer, setUserAnswer] = useState("");

  const [isMinimized, setIsMinimized] = useState(false);
  const [showAbacusKit, setShowAbacusKit] = useState(false);
  const [showHeadingandIcon,setShowHeadingandIcon]=useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openStage, setOpenStage] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track selected question
  console.log("the isMinimize state is :",isMinimized);
  console.log("the showAbacuskit is:",showAbacusKit);
  console.log("showHeadingandIcon is :",showHeadingandIcon);
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setOpenStage(null); // Reset open stage when level changes
    setSelectedQuestion(null); // Reset selected question
  };

  const toggleStage = (stage) => {
    setOpenStage(openStage === stage ? null : stage);
    setSelectedQuestion(null); // Reset selected question when toggling stages
  };

  const handleSubmitAnswer = () => {
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
      setUserAnswer(""); // Clear input field
    } else {
      alert("You have completed all questions!"); // Notify user when all questions are done
    }
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index); // Set selected question index
    setCurrentQuestionIndex(0); // Reset to first question
  setUserAnswer(""); // Clear previous input
  
    // Define dummy questions based on the selected question
    const dummyData = {
      0: ["What is an abacus?", "History of the abacus", "Why use an abacus?"],
      1: ["1 + 1 = ?", "2 + 3 = ?", "4 + 5 = ?"],
      2: ["What is addition?", "What is subtraction?", "Simple practice problems"],
      3: ["How to move fingers?", "Finger positioning tips", "Practice exercises"],
      4: ["How to visualize numbers?", "Techniques for mental calculation", "Speed improvement tips"],
      5: ["Why is accuracy important?", "Accuracy vs Speed", "Exercises for accuracy"],
      6: ["What to expect in future levels?", "Advanced concepts", "Next steps"],
    };
  
    setDummyQuestions(dummyData[index] || []);
  };
   
    
  
  const handleGoToKit = () => {
    setShowHeadingandIcon(false)
    setShowAbacusKit(true); // Show AbacusKit inside main content
    setIsMinimized(false); 
  };
  const handleMinimize = () => {
    // setShowAbacusKit(true); 
    setIsMinimized((prev) => !prev);
    setShowHeadingandIcon((prev)=>!prev)
    
  };
  const handleClose = () => {
    setShowHeadingandIcon(true)
    setShowAbacusKit(false);
    console.log("Abacus closed");
    // You can also update a state here if needed to hide the component
  };
  

  const questions = [
    "Introduction",
    "single-digit numbers",
    "Addition and subtraction",
    "proper finger movements",
    "mental visualization",
    "Accuracy over speed",
    "future levels",
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

  return (
    <div className="abacus-app-container">
      {/* Header */}
      <header className="abacus-header">
        <a href="/adminDashboard" className="abacus-back-button">
          <i className="bi-arrow-left" aria-hidden="true"></i> {/* Back icon */}
          Back
        </a>
        <div className="abacus-header-content">
          <select className="abacus-level-dropdown" onChange={handleLevelChange}>
            <option value="">Select Level</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
          </select>

          {/* Navigation Items in Header */}
          <Navbar expand="lg" className="sticky-top">
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
      <aside className="abacus-sidebar">
        {selectedLevel && (
          <div className="abacus-level-section">
            <h2 className="abacus-level-heading">Level {selectedLevel}</h2>
            {[1, 2, 3, 4, 5].map((stage) => (
              <div key={stage}>
                <div className="abacus-stage" onClick={() => toggleStage(stage)}>
                  Stage {stage} 
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
  {/* {(!showAbacusKit && showHeadingandIcon) ? (
    <>
      <h2>Welcome to Abacus Math! Explore and learn with us.</h2>
    </>
  ) : (
    // 
    <AbacusKit
    isMinimized={isMinimized}
    onMinimize={handleMinimize}
    onClose={handleClose}
  />
  )} */}
  {
    (showHeadingandIcon) && <h2>Welcome to Abacus Math! Explore and learn with us. </h2>
  }
  {
    showAbacusKit &&(<> 
     <AbacusKit
    isMinimized={isMinimized}
    onMinimize={handleMinimize}
    onClose={handleClose}/>
    </>) 
  }
  {/* Game Icon Button */}
  {/* Display Dummy Questions When a Question is Selected */}
  {selectedQuestion !== null && (
  <div 
  className={`dummy-questions-container 
    ${isMinimized || !showAbacusKit ? "minimized" : ""} 
    ${showAbacusKit && !isMinimized ? "abacus-open" : ""}`}>
    <h3>Practice Questions:</h3>
    
    {dummyQuestions.length > 0 && (
      <>
        <p>{dummyQuestions[currentQuestionIndex]}</p> {/* Show current question */}
        <input 
          type="text" 
          value={userAnswer} 
          onChange={(e) => setUserAnswer(e.target.value)} 
          placeholder="Enter your answer" 
          className="answer-input"
        />
        <button onClick={handleSubmitAnswer} className="submit-button">Submit</button>
      </>
    )}
  </div>
)}


</main>

{/* Minimized Abacus Icon (If minimized, still show an icon to restore) */}
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
