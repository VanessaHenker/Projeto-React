function OutraLista({ lista }) {
  return (
    <>
      <h3>Lista de coisas boas:</h3>
      {lista.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </>
  );
}

export default OutraLista;
