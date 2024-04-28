import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import styles from "./AvailableYears.module.css";
import Spinner from "@/components/Spinner/Spinner";

const fetchYears = async () => {
  const yearsCollectionRef = collection(db, "extra");
  const yearsSnapshot = await getDocs(yearsCollectionRef);
  return yearsSnapshot.docs.map((doc) => doc.id);
};

const AvailableYears = () => {
  const {
    data: availableYears,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableYears"],
    queryFn: fetchYears,
  });

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.yearsContainer}>
      <h1 className={styles.yearHeading}>Choose Your Learning Year</h1>
      <div>
        {availableYears?.map((year) => (
          <Link key={year} href={`/extra/${year}`} passHref>
            <button className={styles.yearButton}>{year}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AvailableYears;
