import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-regular-svg-icons'; 

interface FormNameProps {
  setName: (name: string) => void;
}

const FormName: React.FC<FormNameProps> = ({ setName }) => {
  return (
    <label className="label-input">
      <FontAwesomeIcon icon={faUser} className="far fa-user icon-modify" /> 
      <input 
        id="name" 
        type="text" 
        placeholder="Name" 
        onChange={(e) => setName(e.target.value)} 
      />
    </label>
  );
};

export default FormName;
