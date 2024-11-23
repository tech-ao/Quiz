import React, { useState } from "react";
import "./quiz.css";

const generateRandomQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const operations = ["+", "-", "*"]; // Allowed operations
  const randomOperation = operations[Math.floor(Math.random() * operations.length)];

  let question = `${num1} ${randomOperation} ${num2}`;
  let correctAnswer;

  // Calculate correct answer based on the operation
  switch (randomOperation) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    default:
      correctAnswer = 0;
  }

  return { question, correctAnswer: correctAnswer.toString() }; // Return both question and correct answer
};

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Generate an array of random questions
  const totalQuestions = 5; // Number of questions to generate
  const [questions] = useState(
    Array.from({ length: totalQuestions }, () => generateRandomQuestion())
  );

  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setUserAnswer("");

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h1>Auto-Generated Abacus Quiz</h1>
      {!showResult ? (
        <div className="quiz-question">
          <p>
            <strong>Question {currentQuestionIndex + 1}:</strong>{" "}
            {questions[currentQuestionIndex].question}
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here"
          />
          <button onClick={handleAnswerSubmit}>Submit</button>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
