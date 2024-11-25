import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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

  const renderValidationIcon = (isValid: boolean | null) => {
    if (isValid === null) return null; // Não mostrar ícone inicialmente
    return isValid ? (
      <FontAwesomeIcon icon={faCheck} className="icon-valid" />
    ) : (
      <FontAwesomeIcon icon={faTimes} className="icon-invalid" />
    );
  };

  return (
    <>
      <label className="label-input">
        <FontAwesomeIcon icon={faEnvelope} className="icon-modify" />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
        />
        {renderValidationIcon(emailValid)}
      </label>

      <label className="label-input">
        <FontAwesomeIcon icon={faLock} className="icon-modify" />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
        />
        {renderValidationIcon(passwordValid)}
      </label>
    </>
  );
};

export default FormLogin;
