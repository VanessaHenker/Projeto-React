
function ProjectFrom() {
  return (
    <form action="">
      <div>
        <input type="text" placeholder="Insira o nome do projeto" />
      </div>

      <div>
        <input type="number" placeholder="Insira o orçamento total" />
      </div>

      <div>
        <select name="category">
          <option disabled>Selecione a categoria</option>
        </select>
      </div>

      <div>
        <input type = "submit" value={"Criar projeto"} />
      </div>
    </form>
  )
}

export default ProjectFrom
