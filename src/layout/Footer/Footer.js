import React from 'react';

import { Container } from 'react-bootstrap';

import './Footer.scss';

const Footer = () => {
  return (
    <footer data-component="Footer">
      <Container>
        <div className="d-flex justify-content-center">
          <ul className="social-networks list-inline">
            <li className="list-inline-item">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li className="list-inline-item">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">Linkedin</a>
            </li>
          </ul>
        </div>

        <div className="copyright text-center">
          <p className="mb-0">© Nome 2016 - Todos os Direitos Reservados</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
