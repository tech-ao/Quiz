import React, { useState } from "react";
import { Navbar, Container, Modal ,Button} from "react-bootstrap";
import "./aba.css"; // Import the updated CSS file
import AbacusKit from "./Kit";

const AbacusMath = () => {
  
  const [question, setQuestions] = useState([]); // Store 10 random questions
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(""));  // Store user's answers
  const [score, setScore] = useState(null); // Store correct and incorrect count
  const [showResultModal, setShowResultModal] = useState(false); // State for Modal
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
 
  const handleQuestionClick = (index) => {
    setSelectedQuestion(index); // Set selected question index
    setCurrentQuestionIndex(0); // Reset to first question
    setUserAnswers(Array(10).fill("")); // Clear previous inputs
    setScore({ correct: 0, incorrect: 0 });
  
  
    // Define dummy questions based on the selected question
    const dummyData = {
     
      0: [
        "1 + 1+ = ?",
        "2 + 3 = ?",
        "4 + 5 = ?",
        "7 - 2 = ?",
        "6 + 4 = ?",
        "3 + 8 = ?",
        "9 - 5 = ?",
        "2 + 7 = ?",
        "10 - 6 = ?",
        "5 + 5 = ?"
      ],
      1: [
        "What is addition?",
        "What is subtraction?",
        "Simple practice problems",
        "3 + 2 - 1 = ?",
        "Define borrowing in subtraction",
        "How do you add three numbers together?",
        "What is the sum of 9 and 6?",
        "How does an abacus help with addition?",
        "What is the difference between 8 and 3?",
        "Find the missing number: 5 + __ = 10"
      ],
      2: [
        "How to move fingers?",
        "Finger positioning tips",
        "Practice exercises",
        "Which fingers should be used for the upper beads?",
        "Which fingers are used for the lower beads?",
        "What is the correct way to hold an abacus?",
        "How does proper finger movement increase speed?",
        "What is the role of the thumb in abacus calculations?",
        "What happens if you use the wrong fingers?",
        "Why is finger coordination important in abacus math?"
      ],
      3: [
        "How to visualize numbers?",
        "Techniques for mental calculation",
        "Speed improvement tips",
        "How does mental math improve problem-solving?",
        "What are visualization techniques in abacus?",
        "Why is it important to imagine the abacus beads?",
        "How can you practice abacus visualization?",
        "What role does mental math play in competitions?",
        "How to increase speed in abacus calculations?",
        "How does visualization reduce calculation errors?"
      ],
      4: [
        "Why is accuracy important?",
        "Accuracy vs Speed",
        "Exercises for accuracy",
        "What happens when you prioritize speed over accuracy?",
        "How does accuracy improve mental math skills?",
        "How to practice accuracy using an abacus?",
        "What are common mistakes in abacus calculations?",
        "What techniques help improve calculation accuracy?",
        "How can you balance speed and accuracy?",
        "What is the impact of accurate calculations in real life?"
      ],
      5: [
        "What to expect in future levels?",
        "Advanced concepts",
        "Next steps",
        "What are complex abacus calculations?",
        "What is the role of the soroban abacus in higher levels?",
        "How does abacus training progress over time?",
        "What skills do advanced abacus users develop?",
        "What are advanced multiplication techniques in abacus?",
        "How do you divide using an abacus?",
        "What strategies help master abacus calculations?"
      ]
    };
    
    setDummyQuestions(dummyData[index] || []);
  };


  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    // if (userAnswer === "") return;
  
    // Correct answers for each question category
    const correctAnswers = {
      
      0: ["2", "5", "9", "5", "10", "11", "4", "9", "4", "10"],
      1: [
        "Adding two or more numbers",
        "Taking away one number from another",
        "Basic math exercises",
        "4",
        "Borrowing is taking value from next digit",
        "Add step by step",
        "15",
        "Helps understand place values",
        "5",
        "5"
      ],
      2: [
        "Use thumb and index fingers",
        "Keep fingers flexible and relaxed",
        "Practice moving beads smoothly",
        "Thumb for upper beads",
        "Index finger for lower beads",
        "Hold it flat and stable",
        "Makes calculations faster",
        "Moves upper beads downward",
        "Leads to miscalculations",
        "Coordination improves speed and accuracy"
      ],
      3: [
        "Imagine numbers as bead positions",
        "Break numbers into parts",
        "Practice speed drills",
        "Improves quick thinking",
        "Using imagination to solve problems",
        "Prepares brain for fast calculations",
        "Use flash anzan exercises",
        "Enhances quick decision-making",
        "Regular practice and timing",
        "Reduces common math mistakes"
      ],
      4: [
        "Prevents calculation errors",
        "Balance is necessary",
        "Timed drills with accuracy checks",
        "Mistakes increase",
        "Reduces mistakes and improves recall",
        "Practice slowly before speeding up",
        "Wrong bead movement, miscalculations",
        "Break problems into small parts",
        "Practice both simultaneously",
        "Ensures reliable math results"
      ],
      5: [
        "More complex calculations",
        "Multiplication, division techniques",
        "Higher-level training methods",
        "Using advanced formulas",
        "Japanese abacus with extra features",
        "Gradual learning and mastery",
        "Fast and precise mental calculations",
        "Cross and vertical multiplication",
        "By breaking numbers into smaller parts",
        "Consistent practice and focus"
      ]
    };

      let correctCount = 0;
      let incorrectCount = 0;
  
      userAnswers.forEach((answer, index) => {
        if (answer.trim() === correctAnswers[selectedQuestion][index]) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });
  
      setScore({ correct: correctCount, incorrect: incorrectCount });
      setShowResultModal(true);
    
    if (userAnswer.trim() === correctAnswers[selectedQuestion][currentQuestionIndex]) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
    } else {
      setShowResultModal(true);
    } 
  
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
        {showHeadingandIcon && <h2>Welcome to Abacus Math! Explore and learn with us. </h2>}
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
            <h3>Practice Questions:</h3>
            <div className="questio-wrapp">
            {dummyQuestions.map((question, index) => (
              <div key={index} className="question-item">
                <p>{index+1})    {question}</p>
                <input
                  type="text"
                  value={userAnswers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Enter your answer"
                  className="answer-input"
                />
              </div>
            ))}
           
            <button onClick={handleSubmitAnswer} className="submit-button">Submit</button>
          </div>
          </div>
        )}
        <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Quiz Completed!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{color:"green"}}>Correct Answers: {score?.correct}</p>
            <p style={{color:"red"}}>Incorrect Answers: {score?.incorrect}</p>
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
    <i className="bi bi-controller" aria-hidden="true"></i>
  </div>
)}
</div>
  );
};
export default AbacusMath;
