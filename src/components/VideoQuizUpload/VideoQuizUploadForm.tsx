import React, { useState } from "react";
import { Video, Question } from "@/types/quizTypes";
import styles from "./VideoQuizUploadForm.module.css";
import QuizTabButton from "./QuizTabButton";
import QuizTabContent from "./QuizTabContent";
import {
  defaultQuizQuestion,
  defaultVideoData,
} from "@/utils/videoQuizInitialState";

interface VideoQuizUploadFormProps {
  apiEndpoint: string;
}

const VideoQuizUploadForm: React.FC<VideoQuizUploadFormProps> = ({
  apiEndpoint,
}) => {
  const [videoData, setVideoData] = useState<Video>(defaultVideoData());
  const [activeTab, setActiveTab] = useState<string>("details");
  const [loading, setLoading] = useState<boolean>(false);

  const addQuestion = (): void => {
    const newId = videoData.questions.length + 1;
    setVideoData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        { ...defaultQuizQuestion(), id: newId },
      ],
    }));
    setActiveTab(`question-${newId}`);
  };

  const removeQuestion = (id: number): void => {
    const updatedQuestions = videoData.questions
      .filter((question) => question.id !== id)
      .map((question, index) => ({ ...question, id: index + 1 }));

    setVideoData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));

    if (activeTab === `question-${id}`) {
      setActiveTab("details");
    } else if (activeTab.startsWith("question-")) {
      const activeId = parseInt(activeTab.replace("question-", ""), 10);
      if (id < activeId) {
        setActiveTab(`question-${activeId - 1}`);
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      const result = await response.json();

      if (response.ok) {
        setVideoData(defaultVideoData());
        setActiveTab("details");
        console.log(result.message);
      } else {
        throw new Error(result.message || "Failed to submit the quiz");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.tabs}>
        <QuizTabButton
          label="Video Details"
          tabId="details"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {videoData.questions.map((question) => (
          <QuizTabButton
            key={question.id}
            label={`Question ${question.id}`}
            tabId={`question-${question.id}`}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            removeQuestion={removeQuestion}
          />
        ))}
        <button
          className={styles.addButton}
          type="button"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>
      <div className={styles.tabContent}>
        <QuizTabContent
          activeTab={activeTab}
          videoData={videoData}
          onVideoDataChange={handleVideoDataChange}
          onQuestionChange={handleQuestionChange}
        />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        Submit Quiz
      </button>
    </form>
  );
};

export default VideoQuizUploadForm;
