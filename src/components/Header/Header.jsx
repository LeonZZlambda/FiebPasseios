import React from "react";
import logo from '../../assets/images/fiebl.png';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg menu">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="fieb" className="logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Início</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/aboutUs'}className="nav-link">Sobre Nós</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Home'}className="nav-link">Serviços</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Login'}className="btn btn-primary rounded-pill nav-link" href="#">Fazer Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
