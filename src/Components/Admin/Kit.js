import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./kit.css";

const AbacusKit = () => {
  const columns = 17; // 17 rods
  const topBeads = 1; // 1 top bead per rod
  const bottomBeads = 4; // 4 bottom beads per rod

  // Initialize bead state
  const createInitialBeadState = () => ({
    top: Array(columns).fill(false),
    bottom: Array(columns).fill(Array(bottomBeads).fill(false)),
  });

  const [beadState, setBeadState] = useState(createInitialBeadState());

  // Toggle bead state
  const toggleBead = (section, colIndex, beadIndex = null) => {
    setBeadState((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      if (section === "top") {
        newState.top[colIndex] = !newState.top[colIndex];
      } else if (section === "bottom") {
        // Toggle the clicked bottom bead
        newState.bottom[colIndex][beadIndex] = !newState.bottom[colIndex][beadIndex];
        
        // No changes to previous beads
      }
      return newState;
    });
  };

  // Reset all beads
  const resetBeads = () => {
    setBeadState(createInitialBeadState());
  };

  return (
    <div className="abacus-container">
      <h2 className="title">Interactive Abacus</h2>
      <div className="abacus-frame">
       <div className="horizontal-line"></div> {/* Added horizontal line for spacing */}
        <div className="aba-frame">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="abacus-rod">
              <div className="abacus-center-bar">
                {/* Top Bead */}
                <div className="tb">
                  <div
                    className={`abacus-bead top ${
                      beadState.top[colIndex] ? "active" : ""
                    }`}
                    onClick={() => toggleBead("top", colIndex)}
                  ></div>
                </div>

                {/* Bottom Beads */}
                <div className="bb">
                  {Array.from({ length: bottomBeads }).map((_, beadIndex) => (
                    <div
                      key={beadIndex}
                      className={`abacus-bead bottom ${
                        beadState.bottom[colIndex][beadIndex] ? "active" : ""
                      }`}
                      onClick={() => toggleBead("bottom", colIndex, beadIndex)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="reset-button" onClick={resetBeads}>
        Reset
      </button>
    </div>
  );
};

export default AbacusKit;
