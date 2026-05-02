import { useState } from 'react';
import SubmitButton from '../components/form/submitButton';
import styles from '../components/projects/projectForm.module.css';

function Service() {
  const [serviceName, setServiceName] = useState('');
  const [serviceCost, setServiceCost] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(e.target.value);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceCost(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceDescription(e.target.value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      name: serviceName,
      cost: serviceCost,
      description: serviceDescription,
    };
    console.log('Enviado:', serviceData);
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <label>Nome do Serviço</label>
      <input
        type="text"
        name="serviceName"
        placeholder="Insira o nome do serviço"
        value={serviceName}
        onChange={handleNameChange}
        required
      />

      <label>Custo do Serviço</label>
      <input
        type="number"
        name="serviceCost"
        placeholder="Insira o valor total"
        value={serviceCost}
        onChange={handleCostChange}
        required
      />

      <label>Descrição do Serviço</label>
      <input
        type="text"
        name="serviceDescription"
        placeholder="Insira a descrição do serviço"
        value={serviceDescription}
        onChange={handleDescriptionChange}
        required
      />

      <SubmitButton text="Adicionar Serviço" />
    </form>
  );
}

export default Service;
