import Input from "../form/input"
import SubmitButton from "../form/submitButton"
import styles from "../form/ServiceForm.module.css" 

function ServiceForm({ handleSubmit, btnText, projectData }) {

  function submit(e) {
    e.preventDefault()
    handleSubmit(projectData)
  }

  function handleChange(e) {
    projectData[e.target.name] = e.target.value
  }

  return (
    <form onSubmit={submit} className={styles.form}>
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
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />

      <SubmitButton text={btnText} />
    </form>
  )
}

export default ServiceForm
