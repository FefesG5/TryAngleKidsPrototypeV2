// In components/VideoPlayer.js
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

type Question = {
  id: number;
  question: string;
  timestamp: number;
  answered: boolean;
  choices: string[];
  correctAnswer: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
};

export type VideoPlayerProp = {
  videoSrc: string;
  questions: Question[];
  onQuestionAnswered: (questionId: number, isCorrect: boolean) => void;
};

const VideoPlayer = ({
  videoSrc,
  questions,
  onQuestionAnswered,
}: VideoPlayerProp) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const checkQuestions = () => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const nextQuestion = questions.find(
        (question) => !question.answered && currentTime >= question.timestamp,
      );

      if (nextQuestion) {
        setPlaying(false); // This will pause the video
        // Handle displaying the question here or via a callback
        // onQuestionAnswered(nextQuestion.id, false); // Example callback usage
      }
    };

    const interval = setInterval(checkQuestions, 1000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [questions, onQuestionAnswered]);

  return (
    <ReactPlayer
      ref={playerRef}
      playing={playing}
      controls={true}
      url={videoSrc}
      volume={0.25}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
    />
  );
};

export default VideoPlayer;
