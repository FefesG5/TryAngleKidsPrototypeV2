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
import { app } from "../../../firebaseConfig";
import Link from "next/link";

const auth = getAuth(app);
const db = getFirestore(app);

const EducatorAccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
          setError("");
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
    return <div>Loading...</div>; // Or replace with a spinner component if you have one
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
    <div>
      <h1>Educator Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/educator/uploads">Uploads</Link>
          </li>
          <li>
            <Link href="/educator/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default EducatorAccess;
