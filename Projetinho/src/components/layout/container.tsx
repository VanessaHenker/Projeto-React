import styles from './containerModules.module.css'
import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>
}

export default Container
