import styles from "./SignOutButton.module.css";

type SignOutButtonProps = {
  signOutUser: () => Promise<void>;
};

const SignOutButton = ({ signOutUser }: SignOutButtonProps) => {
  return (
    <button onClick={signOutUser} className={styles.signOutButton}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
