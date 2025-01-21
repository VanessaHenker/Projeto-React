import Input from '../form/input';
import styles from './projectForm.module.css';

function ProjectForm() {
  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
      />

      <Input
        type="number"
        text="Orçamento Total"
        name="budget"
        placeholder="Insira o orçamento total"
      />

      <div className={styles.formControl}>
        <label htmlFor="category">Categoria:</label>
        <select name="category" id="category" defaultValue="">
          <option value="" disabled>
            Selecione a categoria
          </option>
          <option value="design">Design</option>
          <option value="development">Desenvolvimento</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div className={styles.formControl}>
        <button type="submit" className={styles.btn}>
          Criar Projeto
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
