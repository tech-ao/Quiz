import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Toggle a bead's state
  const toggleBead = (section, colIndex, beadIndex = null) => {
    setBeadState((prevState) => {
      const newState = { ...prevState };

      if (section === "top") {
        // Toggle the clicked bead's state
        newState.top[colIndex] = true; // Set the clicked bead to active
        // eslint-disable-next-line no-self-assign
        // Set the color based on the new state
        newState.topColor = newState.top[colIndex] ? "#FFD700" : "#e0e0e0"; // Set color based on state
      } else if (section === "bottom") {
        // Toggle the bottom bead's state
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
      <div className="d-flex">
        <Sidebar />
        <Container className="main-container p-4 min-vh-100">
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
                            transition: "transform 0.3s, background-color 0.3s",
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
                              transition: "transform 0.3s, background-color 0.3s",
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
        </Container>
      </div>
    </div>
  );
};

export default AbacusMath;
