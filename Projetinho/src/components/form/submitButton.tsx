

interface SubmitButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function SubmitButton({ text, type = 'button', disabled = false }: SubmitButtonProps) {
  return (
    <button type={type} disabled={disabled}>
      {text}
    </button>
  );
}

export default SubmitButton;
