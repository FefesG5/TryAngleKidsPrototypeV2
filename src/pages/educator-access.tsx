import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

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

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError("Failed to sign in. Please try again.");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false); // Ensure the user is set as not authenticated
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
        <>
          <p>Please sign in to access educator features.</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
      )}
    </>
  );
};

export default EducatorAccess;
