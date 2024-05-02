import withAuth from "@/components/WithAuth/withAuth";
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
  const lessonsQuery = query(collection(db, "extra", year, "lessons"));
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
      <Link href="/educator/extra-video-quizzes">
        Back to Extra Video Quizzes Year Management
      </Link>
      <h1>Extra Video Quizzes for {year}</h1>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={lesson.lessonNumber}>
            <Link
              href={`/educator/extra-video-quizzes/${year}/${lesson.lessonNumber}`}
            >
              {`Edit Extra Video Quiz ${lesson.lessonNumber}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withAuth(LessonsListPage);
