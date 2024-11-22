import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; 

function FormLogin() {
  return (
    <div>
      <label className="label-input">
        <FontAwesomeIcon icon={faEnvelope} className="icon-modify" />
        <input type="email" placeholder="Email" />
      </label>

      <label className="label-input">
        <FontAwesomeIcon icon={faLock} className="icon-modify" />
        <input type="password" placeholder="Password" />
      </label>
    </div>
  );
}

export default FormLogin;
