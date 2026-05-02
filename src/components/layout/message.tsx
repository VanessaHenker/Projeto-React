import styles from './message.module.css';
import { useState, useEffect } from 'react';

interface MessageProps {
  type: string;
  msg: string;
}

function Message({ type, msg }: MessageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000); 
      return () => clearTimeout(timer); 
    }
  }, [msg]);

  if (!visible) return null; 

  return (
    <div className={`${styles.message} ${styles[type] || ''}`}>
      <p>{msg}</p>
    </div>
  );
}

export default Message;
