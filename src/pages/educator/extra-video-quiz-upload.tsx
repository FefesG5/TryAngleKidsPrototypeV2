import withAuth from "@/components/WithAuth/withAuth";
import VideoQuizUploadForm from "@/components/VideoQuizUpload/VideoQuizUploadForm";
import Link from "next/link";

const VideoQuizUpload: React.FC = () => {
  // Component logic and JSX go here

  return (
    <>
      <h1>New Extra Video Quiz Upload</h1>

      <Link href="/educator">Back to Dashboard</Link>

      <VideoQuizUploadForm apiEndpoint="/api/submitExtraVideoQuiz" />
    </>
  );
};

export default withAuth(VideoQuizUpload);
