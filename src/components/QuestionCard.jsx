import React from 'react';

const QuestionCard = ({ questionData, onAnswer, timeLeft, totalQuestions, currentQuestionIndex }) => {
    const { question, answers } = questionData;

    return (
        <div className="question-card">
            <div className="card-header">
                <span className="question-count">Question {currentQuestionIndex + 1}</span>
                <div className="timer-display" style={{ color: timeLeft <= 5 ? '#ff7675' : '#fff' }}>
                    {timeLeft}s
                </div>
            </div>

            <h2 className="question-text" dangerouslySetInnerHTML={{ __html: question }} />

            <div className="answers-grid">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        className="answer-btn"
                        onClick={() => onAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
