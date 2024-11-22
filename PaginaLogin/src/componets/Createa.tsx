
import FormLogin from "./FormLogin";
import IconSocial from "./IconSocial";

function Createa() {
  return (
    <div className="content conteudo-principal-secundario">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Hello, friend!</h2>
        <p className="conteudo-subtitulo descricao-primaria">
          Enter your personal details and start your journey with us
        </p>
        <button id="signup" className="btn button-primario">
          Sign Up
        </button>
      </section>

      <section className="conteudo-coluna-secundario">
        <h2 className="conteudo-titulo titulo-secundario">Sign in to Developer</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">
          Or use your email account
        </p>
        <form className="conteudo-principal-form">
          <FormLogin />
          <a className="password" href="#forgot-password">
            Forgot your password?
          </a>
          <button className="btn button-secundario">Sign In</button>
        </form>
      </section>
    </div>
  );
}

export default Createa;
