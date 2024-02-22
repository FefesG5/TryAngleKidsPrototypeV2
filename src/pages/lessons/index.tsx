import Link from "next/link";
import styles from "./LessonsIndex.module.css";

const availableYears = ["2024", "2025"]; // Example years

const LessonsIndex = () => (
  <div>
    <h1>Select a Year to Start Learning</h1>
    <div>
      {availableYears.map((year) => (
        <Link key={year} href={`/lessons/${year}`} passHref>
          <button className={styles.yearButton}>{year}</button>
        </Link>
      ))}
    </div>
  </div>
);

export default LessonsIndex;
