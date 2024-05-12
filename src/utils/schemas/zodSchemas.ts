import { z } from "zod";

const feedbackSchema = z.object({
  correct: z.string(),
  incorrect: z.string(),
});

const questionSchema = z.object({
  id: z.number(),
  question: z.string(),
  timestamp: z.number(),
  answered: z.boolean(),
  choices: z.array(z.string()),
  correctAnswer: z.string(),
  feedback: feedbackSchema,
});

const videoSchema = z.object({
  year: z.string(),
  lessonNumber: z.string(),
  videoSrc: z.string(),
  category: z.string(),
  questions: z.array(questionSchema),
});

export { feedbackSchema, questionSchema, videoSchema };
