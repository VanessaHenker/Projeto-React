import React from 'react';

interface FormLoginProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  emailValid: boolean;
  passwordValid: boolean;
}

const FormLogin: React.FC<FormLoginProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  emailValid,
  passwordValid,
}) => {
  return (
    <>
      <label className={`label-input ${emailValid ? 'input-valid' : 'input-invalid'}`}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={`label-input ${passwordValid ? 'input-valid' : 'input-invalid'}`}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </>
  );
};

export default FormLogin;
