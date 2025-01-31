import {useState, useEffect} from 'react';
import Select from "./select"

import Input from '../form/input';
import Select from '../form/select';


function OrcamentoForm() {

  const [categories, setCategories] = useState <id: string; name: string>

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
