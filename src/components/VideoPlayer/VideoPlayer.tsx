// In components/VideoPlayer.js
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import QuizModal from "../Quiz/Quiz";

export type Question = {
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
  questions: initialQuestions,
  onQuestionAnswered,
}: VideoPlayerProp) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [localQuestions, setLocalQuestions] =
    useState<Question[]>(initialQuestions);

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
        url={videoSrc}
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
