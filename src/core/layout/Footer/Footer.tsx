import { Icon } from '@/shared/components';
import './Footer.scss';

const Footer = () => {
  return (
    <footer data-layout="Footer">
      <div className="footer">
        <div className="d-flex justify-content-center">
          <ul className="social-networks list-inline">
            <li className="list-inline-item">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="Facebook" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="Twitter" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="Instagram" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="Linkedin" />
              </a>
            </li>
          </ul>
        </div>

        <div className="copyright text-center">
          <p className="mb-0">© Nome 2016 - Todos os Direitos Reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
