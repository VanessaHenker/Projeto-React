
import FormLogin from "./FormLogin"
import FormName from "./FromName"
import IconSocial from "./IconSocial"

function Login() {
  return (
    <>
      <div className="content conteudo-principal">
        <section className="conteudo-coluna-principal">
          <h2 className="conteudo-titulo titulo-primarario">welcome back!</h2>
          <p className="conteudo-subtitulo descrição primaria">to keep with your personal info</p>
          <p className="conteudo-subtitulo descrição primaria">please login with personal info</p>
          <button id="signin" className="btn button-primario"></button>
        </section> 

        <section className="conteudo-coluna-secundario">
          <h2 className="conteudo-titulo titulo-secundario">create account</h2>
          <IconSocial/>
          <p className="conteudo-subtitulo descricao-secundaria">or use your email for registration: </p>
          <form className="conteudo-princial-from">
            <FormName/>
            <FormLogin/>
          </form>
        </section>
      </div>
      
   
    </>
  )
}

export default Login
