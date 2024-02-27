import React from "react";
import { useRouter } from "next/router";

const LessonDetails = () => {
  const router = useRouter();
  const { year, lesson } = router.query;



  return (
    <div>
      <h1>Lesson {lesson}</h1>
      <p>
        Details for lesson {lesson} in the year {year}.
      </p>
  
    </div>
  );
};

export default LessonDetails;
