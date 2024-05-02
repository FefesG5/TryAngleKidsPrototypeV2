import { useState } from "react";
import styles from "./DeleteConfirmationDialog.module.css";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleDelete = () => {
    if (inputValue.toUpperCase() === "DELETE") {
      onDelete();
    } else {
      setError('You must type "DELETE" to confirm.');
    }
  };

  if (!open) return null;

  return (
    <div className={styles.dialog}>
      <h4>Confirm Deletion</h4>
      <p>
        Are you sure you want to delete this item? Type &quot;DELETE&quot; in
        the box below to confirm.
      </p>
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (error) setError("");
        }}
      />
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.buttons}>
        <button onClick={handleDelete} className={styles.confirmButton}>
          Confirm
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
