import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video, Question } from "@/types/quizTypes";
import QuestionDetailsInput from "@/components/VideoQuizUpload/QuestionDetailsInput";
import VideoDetailsInput from "@/components/VideoQuizUpload/VideoDetailsInput";

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

  const lessonRef = doc(db, "years", year, "lessons", lessonNumber);
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
    const newQuestion: Question = {
      id: newId,
      question: "",
      timestamp: 0,
      answered: false,
      choices: ["", "", "", ""],
      correctAnswer: "",
      feedback: { correct: "", incorrect: "" },
    };

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
    if (!videoData) return;
    const updatedQuestions = videoData.questions.filter(
      (q) => q.id !== questionId,
    );
    setVideoData({
      ...videoData,
      questions: updatedQuestions,
    });
    setActiveTab("details");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoData) return;

    console.log("Updated videoData to submit:", videoData);
    // Implement your API call to update Firestore here
  };

  if (!videoData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link href={`/educator/video-quizzes/${year}`}>
        Back to Edit Lessons for {year}
      </Link>
      <h1>Edit Video Quiz</h1>
      <form onSubmit={handleSubmit}>
        <VideoDetailsInput
          videoData={videoData}
          onVideoDataChange={handleVideoDataChange}
        />
        {videoData.questions.map((question, index) => (
          <div key={question.id}>
            <QuestionDetailsInput
              questionData={question}
              onQuestionChange={handleQuestionChange}
            />
            <button type="button" onClick={() => removeQuestion(question.id)}>
              Delete Question
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVideoQuiz;
