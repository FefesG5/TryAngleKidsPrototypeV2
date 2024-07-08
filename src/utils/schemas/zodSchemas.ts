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
  lessonNumber: z.number(),
  videoSrc: z.string(),
  category: z.string(),
  questions: z.array(questionSchema),
});

const deleteSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/)
    .refine((val) => Number(val) >= 2024, {
      message: "Year must be greater than 2024",
    }),
  lessonNumber: z.string().regex(/^\d+$/, {
    message: "Lesson number must be a string representing a number",
  }),
});

export { feedbackSchema, questionSchema, videoSchema, deleteSchema };
