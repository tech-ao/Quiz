// AbacusQuestion.js
import React, { useState } from "react";


export const questionsData = {
  0: {
    beadCounts: [1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
    beadUpper: [], // Add empty array for consistency
    beadLower: [], // Add empty array for consistency
    correctAnswers: ["1", "3", "2", "4", "2", "1", "3", "2", "4", "5"],
  },
  1: {
    beadCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    beadUpper: [], // Add empty array for consistency
    beadLower: [], // Add empty array for consistency
    correctAnswers: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
  },
  2: {
    beadCounts: [0, 6, 0, 0, 5, 0, 1, 4, 0, 3],
    beadUpper: [], // Add empty array for consistency
    beadLower: [], // Add empty array for consistency
    correctAnswers: ["0", "6", "0", "0", "5", "0", "1", "4", "0", "3"],
  },
  3: {
    beadUpper: [5, 1, 5, 2, 5, 0, 5, 0, 5, 5],
    beadLower: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    correctAnswers: ["6", "3", "8", "6", "10", "6", "12", "8", "14", "15"],
  },
  4:{
    beadUpper: [6, 5, 10, 8, 5, 3, 9, 4, 8, 10],
    beadLower: [-1, -2, -3, -4, -5, -3, -2, -4, 9, -9],
    beadCounts: [], // Add empty array for consistency
    correctAnswers: ["5", "3", "7", "4", "0", "0","6", "2",  "4", "0"],
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
  "Draw and write the beads value",
  "Addition",
  "Subtraction",
];

export const useAbacusQuestion = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dummyQuestions, setDummyQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(""));
  const [score, setScore] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setUserAnswers(Array(10).fill(""));
    setScore({ correct: 0, incorrect: 0 });
  
    const { beadCounts, beadUpper, beadLower } = questionsData[index] || {};
  
    // Initialize dummyQuestions based on the question type
    if (questions[index] === "Addition" || questions[index] === "Subtraction") {
      // For Addition/Subtraction, create pairs of beadUpper and beadLower
      setDummyQuestions(beadUpper.map((upper, i) => ({ upper, lower: beadLower[i] })));
    } else {
      // For other questions, use beadCounts
      setDummyQuestions(beadCounts.map((count) => `🟤`.repeat(count)));
    }
  };  

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };
  const handleSubmitAnswer = () => {
    const correctAnswers = questionsData[selectedQuestion].correctAnswers;
  
    let correctCount = 0;
    let incorrectCount = 0;
  
    userAnswers.forEach((answer, index) => {
      if (answer.trim() === correctAnswers[index]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
  
    const scoreResult = { correct: correctCount, incorrect: incorrectCount };
    setScore(scoreResult); // Update the score state
    return scoreResult; // Return the score for immediate use
  };

  return {
    questionsData,
    Alphabhets,
    questions,
    selectedQuestion,
    dummyQuestions,
    userAnswers,
    score,
    setScore,
    handleQuestionClick,
    handleAnswerChange,
    handleSubmitAnswer,
  };
};