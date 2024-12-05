// Arquivo: Button.tsx
interface ButtonProps {
  text: string;
  evento: (e: React.MouseEvent<HTMLButtonElement>) => void; // Adicionei o evento
}

function Button({ text, evento }: ButtonProps) {
  return (
    <button onClick={evento}>
      {text}
    </button>
  );
}

export default Button;
