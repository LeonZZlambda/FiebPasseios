import { Link } from 'react-router-dom';
import logoDefault from '../../assets/images/fiebl.png';

import './Header.css';

interface HeaderProps {
  goto?: string;
  title?: string;
  logo?: string;
}

export default function Header({ goto, title, logo }: HeaderProps): JSX.Element {
  const displayLogo = logo || logoDefault;

  // If title is provided, it acts as a Dashboard Page Header
  if (title) {
    return (
      <div className="header-title">
        <div className="header-title-container">
          <div className="header-title-content">
            {goto && (
              <Link to={goto} className="header-back-btn">
                <i className="bi bi-arrow-left"></i>
                <span>Voltar</span>
              </Link>
            )}
            <h2 className="header-title-text">{title}</h2>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, it acts as the Public Website Header
  return (
    <header className="header-public">
      <nav className="header-nav">
        <div className="header-container">
          <Link to="/" className="header-brand">
            <img src={displayLogo} alt="fieb" className="logo" />
          </Link>
          <div className="header-menu">
            <ul className="header-nav-list">
              <li className="header-nav-item">
                <Link to={'/'} className="header-nav-link">
                  Início
                </Link>
              </li>
              <li className="header-nav-item">
                <Link to={'/aboutUs'} className="header-nav-link">
                  Sobre Nós
                </Link>
              </li>
              <li className="header-nav-item">
                <Link to={'/login'} className="header-nav-link header-nav-link-cta">
                  Fazer Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
