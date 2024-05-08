import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const { year, lessonNumber } = req.body;

    if (!year || !lessonNumber) {
      return res
        .status(400)
        .json({ message: "Year and lesson number are required" });
    }

    const lessonRef = doc(db, "years", year, "lessons", lessonNumber);

    try {
      await deleteDoc(lessonRef);
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Error deleting document", error });
    }
  } else {
    res.setHeader("Allow", "DELETE");
    res.status(405).end(`Method ${req.method} Not allowed`);
  }
}
