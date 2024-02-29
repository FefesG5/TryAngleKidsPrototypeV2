export interface Question {
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
}

export interface Video {
  year: string;
  lessonNumber: string;
  videoId: string;
  videoSrc: string;
  category: string;
  questions: Question[];
}
