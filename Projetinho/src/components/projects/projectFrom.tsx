
function ProjectFrom() {
  return (
    <form action="">
      <input type="text" placeholder="Insira o nome do projeto" />
      <input type="number"  placeholder="Insira o orçamento total"/>
      <select name="category">
        <option disabled>Selecione a categoria</option>
      </select>
    </form>
  )
}

export default ProjectFrom
