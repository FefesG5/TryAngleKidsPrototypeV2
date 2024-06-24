import React from "react";
import styles from "./SampleDataModal.module.css";

interface SampleDataModalProps {
  show: boolean;
  onClose: () => void;
}

const sampleData = `{
  "year": "2024",
  "lessonNumber": "2",
  "videoId": "zF_dBk8EPDk",
  "videoSrc": "https://www.youtube.com/watch?v=zF_dBk8EPDk",
  "category": "Data Analysis",
  "questions": [
    {
      "id": 1,
      "question": "What can numbers and data help us understand?",
      "timestamp": 70,
      "answered": false,
      "choices": [
        "Only mathematical problems",
        "Nothing much, really",
        "Facts about something, like bugs",
        "Only scientific experiments"
      ],
      "correctAnswer": "Facts about something, like bugs",
      "feedback": {
        "correct": "Exactly right! Numbers and data can help us understand facts about various topics, including fun ones like bugs.",
        "incorrect": "Not quite. Numbers and data are powerful tools that help us understand facts about a wide range of topics."
      }
    },
    {
      "id": 2,
      "question": "What is a way to count using special lines mentioned in the video?",
      "timestamp": 203,
      "answered": false,
      "choices": ["Number lines", "Tally marks", "Drawing circles", "Alphabets"],
      "correctAnswer": "Tally marks",
      "feedback": {
        "correct": "Absolutely correct! Tally marks are a simple yet effective way to count and keep track of numbers.",
        "incorrect": "Not quite correct. The video introduces tally marks as a way to count using special lines."
      }
    },
    {
      "id": 3,
      "question": "Which bug did most of the speaker's brothers and sisters like the best?",
      "timestamp": 341,
      "answered": false,
      "choices": ["Spider", "Ladybug", "Butterfly", "They didn't like bugs"],
      "correctAnswer": "Butterfly",
      "feedback": {
        "correct": "That's right, the butterfly was the most popular bug among the speaker's brothers and sisters!",
        "incorrect": "Actually, the butterfly was the most popular bug choice among the speaker's brothers and sisters."
      }
    },
    {
      "id": 4,
      "question": "What is a pictograph?",
      "timestamp": 549,
      "answered": false,
      "choices": [
        "A way to write pictures with words",
        "A chart that uses pictures to represent data",
        "A graph that shows pictures of insects",
        "An ancient form of writing"
      ],
      "correctAnswer": "A chart that uses pictures to represent data",
      "feedback": {
        "correct": "Correct! A pictograph uses pictures to represent and show data in an easy-to-understand way.",
        "incorrect": "Not quite. A pictograph is specifically a chart that uses pictures to represent data."
      }
    }
  ]
}`;

const SampleDataModal: React.FC<SampleDataModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Sample Data Template</h2>
        <textarea
          readOnly
          value={sampleData}
          className={styles.sampleTextarea}
        ></textarea>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SampleDataModal;
