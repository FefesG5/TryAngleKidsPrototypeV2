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
  const isItemTab = tabId.startsWith("question-");
  const itemId = isItemTab
    ? parseInt(tabId.replace("question-", ""), 10)
    : null;

  return (
    <div className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}>
      <button
        type="button"
        className={styles.tabButton}
        onClick={() => onTabChange(tabId)}
      >
        {label}
      </button>
      {isItemTab && itemId !== null && removeQuestion && (
        <button
          type="button"
          className={styles.removeQuestionBtn}
          onClick={(e) => {
            e.stopPropagation();
            removeQuestion(itemId);
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
