import React, { useEffect, useState } from "react";

// Define a type for individual question
type Question = {
  question: string; // Previously 'text'
  timestamp: number; // Previously 'time'
  choices: string[];
  correctAnswer: string;
};

type QuizProps = {
  currentTime: number;
  questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ currentTime, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Logic to determine which question should be active based on the currentTime
  useEffect(() => {
    const questionToShow = questions.find((q) => q.timestamp <= currentTime);
    setCurrentQuestion(questionToShow || null); // Set to null if no question found
  }, [currentTime, questions]);

  // Render current question or null if none is active
  return currentQuestion ? (
    <div>
      <p>{currentQuestion.question}</p>
      {/* Example rendering of choices */}
      {currentQuestion.choices.map((choice, index) => (
        <button key={index}>{choice}</button>
      ))}
    </div>
  ) : null;
};

export default Quiz;
