import { Question } from "@/types/quizTypes";
import styles from "./QuestionDetailsInput.module.css";

const QuestionDetailsInput: React.FC<{
  questionData: Question;
  onQuestionChange: (updatedQuestionData: Question) => void;
}> = ({ questionData, onQuestionChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "question" || name === "correctAnswer") {
      onQuestionChange({ ...questionData, [name]: value });
    } else if (name.includes("choices")) {
      const index = parseInt(name.split("[")[1], 10);
      const newChoices = [...questionData.choices];
      newChoices[index] = value;
      onQuestionChange({ ...questionData, choices: newChoices });
    } else if (name === "correct" || name === "incorrect") {
      onQuestionChange({
        ...questionData,
        feedback: { ...questionData.feedback, [name]: value },
      });
    } else {
      onQuestionChange({ ...questionData, [name]: value });
    }
  };

  const choiceInputs = questionData.choices.map((choice, index) => (
    <label key={index} className={styles.questionDetailInputLabel}>
      Choice {index + 1}
      <input
        type="text"
        name={`choices[${index}]`}
        value={choice}
        onChange={handleChange}
        className={styles.questionDetailInput}
      />
    </label>
  ));

  return (
    <div className={styles.questionDetailInputContainer}>
      <label className={styles.questionDetailInputLabel}>
        Question
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleChange}
          className={styles.questionDetailInput}
        />
      </label>
      <label className={styles.questionDetailInputLabel}>
        Timestamp
        <input
          type="text"
          name="timestamp"
          value={questionData.timestamp.toString()}
          onChange={handleChange}
          className={styles.questionDetailInput}
        />
      </label>
      {choiceInputs}
      <label className={styles.questionDetailInputLabel}>
        Correct Answer
        <input
          type="text"
          name="correctAnswer"
          value={questionData.correctAnswer}
          onChange={handleChange}
          className={styles.questionDetailInput}
        />
      </label>
      <label className={styles.questionDetailInputLabel}>
        Correct Feedback
        <input
          type="text"
          name="correct"
          value={questionData.feedback.correct}
          onChange={handleChange}
          className={styles.questionDetailInput}
        />
      </label>
      <label className={styles.questionDetailInputLabel}>
        Incorrect Feedback
        <input
          type="text"
          name="incorrect"
          value={questionData.feedback.incorrect}
          onChange={handleChange}
          className={styles.questionDetailInput}
        />
      </label>
    </div>
  );
};

export default QuestionDetailsInput;
