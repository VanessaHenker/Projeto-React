import { useState, FormEvent, ChangeEvent } from "react";
import Input from "../form/input";
import SubmitButton from "../form/submitButton";
import styles from "../services/serviceForm.module.css";

interface Service {
  id?: string;
  name: string;
  cost: string;
  description: string;
  category: string;
}

interface ServiceFormProps {
  handleSubmit: (service: Service) => void;
  btnText: string;
}

function ServiceForm({ handleSubmit, btnText }: ServiceFormProps) {
  const [service, setService] = useState<Service>({
    name: "",
    cost: "",
    description: "",
    category: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    handleSubmit(service);

    // Limpar formulário depois de enviar
    setService({
      name: "",
      cost: "",
      description: "",
      category: "",
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
        value={service.name}
      />

      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor do serviço"
        handleOnChange={handleChange}
        value={service.cost}
      />

      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
        value={service.description}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
