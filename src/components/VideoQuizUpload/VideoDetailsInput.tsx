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
    <div className={styles.videoDetailInputContainer}>
      <label className={styles.videoDetailInputLabel}>
        Year
        <input
          type="text"
          name="year"
          className={styles.videoDetailInput}
          value={videoData.year}
          onChange={handleChange}
        />
      </label>
      <label className={styles.videoDetailInputLabel}>
        Lesson Number
        <input
          type="text"
          name="lessonNumber"
          className={styles.videoDetailInput}
          value={videoData.lessonNumber}
          onChange={handleChange}
        />
      </label>
      <label className={styles.videoDetailInputLabel}>
        Video Source
        <input
          type="text"
          name="videoSrc"
          className={styles.videoDetailInput}
          value={videoData.videoSrc}
          onChange={handleChange}
        />
      </label>
      <label className={styles.videoDetailInputLabel}>
        Category
        <input
          type="text"
          name="category"
          className={styles.videoDetailInput}
          value={videoData.category}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default VideoDetailsInput;
