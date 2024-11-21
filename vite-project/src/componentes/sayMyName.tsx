// Definindo uma interface para um objeto
interface Pessoa {
  nome: string;
  idade: number;
}

// Função que usa a interface Pessoa
function apresentarPessoa(pessoa: Pessoa): string {
  return `Olá, meu nome é ${pessoa.nome} e eu tenho ${pessoa.idade} anos.`;
}

// Criando um objeto que segue a interface
const pessoa: Pessoa = {
  nome: "Vanessa",
  idade: 30
};

// Chamando a função e exibindo o resultado
console.log(apresentarPessoa(pessoa));
