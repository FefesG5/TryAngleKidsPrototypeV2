import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import QuizModal from "../Quiz/Quiz";
import { Question, Video } from "@/types/quizTypes";

export type VideoPlayerProp = {
  video: Video;
  onQuestionAnswered: (questionId: number, isCorrect: boolean) => void;
};

const VideoPlayer = ({ video, onQuestionAnswered }: VideoPlayerProp) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [localQuestions, setLocalQuestions] = useState<Question[]>(
    video.questions,
  );

  useEffect(() => {
    const checkQuestions = () => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const nextQuestion = localQuestions.find(
        (question) => !question.answered && currentTime >= question.timestamp,
      );

      if (nextQuestion) {
        setPlaying(false); // This will pause the video
        setCurrentQuestion(nextQuestion);
      }
    };

    const interval = setInterval(checkQuestions, 1000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [localQuestions]);

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
    <>
      <ReactPlayer
        ref={playerRef}
        playing={playing}
        controls={true}
        url={video.videoSrc}
        volume={0.25}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {currentQuestion && (
        <QuizModal
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}
    </>
  );
};

export default VideoPlayer;
