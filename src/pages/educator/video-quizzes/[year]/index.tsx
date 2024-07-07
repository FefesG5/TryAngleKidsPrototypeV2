import { useState } from "react";
import withAuth from "@/components/WithAuth/withAuth";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video } from "@/types/quizTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import Link from "next/link";
import styles from "./LessonsListPage.module.css";

interface LessonsListPageProps {
  lessons: Video[];
}

export const getServerSideProps: GetServerSideProps<
  LessonsListPageProps
> = async (context: GetServerSidePropsContext) => {
  const { year } = context.params as { year: string };
  const lessonsQuery = query(collection(db, "years", year, "lessons"));
  const lessonsSnapshot = await getDocs(lessonsQuery);
  const lessons = lessonsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    lessonNumber: Number(doc.id),
    year,
  })) as Video[];

  return {
    props: {
      lessons,
    },
  };
};

const LessonsListPage: React.FC<LessonsListPageProps> = ({ lessons }) => {
  const router = useRouter();
  const { year } = router.query as { year: string };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const handleDelete = async () => {
    if (selectedLesson !== null) {
      try {
        const response = await fetch("/api/deleteVideoQuizLesson", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year,
            lessonNumber: selectedLesson,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to delete lesson");
        }
        console.log("Lesson deleted successfully");
        router.replace(router.asPath);
      } catch (error) {
        console.error("Error deleting lesson:", error);
      } finally {
        setDialogOpen(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/educator/video-quizzes" className={styles.backLink}>
        Back to Year Management
      </Link>
      <h1 className={styles.title}>Lessons for {year}</h1>
      <ul className={styles.lessonsList}>
        {lessons.map((lesson, index) => (
          <li key={lesson.lessonNumber} className={styles.lessonItem}>
            <Link
              href={`/educator/video-quizzes/${year}/${lesson.lessonNumber}`}
              className={styles.editLink}
            >
              {`Edit Lesson ${lesson.lessonNumber}`}
            </Link>
            <button
              onClick={() => {
                setSelectedLesson(lesson.lessonNumber);
                setDialogOpen(true);
              }}
              className={styles.deleteButton}
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
