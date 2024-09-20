import React from "react"

// import logo from 'caminho da logo'

import { Link } from 'react-router-dom'

function Header() {
    return(

<div>
<header>
  <nav className="navbar navbar-expand-lg menu">
    <div className="container-fluid justify-content-center">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">Início</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Produtos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Quem Somos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Fale Conosco</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
</div>

    )
}

export default Header