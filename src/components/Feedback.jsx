import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Frown } from 'lucide-react';

const Feedback = ({ isCorrect, onComplete }) => {
    useEffect(() => {
        if (isCorrect) {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);
        }

        const timer = setTimeout(() => {
            onComplete();
        }, 2000); // Show feedback for 2 seconds

        return () => clearTimeout(timer);
    }, [isCorrect, onComplete]);

    if (isCorrect) {
        return (
            <div className="feedback-overlay correct">
                <div className="feedback-content">
                    <h1>Correct! 🎉</h1>
                    <p>+10 Points</p>
                </div>
            </div>
        );
    }

    return (
        <div className="feedback-overlay wrong">
            <div className="feedback-content">
                <Frown size={120} color="#ff7675" />
                <h1>Wrong!</h1>
                <p>Better luck next time</p>
            </div>
        </div>
    );
};

export default Feedback;
