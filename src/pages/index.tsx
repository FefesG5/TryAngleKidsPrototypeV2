import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Welcome to Try Angle Kids Video Lessons
      </h1>
      <nav className={styles.navList}>
        <ul>
          <li>
            <Link href="/lessons/1" className={styles.link}>
              Lesson 1
            </Link>
          </li>
          <li>
            <Link href="/lessons/2" className={styles.link}>
              Lesson 2
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
