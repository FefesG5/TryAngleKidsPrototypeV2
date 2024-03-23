import { useState } from "react";
import { Video, Question } from "@/types/quizTypes";
import styles from "./VideoQuizUploadForm.module.css";
import VideoDetailsInput from "./VideoDetailsInput";
import QuestionDetailsInput from "./QuestionDetailsInput";

const VideoQuizUploadForm: React.FC = () => {
  const [videoData, setVideoData] = useState<Video>({
    year: "",
    lessonNumber: "",
    videoSrc: "",
    category: "",
    questions: [
      {
        id: 1, // You can set a temporary id
        question: "",
        timestamp: 0,
        answered: false,
        choices: ["", "", "", ""], // Assuming 4 choices
        correctAnswer: "",
        feedback: {
          correct: "",
          incorrect: "",
        },
      },
    ],
  });

  const [activeTab, setActiveTab] = useState<"details" | string>("details");
  const [questionIds, setQuestionIds] = useState<number[]>([1]); // Track question IDs

  const addQuestion = () => {
    const nextId = questionIds.length > 0 ? Math.max(...questionIds) + 1 : 2; // Start from 2 since 1 is default
    if (questionIds.length < 4) {
      // Ensure not more than 4 questions
      setQuestionIds([...questionIds, nextId]);
      setVideoData({
        ...videoData,
        questions: [
          ...videoData.questions,
          {
            id: nextId,
            question: "",
            timestamp: 0,
            answered: false,
            choices: ["", "", "", ""],
            correctAnswer: "",
            feedback: {
              correct: "",
              incorrect: "",
            },
          },
        ],
      });
    }
  };

  const removeQuestion = (id: number) => {
    if (id === 1) return; // Prevent removing the first question

    const remainingQuestions = videoData.questions.filter((q) => q.id !== id);

    // Reassign IDs based on the new order
    const reassignedQuestions = remainingQuestions.map((q, index) => ({
      ...q,
      id: index + 1, // Reassign IDs starting from 1
    }));

    setQuestionIds(reassignedQuestions.map((q) => q.id)); // Update the question IDs
    setVideoData({
      ...videoData,
      questions: reassignedQuestions,
    });

    // Adjust the active tab if necessary
    if (`questions ${id}` === activeTab) {
      setActiveTab("details");
    } else {
      const newActiveTabId = Math.min(...reassignedQuestions.map((q) => q.id));
      setActiveTab(`questions ${newActiveTabId}`);
    }
  };

  const handleQuestionChange = (updatedQuestion: Question) => {
    // Map over the existing questions
    const updatedQuestions = videoData.questions.map((question) => {
      // If the question's ID matches the updated question's ID, return the updated question
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      }
      // Otherwise, return the question as is
      return question;
    });

    // Set the updated questions array in the videoData state
    setVideoData({
      ...videoData,
      questions: updatedQuestions,
    });
  };

  const handleVideoDataChange = (updatedVideoData: Video) => {
    setVideoData(updatedVideoData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Submitting video quiz data:", videoData);
    // Here you can add any further actions, like sending the data to a server
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "details" ? styles.activeTab : ""}
          onClick={() => setActiveTab("details")}
        >
          Video Details
        </button>
        {questionIds.map((id, index) => (
          <div key={id} className={styles.questionTab}>
            <button
              className={
                activeTab === `questions ${id}` ? styles.activeTab : ""
              }
              onClick={() => setActiveTab(`questions ${id}`)}
            >
              <span className={styles.questionText}>Questions {id}</span>
              {id !== 1 && ( // Don't show remove button for the first question
                <span
                  className={styles.removeQuestionBtn}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent activating the tab when clicking remove
                    removeQuestion(id);
                  }}
                  aria-label={`Remove question ${id}`}
                >
                  X
                </span>
              )}
            </button>
          </div>
        ))}
        {questionIds.length < 4 && (
          <button onClick={addQuestion}>Add Question</button>
        )}
      </div>
      <div className={styles.tabContent}>
        {activeTab === "details" && (
          <VideoDetailsInput
            videoData={videoData}
            onVideoDataChange={handleVideoDataChange}
          />
        )}
        {activeTab.startsWith("questions") && (
          <QuestionDetailsInput
            questionData={
              videoData.questions.find(
                (q) => q.id.toString() === activeTab.split(" ")[1],
              ) || videoData.questions[0] // Fallback or handle differently
            }
            onQuestionChange={handleQuestionChange}
          />
        )}
      </div>
      <button
        type="button" // Use 'button' if triggering via onClick, 'submit' if in a form with onSubmit
        className={styles.submitButton}
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default VideoQuizUploadForm;
