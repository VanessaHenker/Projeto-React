import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; 

function FormLogin() {
  return (
    <>
      <label className="label-input" htmlFor="email">
        <FontAwesomeIcon icon={faEnvelope} className="icon-modify" />
        <input id="email" type="email" placeholder="Email" />
      </label>

      <label className="label-input" htmlFor="password">
        <FontAwesomeIcon icon={faLock} className="icon-modify" />
        <input id="password" type="password" placeholder="Password" />
      </label>
    </>
  );
}

export default FormLogin;
