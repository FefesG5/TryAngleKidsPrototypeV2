import { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner/Spinner";

const ManageVideoQuizzes = () => {
  // Assuming you want to list the years 2021-2024 for example
  const [years, setYears] = useState(["2024"]);
  const [loading, setLoading] = useState(false); // Adjust based on actual loading state

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
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
