import { Video, Question } from "@/types/quizTypes";
import VideoDetailsInput from "./VideoDetailsInput";
import QuestionDetailsInput from "./QuestionDetailsInput";
import { defaultQuizQuestion } from "@/utils/videoQuizInitialState";
import styles from "./QuizTabContent.module.css";

interface QuizTabContentProps {
  activeTab: string;
  videoData: Video;
  onVideoDataChange: (updatedVideoData: Video) => void;
  onQuestionChange: (updatedQuestion: Question) => void;
}

const QuizTabContent: React.FC<QuizTabContentProps> = ({
  activeTab,
  videoData,
  onVideoDataChange,
  onQuestionChange,
}) => {
  if (activeTab === "details") {
    return (
      <VideoDetailsInput
        videoData={videoData}
        onVideoDataChange={onVideoDataChange}
      />
    );
  }

  const questionId = parseInt(activeTab.replace("questions", ""), 10);
  const question =
    videoData.questions.find((q) => q.id === questionId) ||
    defaultQuizQuestion();

  return (
    <QuestionDetailsInput
      questionData={question}
      onQuestionChange={onQuestionChange}
    />
  );
};

export default QuizTabContent;
