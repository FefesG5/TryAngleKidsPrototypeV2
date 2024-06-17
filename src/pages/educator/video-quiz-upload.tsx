import withAuth from "@/components/WithAuth/withAuth";
import VideoQuizUploadForm from "@/components/VideoQuizUpload/VideoQuizUploadForm";
import Link from "next/link";
import styles from "./VideoQuizUploadForm.module.css";

const VideoQuizUpload: React.FC = () => {
  // Component logic and JSX go here

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>New Quiz Upload</h1>
        <Link href="/educator" className={styles.backLink}>
          Back to Dashboard
        </Link>
      </div>
      <VideoQuizUploadForm apiEndpoint="/api/submitVideoQuiz" />
    </div>
  );
};

export default withAuth(VideoQuizUpload);
