import withAuth from "@/components/WithAuth/withAuth";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video, Question } from "@/types/quizTypes";
import {
  defaultVideoData,
  defaultQuizQuestion,
} from "@/utils/videoQuizInitialState";
import QuestionDetailsInput from "@/components/VideoQuizUpload/QuestionDetailsInput";
import VideoDetailsInput from "@/components/VideoQuizUpload/VideoDetailsInput";
import styles from "@/components/VideoQuizUpload/VideoQuizUploadForm.module.css";

interface EditVideoQuizProps {
  videoData: Video | null;
}

export const getServerSideProps: GetServerSideProps<
  EditVideoQuizProps
> = async (context) => {
  const { year, lessonNumber } = context.params as {
    year: string;
    lessonNumber: string;
  };

  let videoData: Video | null = null;

  const lessonRef = doc(db, "extra", year, "lessons", lessonNumber);
  const lessonSnapshot = await getDoc(lessonRef);

  if (lessonSnapshot.exists()) {
    videoData = {
      ...(lessonSnapshot.data() as Omit<Video, "lessonNumber" | "year">),
      lessonNumber,
      year,
    };
  }

  return { props: { videoData } };
};

const EditVideoQuiz: NextPage<EditVideoQuizProps> = ({
  videoData: initialVideoData,
}) => {
  const router = useRouter();
  const year = router.query.year as string;
  const [videoData, setVideoData] = useState<Video | null>(initialVideoData);
  const [activeTab, setActiveTab] = useState<string>("details");

  // Handler for changes in video details
  const handleVideoDataChange = (updatedVideoData: Video) => {
    setVideoData(updatedVideoData);
  };

  // Handler for changes in individual questions
  const handleQuestionChange = (updatedQuestionData: Question) => {
    if (!videoData) return;
    setVideoData({
      ...videoData,
      questions: videoData.questions.map((question) =>
        question.id === updatedQuestionData.id ? updatedQuestionData : question,
      ),
    });
  };

  // Function to add a new question with default properties
  const addQuestion = () => {
    const newId = videoData
      ? Math.max(0, ...videoData.questions.map((q) => q.id)) + 1
      : 1;
    const newQuestion: Question = defaultQuizQuestion();
    newQuestion.id = newId;

    if (videoData) {
      setVideoData({
        ...videoData,
        questions: [...videoData.questions, newQuestion],
      });
      setActiveTab(`question-${newId}`);
    }
  };

  // Function to remove a question by its id
  const removeQuestion = (questionId: number) => {
    if (!videoData) return; // Guard clause to handle null videoData

    // Filter and reassign IDs
    const updatedQuestions = videoData.questions
      .filter((q) => q.id !== questionId)
      .map((question, index) => ({
        ...question,
        id: index + 1, // Reassign IDs sequentially
      }));

    // Update the state while ensuring all properties are safely handled
    setVideoData((prevVideoData) => {
      if (prevVideoData === null) return null; // Return null if previous state was null

      return {
        ...prevVideoData, // Spread existing properties to retain them
        questions: updatedQuestions, // Include updated questions array
      };
    });

    // Update active tab or revert to "details"
    setActiveTab(
      updatedQuestions.length > 0
        ? `question-${updatedQuestions[0].id}`
        : "details",
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoData) return;

    console.log("Updated extra videoData to submit:", videoData);

    try {
      const response = await fetch("/api/updateExtraVideoQuiz", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`,
        );
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Failed to update video quiz:", error);
    }
  };

  if (!videoData) {
    return <p>Loading...</p>;
  }

  const renderTabButton = (label: string, tabId: string) => {
    const isActive = activeTab === tabId;
    return (
      <div
        key={tabId}
        className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
      >
        <button
          type="button"
          className={styles.tabButton}
          onClick={() => setActiveTab(tabId)}
        >
          {label}
        </button>
        {tabId.startsWith("question") && (
          <button
            type="button"
            className={styles.removeQuestionBtn}
            onClick={() => removeQuestion(parseInt(tabId.split("-")[1], 10))}
          >
            ✕
          </button>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === "details") {
      return (
        <VideoDetailsInput
          videoData={videoData || defaultVideoData()}
          onVideoDataChange={handleVideoDataChange}
        />
      );
    } else if (activeTab.startsWith("question")) {
      const questionId = parseInt(activeTab.split("-")[1], 10);
      const question =
        videoData?.questions.find((q) => q.id === questionId) ||
        defaultQuizQuestion();
      return (
        <QuestionDetailsInput
          questionData={question}
          onQuestionChange={handleQuestionChange}
        />
      );
    }
    return null;
  };

  return (
    <div className={styles.formContainer}>
      <Link href={`/educator/extra-video-quizzes/${year}`}>
        Back to Extra Video Quizzes for {year}
      </Link>
      <h1>Edit Extra Video Quiz</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.tabs}>
          {renderTabButton("Video Details", "details")}
          {videoData?.questions.map((question) =>
            renderTabButton(
              `Question ${question.id}`,
              `question-${question.id}`,
            ),
          )}
          <button
            type="button"
            className={styles.addButton}
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>
        <div className={styles.tabContent}>{renderTabContent()}</div>
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default withAuth(EditVideoQuiz);
