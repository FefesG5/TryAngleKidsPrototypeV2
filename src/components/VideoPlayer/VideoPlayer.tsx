import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import QuizModal from "../Quiz/Quiz";
import { Question, Video } from "@/types/quizTypes";
import styles from "./VideoPlayer.module.css";

export type VideoPlayerProp = {
  video: Video;
  onQuestionAnswered: (questionId: number, isCorrect: boolean) => void;
};

type ProgressState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const VideoPlayer = ({ video, onQuestionAnswered }: VideoPlayerProp) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [localQuestions, setLocalQuestions] = useState<Question[]>(
    video.questions,
  );

  const handleProgress = (state: ProgressState) => {
    const { playedSeconds } = state;
    const nextQuestion = localQuestions.find(
      (question) => !question.answered && playedSeconds >= question.timestamp,
    );

    if (nextQuestion && playing) {
      setPlaying(false); // This will pause the video
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (currentQuestion) {
      onQuestionAnswered(currentQuestion.id, isCorrect);
      // Update the localQuestions state to mark the current question as answered
      setLocalQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === currentQuestion.id ? { ...q, answered: true } : q,
        ),
      );
      setCurrentQuestion(null); // Close the modal
      setPlaying(true); // Resume video
    }
  };
  return (
    <div className={styles.VideoContainer}>
      <ReactPlayer
        className={styles.ReactPlayer}
        ref={playerRef}
        playing={playing}
        controls={true}
        url={video.videoSrc}
        volume={0.25}
        width="95%"
        height="95%"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onProgress={handleProgress}
      />
      {currentQuestion && (
        <QuizModal
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
