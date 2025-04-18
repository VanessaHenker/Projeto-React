import React from "react";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import styles from './actionButton.module.css';
import { Link } from "react-router-dom";

interface ActionButtonProps {
  type: "edit" | "delete";
  label: string;
  iconClass: string;
  onClick?: () => void;
  to?: string; 
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  label,
  iconClass,
  onClick,
  to,
}) => {
  return (
    <div>
      {type === "edit" && to ? (
        <Link to={to} className={`${styles.editButton} ${styles.button} ${styles.link}`}>
          {label} <BsPencil className={iconClass} />
        </Link>
      ) : type === "delete" && onClick ? (
        <span className={`${styles.deleteButton} ${styles.button}`} onClick={onClick}>
          {label} <BsFillTrashFill className={iconClass} />
        </span>
      ) : null}
    </div>
  );
};

export default ActionButton;
