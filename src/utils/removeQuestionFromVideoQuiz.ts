import { Video } from "@/types/quizTypes";

export const removeQuestionFromVideoQuiz = (
  videoQuiz: Video,
  questionId: number,
): Video => {
  const updatedQuestions = videoQuiz.questions
    .filter((question) => question.id !== questionId)
    .map((question, index) => ({ ...question, id: index + 1 }));

  return {
    ...videoQuiz,
    questions: updatedQuestions,
  };
};
