import { useState, FormEvent, ChangeEvent } from "react";
import Input from "../form/input";
import SubmitButton from "../form/submitButton";
import styles from "../form/ServiceForm.module.css";


interface Service {
  name: string;
  cost: string;
  description: string;
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
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    handleSubmit(service);
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
        text="Custo de serviço"
        name="cost"
        placeholder="Insira o valor total"
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
