import VideoQuizUploadForm from "@/components/VideoQuizUpload/VideoQuizUploadForm";
import Link from "next/link";

const VideoQuizUpload: React.FC = () => {
  // Component logic and JSX go here

  return (
    <>
      <h1>New Quiz Upload</h1>

      <Link href="/educator">Back to Dashboard</Link>

      <VideoQuizUploadForm />
    </>
  );
};

export default VideoQuizUpload;
