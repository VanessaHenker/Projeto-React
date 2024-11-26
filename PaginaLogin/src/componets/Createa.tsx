import React from "react";


interface CreateProps{
  onButtonClick: () => void;
  onCreateAccount: (email : string, password: string) => boolean;
}

const Createa: React.FC<CreateProps> = ({ onButtonClick,onCreateAccount}) => {
  
}