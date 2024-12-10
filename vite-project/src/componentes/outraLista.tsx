// OutraLista.tsx
interface OutraListaProps {
  itens: string[];
}

function OutraLista({ itens }: OutraListaProps) {
  return (
    <>
      <h3>Lista de coisas boas:</h3>
      {
      itens.length > 0 ? (
      itens.map((item, index) => (
        <p key={index}>{item}</p>
      )))}
    </>
  );
}

export default OutraLista;
