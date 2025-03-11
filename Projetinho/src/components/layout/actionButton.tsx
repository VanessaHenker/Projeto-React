import React from "react";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import styles from './actionButton.module.css';  // Importando o CSS module corretamente
import { Link } from "react-router-dom";

interface ActionButtonProps {
  type: "edit" | "delete";
  label: string;
  iconClass: string;
  onClick?: () => void;
  to?: string; // 'to' agora é opcional
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  label,
  iconClass,
  onClick,
  to,
}) => {
  return (
    <div className={styles.actionButtonContainer}> {/* Usando a classe da maneira certa */}
      {type === "edit" && to ? (
        <Link to={to} className={`${styles.editButton} ${styles.button}`}>
          {label} <BsPencil className={iconClass} />
        </Link>
      ) : (
        <span className={`${styles.deleteButton} ${styles.button}`} onClick={onClick}>
          {label} <BsFillTrashFill className={iconClass} />
        </span>
      )}
    </div>
  );
};

export default ActionButton;
