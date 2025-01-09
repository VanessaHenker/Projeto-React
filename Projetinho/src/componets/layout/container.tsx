import styles from './containerModules.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default Container;
