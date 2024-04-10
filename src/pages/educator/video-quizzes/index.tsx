import { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner/Spinner";

const ManageVideoQuizzes = () => {
  const [years, setYears] = useState(["2024"]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Link href="/educator/">Back to Dashboard</Link>

      <h1>Select a Year to Manage Video Quizzes</h1>

      <ul>
        {years.map((year) => (
          <li key={year}>
            <Link href={`/educator/video-quizzes/${year}`}>
              Manage {year} Quizzes
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ManageVideoQuizzes;
