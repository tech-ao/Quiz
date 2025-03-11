import React, { useState } from "react";

const BeadDrawer = ({ givenNumber, onBeadDraw, isIncorrect ,unfilledInputs}) => {
  const [beads, setBeads] = useState(0);

  const handleAddBead = () => {
    if (beads < 8) {
      setBeads(beads + 1);
      onBeadDraw(beads + 1);
    }
  };

  const handleRemoveBead = () => {
    if (beads > 0) {
      setBeads(beads - 1);
      onBeadDraw(beads - 1);
    }
  };

  return (
    <div className="bead-drawer">
      <div className="beads-container">
        <div className="D-stick"></div>
        {Array.from({ length: beads }, (_, index) => (
          <div key={index} className="D-bead"></div>
        ))}
      </div>
      <div className="beads-button-container">
        <button onClick={handleAddBead} className="add-bead-button">
          + {/* Plus button */}
        </button>
        <button onClick={handleRemoveBead} className="remove-bead-button">
          - {/* Minus button */}
        </button>
      </div>
      <h4 className={`h4-beads ${isIncorrect ? "incorrect"  :
                             unfilledInputs ? "unfilled":""}`}>
                          {givenNumber}
      </h4>
    </div>
  );
};

export default BeadDrawer;