// VideoPlayer.js
import React from "react";
import styles from "./VideoPlayer.module.css"; // ensure you have corresponding styles defined

// Define a type for the individual question
type Question = {
  question: string;
  choices: string[];
  correctAnswer: string;
};

// Define a type for the props expected by the VideoPlayer component
type VideoPlayerProps = {
  videoSrc: string;
  questions: Question[];
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, questions }) => {
  const checkAnswer = (correctAnswer: string, selectedAnswer: string) => {
    if (correctAnswer === selectedAnswer) {
      alert("Correct answer!");
    } else {
      alert("Wrong answer, try again!");
    }
  };

  return (
    <div className={styles.videoPlayer}>
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Video Lesson"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
