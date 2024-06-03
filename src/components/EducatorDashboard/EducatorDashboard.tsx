import Link from "next/link";
import UserSection from "../UserSection/UserSection";
import { UserProfile } from "@/types/userProfileTypes";
import styles from "./EducatorDashboard.module.css";

type EducatorDashboardProps = {
  signOutUser: () => Promise<void>;
  years: number[];
  userProfile: UserProfile;
};

const EducatorDashboard = ({
  signOutUser,
  years,
  userProfile,
}: EducatorDashboardProps) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userSectionWrapper}>
        <UserSection userProfile={userProfile} signOutUser={signOutUser} />
      </div>
      <div className={styles.dashboardContent}>
        <nav className={styles.dashboardNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                href="/educator/video-quiz-upload"
                className={styles.navLink}
              >
                Upload New Video Quiz
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/educator/video-quizzes" className={styles.navLink}>
                Manage Video Quizzes
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/educator/extra-video-quiz-upload"
                className={styles.navLink}
              >
                Upload New Extra Video Quiz
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/educator/extra-video-quizzes"
                className={styles.navLink}
              >
                Manage Extra Video Quizzes
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/educator/settings" className={styles.navLink}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <main className={styles.mainContent}>
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
};

export default EducatorDashboard;
