// Função com desestruturação diretamente nos parâmetros
function Pessoa({ nome, idade, prof, foto }: { nome: string; idade: string | string; prof: string; foto: string }) {
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
