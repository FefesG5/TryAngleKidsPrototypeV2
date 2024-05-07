import { useState } from "react";
import withAuth from "@/components/WithAuth/withAuth";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video } from "@/types/quizTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import Link from "next/link";
import styles from "./LessonsListPage.module.css";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const handleDelete = async () => {
    if (selectedLesson) {
      console.log("Lesson deleted successfully");
      setDialogOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/educator/video-quizzes" className={styles.backLink}>
        Back to Year Management
      </Link>
      <h1>Lessons for {year}</h1>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={lesson.lessonNumber}>
            <Link
              href={`/educator/video-quizzes/${year}/${lesson.lessonNumber}`}
            >
              {`Edit Lesson ${lesson.lessonNumber}`}{" "}
            </Link>
            <button
              onClick={() => {
                setSelectedLesson(lesson.lessonNumber);
                setDialogOpen(true);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {dialogOpen && (
        <DeleteConfirmationDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default withAuth(LessonsListPage);
