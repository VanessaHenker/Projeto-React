import FormName from './FromName';
import FormLogin from './FormLogin';
import IconSocial from './IconSocial';

interface LoginProps {
  onButtonClick: () => void;
}
const Login: React.FC<LoginProps> = ({ onButtonClick }) => {
  return (
    <div className="content conteudo-principal">
      <section className="conteudo-coluna-principal">
        <h2 className="conteudo-titulo titulo-primario">Welcome back!</h2>
        <p className="conteudo-subtitulo descricao-primaria">To keep with your personal info</p>
        <p className="conteudo-subtitulo descricao-primaria">Please login with personal info</p>
        <button className="btn button-primario" onClick={onButtonClick}>
          Sign in
        </button>
      </section>

      <section className="conteudo-coluna-secundario">
        <h2 className="conteudo-titulo titulo-secundario">create account</h2>
        <IconSocial />
        <p className="conteudo-subtitulo descricao-secundaria">or use your email for registration: </p>
        <form className="conteudo-principal-form">
          <FormName />
          <FormLogin />

          <button className="btn button-secundario">sign up</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
