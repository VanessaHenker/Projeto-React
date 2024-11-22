import React from "react";
import FormLogin from "./FormLogin";
import FormName from "./FromName";
import IconSocial from "./IconSocial";

function Login() {
  return (
    <div className="content conteudo-principal">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Welcome back!</h2>
        <p className="conteudo-subtitulo descricao-primaria">
          To keep connected with us, please login with your personal info
        </p>
        <button id="signin" className="btn button-primario">
          Sign In
        </button>
      </section>

      <section className="conteudo-coluna-secundario">
        <h2 className="conteudo-titulo titulo-secundario">Create Account</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">
          Or use your email for registration:
        </p>
        <form className="conteudo-principal-form">
          <FormName />
          <FormLogin />
          <button className="btn button-secundario">Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
