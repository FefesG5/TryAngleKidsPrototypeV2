import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { Video } from "@/types/quizTypes";
import styles from "./LessonDetails.module.css";

const fetchLessonDetail = async (year: string, lesson: string) => {
  const lessonRef = doc(db, "years", year, "lessons", lesson);
  const lessonSnapshot = await getDoc(lessonRef);

  if (lessonSnapshot.exists()) {
    return lessonSnapshot.data() as Video; // Casting the data to match the Video type
  } else {
    throw new Error(
      `No such lesson with ID ${lesson} found for the year ${year}`,
    );
  }
};

const LessonDetails = () => {
  const router = useRouter();
  const { year, lesson } = router.query;

  const {
    data: lessonDetail,
    isLoading,
    error,
  } = useQuery<Video, Error>({
    queryKey: ["lessonDetail", year, lesson],
    queryFn: () => fetchLessonDetail(year as string, lesson as string),
    enabled: !!year && !!lesson,
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>An error has occurred: {error.message}</div>;

  if (!lesson) return <div>Lesson not found.</div>;

  return (
    <div className={styles.LessonContainer}>
      <h1 className={styles.LessonTitle}>Lesson {lesson}</h1>
      <p className={styles.LessonDescription}>
        Details for lesson {lesson} in the year {year}.
      </p>
      {lessonDetail ? (
        <VideoPlayer
          video={lessonDetail}
          onQuestionAnswered={(questionId, isCorrect) => {
            console.log(
              `Question ${questionId} answered. Correct: ${isCorrect}`,
            );
          }}
        />
      ) : (
        <div>Loading lesson details...</div>
      )}
    </div>
  );
};

export default LessonDetails;
