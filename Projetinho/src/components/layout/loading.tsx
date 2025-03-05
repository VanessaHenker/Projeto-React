import loading from '../../img/loading.svg'

import styles from './loading.module.css'

function Loading() {
  return (
    <div className= {styles.loaderContainer}>
      <img className= {styles.loader} src= {loading} alt="Loading" />
    </div>
  )
}

export default Loading
