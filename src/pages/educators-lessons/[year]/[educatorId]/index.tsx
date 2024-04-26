import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig"; // Make sure this path is correct
import Spinner from "@/components/Spinner/Spinner"; // Make sure this path is correct
import Link from "next/link";
import { Video } from "@/types/quizTypes"; // Ensure this path is correct

const fetchLessonsForEducator = async (
  year: string,
  educatorId: string,
): Promise<Video[]> => {
  const lessonsRef = collection(
    db,
    "educators-years", // This matches the root of your path
    year, // This is the year document
    "educators", // This accesses the subcollection of educators
    educatorId, // This is the specific educator document
    "lessons", // This accesses the subcollection of lessons
  );
  const querySnapshot = await getDocs(lessonsRef);
  return querySnapshot.docs.map((doc) => doc.data() as Video);
};

const EducatorLessonsPage: React.FC = () => {
  const router = useRouter();
  const { year, educatorId } = router.query;

  console.log(`Year: ${year}, Educator ID: ${educatorId}`); // Add this line to log out parameters

  const {
    data: videos,
    isLoading,
    error,
  } = useQuery<Video[], Error>({
    queryKey: ["lessons", year, educatorId],
    queryFn: () =>
      fetchLessonsForEducator(year as string, educatorId as string),
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
      <Link href={`/educator-lessons/${year}`}>
        <a>Back to Educators for {year}</a>
      </Link>
      <h1>Lessons for {educatorId}</h1>
      {videos && videos.length > 0 ? (
        <ul>
          {videos.map((video) => (
            <li key={video.lessonNumber}>
              <Link
                href={`/educator-lessons/${year}/${educatorId}/lessons/${video.lessonNumber}`}
              >
                Lesson {video.lessonNumber}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons found.</p>
      )}
    </div>
  );
};

export default EducatorLessonsPage;
