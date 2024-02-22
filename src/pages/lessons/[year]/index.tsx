import { useRouter } from "next/router";
import Link from "next/link";
//import styles from './[year].module.css'; // Adjust the path to your styles as necessary

// This would be replaced by actual data fetching logic
const lessons = [
  { id: "1", name: "Lesson 1" },
  { id: "2", name: "Lesson 2" },
  // ... more lessons
];

const YearLessonsIndex = () => {
  const router = useRouter();
  const { year } = router.query;

  return (
    <div>
      <h1>Lessons for {year}</h1>
      <div>
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${year}/${lesson.id}`} passHref>
            <button className="">{lesson.name}</button>
            {/* <button className={styles.lessonButton}>{lesson.name}</button> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YearLessonsIndex;
