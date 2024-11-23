import Item from "./itens";

function List(){
  return(
    <>
      <h1>Minha Lista</h1>
      <ul>
        <Item marca = "Ferrari" anoLancamento={1985}/>
        <Item marca = "Fiat" anoLancamento={1990}/>
        <Item marca="Renault" anoLancamento={2000}/>
      </ul>
    </>
  );

}

export default List