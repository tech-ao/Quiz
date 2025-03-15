

import React, { useState } from "react";
export const questionsData = {
  0: { //level A
    beadCounts: [1, 2, 3, 4, 1, 3, 2, 4, 2, 1, 3, 4, 2, 1, 3, 2, 1, 2, 3, 4], 
    correctAnswers: ["1", "2", "3", "4", "1", "3", "2", "4", "2", "1", "3", "4", "2", "1", "3", "2", "1", "2", "3", "4"],
  },
  1: {//level A
    givenNumber: [2, 1, 3, 4, 1, 3, 2, 4, 1, 3, 2,1, 4, 3,2, 1, 1, 2, 3, 4], 
    beadCounts: [], 
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["2", "1", "3", "4", "1", "3", "2", "4", "1", "3","2", "1", "4", "3", "2", "1","1", "2", "3", "4" ], 
  
  },
  2: { //level A
    beadCounts: [1, 2, 3, 4, 2, 2, 4, 3, 2, 1, 1, 3, 2, 4, 2, 1, 3, 2, 4, 2],
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["1", "2", "3", "4", "2", "2", "4", "3", "2", "1", "1", "3", "2", "4", "2", "1", "3", "2", "4", "2"],
  },
  3: {//level A
    givenNumber: [3, 1, 2, 4, 1, 3, 2, 2, 4, 1, 3, 2, 4, 2, 1, 3, 2, 4, 2, 1], 
    beadCounts: [], 
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["3", "1", "2", "4", "1", "3", "2", "2", "4", "1","3", "2", "4", "2", "1", "3", "2", "4", "2", "1",], 
  
  },
  4: { // Level B - Addition Beads
    beadCounts1: [1, 2, 3,  2, 3, 2, 1, 1, 3, 2, 1, 3, 2, 4, 2, 1, 3, 2, 4, 3],
    beadCounts2: [1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 2, 3, 0, 2, 3, 2, 3, 1, 1],
    correctAnswers: ["2", "3", "4", "3", "4", "4", "4", "2", "4", "3", "2", "5", "5", "0", "4", "3", "5", "5", "5", "4"],
  },

  5: { // Level B - Addition
    beadUpper: [1, 1, 1, 2, 2, 3, 2, 1, 1, 1, 1, 2, 3, 1, 2, 3, 1, 1, 1, 3],
    beadLower: [1, 2, 3, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 2, 1, 1, 2, 3, 1, 1],
    correctAnswers: ["2", "3", "4", "4", "3", "4", "4", "4", "2", "3", "2", "4", "4", "3", "3", "4", "3", "4", "2", "4"],
  },
  6:{  beadUpper: [1, 3, 5, 4, 4, 6, 8, 4, 2, 3, 3, 7, 8, 3, 8, 9, 6, 4, 7, 8],
    beadMiddle1:[2, 1, 2, 5, -2, 2, -5, 5, 5, 1, 5, 2, -3, 1, -1, -4, 3, -2, -2, -4],
    beadLower: [5, 5, 1, -1, 5, -1, 1, -3, -1, 5, 1, -4, 4, 5, -2, 2,-1, 5, 4,  3],
    correctAnswers: ["8", "9", "8", "8", "7", "7", "4", "6", "6", "9", "9", "5", "9", "9", "5", "7", "8", "7", "9", "7"],
  },
  7: { // Level B- Subtraction Beads
    beadCounts1: [1, 2, 3, 4, 3, 4, 3, 2, 4, 1, 1, 4, 6, 4, 3, 2, 3, 2, 4, 5],
    beadCounts2: [1, 1, 1, 1, 2, 2, 1, 1, 3, 1, 1, 3, 2, 4, 2, 1, 2, 1, 4, 3],
    correctAnswers: ["0","1", "2", "3", "1", "2", "1", "1", "1", "0", "0", "1", "4", "0","1", "1", "1", "1", "0", "2"],
  },
  8: { // Level B - Subtraction
    beadUpper: [1, 2, 3, 4, 2, 3, 4, 4, 3, 2, 3, 4, 2, 1, 2, 3, 4, 4, 4, 3],
    beadLower: [-1, -1, -1, -1, -2, -2,-2, -1, -1, -1, -3, -3, -1, -1, -2, -3, -1, -2, -3, -1],
    correctAnswers: ["5", "3", "7", "4", "0", "0", "6", "2", "4", "0", "5", "3", "7", "4", "0", "0", "6", "2", "4", "0"],
  },
  9: { // Level C - Addition & Subtraction Beads and Values
    beadCounts1: [1, 2, 3, 4, 3, 4, 3, 2, 1, 2, 1, 4, 3, 4, 3, 2, 3, 2, 1, 4],
    beadCounts2: [1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 3, 2, 4, 2, 1, 1, 1, 2, 3],
    correctAnswers: ["2", "1", "4", "3", "5", "2", "4", "0", "3","0", "1", "2", "5", "0", "5", "1", "4", "1", "3",  "1"],
  },
  10: { // Level C
    beadUpper: [1, 2, 1, 3, 3, 3, 4, 3, 4, 4, 2, 2, 3, 4, 2, 4, 1, 4, 3, 4],
    beadLower: [-1, -1, 2, -2, -1, 1, -2, -3, -3, -1, 1, 2, -2, -1, -2, -3, -1, -3, -1, -4],
    correctAnswers: ["0", "1", "3", "1", "2", "4", "2", "0", "1", "3", "3", "4", "1", "3", "0", "1", "0", "1", "2", "0"],
  },
  11:{
    beadUpper: [1, 3, 5, 4, 4, 6, 8, 4, 2, 3, 3, 7, 8, 3, 8, 9, 6, 4, 7, 8],
    beadMiddle1:[2, 1, 2, 5, -2, 2, -5, 5, 5, 1, 5, 2, -3, 1, -1, -4, 3, -2, -2, -4],
    beadLower: [5, 5, 1, -1, 5, -1, 1, -3, -1, 5, 1, -4, 4, 5, -2, 2,-1, 5, 4,  3],
    correctAnswers: ["8", "9", "8", "8", "7", "7", "4", "6", "6", "9", "9", "5", "9", "9", "5", "7", "8", "7", "9", "7"],
  },
  12:{
    beadUpper: [1, 2, 3, 4, 2, 3, 4, 3, 3, 3, 4, 3, 4 ,5,3, 8, 6, 7 ,8 ,9],
    beadMiddle1:[2, 2 ,1 ,-3 ,2 ,-2, -1, 1, -1, 1, -2, -1, -3, 4 ,5,-2,3,2,-1,-5],
    beadMiddle2:[0, 0, 2, 3, 2,2, 5, 1, 1, 1, 0, 2, 0, 1, 1, -2, 3, 0, -2, 0],
    beadLower: [5, 5, 1, -1, 5, -1, 1, -3, -1, 5, 1, -4, 4, 5, -2, 2,-1, 5, 4,  3],
    correctAnswers: ["8", "9", "8", "8", "7", "7", "4", "6", "6", "9", "9", "5", "9", "9", "5", "7", "8", "7", "9", "7"],
  },
  13:{},
  14:{},
  15:{},
  16: { // Level B - Addition
    beadUpper: [1, 1, 1, 2, 2, 3, 2, 1, 1, 1, 1, 2, 3, 1, 2, 3, 1, 1, 1, 3],
    beadLower: [1, 2, 3, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 2, 1, 1, 2, 3, 1, 1],
    correctAnswers: ["2", "3", "4", "4", "3", "4", "4", "4", "2", "3", "2", "4", "4", "3", "3", "4", "3", "4", "2", "4"],
  },
  17:{},
  18:{ // Level C
    beadUpper: [1, 2, 1, 3, 3, 3, 4, 3, 4, 4, 2, 2, 3, 4, 2, 4, 1, 4, 3, 4],
    beadLower: [-1, -1, 2, -2, -1, 1, -2, -3, -3, -1, 1, 2, -2, -1, -2, -3, -1, -3, -1, -4],
    correctAnswers: ["0", "1", "3", "1", "2", "4", "2", "0", "1", "3", "3", "4", "1", "3", "0", "1", "0", "1", "2", "0"],
  },
  19:{
    beadUpper: [5, 5, 6, 1 ,7,7, 8, 9, 9, 9, 9, 7, 8, 6, 8, 6, 8, 7, 9, 8],
    beadLower: [2, 4, 2, 6, 2, -2, -5, -4, -6, -7 ,-8 ,-5, 1, -9, -3, -1, -5, -2, -7 ,-1],
    correctAnswers: ["7","9","8","7","9","5","3","5","3","2","1","2","9","0","5","5","3","5","2","7"],
  },
  20:{
    beadUpper: [2 ,3, 5, 7, 8, 4, 7, 5, 7, 4, 4, 3, 6, 8, 4, 3, 8, 9, 7 ,8],
    beadMiddle1:[2, -2 ,4, -6, -5, -2, -6, 4, -1, -2, 5, 1, 3, -3, 5, 5, -2 ,-8 ,2 ,-7],
    beadLower: [5, 6, -6, 1, 1, 6, 8 ,-8 ,3, 5, -1, -4, -7, 4, -8, -2, 3, 6, -4, 6],
    correctAnswers: ["9","7","3","2","4","8","9","1","9","7","8","0","4","9","1","6","9","7","5","7"],
  },
  21:{
    beadUpper: [2, 4, 3, 8, 9, 6, 9, 2, 4, 9, 3, 4, 7, 6, 4, 9, 2 ,1, 3, 6],
    beadMiddle1:[1, -2, 5 ,-5, -4, 3 ,-6, 2, -3 ,-8 ,-2 ,5 ,-6, 3 ,-3 ,-6, 2, 8, 1 ,2],
    beadMiddle2:[5 ,5 ,-6 ,6, 2, -4, 5, 5, 8, 7, 8, -6 ,8 ,-9, 6, 5 ,-3 ,-7 ,5 ,-1],
    beadLower: [-6, 2, 5 ,-4 ,-5 ,1 ,-7 ,-9 ,-7 ,-5, -7, ,5 ,-4, 8 ,-5, -3, 5, 5, -7,, -5],
    correctAnswers: ["2","9","7","5","2", "6","1","0","2","3","2","8","5","8","2","5","6","7","2","2"],
  },
  22:{},
  23:{},
  24:{
    beadUpper: [10, 10, 11, 12, 13, 15, 17, 18, 17 ,14,19, 13, 11 ,16 ,19 ,10 ,10 ,10 ,10 ,10],
    beadLower: [1, 2, 1, 1, 1, 2 ,-5 ,-6 ,-2, -3,-6, 6, 8, -5 ,-4, 4 ,3, 5, 3 ,8],
    correctAnswers: ["11","12","11","13","14","17","12","12","15","11","13","19","19","11","15","14"
                     ,"13","15","13","18"],
  },
25:{},
26:{
  beadUpper:[ 55, 22, 44, 11, 55, 88, 66, 99, 55, 22, 33, 77, 44, 22, 33, 88, 66, 88, 33, 22],
  beadMiddle1:[11, 22, 55, 33, 44 ,-11, 33 ,-11, 44, 55,-22 ,22 ,55 ,55 ,-11, -33, 33, 11, 55 ,66],
  beadLower: [22, 55 ,-11 ,55 ,-22 ,22 ,-55 ,11 ,-77, -55, 33, -44, -77, 11, 66, 44, -77, -99, 11 ,-77],
  correctAnswers: ["8", "9", "8", "8", "7", "7", "4", "6", "6", "9", "9", "5", "9", "9", "5", "7", "8", "7", "9", "7"],
},
27:{
  beadUpper: [11, 55 ,33, 99, 33, 11, 88, 77, 44, 22,77 ,88 ,44 ,33, 44, 88, 99, 99, 88, 77],
  beadMiddle1:[22 ,33 ,-11, -66, 55 ,22 ,-33, 22, 55, 22, 22 ,-22, 55, 11 ,-22 ,-33 ,-44, -22, 11 ,-11],
  beadMiddle2:[-33 ,-22 ,55 ,11 ,-22 ,11 ,44 ,-22 ,-33, 55, -11 ,-55, -22, 55, 11, 44, 22, -55 ,-99 ,33],
  beadLower: [11, 22, 22 ,-22, 33, 55 ,-22 ,11 ,11 ,-11, 11, 66 ,11 ,-77 ,55 ,-22 ,-66 ,11 ,66 ,-99 ],
  correctAnswers: ["8", "9", "8", "8", "7", "7", "4", "6", "6", "9", "9", "5", "9", "9", "5", "7", "8", "7", "9", "7"],
},
28:{
  beadUpper: [11, 25, 15, 13, 35, 12, 14, 35, 13 ,26, 35, 12, 45, 22, 11 ,15 ,35 ,13 ,15 ,45],
  beadMiddle1:[22 ,11 ,-15, 15 ,-25 ,16 ,15 ,13 ,-11 ,-15
    , -25, 11, -20, 21 ,22 ,20 ,-25, 11, 14, -20],
  beadLower: [15 ,-15, 35 ,-11 ,15 ,-13 ,-25, -15 ,42 ,11, 14 ,15 ,14 ,-13 ,15 ,14 ,20, 25, 20 ,24],
  correctAnswers: ["8", "9", "8", "8", "7", "7", "4", "6", "6", "9", "9", "5", "9", "9", "5", "7", "8", "7", "9", "7"],
},
29:{},
30:{
  beadUpper: [111, 222, 333, 444, 222, 444, 222, 444, 222, 333 , 555, 777, 333, 999,
    888, 999, 555, 999, 888, 222],
  beadMiddle1:[111 ,-111 ,-111, -333, 222 ,-111 ,111, -222, 111 ,111, 222, 222, 111, 111, -555 ,-444 ,111 ,-555 ,-777, 222],
  beadLower: [111, 222 ,222 ,222, -111 ,-222 ,-333, 111, 111, -222
    ,-111, -444, 555, -555 ,666, 333, 333, -222, 666, 555],
  correctAnswers: ["333","333","444","333","333","111","0","333","444","222","666","555","999","222","999","888","999","222","777","999"],
},
31:{
  beadUpper: [312,225, 786, 486, 321, 175, 261, 816, 175, 614, 786, 555, 424, 213, 555, 585, 951, 612, 455, 555],
  beadMiddle1:[112 ,221, -521, -265, 123, 124, 718, -115, 124, -513,-532, 212, -111, -112, 132, -185, -601, 356, 521, 444],
  beadLower: [555 ,-115, 213, 572, -222, -134, -554 ,147 ,-134, 742, 223, 132, 335, 355, -212, 444, 524, -223 ,-351 ,-999],
  correctAnswers: ["979","331","478","793","222","165","425","848","165","843","477","899","648","456","475","844","874","745","625","333"],
},
 
};
export const Alphabhets = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6:"F",
};

export const questions = [
  "Write The Beads Value", 
  "Draw a Beads For the Given Number", 
  "Write The Beads Value", 
  "Draw a Beads For the Given Number",
  "Addition Beads", 
  "Addition", // Level B
  "Addition",
  "Subtraction Beads",  
  "Subtraction",
  "Addition & Subtraction Beads", // Level C
  "Addition & Subtraction Values",
  "Addition & Subtraction Values",
 "Addition & Subtraction Values",
 "Abacus Querry",
 "Abacus Querry",
 "Abacus Querry",
 "Addition",
 "Abacus Querry",
 "Subtraction",
 "Addition & Subtraction Values",
 "Addition & Subtraction Values",
 "Addition & Subtraction Values",
 "Practice with Abacus",
 "Practice with Abacus",
 "Addition & Subtraction Values",
 "Draw Beads Difficult",
 "Addition & Subtraction Values",
 "Addition & Subtraction Values",
 "Addition & Subtraction Values",
 "Draw Beads Difficult",
 "Addition & Subtraction Values",
"Addition & Subtraction Values",

 
];

const questionLevelMapping = {
  0: "A", // Write The Beads Value
  1: "A", // Draw a Beads For the Given Number
  2: "A", // Draw and write the beads value
  3: "A", //Draw and write the beads value
  4: "B", // Addition Beads
  5: "B",
  6: "B", 
  7:"B", // Subtraction
  8:"B",// Subtraction Beads
  9:"C",
  10:"C",
  11:"C",
  12:"C",
  13:"D",
  14:"D",
  15:"D",
  16:"D",
  17:"D",
  18:"D",
  19:"D",
  20:"D",
  21:"D",
  22:"E",
  23:"E",
  24:"E",
  25:"E",
  26:"F",
  27:"F",
  28:"F",
  29:"F",
  30:"F",
  31:"F"
};

export const useAbacusQuestion = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dummyQuestions, setDummyQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(20).fill(""));
  const [score, setScore] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [unfilledInputs, setUnfilledInputs] = useState([]);
  const [completedLevels, setCompletedLevels] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F:false,
  });

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setUserAnswers(Array(20).fill(""));
    setScore({ correct: 0, incorrect: 0 });
    setIncorrectAnswers([]);
    setUnfilledInputs([]); // Reset unfilled inputs state
  
    const { beadMiddle1, beadMiddle2, beadCounts, beadUpper, beadLower, beadCounts1, beadCounts2 } =
      questionsData[index] || {};
  
    if (
      questions[index] === "Addition" ||
      questions[index] === "Subtraction" ||
      questions[index] === "Addition & Subtraction Values"
    ) {
      if (beadMiddle1 && beadMiddle2) {
        // If beadMiddle1 and beadMiddle2 exist, create dummyQuestions with beadUpper, beadMiddle1, beadMiddle2, and beadLower
        setDummyQuestions(
          beadUpper && beadMiddle1 && beadMiddle2 && beadLower
            ? beadUpper.map((upper, i) => ({
                upper,
                middle1: beadMiddle1[i],
                middle2: beadMiddle2[i],
                lower: beadLower[i],
              }))
            : [] // Fallback to an empty array
        );
      } else if (beadMiddle1) {
        // If only beadMiddle1 exists, create dummyQuestions with beadUpper, beadMiddle1, and beadLower
        setDummyQuestions(
          beadUpper && beadMiddle1 && beadLower
            ? beadUpper.map((upper, i) => ({
                upper,
                middle1: beadMiddle1[i],
                lower: beadLower[i],
              }))
            : [] // Fallback to an empty array
        );
      } else {
        // If no middle values exist, create dummyQuestions with only beadUpper and beadLower
        setDummyQuestions(
          beadUpper && beadLower
            ? beadUpper.map((upper, i) => ({ upper, lower: beadLower[i] }))
            : [] // Fallback to an empty array
        );
      }
    } else if (
      questions[index] === "Addition Beads" ||
      questions[index] === "Subtraction Beads"
    ) {
      setDummyQuestions(
        beadCounts1 && beadCounts2
          ? beadCounts1.map((upper, i) => ({ upper, lower: beadCounts2[i] }))
          : [] // Fallback to an empty array
      );
    } else {
      setDummyQuestions(
        beadCounts ? beadCounts.map((count) => '🟤'.repeat(count)) : [] // Fallback to an empty array
      );
    }
  };

  const handleSubmitAnswer = () => {
    // Check if any field is empty
    const notAttendedIndices = userAnswers
      .map((answer, index) => (answer.trim() === "" ? index : null))
      .filter((index) => index !== null);
  
    const notAttendedCount = notAttendedIndices.length;
  
    if (notAttendedCount > 10) {
      alert("Please fill at least 10 fields before submitting.");
      return; // Exit the function early if more than 10 fields are empty
    }
  
    const correctAnswers = questionsData[selectedQuestion].correctAnswers;
    let correctCount = 0;
    let incorrectCount = 0;
    const incorrectIndices = [];
  
    userAnswers.forEach((answer, index) => {
      if (answer.trim() === "") {
        // Skip not attended fields
        return;
      }
      if (answer.trim() === correctAnswers[index]) {
        correctCount++;
      } else {
        incorrectCount++;
        incorrectIndices.push(index);
      }
    });
  
    setIncorrectAnswers(incorrectIndices);
    setUnfilledInputs(notAttendedIndices); // Set unfilled inputs state
  
    const scoreResult = {
      correct: correctCount,
      incorrect: incorrectCount,
      notAttend: notAttendedCount, // Add not attended count to the result
    };
    setScore(scoreResult);
  
    // Check if the user completed the *entire* stage
    if (incorrectCount < 8) {
      // Use the mapping to find the level key for the current question
      const levelKey = questionLevelMapping[selectedQuestion];
  
      if (levelKey) {
        setCompletedLevels((prev) => ({
          ...prev,
          [levelKey]: true, // Mark the level as completed
        }));
      }
    }
  
    return scoreResult;
  };

  return {
    questionsData,
    Alphabhets,
    questions,
    questionLevelMapping,
    selectedQuestion,
    dummyQuestions,
    userAnswers,
    score,
    setScore,
    completedLevels,
    setCompletedLevels,
    handleQuestionClick,
    handleAnswerChange,
    handleSubmitAnswer,
    incorrectAnswers,
    unfilledInputs, 
    setUnfilledInputs,
  };
};