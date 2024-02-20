import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
      Try Angle Kids Interactive Quiz
      </h1>
      <Link href="/lessons" passHref>
        <button className={styles.callToAction}>
          Start Learning
        </button>
      </Link>
    </div>
  );
}
