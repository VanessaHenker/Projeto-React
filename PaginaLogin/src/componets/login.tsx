import React, {useState} from 'react';

interface LoginProps{
  onButtonClick: () => void;
  onLogin: (email: string, password: string) => boolean
}

const Login: React.FC<LoginProps> = ({onButtonClick, onLogin}) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };
}


export default Login
