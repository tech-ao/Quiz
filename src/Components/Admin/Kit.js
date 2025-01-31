import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./kit.css";

const AbacusKit = () => {
  const columns = 17;
  const bottomBeads = 4;

  const [beadState, setBeadState] = useState({
    top: Array(columns).fill(false),
    bottom: Array(columns).fill(Array(bottomBeads).fill(false)),
  });

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
          if (newColumn[beadIndex]) {
            for (let i = beadIndex; i < bottomBeads; i++) {
              newColumn[i] = false;
            }
          } else {
            for (let i = 0; i <= beadIndex; i++) {
              newColumn[i] = true;
            }
          }
          return newColumn;
        } else {
          return column;
        }
      });

      // const newTopState = prevState.top.map((topBead, index) => {
      //   if (index === colIndex) {
      //     return newBottomState[colIndex].some(bead => bead); // Check the *new* bottom state
      //   } else {
      //     return topBead;
      //   }
      // });

      return { ...prevState, bottom: newBottomState, };
    });
  };

  const resetBeads = () => {
    setBeadState({
      top: Array(columns).fill(false),
      bottom: Array(columns).fill(Array(bottomBeads).fill(false)),
    });
  };

  return (
    <div className="abacus-container">
      <h2 className="title">Interactive Abacus</h2>
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
                      className={`abacus-bead bottom ${beadState.bottom[colIndex][beadIndex] ? "active" : ""}`}
                      onClick={() => toggleBottomBead(colIndex, beadIndex)}
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