import withAuth from "@/components/WithAuth/withAuth";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

// Importing styles from the extra-video-quizzes module to maintain consistency
import styles from "../extra-video-quizzes/ManageVideoQuizzes.module.css";

interface ManageVideoQuizzesProps {
  years: string[];
}

export async function getStaticProps() {
  // Fetch the years from Firestore
  const yearsCol = collection(db, "years");
  const yearsSnapshot = await getDocs(yearsCol);
  const years = yearsSnapshot.docs.map((doc) => doc.id);

  return {
    props: {
      years,
    },
    revalidate: 86400, // Optionally revalidate once a day if you expect updates to the years
  };
}

const ManageVideoQuizzes = ({ years }: ManageVideoQuizzesProps) => {
  return (
    <div className={styles.container}>
      <Link href="/educator/" className={styles.backLink}>
        Back to Dashboard
      </Link>
      <h1 className={styles.title}>Select a Year to Manage Video Quizzes</h1>
      <ul className={styles.yearsList}>
        {years.map((year) => (
          <li key={year} className={styles.yearItem}>
            <Link
              href={`/educator/video-quizzes/${year}`}
              className={styles.manageLink}
            >
              Manage {year} Quizzes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(ManageVideoQuizzes);
