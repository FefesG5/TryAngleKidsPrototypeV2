import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";
import LessonCard from "@/components/LessonCard/LessonCard";
import styles from "./LessonsList.module.css";

const fetchLessonsForYear = async (year: string) => {
  const lessonsRef = collection(db, "extra", year, "lessons");
  const querySnapshot = await getDocs(lessonsRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    category: doc.data().category,
  }));
};

const LessonsList = () => {
  const router = useRouter();
  // Directly use the year from the query as yearString after type checking
  const yearString =
    typeof router.query.year === "string" ? router.query.year : "";

  const {
    data: lessons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lessons", yearString],
    queryFn: () => fetchLessonsForYear(yearString!),
    // Only execute the query if the year is available
    enabled: !!yearString,
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className={styles.lessonsContainer}>
      <h1 className={styles.lessonsHeading}>Lessons for {yearString}</h1>
      <div>
        {lessons?.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            category={lesson.category}
            year={yearString}
            path="extra"
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
