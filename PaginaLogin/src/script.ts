// Seleciona os botões e o elemento body
const btnSignin = document.querySelector<HTMLButtonElement>("#signin");
const btnSignup = document.querySelector<HTMLButtonElement>("#signup");
const body = document.querySelector<HTMLBodyElement>("body");

// Verifica se os elementos foram encontrados antes de adicionar os eventos
if (btnSignin && btnSignup && body) {
  btnSignin.addEventListener("click", () => {
    body.className = "sign-in-js";
  });

  btnSignup.addEventListener("click", () => {
    body.className = "sign-up-js";
  });
} else {
  console.error("Um ou mais elementos não foram encontrados no DOM.");
}
