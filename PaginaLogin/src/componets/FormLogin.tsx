import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface FormLoginProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ setEmail, setPassword }) => {
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
    return emailRegex.test(email);
  };

  const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (email.trim() === "") {
      setEmailValid(null); // Não exibe ícone se estiver vazio
    } else {
      setEmailValid(validateEmail(email));
    }
  };

  const handlePasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    if (password.trim() === "") {
      setPasswordValid(null); // Não exibe ícone se estiver vazio
    } else {
      setPasswordValid(password.length >= 6);
    }
  };

  const renderValidationIcon = (isValid: boolean | null) => {
    if (isValid === null) return null; // Não mostrar ícone se não validado ou vazio
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
