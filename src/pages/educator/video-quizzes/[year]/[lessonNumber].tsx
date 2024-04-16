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

  const handleVideoDataChange = (updatedVideo: Video) => {
    setVideoData(updatedVideo);
  };

  const handleQuestionChange = (updatedQuestion: Question) => {
    if (!videoData) return;
    setVideoData({
      ...videoData,
      questions: videoData.questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question,
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoData) return;

    // Here you will handle the API request to save the data
    // For now, let's just log the updated data to the console
    console.log(videoData);
    // After this, you would typically make a PUT request to your API to update the data
  };

  return (
    <div>
      <Link href={`/educator/video-quizzes/${year}`}>
        Back to Edit Lessons for {year}
      </Link>
      <h1>Edit Video Quiz</h1>
      {videoData ? (
        <form onSubmit={handleSubmit}>
          <VideoDetailsInput
            videoData={videoData}
            onVideoDataChange={handleVideoDataChange}
          />
          {videoData.questions.map((question, index) => (
            <QuestionDetailsInput
              key={index} // Consider using a more stable key if available
              questionData={question}
              onQuestionChange={handleQuestionChange}
            />
          ))}
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Video data not found or is loading.</p>
      )}
    </div>
  );
};

export default EditVideoQuiz;
