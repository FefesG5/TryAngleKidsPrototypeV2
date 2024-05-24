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
  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addQuestion = (): void => {
    setQuestionIds((prevIds) => {
      const nextId = Math.max(...prevIds, 0) + 1;
      setVideoData((prevData) => ({
        ...prevData,
        questions: [
          ...prevData.questions,
          { ...defaultQuizQuestion(), id: nextId },
        ],
      }));
      return [...prevIds, nextId];
    });
  };

  const removeQuestion = (id: number): void => {
    const updatedQuestions = videoData.questions.filter(
      (question) => question.id !== id,
    );
    const renumberedQuestions = updatedQuestions.map((question, index) => ({
      ...question,
      id: index + 1,
    }));

    setVideoData({ ...videoData, questions: renumberedQuestions });
    setQuestionIds(renumberedQuestions.map((question) => question.id));

    if (activeTab === `questions${id}`) {
      setActiveTab("details");
    } else {
      const activeId = activeTab.startsWith("questions")
        ? parseInt(activeTab.replace("questions", ""), 10)
        : null;
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    console.log("Handle submit called");
    setLoading(true);
    console.log("Submitting video quiz data:", videoData);
    // Here you might want to send the data to your backend or API

    try {
      // Send a POST request to your API route with the videoData as the request body
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        // Reset the form here if necessary
        setVideoData(defaultVideoData());
        setQuestionIds([]);
        setActiveTab("details");
        // Show success feedback to the user
      } else {
        throw new Error(result.message || "Failed to submit the quiz");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      // Show error feedback to the user
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
        {questionIds.map((id) => (
          <QuizTabButton
            key={id}
            label={`Question ${id}`}
            tabId={`questions${id}`}
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
