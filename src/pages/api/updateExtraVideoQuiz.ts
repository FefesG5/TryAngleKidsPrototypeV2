import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Video } from "@/types/quizTypes";
import { z } from "zod";
import { videoSchema } from "@/utils/schemas/zodSchemas";

export default async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    // Validate the incoming request body against the videoSchema
    const parsedData: Video = videoSchema.parse(req.body);
    const { year, lessonNumber } = parsedData;

    const lessonRef = doc(db, "extra", year, "lessons", lessonNumber);

    // Update the database entry
    await updateDoc(lessonRef, {
      ...parsedData,
    });

    res.status(200).json({ message: "Video quiz successfully updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod errors specifically
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    } else {
      // Handle other types of errors
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Error updating document" });
    }
  }
}
