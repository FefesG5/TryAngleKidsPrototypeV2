import { useState } from "react";
import { Question } from "@/components/VideoPlayer/VideoPlayer"; // Assuming this is the correct path

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
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        zIndex: 1000,
      }}
    >
      <h2>{question.question}</h2>
      <div>
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(choice)}
            style={{ display: "block", margin: "10px 0" }}
          >
            {choice}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
      <button onClick={handleSubmit} disabled={!selectedAnswer}>
        Continue
      </button>
    </div>
  );
};

export default QuizModal;
