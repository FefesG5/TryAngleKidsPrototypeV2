import styles from "./Lesson.module.css";

interface LessonProperties {
  id: string;
}

const Lesson: React.FC<LessonProperties> = ({ id }) => {
  return <>Lesson Component</>;
};

export default Lesson;
