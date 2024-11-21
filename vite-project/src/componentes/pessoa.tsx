// Definindo a interface para as props
interface PessoaProps {
  foto: string; 
  nome: string;
  idade: string;
  prof: string;
}
// Função simples que recebe props
function Pessoa(props: PessoaProps) {
  return (
    <>
      <img src={props.foto} alt="Pessoa" />
      <h2>Nome: {props.nome}</h2>
      <p>Idade: {props.idade}</p>
      <p>Profissão {props.prof}</p>
    </>
  );
}


export default Pessoa;
