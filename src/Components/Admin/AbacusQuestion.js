

import React, { useState } from "react";
export const questionsData = {
  0: { //level A
    beadCounts: [1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5], 
    correctAnswers: ["1", "3", "2", "4", "2", "1", "3", "2", "4", "5", "1", "3", "2", "4", "2", "1", "3", "2", "4", "5"],
  },
  1: {//level A
    givenNumber: [5, 3, 7, 2, 4, 6, 1, 8, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 1], 
    beadCounts: [], 
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["5", "3", "7", "2", "4", "6", "1", "8", "5", "1","3", "2", "4", "2", "1", "3", "2", "4", "5", "1",], 
  
  },
  2: { //level A
    beadCounts: [1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["1", "3", "2", "4", "2", "1", "3", "2", "4", "5", "1", "3", "2", "4", "2", "1", "3", "2", "4", "5"],
  },
  3: {//level A
    givenNumber: [5, 3, 7, 2, 4, 6, 1, 8, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 1], 
    beadCounts: [], 
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["5", "3", "7", "2", "4", "6", "1", "8", "5", "1","3", "2", "4", "2", "1", "3", "2", "4", "5", "1",], 
  
  },
  4: { // Level B - Addition Beads
    beadCounts1: [1, 3, 2,  1, 2, 1, 3, 2, 4, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
    beadCounts2: [5, 1, 5, 2, 5, 0, 5, 0, 5, 5, 1, 2, 3, 4, 5, 6, 5, 3, 1, 6],
    correctAnswers: ["6", "4", "7", "3", "7", "1", "8", "2", "9", "10", "2", "5", "5", "8", "7", "7", "8", "5", "5", "11"],
  },
  5: { // Level B - Addition
    beadUpper: [4, 1, 2, 2, 4, 0, 1, 0, 2, 3, 1, 2, 3, 4, 4, 2, 1, 4, 0, 1],
    beadLower: [1, 2, 3, 4, 0, 4, 3, 4, 2, 1, 4, 1, 2, 2, 0, 0, 1, 0, 4, 0],
    correctAnswers: ["5", "3", "5", "6", "4", "4", "4", "4", "4", "4", "5", "3", "5", "6", "4", "2", "2", "4", "4", "1"],
  },
  6: { // Level B - Addition
    beadUpper: [1, 1, 1, 2, 2, 3, 2, 1, 1, 1, 1, 2, 3, 1, 2, 3, 1, 1, 1, 3],
    beadLower: [1, 2, 3, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 2, 1, 1, 2, 3, 1, 1],
    correctAnswers: ["2", "3", "4", "4", "3", "4", "4", "4", "2", "3", "2", "4", "4", "3", "3", "4", "3", "4", "2", "4"],
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
    beadCounts1: [1, 2, 3, 4, 3, 4, 3, 2, 3, 2, 1, 4, 6, 4, 3, 2, 3, 2, 4, 5],
    beadCounts2: [1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 3, 2, 4, 2, 1, 2, 1, 4, 3],
    correctAnswers: ["0", "1", "2", "3", "0", "1", "2", "3", "2","1", "0", "1", "1", "0", "0", "0", "2", "2", "1",  "2"],
  },
  10: { // Level C
    beadUpper: [1, 2, 1, 3, 3, 3, 4, 3, 4, 4, 2, 2, 3, 4, 2, 4, 1, 4, 3, 4],
    beadLower: [-1, -1, 2, -2, -1, 1, -2, -3, -3, -1, 1, 2, -2, -1, -2, -3, -1, -3, -1, -4],
    correctAnswers: ["0", "1", "3", "1", "2", "4", "2", "0", "1", "3", "3", "4", "1", "3", "0", "1", "0", "1", "2", "0"],
  },
};
export const Alphabhets = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
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
  10:"C"
  
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
  
    const { beadCounts, beadUpper, beadLower, beadCounts1, beadCounts2 } =
      questionsData[index] || {};
  
    if (questions[index] === "Addition" || questions[index] === "Subtraction" ||questions[index]==="Addition & Subtraction Values") {
      setDummyQuestions(
        beadUpper && beadLower
          ? beadUpper.map((upper, i) => ({ upper, lower: beadLower[i] }))
          : []
      );
    } else if (
      questions[index] === "Addition Beads" ||
      questions[index] === "Subtraction Beads"
    ) {
      setDummyQuestions(
        beadCounts1 && beadCounts2
          ? beadCounts1.map((upper, i) => ({ upper, lower: beadCounts2[i] }))
          : []
      );
    } else {
      setDummyQuestions(
        beadCounts ? beadCounts.map((count) => '🟤'.repeat(count)) : []
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