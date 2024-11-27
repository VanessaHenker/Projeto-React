import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface FormLoginProps {
  setemail: (email: string) => void;
  setPassword: (password: string) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ setemail, setPassword }) => {
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
    return emailRegex.test(email)
  };

  const handlePasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setemail(email);
    if(email.trim() === ""){
      setEmailValid(null);
    }
    else{
      setEmailValid(validadedateEmail(email));
    }
  };

  const renderValidationIcon = (isValid: boolean | null) => {
    if(isValid === null) return null;
    return isValid ? (
      <FontAwesomeIcon icon={faCheck} className="icon-valid" />
    ) : (
      <FontAwesomeIcon icon={faTimes} className="icon-invalid" />
    );
  }


}