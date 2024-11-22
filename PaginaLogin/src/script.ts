document.addEventListener("DOMContentLoaded", () => {
  const btnSignin = document.querySelector<HTMLButtonElement>("#signin");
  const btnSignup = document.querySelector<HTMLButtonElement>("#signup");
  const body = document.querySelector<HTMLBodyElement>("body");

  // Verificando se os elementos existem no DOM
  if (btnSignin && btnSignup && body) {
    btnSignin.addEventListener("click", () => {
      body.classList.add("sign-in-js");
      body.classList.remove("sign-up-js"); // Remover a classe de sign-up, caso exista
    });

    btnSignup.addEventListener("click", () => {
      body.classList.add("sign-up-js");
      body.classList.remove("sign-in-js"); // Remover a classe de sign-in, caso exista
    });
  } else {
    console.error("Um ou mais elementos não foram encontrados no DOM.");
  }
});
