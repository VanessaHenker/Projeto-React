import styles from './actionbutton.module.css'

import React from "react";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";


interface ActionButtonProps {
  type: "edit" | "delete"; 
  label: string;
  iconClass: string;
  onClick?: () => void; 
  to?: string; 
  id?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  label,
  iconClass,
  onClick,
  to,
  id,
}) => {
  return (
    <p className={`${styles.icons} ${styles.editDeleteButton}`}>
      {type === "edit" ? (
        <Link to={to!} className={styles.link}>
          {label} <BsPencil className={iconClass} />
        </Link>
      ) : (
        <span className={styles.deleteButton} onClick={onClick}>
          {label} <BsFillTrashFill className={iconClass} />
        </span>
      )}
    </p>
  );
};

export default ActionButton;
