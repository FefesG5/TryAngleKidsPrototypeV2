import { Video } from "@/types/quizTypes";

const VideoDetailsInput: React.FC<{
  videoData: Video;
  onVideoDataChange: (videoData: Video) => void;
}> = ({ videoData, onVideoDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onVideoDataChange({ ...videoData, [name]: value });
  };

  return (
    <div>
      <h2>Video Details</h2>
      <label>
        Year
        <input
          type="text"
          name="year"
          value={videoData.year}
          onChange={handleChange}
        />
      </label>
      <label>
        Lesson Number
        <input
          type="text"
          name="lessonNumber"
          value={videoData.lessonNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Video Source
        <input
          type="text"
          name="videoSrc"
          value={videoData.videoSrc}
          onChange={handleChange}
        />
      </label>
      <label>
        Category
        <input
          type="text"
          name="category"
          value={videoData.category}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default VideoDetailsInput;
