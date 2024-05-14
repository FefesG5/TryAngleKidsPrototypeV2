import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteSchema } from "@/utils/schemas/zodSchemas";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    res.status(405).end(`Method ${req.method} Not allowed`);
    return;
  }

  try {
    // Validate the incoming request body against the deleteSchema
    const { year, lessonNumber } = deleteSchema.parse(req.body);

    const lessonRef = doc(db, "years", year, "lessons", lessonNumber);

    // Delete the document
    await deleteDoc(lessonRef);
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    } else {
      // Handle other types of errors
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Error deleting document", error });
    }
  }
}
