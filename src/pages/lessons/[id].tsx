import { useRouter } from "next/router";
import styles from "./LessonPage.module.css"; // Your CSS module for styling

const LessonPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  // Here you would fetch lesson data based on the `id`
  // and render the video and quiz components for the lesson.

  return (
    <div className={styles.lessonContainer}>
      <h1 className={styles.lessonTitle}>Lesson {id}</h1>
      {/* Render your video and quiz components here */}
    </div>
  );
};

export default LessonPage;
