import { useState } from "react";


interface FormLoginProps {
  setemail: (email: string) => void;
  setPassword: (password: string) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({setemail, setPassword}) =>{
 const[emailValid, setEmailValid] = useState<boolean | null>(null);
 const[passwordValid, setPasswordValid] = useState<boolean | null>(null);
}