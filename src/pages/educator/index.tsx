import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import GoogleSignIn from "@/components/GoogleSignIn/GoogleSignIn";
import Spinner from "@/components/Spinner/Spinner";
import EducatorDashboard from "@/components/EducatorDashboard/EducatorDashboard";
import { app } from "../../../firebaseConfig";
import { UserProfile } from "@/types/userProfileTypes";

const auth = getAuth(app);
const db = getFirestore(app);

// This is a placeholder function to simulate fetching years from a database.
async function fetchYears(): Promise<number[]> {
  // Replace with actual database fetching logic
  return [2024];
}

const EducatorAccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<number[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        // Check if user is in the 'educators' list
        const educatorsQuery = query(
          collection(db, "educators"),
          where("email", "==", user.email),
        );
        const querySnapshot = await getDocs(educatorsQuery);
        const educator = querySnapshot.docs.find(
          (doc) => doc.data().isAuthorized,
        );
        if (educator) {
          setIsAuthenticated(true);
          setUserProfile({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
          setError("");
          fetchYears().then(setYears);
        } else {
          setError("You are not authorised. Please contact Head of Curriculum");
          await signOut(auth);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false); // Ensure the user is set as not authenticated
      setError(""); // Optionally reset the error state
    } catch (error) {
      setError("Error signing out. Please try again.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <>
        {error && <p>{error}</p>}
        <GoogleSignIn setError={setError} />
      </>
    );
  }

  return (
    <EducatorDashboard
      signOutUser={signOutUser}
      years={years}
      userProfile={userProfile}
    />
  );
};

export default EducatorAccess;
