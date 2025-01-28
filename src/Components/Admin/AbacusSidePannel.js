// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AbacusSidePannel.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const AbacusSidePanel = ({ isOpen, selectedLevel }) => {
//   const navigate = useNavigate();
//   const [openStages, setOpenStages] = useState({}); // Track open state for each stage

//   const toggleStage = (stage) => {
//     setOpenStages((prev) => ({ ...prev, [stage]: !prev[stage] }));
//   };

//   const handleOutsideClick = (event) => {
//     if (!event.target.closest('.side-panel') && isOpen) {
//       // Handle outside click logic
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleOutsideClick);
//     return () => {
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, [isOpen]);

//   const handleBackButtonClick = () => {
//     navigate('/adminDashboard');
//   };

//   const renderLevelContent = () => {
//     const stagesContent = {
//       1: [
//         "Introduction to the Abacus",
//         "Basic bead movements",
//         "Understanding place value",
//         "Simple addition and subtraction",
//         "Practice with one-digit numbers",
//       ],
//       2: [
//         "Expand to two-digit numbers.",
//         "Learn carry-over and borrowing techniques.",
//         "Practice intermediate bead movements.",
//         "Introduce simple multiplication.",
//         "Develop mental calculation skills.",
//         "Timed practice for speed and accuracy.",
//         "Enhance finger dexterity.",
//       ],
//       3: [
//         "Work with three-digit numbers.",
//         "Practice multi-step calculations.",
//         "Introduce basic division concepts.",
//         "Refine mental abacus techniques.",
//         "Improve problem-solving speed.",
//         "Develop memory retention.",
//         "Handle more complex problems.",
//       ],
//       4: [
//         "Perform calculations with four-digit numbers.",
//         "Learn advanced multiplication and division.",
//         "Focus on decimal operations.",
//         "Achieve mastery in mental visualization.",
//         "Balance speed and precision.",
//         "Prepare for competitive calculations.",
//         "Solve real-world mathematical problems.",
//       ],
//       5: [
//         "Handle calculations with five-digit numbers.",
//         "Work on fractions and advanced decimals.",
//         "Master rapid mental calculations.",
//         "Tackle large multiplication and division.",
//         "Achieve expert-level visualization.",
//         "Focus on competitive speed and accuracy.",
//         "Apply abacus skills in practical scenarios.",
//       ],
//     };

//     return (
//       <div>
       
//       </div>
//     );
//   };

//   return (
//     <div className={`side-panel ${isOpen ? 'open' : ''}`}>
//       <ul className="nav flex-column">
//         <li className="nav-item">
//           <div
//             className="nav-link active flex-row gap-2"
//             onClick={handleBackButtonClick}
//             style={{ cursor: 'pointer' }}
//           >
//             <i className="bi bi-arrow-left"></i>
//             <span className="nav-text">Back to Dashboard</span>
//           </div>
//         </li>
//         <li className="nav-item">
//           <div className="nav-link">{renderLevelContent()}</div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default AbacusSidePanel;
