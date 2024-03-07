import { useState } from "react";
import { Question, Feedback, Video } from "@/types/quizTypes";
import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const VideoUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<Video>({
    year: "",
    lessonNumber: "",
    videoId: "",
    videoSrc: "",
    category: "",
    questions: Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      question: "",
      timestamp: 0,
      answered: false,
      choices: Array(4).fill(""), // Initialize 4 choices with empty strings
      correctAnswer: "",
      feedback: {
        correct: "",
        incorrect: "",
      },
    })),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex?: number,
    choiceIndex?: number,
  ) => {
    const { name, value } = e.target;
    if (typeof questionIndex === "number") {
      const updatedQuestions = [...formData.questions];

      if (name.startsWith("choices")) {
        updatedQuestions[questionIndex].choices[choiceIndex!] = value;
      } else if (name === "question" || name === "correctAnswer") {
        // Direct assignment for known keys
        updatedQuestions[questionIndex][name] = value;
      } else if (name === "timestamp") {
        // Convert the string value to a number for the timestamp
        const numValue = parseInt(value, 10);

        // Check if the parsed value is a valid number before updating
        if (!isNaN(numValue)) {
          updatedQuestions[questionIndex].timestamp = numValue;
        } else {
          // Handle invalid number (e.g., set to a default value or keep the old value)
          updatedQuestions[questionIndex].timestamp = 0;
        }
      } else if (name === "correct" || name === "incorrect") {
        // Here we directly use known keys without indexing using a string
        updatedQuestions[questionIndex].feedback[name] = value;
      } else {
        console.error("Unknown form field: ", name);
      }

      setFormData({ ...formData, questions: updatedQuestions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lessonNumber"
        placeholder="Lesson Number"
        value={formData.lessonNumber}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="videoId"
        placeholder="Video ID"
        value={formData.videoId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="videoSrc"
        placeholder="Video Source"
        value={formData.videoSrc}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
      />
      {formData.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            name="question"
            placeholder={`Question ${qIndex + 1}`}
            value={question.question}
            onChange={(e) => handleInputChange(e, qIndex)}
          />
          <input
            type="text"
            name="timestamp"
            placeholder="Timestamp"
            value={question.timestamp.toString()}
            onChange={(e) => handleInputChange(e, qIndex)}
          />
          {question.choices.map((choice, cIndex) => (
            <input
              key={cIndex}
              type="text"
              name={`choices[${cIndex}]`}
              placeholder={`Choice ${cIndex + 1}`}
              value={choice}
              onChange={(e) => handleInputChange(e, qIndex, cIndex)}
            />
          ))}
          <input
            type="text"
            name="correctAnswer"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => handleInputChange(e, qIndex)}
          />
          <input
            type="text"
            name="correct"
            placeholder="Correct Feedback"
            value={question.feedback.correct}
            onChange={(e) => handleInputChange(e, qIndex)}
          />
          <input
            type="text"
            name="incorrect"
            placeholder="Incorrect Feedback"
            value={question.feedback.incorrect}
            onChange={(e) => handleInputChange(e, qIndex)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default VideoUploadForm;
