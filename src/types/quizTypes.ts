export interface Feedback {
  correct: string;
  incorrect: string;
}

export interface Question {
  id: number;
  question: string;
  timestamp: number;
  answered: boolean;
  choices: string[];
  correctAnswer: string;
  feedback: Feedback;
}

export interface Video {
  year: string;
  lessonNumber: string;
  videoSrc: string;
  category: string;
  questions: Question[];
}
