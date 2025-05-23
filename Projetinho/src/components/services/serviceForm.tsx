import { useState, FormEvent, ChangeEvent } from "react";
import Input from "../form/input";
import SubmitButton from "../form/submitButton";
import styles from "../services/serviceForm.module.css";


interface Service {
  id: string;
  name: string;
  cost: string;
  description: string;
  category: string; 
}


interface ServiceFormProps {
  handleSubmit: (service: Service) => void | Promise<void>;
  btnText: string;
  service: Service; 
}

function ServiceForm({ handleSubmit, btnText, service }: ServiceFormProps) {
  const [serviceData, setServiceData] = useState<Service>({
    id: service.id || crypto.randomUUID(), 
    name: service.name,
    cost: service.cost,
    description: service.description,
    category: service.category,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setServiceData((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    
    if (Number(serviceData.cost) <= 0) {
      alert('O custo do serviço deve ser um valor positivo');
      return;
    }
    
    await handleSubmit(serviceData);

    setServiceData({
      id: crypto.randomUUID(),
      name: "",
      cost: "",
      description: "",
      category: ""
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
        value={serviceData.name}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor do serviço"
        handleOnChange={handleChange}
        value={serviceData.cost}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
        value={serviceData.description}
      />
     
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
