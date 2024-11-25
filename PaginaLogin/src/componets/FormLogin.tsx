import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

interface FormLoginProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ setEmail, setPassword }) => {
  const [emailValid, setEmailValid] = useState<boolean | null>(null); // null = neutro, true = válido, false = inválido
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
    return emailRegex.test(email);
  };

  const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setEmailValid(validateEmail(email));
  };

  const handlePasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordValid(password.length >= 6); // Senha válida com 6+ caracteres
  };

  const getBorderColor = (isValid: boolean | null) => {
    if (isValid === null) return ''; // Sem cor inicial
    return isValid ? 'green' : 'red'; // Verde para válido, vermelho para inválido
  };

  return (
    <>
      <label className="label-input">
        <FontAwesomeIcon icon={faEnvelope} className="icon-modify" />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur} // Valida ao perder o foco
          style={{ borderColor: getBorderColor(emailValid) }}
        />
      </label>

      <label className="label-input">
        <FontAwesomeIcon icon={faLock} className="icon-modify" />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur} // Valida ao perder o foco
          style={{ borderColor: getBorderColor(passwordValid) }}
        />
      </label>
    </>
  );
};

export default FormLogin;
