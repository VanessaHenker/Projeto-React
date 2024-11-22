
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-regular-svg-icons'; 

function FormName() {
  return (
    <>
      <label className="label-input" htmlFor="name">
        <FontAwesomeIcon icon={faUser} className="icon-modify" /> {/* Ícone renderizado */}
        <input id="name" type="text" placeholder="Name" />
      </label>
    </>
  );
}

export default FormName;
