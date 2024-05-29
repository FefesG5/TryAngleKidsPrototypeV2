import Link from "next/link";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { UserProfile } from "@/types/userProfileTypes";

type EducatorDashboardProps = {
  signOutUser: () => Promise<void>;
  years: number[];
  userProfile: UserProfile | null;
};

const EducatorDashboard = ({
  signOutUser,
  years,
  userProfile,
}: EducatorDashboardProps) => {
  return (
    <div>
      <h1>Educator Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/educator/video-quiz-upload">
              Upload New Video Quiz
            </Link>
          </li>

          <li>
            <Link href="/educator/video-quizzes">Manage Video Quizzes</Link>
          </li>

          <li>
            <Link href="/educator/extra-video-quiz-upload">
              Upload New Extra Video Quiz
            </Link>
          </li>

          <li>
            <Link href="/educator/extra-video-quizzes">
              Manage Extra Video Quizzes
            </Link>
          </li>

          <li>
            <Link href="/educator/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <SignOutButton signOutUser={signOutUser} />
    </div>
  );
};

export default EducatorDashboard;
