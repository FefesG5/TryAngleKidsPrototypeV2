import { useState } from "react";
import { Question, Feedback, Video } from "@/types/quizTypes";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import styles from "./VideoUploadForm.module.css";

const VideoUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<Video>({
    year: "",
    lessonNumber: "",
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
      const newFormData = { ...prevFormData };

      if (
        typeof questionIndex === "number" &&
        questionIndex < newFormData.questions.length
      ) {
        const newQuestions = [...newFormData.questions];
        const currentQuestion = { ...newQuestions[questionIndex] };

        if (name.startsWith("choices")) {
          const newChoices = [...currentQuestion.choices];
          if (
            typeof choiceIndex === "number" &&
            choiceIndex < newChoices.length
          ) {
            newChoices[choiceIndex] = value;
          }
          currentQuestion.choices = newChoices;
        } else if (name === "correctFeedback" || name === "incorrectFeedback") {
          // Splitting the name to target 'correct' or 'incorrect' in the feedback object
          const feedbackKey = name.replace("Feedback", "");
          currentQuestion.feedback = {
            ...currentQuestion.feedback,
            [feedbackKey]: value,
          };
        } else {
          // Directly assign to question's properties if not a choice or feedback
          (currentQuestion as any)[name] = value;
        }
        newQuestions[questionIndex] = currentQuestion;
        return { ...newFormData, questions: newQuestions };
      } else {
        // Directly assign to video's properties if not part of questions
        return { ...newFormData, [name]: value };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Since Firestore is organized by 'years' -> 'lessons' -> 'lessonId',
    // you must ensure that 'year' and 'lessonNumber' are set
    if (!formData.year || !formData.lessonNumber) {
      console.error("Year and lesson number must be set");
      return;
    }

    // Format the questions array to match Firestore structure
    const formattedQuestions = formData.questions.map((question) => ({
      answered: false, // Set default answered status
      choices: question.choices,
      correctAnswer: question.correctAnswer,
      feedback: {
        correct: question.feedback.correct,
        incorrect: question.feedback.incorrect,
      },
      question: question.question,
      timestamp: question.timestamp,
    }));

    const lessonData = {
      videoSrc: formData.videoSrc,
      category: formData.category,
      questions: formattedQuestions,
    };

    try {
      // Add the lesson to the 'lessons' collection of the specified 'year'
      const lessonsRef = collection(db, "years", formData.year, "lessons");
      const lessonRef = doc(lessonsRef, formData.lessonNumber); // Use lessonNumber as the document ID
      await setDoc(lessonRef, lessonData); // setDoc will create or overwrite the document
      console.log("Document written with ID: ", formData.lessonNumber);
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
