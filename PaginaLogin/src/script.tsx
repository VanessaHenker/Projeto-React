var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

if (btnSignin && btnSignup && body) {
  btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js"; 
  });

  btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
  });
} else {
  console.error("Um ou mais elementos não foram encontrados no DOM.");
}
