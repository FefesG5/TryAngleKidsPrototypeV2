import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Video } from "@/types/quizTypes";

export default async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PATCH") {
    const videoData: Video = req.body;

    if (!videoData.year || !videoData.lessonNumber) {
      return res
        .status(400)
        .json({ message: "Year and lesson number must be provided" });
    }

    const lessonRef = doc(
      db,
      "extra",
      videoData.year,
      "lessons",
      videoData.lessonNumber,
    );

    try {
      await updateDoc(lessonRef, {
        ...videoData,
      });
      res.status(200).json({ message: "Video quiz successfully updated" });
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Error updating document" });
    }
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
