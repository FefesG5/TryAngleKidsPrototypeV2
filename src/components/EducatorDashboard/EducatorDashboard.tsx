import Link from "next/link";

type EducatorDashboardProps = {
  signOutUser: () => Promise<void>;
  years: number[];
};

const EducatorDashboard = ({ signOutUser, years }: EducatorDashboardProps) => {
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
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default EducatorDashboard;
