
import React, { useState } from "react";
export const questionsData = {
  0: { 
    beadCounts: [1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["1", "3", "2", "4", "2", "1", "3", "2", "4", "5", "1", "3", "2", "4", "2", "1", "3", "2", "4", "5"],
  },
  1: {//Drawbeads
    givenNumber: [5, 3, 7, 2, 4, 6, 1, 8, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 1], 
    beadCounts: [], 
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["5", "3", "7", "2", "4", "6", "1", "8", "5", "1","3", "2", "4", "2", "1", "3", "2", "4", "5", "1",], 
  
  },
  2: {
    beadCounts: [0, 6, 2, 3, 5, 0, 1, 4, 2, 3, 0, 6, 4, 6, 5, 0, 1, 4, 0, 3],
    beadUpper: [], 
    beadLower: [], 
    correctAnswers: ["0", "6", "2", "3", "5", "0", "1", "4", "2", "3", "0", "6", "4", "6", "5", "0", "1", "4", "0", "3"],
  },
  3: { // Level D - Addition
    beadUpper: [5, 1, 5, 2, 5, 0, 5, 0, 5, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    beadLower: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 1, 5, 2, 5, 0, 5, 0, 5, 5],
    correctAnswers: ["6", "3", "8", "6", "10", "6", "12", "8", "14", "15", "6", "3", "8", "6", "10", "6", "12", "8", "14", "15"],
  },
  4: { // Level D - Addition Beads
    beadCounts1: [1, 3, 2,  1, 2, 1, 3, 2, 4, 5, 1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
    beadCounts2: [5, 1, 5, 2, 5, 0, 5, 0, 5, 5, 1, 2, 3, 4, 5, 6, 5, 3, 1, 6],
    correctAnswers: ["6", "4", "7", "3", "7", "1", "8", "2", "9", "10", "2", "5", "5", "8", "7", "7", "8", "5", "5", "11"],
  },
  5: { // Level E - Subtraction
    beadUpper: [6, 5, 10, 8, 5, 3, 9, 4, 8, 10, 6, 5, 10, 8, 5, 3, 9, 4, 8, 10],
    beadLower: [-1, -2, -3, -4, -5, -3, -2, -4, 9, -9, -1, -2, -3, -4, -5, -3, -2, -4, 9, -9],
    correctAnswers: ["5", "3", "7", "4", "0", "0", "6", "2", "4", "0", "5", "3", "7", "4", "0", "0", "6", "2", "4", "0"],
  },
  6: { // Level E - Subtraction Beads
    beadCounts1: [5, 5, 2, 6, 4, 5, 6, 2, 3, 3, 1, 4, 6, 4, 3, 2, 3, 2, 4, 5],
    beadCounts2: [1, 3, 2, 4, 2, 1, 3, 2, 1, 1, 1, 3, 2, 4, 2, 1, 2, 1, 4, 3],
    correctAnswers: ["4", "2", "0", "2", "2", "4", "3", "0", "2", "2", "2", "0", "1", "4", "0", "1", "1", "1", "0", "2"],
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
  "Addition", // Level D
  "Addition Beads", // Level D
  "Subtraction", // Level E
  "Subtraction Beads", // Level E
];


export const useAbacusQuestion = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dummyQuestions, setDummyQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(20).fill(""));
  const [score, setScore] = useState(null);


  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setUserAnswers(Array(20).fill("")); 
    setScore({ correct: 0, incorrect: 0 });
  
    const { beadCounts, beadUpper, beadLower, beadCounts1, beadCounts2 } = questionsData[index] || {};
  
    if (
      questions[index] === "Addition" ||
      questions[index] === "Subtraction"
    ) {
     
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
      // For other questions, use beadCounts
      setDummyQuestions(beadCounts ? beadCounts.map((count) => `🟤`.repeat(count)) : []);
    }
  };  const handleAnswerChange = (index, value) => {
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
    setScore(scoreResult);
    return scoreResult; 
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