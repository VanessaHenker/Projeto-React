import PropType from 'prop-types';

function Item(props: { marca: string; anoLancamento : number }) {
  return (
    <>
      <li>{props.marca} - {props.anoLancamento}</li>

    </>
  );
}

Item.propTypes = {
  marca: PropType.string.isRequired,
  anoLancamento: PropType.number
}

Item.defaultProps = {
  marca: 'Faltou marca',
  anoLancamento: 0,
}

export default Item;
