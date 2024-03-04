// pages/educator/uploads.tsx
import { useState } from "react";
import Link from "next/link";

const Uploads = () => {
  // State for storing the YouTube video URL and transcript
  const [videoUrl, setVideoUrl] = useState("");
  const [transcript, setTranscript] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to process the YouTube URL and transcript
    // This might include sending the data to a backend service or directly to the ChatGPT API
  };

  return (
    <div>
      <h1>Video Uploads</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="videoUrl">YouTube Video URL:</label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        <div>
          <label htmlFor="transcript">Video Transcript:</label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste the video transcript here..."
            rows={10} // Adjust the number of rows as needed
          />
        </div>
        <button type="submit">Generate Questions</button>
      </form>
      <Link href="/educator">Back to Dashboard</Link>
    </div>
  );
};

export default Uploads;
