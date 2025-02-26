import React, { useState } from "react";
import "./aba.css"; // Import the updated CSS file
import AbacusKit from "./Kit";

const AbacusMath = () => {
  const [isMinimized, setIsMinimized] = useState(true);
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

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index); // Set the selected question index
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
          <div className="abacus-nav-items">
            <div className="abacus-nav-item">
              <i className="bi-book-fill" style={{ color: "#f31383", marginRight: "6px" }} aria-hidden="true"></i>
              <span className="abacus-nav-text">Learning path</span>
            </div>
            <div className="abacus-nav-item">
              <i className="bi-file-earmark-text-fill" style={{ color: "#87CEEB", marginRight: "6px" }} aria-hidden="true"></i>
              <span className="abacus-nav-text">Random Worksheets</span>
            </div>
            <div className="abacus-nav-item">
              <i className="bi-arrow-up" style={{ color: "#00008B", marginRight: "6px" }} aria-hidden="true"></i>
              <span className="abacus-nav-text">Mental Accelerator</span>
            </div>
            <div className="abacus-nav-item">
              <i className="bi-pencil-square" style={{ color: "#FFA500", marginRight: "6px" }} aria-hidden="true"></i>
              <span className="abacus-nav-text">Examination</span>
            </div>
          </div>
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

</main>

{/* Minimized Abacus Icon (If minimized, still show an icon to restore) */}
{showHeadingandIcon && (
  <div className="abacus-game-icon-container" onClick={handleGoToKit}>
    <i className="bi bi-controller" aria-hidden="true"></i> {/* Game icon */}
  </div>
)}



</div>
  );
};

export default AbacusMath;
