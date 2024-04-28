import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { Video, Question } from "@/types/quizTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const videoData: Video = req.body;

    if (!videoData.year || !videoData.lessonNumber) {
      return res
        .status(400)
        .json({ message: "Year and lesson number must be set" });
    }

    const lessonRef = doc(
      collection(db, "extra", videoData.year, "lessons"),
      videoData.lessonNumber,
    );

    try {
      await setDoc(lessonRef, {
        ...videoData,
        questions: videoData.questions.map((q: Question, index: number) => ({
          ...q,
          id: index + 1,
        })),
      });

      res
        .status(200)
        .json({ message: "Extra Video Quiz successfully submitted!" });
    } catch (error) {
      console.error("Error writing document: ", error);
      res.status(500).json({ message: "Error writing document", error });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
