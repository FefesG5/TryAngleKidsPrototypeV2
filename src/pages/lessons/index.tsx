import Link from "next/link";
import styles from "./AvailableYears.module.css";

const availableYears = ["2024", "2025"]; // Example years

const AvailableYears = () => (
  <div className={styles.yearsContainer}>
    <h1 className={styles.yearHeading}>Choose Your Learning Year</h1>
    <div>
      {availableYears.map((year) => (
        <Link key={year} href={`/lessons/${year}`} passHref>
          <button className={styles.yearButton}>{year}</button>
        </Link>
      ))}
    </div>
  </div>
);

export default AvailableYears;
