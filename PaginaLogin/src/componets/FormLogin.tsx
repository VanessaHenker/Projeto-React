import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

interface FormLoginProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ setEmail, setPassword }) => {
  return (
    <>
      <label className="label-input">
        <FontAwesomeIcon icon={faEnvelope} className="icon-modify" />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label className="label-input">
        <FontAwesomeIcon icon={faLock} className="icon-modify" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </label>
    </>
  );
};

export default FormLogin;
