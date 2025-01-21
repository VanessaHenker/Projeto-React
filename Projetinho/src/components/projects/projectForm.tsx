function ProjectForm() {
  return (
    <form>
      <div>
        <label htmlFor="projectName">Nome do Projeto:</label>
        <input type="text" id="projectName" placeholder="Insira o nome do projeto" />
      </div>

      <div>
        <label htmlFor="budget">Orçamento Total:</label>
        <input type="number" id="budget" placeholder="Insira o orçamento total" />
      </div>

      <div>
        <label htmlFor="category">Categoria:</label>
        <select name="category" id="category" defaultValue="">
          <option value="" disabled>Selecione a categoria</option>
          <option value="design">Design</option>
          <option value="development">Desenvolvimento</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div>
        <input 
          type="submit" 
          value="Criar projeto" 
        />
      </div>
    </form>
  );
}

export default ProjectForm;
