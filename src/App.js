import React, { useState, useEffect } from 'react';

const TOTAL_QUESTIONS = 20;
const QUESTION_TIME_LIMIT = 10; // Time limit per question in seconds

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 100);
  const num2 = Math.floor(Math.random() * 100);
  return { num1, num2, correctAnswer: num1 + num2 };
};

const MathAdditionTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Generate 20 random questions
    const newQuestions = Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion());
    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    // Countdown timer for each question
    if (timeLeft > 0 && currentQuestionIndex < TOTAL_QUESTIONS && !finished) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, currentQuestionIndex, finished]);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (parseInt(userAnswer) === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setTimeLeft(QUESTION_TIME_LIMIT);

    if (currentQuestionIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div>
        <h1>Test Finished!</h1>
        <h2>Your score: {score} / {TOTAL_QUESTIONS}</h2>
      </div>
    );
  }

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Math Addition Test</h1>
      <h2>Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</h2>
      <p>
        {currentQuestion.num1} + {currentQuestion.num2} = ?
      </p>
      <input
        type="number"
        value={userAnswer}
        onChange={handleAnswerChange}
        autoFocus
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>Time left: {timeLeft} seconds</p>
    </div>
  );
};

export default MathAdditionTest;