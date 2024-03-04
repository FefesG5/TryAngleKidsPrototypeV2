import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../firebaseConfig";
import Image from "next/image";
import styles from "./GoogleSignIn.module.css";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface SignInProps {
  setError: (error: string) => void;
}

const GoogleSignIn: React.FC<SignInProps> = ({ setError }) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError("Failed to sign in. Please try again.");
      }
    }
  };

  return (
    <div className={styles.signInContainer}>
      <p className={styles.signInText}>
        Please sign in to access educator features.
      </p>
      <button
        className={styles.googleSignInButton}
        onClick={signInWithGoogle}
        aria-label="Sign in with Google"
      >
        <Image
          src="/web_light_sq_SI.svg"
          alt="Google logo"
          width={200}
          height={50}
        />
      </button>
    </div>
  );
};

<Image
  src="/logo.svg"
  alt="Try Angle Kids Logo"
  className={styles.logo}
  width={300}
  height={100}
/>;

export default GoogleSignIn;
