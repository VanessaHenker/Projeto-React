function Evento({ numero }: { numero: number }) {

  function meuEvento(_e: React.MouseEvent<HTMLButtonElement>) {
    alert(`Opa, fui ativado! Número recebido: ${numero}`);
  }

  return (
    <div className='teste'>
      <p>Clique para disparar um evento</p>
      <button onClick={meuEvento}>Clique aqui</button>
    </div>
  );
}

export default Evento;
