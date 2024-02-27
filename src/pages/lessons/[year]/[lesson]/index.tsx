import React from "react";
import { useRouter } from "next/router";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer"; // Adjust the path as necessary
import { videoLessonData } from "@/data/videoLessonData"; // Adjust the path as necessary

const LessonDetails = () => {
  const router = useRouter();
  const { year, lesson } = router.query;

  const showVideoPlayer =
    year === videoLessonData.year && lesson === videoLessonData.lessonNumber;

  return (
    <div>
      <h1>Lesson {lesson}</h1>
      <p>
        Details for lesson {lesson} in the year {year}.
      </p>
      {showVideoPlayer && (
        <VideoPlayer
          videoSrc={videoLessonData.videoSrc}
          questions={videoLessonData.questions}
        />
      )}
    </div>
  );
};

export default LessonDetails;
