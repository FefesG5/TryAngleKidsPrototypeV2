import { useState } from "react";
import { Question, Feedback, Video } from "@/types/quizTypes";
import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import styles from "./VideoUploadForm.module.css";

const VideoUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<Video>({
    year: "",
    lessonNumber: "",
    videoId: "",
    videoSrc: "",
    category: "",
    questions: Array.from({ length: 3 }, (_, index) => ({
      id: index,
      question: "",
      timestamp: 0,
      answered: false,
      choices: Array(4).fill(""),
      correctAnswer: "",
      feedback: {
        correct: "",
        incorrect: "",
      },
    })),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex?: number,
    choiceIndex?: number,
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let newFormData = { ...prevFormData };

      if (typeof questionIndex === "number") {
        const updatedQuestions = [...newFormData.questions];
        const currentQuestion = updatedQuestions[questionIndex];

        if (name.startsWith("choices")) {
          const choiceNum = parseInt(name.split("[")[1], 10);
          currentQuestion.choices[choiceNum] = value;
        } else if (name in currentQuestion) {
          (currentQuestion as any)[name] = value;
        } else if (name === "correct" || name === "incorrect") {
          currentQuestion.feedback[name] = value;
        }
        updatedQuestions[questionIndex] = currentQuestion;
        return { ...newFormData, questions: updatedQuestions };
      } else {
        return { ...newFormData, [name]: value };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const docRef = await addDoc(collection(db, "lessons"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label className={styles.label}>
        Year
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </label>
      <label className={styles.label}>
        Lesson Number
        <input
          type="text"
          name="lessonNumber"
          value={formData.lessonNumber}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </label>
      <label className={styles.label}>
        Video Source
        <input
          type="text"
          name="videoSrc"
          value={formData.videoSrc}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </label>
      <label className={styles.label}>
        Video ID
        <input
          type="text"
          name="videoId"
          value={formData.videoId}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </label>
      <label className={styles.label}>
        Category
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={styles.formInput}
        />
      </label>
      {formData.questions.map((question, qIndex) => (
        <div key={qIndex} className={styles.questionGroup}>
          <label className={styles.label}>
            Question {qIndex + 1}
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleInputChange(e, qIndex)}
              className={styles.formInput}
            />
          </label>
          <label className={styles.label}>
            Timestamp
            <input
              type="text"
              name="timestamp"
              value={question.timestamp}
              onChange={(e) => handleInputChange(e, qIndex)}
              className={styles.formInput}
            />
          </label>
          {question.choices.map((choice, cIndex) => (
            <label key={cIndex} className={styles.label}>
              Choice {cIndex + 1}
              <input
                type="text"
                name={`choices[${cIndex}]`}
                value={choice}
                onChange={(e) => handleInputChange(e, qIndex, cIndex)}
                className={styles.formInput}
              />
            </label>
          ))}
          <label className={styles.label}>
            Correct Answer
            <input
              type="text"
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={(e) => handleInputChange(e, qIndex)}
              className={styles.formInput}
            />
          </label>
          <label className={styles.label}>
            Correct Feedback
            <input
              type="text"
              name="correctFeedback"
              value={question.feedback.correct}
              onChange={(e) => handleInputChange(e, qIndex)}
              className={styles.formInput}
            />
          </label>
          <label className={styles.label}>
            Incorrect Feedback
            <input
              type="text"
              name="incorrectFeedback"
              value={question.feedback.incorrect}
              onChange={(e) => handleInputChange(e, qIndex)}
              className={styles.formInput}
            />
          </label>
        </div>
      ))}
      <button type="submit" className={styles.formButton}>
        Submit
      </button>
    </form>
  );
};

export default VideoUploadForm;
