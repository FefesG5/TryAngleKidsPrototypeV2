import Link from "next/link";
//import styles from './lessons.module.css'; // Adjust the path to your styles as necessary

const availableYears = ["2024", "2025"]; // Example years

const LessonsIndex = () => (
  <div>
    <h1>Select a Year to Start Learning</h1>
    <div>
      {availableYears.map((year) => (
        <Link key={year} href={`/lessons/${year}`} passHref>
          <button className={""}>{year}</button>
          {/* <button className={styles.yearButton}>{year}</button> */}
        </Link>
      ))}
    </div>
  </div>
);

export default LessonsIndex;
