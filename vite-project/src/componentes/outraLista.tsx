interface OutraListaProps {
  itens: string[];
}

function OutraLista({ itens }: OutraListaProps) {
  return (
    <>
      <h3>Lista de coisas boas:</h3>
      {itens.length > 0 ? (
        itens.map((item) => <p key={item}>{item}</p>)
      ) : (
        <p>A lista está vazia.</p>
      )}
    </>
  );
}

export default OutraLista;
