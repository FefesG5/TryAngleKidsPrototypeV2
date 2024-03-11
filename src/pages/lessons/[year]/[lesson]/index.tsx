import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {doc, getDoc} from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";

interface ILesson {
  videoSrc?: string; // Use optional if this field might not exist in all documents
  // ...add other fields expected to be in the lesson document
}

const fetchLesson = async (year: string, lessonId: string): Promise<ILesson & { id: string }> => {
  const lessonDocRef = doc(db, "years", year, "lessons", lessonId);
  const lessonSnapShot = await getDoc(lessonDocRef);

  if (lessonSnapShot.exists()) {
    const lessonData = lessonSnapShot.data() as ILesson;
    return {
      id: lessonSnapShot.id, // Get the id from the snapshot
      ...lessonData // Spread the lesson data assuming it doesn't contain an id
    };
  } else {
    throw new Error("Lesson not found");
  }
};

const LessonDetails = () => {
  const router = useRouter();
  // Ensure 'year' and 'lessonId' are strings
  const year = typeof router.query.year === 'string' ? router.query.year : '';
  const lessonId = typeof router.query.lessonId === 'string' ? router.query.lessonId : '';

  const { data: lesson, isLoading, error } = useQuery<ILesson, Error>({
    queryKey: ['lesson', year, lessonId],
    queryFn: () => fetchLesson(year, lessonId),
    enabled: year !== '' && lessonId !== '',
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>An error has occurred: {error.message}</div>;

  if (!lesson) return <div>Lesson not found.</div>;

  return (
    <div>
      <h1>Lesson {lessonId}</h1>
      <p>
        Details for lesson {lessonId} in the year {year}.
      </p>
      {lesson.videoSrc && (
        <VideoPlayer
          videoSrc={lesson.videoSrc} // assuming your VideoPlayer component expects a prop named 'videoSrc'
          onQuestionAnswered={(questionId, isCorrect) => {
            console.log(`Question ${questionId} answered. Correct: ${isCorrect}`);
          }}
        />
      )}
    </div>
  );
};

export default LessonDetails;