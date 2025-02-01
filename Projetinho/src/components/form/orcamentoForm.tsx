import {useState, useEffect} from 'react';
import Select from "./select"

import Input from '../form/input';
import Select from '../form/select';


function OrcamentoForm() {

  const [categories, setCategories] = useState <{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState ({
    name: '',
    budget: '',

  });

  useEffect(() =>
    fetch ("http://localhost:5000/categories", {
      mathod: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp) => resp.json
    .then((data) => {
      setCategories(data);
    })
    .catch(err => console.log(err));
  ), [];
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
  };
  
  return (
    <div>
      <Select
        type="select"
        text="Orçamento do projeto:"
        name="budget"
        handleOnChange={handleInputChange}
        value={formData.budget}
        options={[
          { value: '', label: 'Selecione o orçamento:' },
          { value: '1000', label: 'R$ 1.000' },
          { value: '5000', label: 'R$ 5.000' },
          { value: '10000', label: 'R$ 10.000' },
        ]}

      />


    </div>
  )
}

export default OrcamentoForm
