import React, { useState } from "react";
import { useRouter } from "next/router";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer"; // Adjust the path as necessary
import { videoLessonData } from "@/data/videoLessonData"; // Adjust the path as necessary
import Quiz from "@/components/Quiz/Quiz";

const LessonDetails = () => {
  const router = useRouter();
  const { year, lesson } = router.query;

  const [currentVideoTime, setCurrentVideoTime] = useState(0); // State to track video time

  const showVideoPlayer =
    year === videoLessonData.year && lesson === videoLessonData.lessonNumber;

  const handleVideoTimeUpdate = (time: number) => {
    setCurrentVideoTime(time);
  };

  return (
    <div>
      <h1>Lesson {lesson}</h1>
      <p>
        Details for lesson {lesson} in the year {year}.
      </p>
      {showVideoPlayer && (
        <>
          <VideoPlayer
            videoSrc={videoLessonData.videoSrc}
            onTimeUpdate={handleVideoTimeUpdate} // Pass the callback function
          />
          <Quiz
            currentTime={currentVideoTime} // Pass the current time to the quiz
            questions={videoLessonData.questions}
          />
        </>
      )}
    </div>
  );
};

export default LessonDetails;
