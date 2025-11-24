import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTime, onTimeUp) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
        }

        return () => clearTimeout(timerRef.current);
    }, [timeLeft, isRunning, onTimeUp]);

    const startTimer = () => {
        setTimeLeft(initialTime);
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
        clearTimeout(timerRef.current);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(initialTime);
        clearTimeout(timerRef.current);
    };

    return { timeLeft, startTimer, stopTimer, resetTimer };
};
