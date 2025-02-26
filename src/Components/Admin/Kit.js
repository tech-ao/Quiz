import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./kit.css";

const AbacusKit = ({ onClose,isMinimized, onMinimize }) => {
  const columns = 17;
  const bottomBeads = 4;

  const [beadState, setBeadState] = useState({
    top: Array(columns).fill(false),
    bottom: Array(columns).fill(Array(bottomBeads).fill(false)),
  });

  // const [isMinimized, setIsMinimized] = useState(false);

  const toggleTopBead = (colIndex) => {
    setBeadState((prevState) => {
      const newTopState = prevState.top.map((topBead, index) =>
        index === colIndex ? !topBead : topBead
      );
      return { ...prevState, top: newTopState };
    });
  };

  const toggleBottomBead = (colIndex, beadIndex) => {
    setBeadState((prevState) => {
      const newBottomState = prevState.bottom.map((column, index) => {
        if (index === colIndex) {
          const newColumn = [...column];
          const isBeadActive = newColumn[beadIndex];
  
          if (isBeadActive) {
            // Move all beads below this back down
            for (let i = beadIndex; i < bottomBeads; i++) {
              newColumn[i] = false;
            }
          } else {
            // Move all beads up to this index
            for (let i = 0; i <= beadIndex; i++) {
              newColumn[i] = true;
            }
          }
          return newColumn;
        }
        return column;
      });
  
      return { ...prevState, bottom: newBottomState };
    });
  
    setTimeout(() => {
      for (let i = 0; i < bottomBeads; i++) {
        const beadElement = document.querySelector(`.bead-bottom-${colIndex}-${i}`);
        const line = document.querySelector(".horizontal-line");
  
        if (!beadElement || !line) {
          console.warn("Bead element or horizontal line not found.");
          return;
        }
  
        const lineRect = line.getBoundingClientRect();
        const beadRect = beadElement.getBoundingClientRect();
        const moveUp = beadRect.top - lineRect.top + 5; // Adjust for alignment
  
        if (i <= beadIndex) {
          beadElement.style.transform = `translateY(-${moveUp}px)`; // Move Up
        } else {
          beadElement.style.transform = `translateY(0px)`; // Move Down properly
        }
      }
    }, 50);
  };
  

  const resetBeads = () => {
    setBeadState({
      top: Array(columns).fill(false),
      bottom: Array(columns).fill(Array(bottomBeads).fill(false)),
    });

    setTimeout(() => {
      document.querySelectorAll(".abacus-bead.bottom").forEach((bead) => {
        bead.style.transform = "translateY(0px)";
      });
    }, 50);
  };

  return (
      <div className={`abacus-container ${isMinimized ? "minimized" : ""}`}>
        <div className="abacus-sub-cont">
          <div className="abacus-headerss">
            <h2 className="title">Interactive Abacus</h2>
            <div className="header-buttons">
            <button className="icon-button" onClick={onMinimize}>
              {isMinimized ? "🔼" : "➖"}
            </button>
            <button className="icon-button" onClick={onClose}>
              ❌
            </button>
            </div>
          </div>
    
          {/* Abacus Frame (Hidden when minimized) */}
          {!isMinimized && (
            <>
              <div className="abacus-frame">
                <div className="horizontal-line"></div>
                <div className="aba-frame">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <div key={colIndex} className="abacus-rod">
                      <div className="abacus-center-bar">
                        <div className="tb">
                          <div
                            className={`abacus-bead top ${beadState.top[colIndex] ? "active" : ""}`}
                            onClick={() => toggleTopBead(colIndex)}
                          ></div>
                        </div>
                        <div className="bb">
                          {Array.from({ length: bottomBeads }).map((_, beadIndex) => (
                            <div
                              key={beadIndex}
                              className={`abacus-bead bottom bead-${colIndex}-${beadIndex} ${
                                beadState.bottom[colIndex][beadIndex] ? "active" : ""
                              }`}
                              onClick={() => toggleBottomBead(colIndex, beadIndex)}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              <button className="reset-button" onClick={resetBeads}>Reset</button>
            </>
          )}
        </div>
      </div>
    );
    
  };
export default AbacusKit;
