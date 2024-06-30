import { useState } from "react";
import { exampleQuizInfos } from "@/data/exampleQuizInfo";
import styles from "./SampleDataModal.module.css";

interface SampleDataModalProps {
  show: boolean;
  onClose: () => void;
}

const SampleDataModal: React.FC<SampleDataModalProps> = ({ show, onClose }) => {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      JSON.stringify(exampleQuizInfos[activeQuizIndex], null, 2),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied status after 2 seconds
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>Sample Data Template</h2>
        <div className={styles.selector}>
          {exampleQuizInfos.map((_, index) => (
            <button
              key={index}
              className={`${styles.selectorButton} ${index === activeQuizIndex ? styles.activeButton : ""}`}
              onClick={() => setActiveQuizIndex(index)}
            >
              Quiz {index + 1}
            </button>
          ))}
        </div>
        <textarea
          readOnly
          value={JSON.stringify(exampleQuizInfos[activeQuizIndex], null, 2)}
          className={styles.sampleTextarea}
        ></textarea>
        <div className={styles.buttonContainer}>
          <button onClick={copyToClipboard} className={styles.copyButton}>
            {copied ? "Copied" : "Copy to Clipboard"}
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleDataModal;
