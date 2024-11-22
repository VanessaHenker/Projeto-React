import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const IconSocial: React.FC = () => {
  return (
    <div className="midia-social">
      <ul className="lista-midia-social">
        <a className="link-midia-social" href="#" aria-label="Facebook">
          <li className="item-midia-social">
            <FontAwesomeIcon icon={faFacebookF} />
          </li>
        </a>

        <a className="link-midia-social" href="#" aria-label="Google Plus">
          <li className="item-midia-social">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </li>
        </a>

        <a className="link-midia-social" href="#" aria-label="LinkedIn">
          <li className="item-midia-social">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </li>
        </a>
      </ul>
    </div>
  );
};

export default IconSocial;
