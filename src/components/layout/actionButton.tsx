import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./actionButton.module.css";

interface ActionButtonProps {
  type: "edit" | "delete";
  label: string;
  iconClass: string;
  onClick?: () => void;
  to?: string;
}

function ActionButton({
  type,
  label,
  iconClass,
  onClick,
  to,
}: ActionButtonProps) {
  if (type === "edit" && to) {
    return (
      <Link to={to} className={`${styles.button} ${styles.editButton} ${styles.link}`}>
        {label} <BsPencil className={iconClass} />
      </Link>
    );
  }

  if (type === "delete" && onClick) {
    return (
      <button
        type="button"
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={onClick}
      >
        {label} <BsFillTrashFill className={iconClass} />
      </button>
    );
  }

  return null;
}

export default ActionButton;