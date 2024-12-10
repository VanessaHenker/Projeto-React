// Tipagem para as props
interface SeuNomeProps {
  setNome: React.Dispatch<React.SetStateAction<string>>;
}

function SeuNome({ setNome }: SeuNomeProps) {
  return (
    <div>
      <p>Digite seu nome:</p>
      <input
        type="text"
        placeholder="Qual é o seu nome?"
        onChange={(e) => setNome(e.target.value)}
      />
    </div>
  );
}

export default SeuNome;
