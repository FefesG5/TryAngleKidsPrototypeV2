import { app } from "../../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const EducatorAccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Sign in successful");
    } catch (e) {
      console.error("Sign in Error", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successful");
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  return (
    <>
      <h1>Educator Access</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in.</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <p>Please sign in to access educator features.</p>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </>
      )}
    </>
  );
};

export default EducatorAccess;
