import { useState } from "react";
import { Question } from "@/types/quizTypes";
import styles from "./Quiz.module.css";

interface QuizModalProps {
  question: Question;
  onAnswerSubmit: (isCorrect: boolean) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ question, onAnswerSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    setFeedback(
      isCorrect ? question.feedback.correct : question.feedback.incorrect,
    );
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return; // Just a safety check
    const isCorrect = selectedAnswer === question.correctAnswer;
    onAnswerSubmit(isCorrect); // Callback to handle answer submission
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.quizModal}>
        <h2 className={styles.quizQuestion}>{question.question}</h2>
        <div className={styles.quizChoices}>
          {question.choices.map((choice, index) => (
            <button
              key={index}
              className={styles.quizButton}
              onClick={() => handleAnswerSelection(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
        {feedback && <p className={styles.feedbackText}>{feedback}</p>}
        <button
          className={styles.quizButton}
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default QuizModal;
