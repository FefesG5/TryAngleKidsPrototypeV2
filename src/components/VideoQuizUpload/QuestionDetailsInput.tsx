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
      // This will handle the timestamp input as a text input
      onQuestionChange({ ...questionData, [name]: value });
    }
  };

  // Dynamically generate choice inputs based on the questionData.choices array
  const choiceInputs = questionData.choices.map((choice, index) => (
    <label key={index} className={styles.questionInputLabel}>
      Choice {index + 1}
      <input
        type="text"
        name={`choices[${index}]`}
        value={choice}
        onChange={handleChange}
        className={styles.questionInput}
      />
    </label>
  ));

  return (
    <div className={styles.questionInputContainer}>
      <h2>Question Details</h2>
      <label className={styles.questionInputLabel}>
        Question
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleChange}
          className={styles.questionInput}
        />
      </label>
      <label className={styles.questionInputLabel}>
        Timestamp
        <input
          type="text"
          name="timestamp"
          value={questionData.timestamp.toString()}
          onChange={handleChange}
          className={styles.questionInput}
        />
      </label>
      {choiceInputs}
      <label className={styles.questionInputLabel}>
        Correct Answer
        <input
          type="text"
          name="correctAnswer"
          value={questionData.correctAnswer}
          onChange={handleChange}
          className={styles.questionInput}
        />
      </label>
      <label className={styles.questionInputLabel}>
        Correct Feedback
        <input
          type="text"
          name="correct"
          value={questionData.feedback.correct}
          onChange={handleChange}
          className={styles.questionInput}
        />
      </label>
      <label className={styles.questionInputLabel}>
        Incorrect Feedback
        <input
          type="text"
          name="incorrect"
          value={questionData.feedback.incorrect}
          onChange={handleChange}
          className={styles.questionInput}
        />
      </label>
    </div>
  );
};

export default QuestionDetailsInput;
