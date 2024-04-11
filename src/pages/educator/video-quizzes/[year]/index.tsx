import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video } from "@/types/quizTypes";
import Link from "next/link";

interface LessonsListPageProps {
  lessons: Video[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const year = context.params?.year as string;
  // Adjust your query to filter documents by the year
  const lessonsQuery = query(collection(db, "years", year, "lessons"));
  const lessonsSnapshot = await getDocs(lessonsQuery);
  const lessons = lessonsSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        lessonNumber: doc.id, // this is the key of the document in Firestore
      }) as Video,
  );

  return {
    props: {
      lessons,
    },
  };
}

const LessonsListPage: React.FC<LessonsListPageProps> = ({ lessons }) => {
  const router = useRouter();
  const { year } = router.query;

  return (
    <>
      <h1>Lessons for {year}</h1>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={lesson.lessonNumber}>
            <Link
              href={`/educator/video-quizzes/${year}/${lesson.lessonNumber}`}
            >
              {`Edit Lesson ${lesson.lessonNumber}`}{" "}
              {/* Ensure this is the correct lesson number */}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LessonsListPage;
