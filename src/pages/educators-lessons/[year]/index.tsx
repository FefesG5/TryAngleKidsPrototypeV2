// pages/educator-lessons/[year].tsx

import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; // Ensure this path is correct
import Spinner from "../../../components/Spinner/Spinner"; // Ensure this path is correct

// Function to fetch educators' IDs for a specific year with explicit return type
const fetchEducators = async (
  year: string,
): Promise<{ id: string; name: string }[]> => {
  const educatorsRef = collection(db, "educators-years", year, "educators");
  const querySnapshot = await getDocs(educatorsRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name, // Ensure the 'name' field is expected to be a string
  }));
};

const EducatorsLessons: React.FC = () => {
  const router = useRouter();
  const { year } = router.query;

  const {
    data: educators,
    isLoading,
    error,
  } = useQuery<{ id: string; name: string }[], Error>({
    queryKey: ["educators", year],
    queryFn: () => fetchEducators(year as string),
    enabled: !!year, // The query will only run if the year is not undefined
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div>
      <Link href="/educators-lessons/">Back to Educator Lessons by Year</Link>
      {year && <h1>Educators for {year}</h1>}
      <ul>
        {educators?.map((educator) => (
          <li key={educator.id}>
            <Link href={`/educators-lessons/${year}/${educator.id}`}>
              {educator.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducatorsLessons;
