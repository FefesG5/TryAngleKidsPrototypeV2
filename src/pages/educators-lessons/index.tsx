import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import styles from "./EducatorsLessonsIndex.module.css";

// Fetch the years available in the educators-years collection
const fetchYears = async (): Promise<string[]> => {
  const yearsRef = collection(db, "educators-years");
  const querySnapshot = await getDocs(yearsRef);
  return querySnapshot.docs.map((doc) => doc.id); // Assuming that years are document IDs
};

const EducatorsLessonsIndex: React.FC = () => {
  const {
    data: years,
    isLoading,
    error,
  } = useQuery<string[], Error>({
    queryKey: ["educators-years"],
    queryFn: fetchYears,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div>
        An error has occurred:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Educator Lessons by Year</h1>
      <ul className={styles.yearList}>
        {years?.map((year) => (
          <li key={year} className={styles.yearItem}>
            <Link
              href={`/educators-lessons/${year}`}
              className={styles.yearLink}
            >
              Educators for {year}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducatorsLessonsIndex;
