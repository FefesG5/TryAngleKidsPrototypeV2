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

  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details",
  );

  // Assume first question for simplicity; you can extend this for handling multiple questions
  const handleQuestionChange = (updatedQuestion: Question) => {
    setVideoData({
      ...videoData,
      questions: [updatedQuestion, ...videoData.questions.slice(1)],
    });
  };

  const handleVideoDataChange = (updatedVideoData: Video) => {
    setVideoData(updatedVideoData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.tabs}>
        <button onClick={() => setActiveTab("details")}>Video Details</button>
        <button onClick={() => setActiveTab("questions")}>Questions 1</button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "details" && (
          <VideoDetailsInput
            videoData={videoData}
            onVideoDataChange={handleVideoDataChange}
          />
        )}
        {activeTab === "questions" && (
          <QuestionDetailsInput
            questionData={
              videoData.questions[0] || {
                // Fallback to a default object if questions[0] is not available
                id: 0,
                question: "",
                timestamp: 0,
                answered: false,
                choices: ["", "", "", ""], // Default choices array
                correctAnswer: "",
                feedback: {
                  correct: "",
                  incorrect: "",
                },
              }
            }
            onQuestionChange={handleQuestionChange}
          />
        )}
      </div>
    </div>
  );
};

export default VideoQuizUploadForm;
