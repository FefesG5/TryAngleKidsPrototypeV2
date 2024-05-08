import { useState } from "react";
import withAuth from "@/components/WithAuth/withAuth";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { Video } from "@/types/quizTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import Link from "next/link";
import styles from "./ExtraLessonsListPage.module.css";

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

const ExtraLessonsListPage: React.FC<LessonsListPageProps> = ({ lessons }) => {
  const router = useRouter();
  const { year } = router.query;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const handleDelete = async () => {
    if (selectedLesson) {
      try {
        const response = await fetch("/api/deleteExtraVideoQuizLesson", {
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

        console.log("Extra Video Quiz deleted successfully");

        // Refresh the page to reflect the deletion
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
      <Link href="/educator/extra-video-quizzes" className={styles.backLink}>
        Back to Extra Video Quizzes Year Management
      </Link>
      <h1 className={styles.title}>Extra Video Quizzes for {year}</h1>
      <ul className={styles.lessonsList}>
        {lessons.map((lesson, index) => (
          <li key={lesson.lessonNumber} className={styles.lessonItem}>
            <Link
              href={`/educator/extra-video-quizzes/${year}/${lesson.lessonNumber}`}
              className={styles.editLink}
            >
              {`Edit Extra Video Quiz ${lesson.lessonNumber}`}
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

export default withAuth(ExtraLessonsListPage);
