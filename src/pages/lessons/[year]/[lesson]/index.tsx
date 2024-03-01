import { useRouter } from "next/router";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { videoLessonData } from "@/data/videoLessonData";

const LessonDetails = () => {
  const router = useRouter();
  const { year, lesson } = router.query;

  // Directly check if the current page matches the intended lesson's data
  if (
    videoLessonData.year !== year ||
    videoLessonData.lessonNumber !== lesson
  ) {
    // Optionally, you could render a message indicating the lesson doesn't exist or redirect.
    return (
      <div>Lesson not found or does not match the specified parameters.</div>
    );
  }

  return (
    <div>
      <h1>Lesson {lesson}</h1>
      <p>
        Details for lesson {lesson} in the year {year}.
      </p>
      <VideoPlayer
        video={videoLessonData}
        onQuestionAnswered={(questionId, isCorrect) => {
          // Placeholder function, replace with actual logic for handling answers
          console.log(`Question ${questionId} answered. Correct: ${isCorrect}`);
        }}
      />
    </div>
  );
};

export default LessonDetails;
