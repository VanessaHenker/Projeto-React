import { useState } from 'react'; // Importa o hook useState
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-regular-svg-icons'; 

function FormName() {
  const [name, setName] = useState(''); // Define o estado para armazenar o nome

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); 
  };

  return (
    <label className="label-input">
      <FontAwesomeIcon icon={faUser} className="far fa-user icon-modify" /> 
      <input 
        id="name" 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={handleInputChange} 
      />
    </label>
  );
}

export default FormName;
