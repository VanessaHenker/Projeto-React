import Input from "../form/input"
import SubmitButton from "../form/submitButton"

function ServiceForm({handleSubmit, btnText, projectData}) {

  function submit() {

  }


  function hendleChange(e) {

  }

  return (
    <form anSubmit {submit} className={styles.from}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />

      <Input
        type="number"
        text="Custo de serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />

      <Input
        type="number"
        text="Descrição do serviço"
        name= "name"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text = {texBton}/>
    </form>
  )
}

export default ServiceForm
