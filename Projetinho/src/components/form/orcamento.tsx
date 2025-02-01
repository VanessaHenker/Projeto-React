import styles from './select.module.css';


interface Option{
  value: string;
  label: string;
}


interface OrcamentoProps{
  type: string;
  text: string;
  name: string;
  placeholder: string;
  handleOnChange: (e: ReactChangeEvent <HTML.SelectElement>)
}


function Orcamento() {
  return (
    <div>
      
    </div>
  )
}

export default Orcamento
