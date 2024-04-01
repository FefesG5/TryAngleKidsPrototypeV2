import React, { useState } from "react";
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

  const [activeTab, setActiveTab] = useState<string>("details");
  const [questionIds, setQuestionIds] = useState<number[]>([]);

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

  const addQuestion = (): void => {
    const nextId = questionIds.length > 0 ? Math.max(...questionIds) + 1 : 1;
    setQuestionIds((prevIds) => [...prevIds, nextId]);
    setVideoData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, { ...defaultQuestion, id: nextId }],
    }));
  };

  const removeQuestion = (id: number): void => {
    const updatedQuestions = videoData.questions.filter(question => question.id !== id);
    const renumberedQuestions = updatedQuestions.map((question, index) => ({ ...question, id: index + 1 }));
    
    setVideoData({ ...videoData, questions: renumberedQuestions });
    setQuestionIds(renumberedQuestions.map(question => question.id));
  
    if (activeTab === `questions${id}`) {
      setActiveTab("details");
    } else {
      const activeId = activeTab.startsWith("questions") ? parseInt(activeTab.replace("questions", ""), 10) : null;
      if (activeId && id < activeId) {
        setActiveTab(`questions${activeId - 1}`);
      }
    }
  };
  

  const handleQuestionChange = (updatedQuestion: Question): void => {
    setVideoData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question,
      ),
    }));
  };

  const handleVideoDataChange = (updatedVideoData: Video): void => {
    setVideoData(updatedVideoData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitting video quiz data:", videoData);
    // Here you might want to send the data to your backend or API
  };


  const renderTabButton = (label: string, tabId: string): JSX.Element => {
    const isActive = activeTab === tabId;
    // The tab is a question tab if it starts with 'questions'
    const isQuestionTab = tabId.startsWith("questions");
    // Parse the question ID only if it's a question tab
    const questionId = isQuestionTab ? parseInt(tabId.replace("questions", ""), 10) : null;
  
    // Render the tab with the active state if it matches the activeTab
    return (
      <div key={tabId} className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}>
        <button
          className={styles.tabButton}
          onClick={() => setActiveTab(tabId)}
        >
          {label}
        </button>
        {isQuestionTab && questionId !== null && (
          <button
            className={styles.removeQuestionBtn}
            onClick={(e) => {
              e.stopPropagation(); // Prevents the tab button's onClick from firing
              removeQuestion(questionId);
            }}
            aria-label={`Remove ${label}`}
          >
            ✕
          </button>
        )}
      </div>
    );
  };

  const renderTabContent = (): JSX.Element | null => {
    if (activeTab === "details") {
      return (
        <VideoDetailsInput
          videoData={videoData}
          onVideoDataChange={handleVideoDataChange}
        />
      );
    }

    const questionId = parseInt(activeTab.replace("questions", ""), 10);
    const question =
      videoData.questions.find((q) => q.id === questionId) || defaultQuestion;

    return (
      <QuestionDetailsInput
        questionData={question}
        onQuestionChange={handleQuestionChange}
      />
    );
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.tabs}>
        {renderTabButton("Video Details", "details")}
        {questionIds.map((id) =>
          renderTabButton(`Question ${id}`, `questions${id}`),
        )}
        <button
          className={styles.addButton}
          type="button"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
      <button type="submit" className={styles.submitButton}>
        Submit Quiz
      </button>
    </form>
  );
};

export default VideoQuizUploadForm;
