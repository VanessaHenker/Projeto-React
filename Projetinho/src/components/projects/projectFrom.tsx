
function ProjectFrom() {
  return (
    <form action="">
      <div>
        <input type="text" placeholder="Insira o nome do projeto" />
      </div>

      <div>
        <input type="number" placeholder="Insira o orçamento total" />
      </div>

      <select name="category">
        <option disabled>Selecione a categoria</option>
      </select>
    </form>
  )
}

export default ProjectFrom
