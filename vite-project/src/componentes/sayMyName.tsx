interface SayMyName {
  nome: string; 
}

function SayMyName(props: SayMyName) {
  return (
    <>
      <p>Fala aí {props.nome}, suave? </p>
    </>
  );
}

export default SayMyName;
