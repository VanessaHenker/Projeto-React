function Saudacao({ nome }: { nome: string }) {
  function gerarSaudacao(algumNome: string): string {
    return `Olá, ${algumNome}, tudo bem?`;
  }

  return (
    <>
      <p>{gerarSaudacao(nome)}</p>
    </>
  );
}

export default Saudacao;
