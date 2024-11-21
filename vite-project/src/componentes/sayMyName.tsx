// Definindo a interface para as props
interface SayMyNameProps {
  nome: string; // 'nome' é do tipo string
}

// Função com as props tipadas
function SayMyName(props: SayMyNameProps) {
  return (
    <>
      <p>Fala aí {props.nome}, suave? </p>
    </>
  );
}

export default SayMyName;
