import styles from "./QuizTabButton.module.css";

interface QuizTabButtonProps {
  label: string;
  tabId: string;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  removeQuestion?: (id: number) => void;
}

const QuizTabButton: React.FC<QuizTabButtonProps> = ({
  label,
  tabId,
  activeTab,
  onTabChange,
  removeQuestion,
}) => {
  const isActive = activeTab === tabId;
  const isQuestionTab = tabId.startsWith("questions");
  const questionId = isQuestionTab
    ? parseInt(tabId.replace("questions", ""), 10)
    : null;

  return (
    <div
      key={tabId}
      className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
    >
      <button
        type="button"
        className={styles.tabButton}
        onClick={() => onTabChange(tabId)}
      >
        {label}
      </button>
      {isQuestionTab && questionId !== null && removeQuestion && (
        <button
          type="button"
          className={styles.removeQuestionBtn}
          onClick={(e) => {
            e.stopPropagation();
            removeQuestion(questionId);
          }}
          aria-label={`Remove ${label}`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default QuizTabButton;
