import withAuth from "@/components/WithAuth/withAuth";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

interface ManageVideoQuizzesProps {
  years: string[];
}

export async function getStaticProps() {
  // Fetch the years from Firestore
  const yearsCol = collection(db, "extra");
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
    <>
      <Link href="/educator/">Back to Dashboard</Link>
      <h1>Select a Year to Manage Video Quizzes</h1>
      <ul>
        {years.map((year) => (
          <li key={year}>
            <Link href={`/educator/extra-video-quizzes/${year}`}>
              Manage {year} Quizzes
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withAuth(ManageVideoQuizzes);
