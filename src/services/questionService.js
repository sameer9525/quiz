import { decode } from 'html-entities';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export const fetchQuestions = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.response_code !== 0) {
            throw new Error('Failed to fetch questions');
        }

        return data.results.map((question) => {
            const answers = [
                ...question.incorrect_answers,
                question.correct_answer
            ];

            // Shuffle answers
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];
            }

            return {
                question: decode(question.question),
                answers: answers.map(a => decode(a)),
                correctAnswer: decode(question.correct_answer)
            };
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};
