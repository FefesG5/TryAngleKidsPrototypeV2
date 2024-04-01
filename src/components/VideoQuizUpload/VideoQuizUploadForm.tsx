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
    // Filter out the question that is to be removed
    const updatedQuestions = videoData.questions.filter(
      (question) => question.id !== id,
    );

    // Renumber the remaining questions' IDs sequentially
    const renumberedQuestions = updatedQuestions.map((question, index) => ({
      ...question,
      id: index + 1,
    }));

    // Update the state with the renumbered questions
    setVideoData({
      ...videoData,
      questions: renumberedQuestions,
    });

    // Update the questionIds state as well
    setQuestionIds(renumberedQuestions.map((question) => question.id));

    // Reset the active tab to 'details' if the removed question was active
    if (activeTab === `questions${id}`) {
      setActiveTab("details");
    } else {
      // Otherwise, adjust the active tab if necessary
      const activeId = parseInt(activeTab.replace("questions", ""), 10);
      if (id < activeId) {
        // If a question before the current active tab was removed, decrement the active tab's ID
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

  // const renderTabButton = (label: string, tabId: string): JSX.Element => {
  //   // Check if the tab is for a question and not the first question
  //   const isQuestionTab = tabId.startsWith("questions");
  //   const questionId = isQuestionTab
  //     ? parseInt(tabId.replace("questions", ""), 10)
  //     : null;
  //   const showRemoveButton =
  //     isQuestionTab && (questionIds.length > 1 || questionId !== 1);

  //   return (
  //     <div key={tabId} className={styles.tab}>
  //       <button
  //         className={activeTab === tabId ? styles.activeTab : styles.tabButton}
  //         onClick={() => setActiveTab(tabId)}
  //       >
  //         {label}
  //       </button>
  //       {showRemoveButton &&
  //         questionId !== null && ( // Ensure questionId is not null before using it
  //           <button
  //             className={styles.removeQuestionBtn}
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               removeQuestion(questionId); // questionId is guaranteed to be a number here
  //             }}
  //             aria-label={`Remove ${label}`}
  //           >
  //             ✕
  //           </button>
  //         )}
  //     </div>
  //   );
  // };
  const renderTabButton = (label: string, tabId: string): JSX.Element => {
    const isActive = activeTab === tabId;
    const isQuestionTab = tabId.startsWith("questions");
    const questionId = isQuestionTab
      ? parseInt(tabId.replace("questions", ""), 10)
      : null;
    const showRemoveButton =
      isQuestionTab && (questionIds.length > 1 || questionId !== 1);

    return (
      <div
        key={tabId}
        className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
      >
        <button
          className={`${styles.tabButton} ${isActive ? "" : styles.inactiveTab}`}
          onClick={() => setActiveTab(tabId)}
        >
          {label}
        </button>
        {isQuestionTab && questionId !== null && showRemoveButton && (
          <button
            className={styles.removeQuestionBtn}
            onClick={(e) => {
              e.stopPropagation();
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
