import { Link } from 'react-router-dom';
import fiebtech from '../../assets/images/fiebtech.png';
import './Footer.css';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="footer-brand-link" aria-label="Página inicial">
              <img src={fiebtech} alt="FIEB Tech" className="footer-logo" />
            </Link>
            <p className="footer-description">
              Gestão de passeios educativos da FIEB com foco em organização, clareza e experiência.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Rodapé">
            <div className="footer-group">
              <h4 className="footer-title">Institucional</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/aboutUs">Sobre nós</Link>
                </li>
                <li>
                  <Link to="/login">Acesso</Link>
                </li>
              </ul>
            </div>

            <div className="footer-group">
              <h4 className="footer-title">Suporte</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Contato</a>
                </li>
                <li>
                  <a href="#">Privacidade</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FIEB Tours Educativos</span>
          <span>Simples, direto e seguro.</span>
        </div>
      </div>
    </footer>
  );
}
