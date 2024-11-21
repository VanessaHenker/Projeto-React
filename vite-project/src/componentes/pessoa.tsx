// Definindo a interface para as props
interface PessoaProps {
  foto: string; 
}
// Função simples que recebe props
function Pessoa(props: PessoaProps) {
  return (
    <>
      <img src={props.foto} alt="Pessoa" />
    </>
  );
}

export default Pessoa;
