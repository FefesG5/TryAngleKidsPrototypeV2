// pages/lessons/index.tsx
import React from "react";
import LessonList from "@/components/LessonList/LessonList"; // Adjust the import path as needed

const LessonsIndexPage: React.FC = () => {
  return (
    <div>
      {/* This will render the list of lessons */}
      <LessonList />
    </div>
  );
};

export default LessonsIndexPage;
