// Arquivo: Evento.tsx
import Button from "./button";

function Evento({ numero }: { numero: number }) {
  function meuEvento(_e: React.MouseEvent<HTMLButtonElement>) {
    alert(`Opa, fui ativado! Número recebido: ${numero}`);
  }

  return (
    <div className="teste">
      <p>Clique para disparar um evento</p>
      <Button evento={meuEvento} text="Primeiro evento" />
    </div>
  );
}

export default Evento;
