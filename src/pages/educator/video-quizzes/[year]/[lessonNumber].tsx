import { GetServerSideProps, NextPage } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video } from "@/types/quizTypes";
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

const EditVideoQuiz: NextPage<EditVideoQuizProps> = ({ videoData }) => {
  return (
    <div>
      <h1>Edit Video Quiz</h1>
      {videoData ? (
        <form>
          <VideoDetailsInput
            videoData={videoData}
            onVideoDataChange={(updatedVideo) => {
              // Logic to handle changes to video details
            }}
          />
          {videoData.questions.map((question) => (
            <QuestionDetailsInput
              key={question.id}
              questionData={question}
              onQuestionChange={(updatedQuestion) => {
                // Logic to handle question changes
              }}
            />
          ))}
        </form>
      ) : (
        <p>Video data not found or is loading.</p>
      )}
    </div>
  );
};

export default EditVideoQuiz;
