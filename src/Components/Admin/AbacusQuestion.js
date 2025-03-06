// AbacusQuestion.js
import React, { useState } from "react";


export const questionsData = {
  0: {
    beadCounts: [1, 3, 2, 4, 2, 1, 3, 2, 4, 5],
    correctAnswers: ["1", "3", "2", "4", "2", "1", "3", "2", "4", "5"],
  },
  1: {
    beadCounts: [2, 4, 6, 7, 0, 2, 4, 6, 7, 0],
    correctAnswers: ["2", "4", "6", "7", "0", "2", "4", "6", "7", "0"],
  },
  2: {
    beadCounts: [3, 6, 4, 2, 5, 7, 1, 4, 2, 3],
    correctAnswers: ["3", "6", "4", "2", "5", "7", "1", "4", "2", "3"],
  },
  3: {
    beadCounts: [4, 7, 2, 6, 2, 4, 2, 3, 6, 4],
    correctAnswers: ["4", "7", "2", "6", "2", "4", "2", "3", "6", "4"],
  },
  4: {
    beadCounts: [5, 1, 5, 2, 5, 0, 5, 0, 5, 5],
    correctAnswers: ["5", "1", "5", "2", "5", "0", "5", "0", "5", "5"],
  },
  5: {
    beadCounts: [6, 1, 1, 2, 0, 3, 2, 4, 4, 0],
    correctAnswers: ["6", "1", "1", "2", "0", "3", "4", "4", "4", "0"],
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
  "Write The Value For the Given Beads",
  "Show the Beads Value",
  "Addition and Subtraction",
  "Practice Question",
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

    const { beadCounts } = questionsData[index] || { beadCounts: [] };
    setDummyQuestions(beadCounts.map((count) => `🟤`.repeat(count)));
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

    setScore({ correct: correctCount, incorrect: incorrectCount });
    return { correct: correctCount, incorrect: incorrectCount };
  };

  return {
    questionsData,
    Alphabhets,
    questions,
    selectedQuestion,
    dummyQuestions,
    userAnswers,
    score,
    handleQuestionClick,
    handleAnswerChange,
    handleSubmitAnswer,
  };
};