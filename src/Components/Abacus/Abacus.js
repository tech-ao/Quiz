import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Abacus = () => {
  const columns = 17; // Total number of rods
  const topBeads = 1; // Top section: 1 bead per rod
  const bottomBeads = 4; // Bottom section: 4 beads per rod

  // Initializing bead states for all columns
  const initialBeadState = {
    top: Array(columns).fill(false),
    bottom: Array(columns).fill(Array(bottomBeads).fill(false)),
  };

  const [beadState, setBeadState] = useState(initialBeadState);

  // Toggle a bead's state
  const toggleBead = (section, colIndex, beadIndex = null) => {
    setBeadState((prevState) => {
      const newState = { ...prevState };
      if (section === "top") {
        newState.top[colIndex] = !newState.top[colIndex];
      } else if (section === "bottom") {
        newState.bottom[colIndex] = newState.bottom[colIndex].map((state, idx) =>
          idx === beadIndex ? !state : state
        );
      }
      return newState;
    });
  };

  // Reset all beads to their inactive state
  const resetBeads = () => {
    setBeadState(initialBeadState);
  };

  return (
    <Container className="p-4 d-flex flex-column align-items-center" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Interactive Abacus</h2>

      {/* Abacus Frame */}
      <div
        className="abacus-frame border border-dark rounded shadow"
        style={{
          width: "100%",
          backgroundColor: "#f4f4f4",
          padding: "20px 10px",
          position: "relative",
        }}
      >
        {/* Rods */}
        <div className="d-flex justify-content-between">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="abacus-rod d-flex flex-column align-items-center">
              {/* Top Bead */}
              <div
                className={`abacus-bead ${beadState.top[colIndex] ? "active" : ""}`}
                onClick={() => toggleBead("top", colIndex)}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: beadState.top[colIndex] ? "#FFD700" : "#e0e0e0",
                  borderRadius: "50%",
                  marginBottom: "15px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  transform: beadState.top[colIndex] ? "translateY(20px)" : "translateY(0)",
                }}
              ></div>

              {/* Center Bar */}
              <div
                className="abacus-center-bar"
                style={{
                  width: "4px",
                  height: "100px",
                  backgroundColor: "black",
                  margin: "5px 0",
                }}
              ></div>

              {/* Bottom Beads */}
              {Array.from({ length: bottomBeads }).map((_, beadIndex) => (
                <div
                  key={beadIndex}
                  className={`abacus-bead ${beadState.bottom[colIndex][beadIndex] ? "active" : ""}`}
                  onClick={() => toggleBead("bottom", colIndex, beadIndex)}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: beadState.bottom[colIndex][beadIndex]
                      ? "#007bff"
                      : "#e0e0e0",
                    borderRadius: "50%",
                    marginBottom: "5px",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    transform: beadState.bottom[colIndex][beadIndex]
                      ? "translateY(-20px)"
                      : "translateY(0)",
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button className="mt-4" variant="danger" onClick={resetBeads}>
        Reset Abacus
      </Button>
    </Container>
  );
};

export default Abacus;
