import { Video, Question } from "@/types/quizTypes";
import { defaultQuizQuestion } from "./videoQuizInitialState";

export const addQuestionToVideoQuiz = (videoQuiz: Video) => {
  const newId = videoQuiz.questions.length + 1;
  const newQuestion: Question = {
    ...defaultQuizQuestion(),
    id: newId,
  };

  return {
    ...videoQuiz,
    questions: [...videoQuiz.questions, newQuestion],
  };
};
