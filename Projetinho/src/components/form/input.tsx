import styles from './input.module.css'

function Input({type, text, name, placeholder, handleOnChange, value}) {
  return (
    <div className= {styles.formControl}>
      <label htmlFor=""></label>
      <input type="text" name="" id="" />
    </div>
  )
}

export default Input
