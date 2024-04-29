import Link from "next/link";
import styles from "./LessonCard.module.css";

interface LessonCardProps {
  id: string;
  category: string;
  year: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ id, category, year }) => {
  return (
    <div className={styles.lessonCard}>
      <Link href={`/lessons/${year}/${id}`} passHref>
        <div className={styles.lessonCardLink}>
          <div className={styles.lessonCardBackground}></div>
          <div className={styles.lessonCardTitle}>
            Lesson {id}: {category}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;
