import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const fetchEducatorsForYear = async (year: string) => {
  const educatorsRef = collection(db, "educators-years", year, "educators");
  const querySnapshot = await getDocs(educatorsRef);
  return querySnapshot.docs.map((doc) => doc.id);
};

const EducatorsLessons: React.FC = () => {
  return <>Educator Lessons Component</>;
};

export default EducatorsLessons;
