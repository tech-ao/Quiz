import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./abacus.css";

import Sidebar from "./SidePannel";
import AdminHeader from "./AdminHeader";

const AbacusMath = () => {
  const columns = 17; // Total number of rods
  const topBeads = 1; // Top section: 1 bead per rod
  const bottomBeads = 4; // Bottom section: 4 beads per rod

  // Function to create the initial bead state
  const createInitialBeadState = () => ({
    top: Array(columns).fill(false), // Top beads: false = inactive
    bottom: Array(columns).fill(Array(bottomBeads).fill(false)), // Bottom beads
  });

  const [beadState, setBeadState] = useState(createInitialBeadState());
  const [selectedLevel, setSelectedLevel] = useState(1); // Default level is 1
  const [showAbacusKit, setShowAbacusKit] = useState(false); // Visibility state for Abacus Kit

  // General facts for each level
  const levelFacts = {
    1: [
      "Introduction to beads and rods.",
      "Focus on single-digit numbers.",
      "Learn basic addition and subtraction.",
      "Practice proper finger movements.",
      "Begin mental visualization of calculations.",
      "Accuracy over speed is emphasized.",
      "Foundation building for future levels.",
    ],
    2: [
      "Expand to two-digit numbers.",
      "Learn carry-over and borrowing techniques.",
      "Practice intermediate bead movements.",
      "Introduce simple multiplication.",
      "Develop mental calculation skills.",
      "Timed practice for speed and accuracy.",
      "Enhance finger dexterity.",
    ],
    3: [
      "Work with three-digit numbers.",
      "Practice multi-step calculations.",
      "Introduce basic division concepts.",
      "Refine mental abacus techniques.",
      "Improve problem-solving speed.",
      "Develop memory retention.",
      "Handle more complex problems.",
    ],
    4: [
      "Perform calculations with four-digit numbers.",
      "Learn advanced multiplication and division.",
      "Focus on decimal operations.",
      "Achieve mastery in mental visualization.",
      "Balance speed and precision.",
      "Prepare for competitive calculations.",
      "Solve real-world mathematical problems.",
    ],
    5: [
      "Handle calculations with five-digit numbers.",
      "Work on fractions and advanced decimals.",
      "Master rapid mental calculations.",
      "Tackle large multiplication and division.",
      "Achieve expert-level visualization.",
      "Focus on competitive speed and accuracy.",
      "Apply abacus skills in practical scenarios.",
    ],
  };

  // Toggle a bead's state
  const toggleBead = (section, colIndex, beadIndex = null) => {
    setBeadState((prevState) => {
      const newState = { ...prevState };

      if (section === "top") {
        // Toggle the clicked bead's state
        newState.top[colIndex] = true; // Set the clicked bead to active
        // eslint-disable-next-line no-self-assign
        // Set the color based on the new state
        newState.topColor = newState.top[colIndex] ? "#FFD700" : "#e0e0e0";
      } else if (section === "bottom") {
        newState.bottom = newState.bottom.map((column, idx) =>
          idx === colIndex
            ? column.map((state, index) =>
                index === beadIndex ? !state : state
              )
            : column
        );
      }
      return newState;
    });
  };

  // Reset all beads to their inactive state
  const resetBeads = () => {
    setBeadState(createInitialBeadState());
  };

  return (
    <div>
      <AdminHeader />
      <div className="d-flex ">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
          <div className="d-flex justify-content-between ">
            {/* Dropdown for Level Selection */}
            <div className="mb-4">
              

              <select
                id="levelSelect"
                className="form-select"
                aria-label="Level select"
                style={{ width: "120px" }}
                onChange={(e) => {
                  setSelectedLevel(Number(e.target.value)); // Update selected level
                  setShowAbacusKit(false); // Show general facts
                }}
              >
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
              </select>
            </div>

            <div
              className="learning-path"
              style={{ flex: 1, marginLeft: "20px", cursor: "pointer" }}
               // Show Abacus Kit
            >
              <div className="abacus-kit" style={{ flex: 1, marginLeft: "20px", cursor: "pointer", gap: "15px" }}>
                <div className="icon-text" onClick={() => setShowAbacusKit(true)} style={{ display: "flex", alignItems: "center" }}>
                  <i className="bi bi-controller" style={{ color: "#32cd32 ", marginRight: "4px" }} aria-hidden="true"></i>
                  <span className="nav-text">Abacus Kit</span>
                </div>

                <div className="icon-text" style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                  <i className="bi-book-fill" style={{ color: "#f31383", marginRight: "4px" }} aria-hidden="true"></i>
                  <span className="nav-text">Learning path</span>
                </div>

                <div className="icon-text" style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                  <i className="bi-file-earmark-text-fill" style={{ color: "#87CEEB", marginRight: "4px" }} aria-hidden="true"></i>
                  <span className="nav-text">Randam Worksheets</span>
                </div>

                <div className="icon-text" style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                  <i className="bi-arrow-up" style={{ color: "#00008B", marginRight: "4px" }} aria-hidden="true"></i>
                  <span className="nav-text">Mental Accelerator</span>
                </div>

                <div className="icon-text" style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                  <i className="bi-pencil-square" style={{ color: "#FFA500", marginRight: "4px" }} aria-hidden="true"></i>
                  <span className="nav-text">Examination</span>
                </div>
              </div>
            </div>

            <div
             
            >
              
            </div>

          

          </div>

          {/* Conditionally Display General Facts or Abacus Kit */}
          {!showAbacusKit ? (
            <div  className="abacus-frame rounded shadow">
            <div className="mb-4 d-flex flex-column flex-md-row align-items-center p-5">
              <div className="me-md-4"> {/* Margin for spacing on larger screens */}
                <h3 style={{ marginBottom: "50px",  color: "#155724" }}>General Facts for Level {selectedLevel}</h3>
                <ul>
                  {levelFacts[selectedLevel].map((fact, index) => (
                    <li key={index} className="rounded-green">{fact}</li>
                  ))}
                </ul>
              </div>
              <img 
                src="/abacus-genteral facts.png"
                alt="Abacus General Facts" 
                className="img-fluid"
                style={{ maxWidth: "400px", height: "auto", marginLeft: "80px" }}
              />
            </div>
            </div>
          ) : (
            <div className="sub-container">
              <Container
                className="p-4 d-flex flex-column align-items-center"
                style={{ maxWidth: "900px" }}
              >
                <h2 className="text-center mb-4">Interactive Abacus</h2>

                {/* Abacus Frame */}
                <div
                  className="abacus-frame border border-dark rounded shadow"
                  style={{
                    width: "100%",
                    background: "linear-gradient(#fceabb )",
                    padding: "20px 10px",
                    position: "relative",
                    borderRadius: "12px",
                  }}
                >
                  {/* Rods */}
                  <div className="d-flex justify-content-between">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className="abacus-rod d-flex flex-column align-items-center"
                      >
                        {/* Top Beads */}
                        {Array.from({ length: topBeads }).map((_, beadIndex) => (
                          <div
                            key={beadIndex}
                            className={`abacus-bead`}
                            onClick={() => toggleBead("top", colIndex)}
                            style={{
                              width: "30px",
                              height: "30px",
                              backgroundColor: beadState.top[colIndex]
                                ? "#007bff"
                                : "#FFD700",
                              borderRadius: "50%",
                              marginBottom: "15px",
                              cursor: "pointer",
                              transition:
                                "transform 0.3s, background-color 0.3s",
                              transform: beadState.top[colIndex]
                                ? "translateY(20px)"
                                : "translateY(0)",
                            }}
                          ></div>
                        ))}

                        {/* Center Bar */}
                        <div
                          className="abacus-center-bar"
                          style={{
                            width: "4px",
                            height: "120px",
                            backgroundColor: "#000",
                            margin: "5px 0",
                            borderRadius: "2px",
                          }}
                        ></div>

                        {/* Bottom Beads */}
                        {Array.from({ length: bottomBeads }).map(
                          (_, beadIndex) => (
                            <div
                              key={beadIndex}
                              className={`abacus-bead`}
                              onClick={() =>
                                toggleBead("bottom", colIndex, beadIndex)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                backgroundColor: beadState.bottom[colIndex][
                                  beadIndex
                                ]
                                  ? "#007bff"
                                  : "#00C853",
                                borderRadius: "50%",
                                marginBottom: "5px",
                                cursor: "pointer",
                                transition:
                                  "transform 0.3s, background-color 0.3s",
                                transform: beadState.bottom[colIndex][beadIndex]
                                  ? "translateY(-20px)"
                                  : "translateY(0)",
                              }}
                            ></div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <Button
                  className="mt-4"
                  variant="danger"
                  onClick={resetBeads}
                  style={{
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                >
                  Reset
                </Button>
              </Container>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AbacusMath;
