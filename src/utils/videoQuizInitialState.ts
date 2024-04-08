import { Video, Question } from "@/types/quizTypes";

export const defaultQuizQuestion = (): Question => ({
  id: 0,
  question: "",
  timestamp: 0,
  answered: false,
  choices: ["", "", "", ""],
  correctAnswer: "",
  feedback: {
    correct: "",
    incorrect: "",
  },
});

export const defaultVideoData = (): Video => ({
  year: "",
  lessonNumber: "",
  videoSrc: "",
  category: "",
  questions: [],
});
