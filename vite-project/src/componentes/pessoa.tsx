// Função simples que recebe os parâmetros diretamente
function Pessoa(nome: string, idade: number, prof: string, foto: string){
  return (
    <>
      <img src={foto} alt="Pessoa" />
      <h2>Nome: {nome}</h2>
      <p>Idade: {idade}</p>
      <p>Profissão: {prof}</p>
    </>
  );
}

export default Pessoa;
