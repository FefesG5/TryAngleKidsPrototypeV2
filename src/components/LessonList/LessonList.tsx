// components/LessonList/LessonList.tsx
import Link from "next/link";
import styles from "./LessonList.module.css";

export const LessonList: React.FC = () => {
  // Assuming you have lesson data to map through
  const lessons = [
    { id: "1", name: "Lesson 1" },
    { id: "2", name: "Lesson 2" },
    // More lessons here
  ];

  return (
    <div className={styles.lessonListContainer}>
      {lessons.map((lesson) => (
        <Link
          href={`lessons/${lesson.id}`}
          key={lesson.id}
          className={styles.lessonLink}
        >
          {lesson.name}
        </Link>
      ))}
    </div>
  );
};

export default LessonList;
