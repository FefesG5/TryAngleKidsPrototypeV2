// src/pages/educators-lessons/[year]/[educatorId]/lessons/index.tsx

import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../../firebaseConfig";
import Spinner from "../../../../../components/Spinner/Spinner";
import Link from "next/link";
import { Video } from "../../../../../types/quizTypes";

// Assuming you have a way to fetch all lessons for a given educator and year
const fetchLessons = async (
  year: string,
  educatorId: string,
): Promise<Video[]> => {
  const lessonsRef = collection(
    db,
    "educators-years",
    year,
    "educators",
    educatorId,
    "lessons",
  );
  const querySnapshot = await getDocs(lessonsRef);
  return querySnapshot.docs.map((doc) => doc.data() as Video);
};

const LessonsIndexPage: React.FC = () => {
  const router = useRouter();
  const { year, educatorId } = router.query;

  const {
    data: lessons,
    isLoading,
    error,
  } = useQuery<Video[], Error>({
    queryKey: ["lessons", year, educatorId],
    queryFn: () => fetchLessons(year as string, educatorId as string),
    enabled: !!year && !!educatorId,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div>
      <Link href={`/educators-lessons/${year}`}>
        Back to Educators for {year}
      </Link>
      <h1>Lessons for Educator {educatorId}</h1>
      {lessons && lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.lessonNumber}>
              <Link
                href={`/educators-lessons/${year}/${educatorId}/lessons/${lesson.lessonNumber}`}
              >
                Lesson {lesson.lessonNumber}: {lesson.category}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons found for this educator.</p>
      )}
    </div>
  );
};

export default LessonsIndexPage;
