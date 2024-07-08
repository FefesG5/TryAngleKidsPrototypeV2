import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { checkDocumentExists } from "@/utils/firebase/checkDocumentExists";
import { Video, Question } from "@/types/quizTypes";
import { z } from "zod";
import { videoSchema } from "@/utils/schemas/zodSchemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  try {
    // Validate the incoming request body against the videoSchema
    const parsedData: Video = videoSchema.parse(req.body);

    const { year, lessonNumber } = parsedData;

    const yearStr = year.toString();
    const lessonNumberStr = lessonNumber.toString();

    const lessonRef = doc(
      collection(db, "extra", yearStr, "lessons"),
      lessonNumberStr,
    );

    const documentExists = await checkDocumentExists(
      ["extra", yearStr, "lessons"],
      lessonNumberStr,
    );

    if (documentExists) {
      res.status(400).json({
        message:
          "Lesson number already exists. Please choose a different number.",
      });
      return;
    }

    await setDoc(lessonRef, {
      ...parsedData,
      questions: parsedData.questions.map((q: Question, index: number) => ({
        ...q,
        id: index + 1, // Ensure IDs are correctly assigned
      })),
    });

    res
      .status(200)
      .json({ message: "Extra Video Quiz successfully submitted!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    } else {
      console.error("Error writing document: ", error);
      res.status(500).json({ message: "Error writing document", error });
    }
  }
}
