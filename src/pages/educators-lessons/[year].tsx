import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";

const fetchEducatorsForYear = async (year: string) => {
  const educatorsRef = collection(db, "educators-years", year, "educators");
  const querySnapshot = await getDocs(educatorsRef);
  return querySnapshot.docs.map((doc) => doc.id);
};

const EducatorsLessons: React.FC = () => {
  const router = useRouter();
  const year = router.query.year as string;

  const {
    data: educators,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["educators", year],
    queryFn: () => fetchEducatorsForYear(year),
    enabled: !!year, // The query will only run if the year is not undefined
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      {year && <h1>Educators for {year}</h1>}
      <ul>
        {educators?.map((educatorId) => (
          <li key={educatorId}>{educatorId}</li> // Replace with proper link or rendering logic
        ))}
      </ul>
    </div>
  );
};

export default EducatorsLessons;
