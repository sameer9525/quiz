import React, { useState, useEffect, useCallback } from 'react';
import { fetchQuestions } from './services/questionService';
import { useTimer } from './hooks/useTimer';
import QuestionCard from './components/QuestionCard';
import Feedback from './components/Feedback';
import AdSense from './components/AdSense';
import { Trophy, Loader } from 'lucide-react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const loadQuestions = useCallback(async (amount = 10) => {
    setLoading(true);
    const newQuestions = await fetchQuestions(amount);
    setQuestions(prev => [...prev, ...newQuestions]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQuestions(10);
  }, [loadQuestions]);

  const handleTimeUp = useCallback(() => {
    // Time's up! Treat as wrong answer
    setIsCorrect(false);
    setShowFeedback(true);
  }, []);

  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(20, handleTimeUp);

  useEffect(() => {
    if (questions.length > 0 && !showFeedback && gameStarted) {
      startTimer();
    }
    return () => stopTimer();
  }, [questions, currentQuestionIndex, showFeedback, gameStarted]);

  const handleAnswer = (answer) => {
    stopTimer();
    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;

    if (correct) {
      setScore(prev => prev + 10);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    const nextIndex = currentQuestionIndex + 1;

    // Fetch more questions if we are running low (buffer of 2)
    if (nextIndex >= questions.length - 2) {
      loadQuestions(10);
    }

    setCurrentQuestionIndex(nextIndex);
    resetTimer();
  };

  const startGame = () => {
    setGameStarted(true);
    resetTimer();
  };

  if (loading && questions.length === 0) {
    return (
      <div className="loading-screen">
        <Loader className="spinner" size={48} />
        <p>Loading Questions...</p>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="start-screen">
        <h1>Unlimited Quiz</h1>
        <p>Test your knowledge with endless questions!</p>
        <button className="start-btn" onClick={startGame}>Start Quiz</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="score-board">
        <Trophy size={24} color="#ffd700" />
        <span>Score: {score}</span>
      </div>

      {showFeedback && (
        <Feedback
          isCorrect={isCorrect}
          onComplete={handleNextQuestion}
        />
      )}

      <AdSense slot="1234567890" style={{ marginBottom: '2rem' }} />

      {questions.length > 0 && (
        <>
          <QuestionCard
            questionData={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
            totalQuestions={questions.length} // Not really relevant for unlimited, but kept for props
            currentQuestionIndex={currentQuestionIndex}
          />
          <AdSense slot="0987654321" style={{ marginTop: '2rem' }} />
        </>
      )}
    </div>
  );
}

export default App;
