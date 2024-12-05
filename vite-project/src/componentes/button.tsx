interface ButtonProps {
  text: string;
}

function Button(props: ButtonProps) {
  return (
    <button onClick={props.event}>
      {props.text}
    </button>
  );
}

export default Button;
