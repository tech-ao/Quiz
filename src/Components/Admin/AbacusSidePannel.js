import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import './AbacusSidePannel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AbacusSidePanel = ({ isOpen, selectedLevel }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isLevel1Open, setLevel1Open] = useState(true);
  const [isLevel2Open, setLevel2Open] = useState(false);
  const [isLevel3Open, setLevel3Open] = useState(false);
  const [isLevel4Open, setLevel4Open] = useState(false);
  const [isLevel5Open, setLevel5Open] = useState(false);

  const toggleMenu = (setLevelOpen, currentState) => {
    setLevelOpen(!currentState);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.side-panel') && isOpen) {
      // Handle outside click logic
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleBackButtonClick = () => {
    navigate('/adminDashboard'); // Navigate to /admindashbord
  };

  const renderLevelContent = () => {
    switch (selectedLevel) {
      case 1:
        return (
          <ul>
            <li>Introduction to beads and rods.</li>
            <li>Focus on single-digit numbers.</li>
            <li>Learn basic addition and subtraction.</li>
            <li>Practice proper finger movements.</li>
            <li>Begin mental visualization of calculations.</li>
            <li>Accuracy over speed is emphasized.</li>
            <li>Foundation building for future levels.</li>
          </ul>
        );
      case 2:
        return (
          <ul>
            <li>Expand to two-digit numbers.</li>
            <li>Learn carry-over and borrowing techniques.</li>
            <li>Practice intermediate bead movements.</li>
            <li>Introduce simple multiplication.</li>
            <li>Develop mental calculation skills.</li>
            <li>Timed practice for speed and accuracy.</li>
            <li>Enhance finger dexterity.</li>
          </ul>
        );
      case 3:
        return (
          <ul>
            <li>Work with three-digit numbers.</li>
            <li>Practice multi-step calculations.</li>
            <li>Introduce basic division concepts.</li>
            <li>Refine mental abacus techniques.</li>
            <li>Improve problem-solving speed.</li>
            <li>Develop memory retention.</li>
            <li>Handle more complex problems.</li>
          </ul>
        );
      case 4:
        return (
          <ul>
            <li>Perform calculations with four-digit numbers.</li>
            <li>Learn advanced multiplication and division.</li>
            <li>Focus on decimal operations.</li>
            <li>Achieve mastery in mental visualization.</li>
            <li>Balance speed and precision.</li>
            <li>Prepare for competitive calculations.</li>
            <li>Solve real-world mathematical problems.</li>
          </ul>
        );
      case 5:
        return (
          <ul>
            <li>Handle calculations with five-digit numbers.</li>
            <li>Work on fractions and advanced decimals.</li>
            <li>Master rapid mental calculations.</li>
            <li>Tackle large multiplication and division.</li>
            <li>Achieve expert-level visualization.</li>
            <li>Focus on competitive speed and accuracy.</li>
            <li>Apply abacus skills in practical scenarios.</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <div
            className="nav-link active flex-row gap-2"
            onClick={handleBackButtonClick} // Attach click handler
            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
          >
            <i className="bi bi-arrow-left"></i>
            <span className="nav-text">Abacus Level {selectedLevel}</span>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link">{renderLevelContent()}</div>
        </li>
      </ul>
    </div>
  );
};

export default AbacusSidePanel;
