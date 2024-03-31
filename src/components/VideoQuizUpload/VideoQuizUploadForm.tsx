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
    questions: [],
  });

  const [activeTab, setActiveTab] = useState<"details" | string>("details");
  const [questionIds, setQuestionIds] = useState<number[]>([]); // Start with an empty array

  // Define a default question object
  const defaultQuestion: Question = {
    id: 0,
    question: "",
    timestamp: 0,
    answered: false,
    choices: ["", "", "", ""],
    correctAnswer: "",
    feedback: {
      correct: "",
      incorrect: "",
    },
  };

  const addQuestion = () => {
    const nextId = questionIds.length > 0 ? Math.max(...questionIds) + 1 : 1; // Determine the next ID
    setQuestionIds((prevIds) => [...prevIds, nextId]); // Update question IDs
    setVideoData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
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
    }));
  };

  const removeQuestion = (id: number) => {
    const remainingQuestions = videoData.questions.filter((q) => q.id !== id);

    // Reassign IDs to ensure they are consecutive
    const reassignedQuestions = remainingQuestions.map((question, index) => ({
      ...question,
      id: index + 1,
    }));

    setQuestionIds(reassignedQuestions.map((q) => q.id));
    setVideoData({ ...videoData, questions: reassignedQuestions });

    if (`questions ${id}` === activeTab) {
      setActiveTab(
        reassignedQuestions.length > 0
          ? `questions ${reassignedQuestions[0].id}`
          : "details",
      );
    }
  };

  const handleQuestionChange = (updatedQuestion: Question) => {
    const updatedQuestions = videoData.questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question,
    );
    setVideoData({ ...videoData, questions: updatedQuestions });
  };

  const handleVideoDataChange = (updatedVideoData: Video) => {
    setVideoData(updatedVideoData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Submitting video quiz data:", videoData);
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
        {questionIds.map((id) => (
          <div key={id} className={styles.questionTab}>
            <button
              className={
                activeTab === `questions ${id}` ? styles.activeTab : ""
              }
              onClick={() => setActiveTab(`questions ${id}`)}
            >
              Question {id}
              <span
                className={`${styles.removeQuestionBtn}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeQuestion(id);
                }}
                aria-label={`Remove question ${id}`}
              >
                ✕
              </span>
            </button>
          </div>
        ))}
        <button onClick={addQuestion}>Add Question</button>
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
              ) || defaultQuestion
            }
            onQuestionChange={handleQuestionChange}
          />
        )}
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default VideoQuizUploadForm;
