import Input from '../form/input';
import styles from './projectForm.module.css'

function ProjectForm() {
  return (
    <form className= {styles.form}>
      <Input type = "text" text='Nome do projeto' name='name' placeholder='Insira o nome do proejto' />

      <div>
        <label htmlFor="budget">Orçamento Total:</label>
        <input type="number" id="budget" placeholder="Insira o orçamento total" />
      </div>

      <div>
        <label htmlFor="category">Categoria:</label>
        <select name="category" id="category" defaultValue="">
          <option disabled selected >Selecione a categoria</option>
          
        </select>
      </div>

      <div>
       
      </div>
    </form>
  );
}

export default ProjectForm;
