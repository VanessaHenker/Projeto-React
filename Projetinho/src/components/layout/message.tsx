import styles from './message.module.css';

interface MessageProps {
  type: string;
  msg: string;
}

function Message({ type, msg }: MessageProps) {
  return (
    <div className={`${styles.msg} ${styles[type] || ''}`}>
      <p>{msg}</p>
    </div>
  );
}

export default Message;
