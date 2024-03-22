import { Video } from "@/types/quizTypes";
import styles from "./VideoDetailsInput.module.css";

const VideoDetailsInput: React.FC<{
  videoData: Video;
  onVideoDataChange: (videoData: Video) => void;
}> = ({ videoData, onVideoDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onVideoDataChange({ ...videoData, [name]: value });
  };

  return (
    <div className={styles.detailInputContainer}>
      <h2>Video Details</h2>
      <label className={styles.detailInputLabel}>
        Year
        <input
          type="text"
          name="year"
          className="detailInput"
          value={videoData.year}
          onChange={handleChange}
        />
      </label>
      <label className={styles.detailInputLabel}>
        Lesson Number
        <input
          type="text"
          name="lessonNumber"
          className="detailInput"
          value={videoData.lessonNumber}
          onChange={handleChange}
        />
      </label>
      <label className={styles.detailInputLabel}>
        Video Source
        <input
          type="text"
          name="videoSrc"
          className="detailInput"
          value={videoData.videoSrc}
          onChange={handleChange}
        />
      </label>
      <label className={styles.detailInputLabel}>
        Category
        <input
          type="text"
          name="category"
          className="detailInput"
          value={videoData.category}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default VideoDetailsInput;
