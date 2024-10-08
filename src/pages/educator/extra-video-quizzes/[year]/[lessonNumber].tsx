import withAuth from "@/components/WithAuth/withAuth";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video, Question } from "@/types/quizTypes";
import { addQuestionToVideoQuiz } from "@/utils/addQuestionToVideoQuiz";
import { removeQuestionFromVideoQuiz } from "@/utils/removeQuestionFromVideoQuiz";
import QuizTabButton from "@/components/VideoQuizUpload/QuizTabButton";
import QuizTabContent from "@/components/VideoQuizUpload/QuizTabContent";
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
      lessonNumber: Number(lessonNumber), // Ensure lessonNumber is a number
      year,
    };
  }

  return { props: { videoData } };
};

const EditExtraVideoQuiz: NextPage<EditVideoQuizProps> = ({
  videoData: initialVideoData,
}) => {
  const router = useRouter();
  const year = router.query.year as string;
  const lessonNumber = router.query.lessonNumber as string;
  const [videoData, setVideoData] = useState<Video | null>(initialVideoData);
  const [activeTab, setActiveTab] = useState<string>("details");

  const handleVideoDataChange = (updatedVideoData: Video) => {
    setVideoData(updatedVideoData);
  };

  const handleQuestionChange = (updatedQuestionData: Question) => {
    if (!videoData) return;
    setVideoData({
      ...videoData,
      questions: videoData.questions.map((question) =>
        question.id === updatedQuestionData.id ? updatedQuestionData : question,
      ),
    });
  };

  const addQuestion = () => {
    if (videoData) {
      const updatedVideoData = addQuestionToVideoQuiz(videoData);
      setVideoData(updatedVideoData);
      setActiveTab(`question-${updatedVideoData.questions.length}`);
    }
  };

  const removeQuestion = (questionId: number) => {
    if (!videoData) return;

    const updatedVideoData = removeQuestionFromVideoQuiz(videoData, questionId);
    setVideoData(updatedVideoData);

    setActiveTab(
      updatedVideoData.questions.length > 0
        ? `question-${updatedVideoData.questions[0].id}`
        : "details",
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoData) return;

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

  return (
    <div className={styles.formContainer}>
      <Link
        href={`/educator/extra-video-quizzes/${year}`}
        className={styles.backLink}
      >
        Back to Extra Video Quizzes for {year}
      </Link>
      <h1 className={styles.title}>
        Edit Extra Video Quiz Lesson Number {lessonNumber}
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
              removeQuestion={() => removeQuestion(question.id)}
            />
          ))}
          <button
            type="button"
            className={styles.addButton}
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
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default withAuth(EditExtraVideoQuiz);
