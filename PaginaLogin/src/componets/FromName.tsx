import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-regular-svg-icons'; 

function FormName() {
  return (
    <label className="label-input">
      <FontAwesomeIcon icon={faUser} className="far fa-user icon-modify" /> 
      <input id="name" type="text" placeholder="Name" />
    </label>
  );
}

export default FormName;
