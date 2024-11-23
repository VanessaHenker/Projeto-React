

function Item(props: { marca: string; anoLancamento : number }) {
  return (
    <>
      <li>{props.marca} - {props.anoLancamento}</li>

    </>
  );
}

export default Item;
