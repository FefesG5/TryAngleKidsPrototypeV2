import { Question } from "@/types/quizTypes";

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
    <label key={index}>
      Choice {index + 1}
      <input
        type="text"
        name={`choices[${index}]`}
        value={choice}
        onChange={handleChange}
      />
    </label>
  ));

  return (
    <div>
      <h2>Question Details</h2>
      <label>
        Question
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleChange}
        />
      </label>
      <label>
        Timestamp
        <input
          type="text"
          name="timestamp"
          value={questionData.timestamp.toString()}
          onChange={handleChange}
        />
      </label>
      {choiceInputs}
      <label>
        Correct Answer
        <input
          type="text"
          name="correctAnswer"
          value={questionData.correctAnswer}
          onChange={handleChange}
        />
      </label>
      <label>
        Correct Feedback
        <input
          type="text"
          name="correct"
          value={questionData.feedback.correct}
          onChange={handleChange}
        />
      </label>
      <label>
        Incorrect Feedback
        <input
          type="text"
          name="incorrect"
          value={questionData.feedback.incorrect}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default QuestionDetailsInput;
