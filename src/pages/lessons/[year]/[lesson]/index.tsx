import { useRouter } from "next/router";
import React from "react";

const LessonDetails = () => {
  const router = useRouter();
  const { year, lesson } = router.query;

  return (
    <div>
      <h1>Lesson {lesson}</h1>
      <p>
        Details for lesson {lesson} in the year {year}.
      </p>
      {/* More detailed content here */}
    </div>
  );
};

export default LessonDetails;
