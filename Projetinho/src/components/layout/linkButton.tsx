import { Link } from 'react-router-dom'
import styles from './layout/LinkButton.module.css'

const LinkButton = (to, text) => {
  return (
   <Link  className='' {to = {to}}>
    {text}
   </Link>

  )
}

export default LinkButton
