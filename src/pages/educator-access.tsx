import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import SignIn from "@/components/SignIn/SignIn";

const auth = getAuth(app);
const db = getFirestore(app);

const EducatorAccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check if user is in the 'educators' list
        const educatorsQuery = query(
          collection(db, "educators"),
          where("email", "==", user.email),
        );
        const querySnapshot = await getDocs(educatorsQuery);
        if (!querySnapshot.empty) {
          setIsAuthenticated(true);
          setError("");
        } else {
          setError("You are not authorised. Please contact Head of Curriculum");
          await signOut(auth);
        }
      } else {
        setIsAuthenticated(false);
      }
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

  return (
    <>
      <h1>Educator Access</h1>
      {error && <p>{error}</p>}
      {isAuthenticated ? (
        <>
          <p>You are logged in.</p>
          <button onClick={signOutUser}>Sign Out</button>
        </>
      ) : (
        <SignIn setError={setError} />
      )}
    </>
  );
};

export default EducatorAccess;
