import React from 'react';

import fiebtech from '../../assets/images/fiebtech.png';

import './Footer.css';

function Footer() {
  return (
    <div>
      <footer>
        <a href='/'><img src={fiebtech} alt="fieb_tech" className='fieb-tech'/></a>
        {/* Footer Topo */} 
        <div className="footer-top ptb_100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-center">
                {/* Footer Items */} 
                <div className="footer-items">
                  <h3 className="titulo-footer">Sobre Nós</h3>
                  <ul>
                    <li className="lista-footer"><a className="link-footer" href="/aboutUs">Quem Somos</a></li>
                    <li className="lista-footer"><a className="link-footer" href="#">Nossa Equipe</a></li>
                    <li className="lista-footer"><a className="link-footer" href="/aboutUs">Nossos Objetivos</a></li>
                    <li className="lista-footer"><a className="link-footer" href="#">Parcerias</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-center">
                {/* Footer Items */} 
                <div className="footer-items">
                  <h3 className="titulo-footer">Serviços</h3>
                  <ul>
                    <li className="lista-footer"><a className="link-footer" href="#">Nosso Aplicativo</a></li>
                    <li className="lista-footer"><a className="link-footer" href="#">Histórico de Passeios</a></li>
                    <li className="lista-footer"><a className="link-footer" href="#">Futuros Passeios</a></li>
                    <li className="lista-footer"><a className="link-footer" href="#">Passeios Ativos</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Base */} 
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                {/* Copyright Area */} 
                <div className="copyright">&copy; 2024 FIEB TOURS EDUCATIVOS. Todos os direitos reservados</div> 
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
