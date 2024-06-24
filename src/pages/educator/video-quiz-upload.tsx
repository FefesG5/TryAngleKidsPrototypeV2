import { useState } from "react";
import Link from "next/link";
import VideoQuizUploadForm from "@/components/VideoQuizUpload/VideoQuizUploadForm";
import withAuth from "@/components/WithAuth/withAuth";
import SampleDataModal from "@/components/SampleDataModal/SampleDataModal";
import styles from "./VideoQuizUploadForm.module.css";

const VideoQuizUpload: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>New Quiz Upload</h1>
        <Link href="/educator" className={styles.backLink}>
          Back to Dashboard
        </Link>
      </div>
      <button onClick={handleShowModal} className={styles.sampleButton}>
        Copy Sample Data
      </button>
      <SampleDataModal show={showModal} onClose={handleCloseModal} />
      <VideoQuizUploadForm apiEndpoint="/api/submitVideoQuiz" />
    </div>
  );
};

export default withAuth(VideoQuizUpload);
