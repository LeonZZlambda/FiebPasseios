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

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg menu">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={displayLogo} alt="fieb" className="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">
                    Início
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/aboutUs'} className="nav-link">
                    Sobre Nós
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/Home'} className="nav-link">
                    Serviços
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/Login'} className="btn btn-primary rounded-pill nav-link">
                    Fazer Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {title && (
          <div className="header-title container py-2 d-flex justify-content-between align-items-center">
            {goto ? (
              <Link to={goto} className="btn btn-link">
                Voltar
              </Link>
            ) : (
              <div />
            )}
            <h2 className="m-0">{title}</h2>
            <img src={displayLogo} alt="logo" className="logo-small" />
          </div>
        )}
      </header>
    </div>
  );
}
