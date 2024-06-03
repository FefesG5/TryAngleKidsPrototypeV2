import Image from "next/image";
import { UserProfile } from "@/types/userProfileTypes";
import SignOutButton from "../SignOutButton/SignOutButton";
import styles from "./UserSection.module.css";

interface UserSectionProps {
  userProfile: UserProfile;
  signOutUser: () => Promise<void>;
}

const UserSection = ({ userProfile, signOutUser }: UserSectionProps) => {
  return (
    <div className={styles.userSection}>
      <Image
        src={userProfile.photoURL ?? "/user_icon.svg"}
        alt="user profile image"
        width={50}
        height={50}
        className={styles.userPhoto}
      />
      <div className={styles.userInfo}>
        <p className={styles.userName}>{userProfile.displayName}</p>
        <p className={styles.userEmail}>{userProfile.email}</p>
      </div>
      <SignOutButton signOutUser={signOutUser} />
    </div>
  );
};

export default UserSection;
