import React from 'react'

import fiebtech from '../../assets/images/fiebtech.png'

import facebook from '../../assets/images/social/facebook.svg'
import instagram from '../../assets/images/social/instagram.svg'
import linkedIn from '../../assets/images/social/linkedIn.svg'

function Footer() {
  return (

    <div>
            <footer>
              <a href='/'><img src={fiebtech} alt="fieb_tech" className='fieb-tech'/></a>
            {/* Footer Topo */} 
            <div class="footer-top ptb_100">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-lg-3">
                            {/* Footer Items*/} 
                            <div class="footer-items">
                                {/* Footer Sobre_Nos */} 
                                <h3 class="titulo-footer">Sobre Nós</h3>
                                <ul>
                                    <li class="lista-footer"><a class="link-footer" href="#">Quem Somos</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Nossa Equipe</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Nossa Ideia</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Nossos Objetivos</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Parcerias</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-3">
                            {/* Footer Items */} 
                            <div class="footer-items">
                                {/* Footer Title */} 
                                <h3 class="titulo-footer">Serviços</h3>
                                <ul>
                                    <li class="lista-footer"><a class="link-footer" href="#">Nosso Aplicativo</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Histórico de Passeios</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Futuros Passeios</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Passeios Ativos</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Sujestão de viagens</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-3">
                            {/* Footer Items */} 
                            <div class="footer-items">
                                {/* Footer SAC */} 
                                <h3 class="titulo-footer">Suporte & SAC</h3>
                                <ul>
                                    <li class="lista-footer"><a class="link-footer" href="#">Perguntas Frequentes</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Termos de Condições</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Políticas de Privacidade</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Help Center</a></li>
                                    <li class="lista-footer"><a class="link-footer" href="#">Entre em Contato</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-3">
                            {/* Footer Items */} 
                            <div class="footer-items">
                                {/* Footer Social */} 
                                <h3 class="titulo-footer">Social</h3>
                                <p class="social">Siga-nos em nossas redes sociais:</p>
                                {/* Social Icones */} 
                                <ul class="social-icons list-inline pt-2">
                                    <li class="lista-social"><a href="https://facebook.com"><img src={facebook} alt='facebook' className='lista-social'/><i class="fab fa-facebook"></i></a></li>
                                    <li class="lista-social"><a href="https://linkedin.com"><img src={linkedIn} alt='linkedIn' className='lista-social'/><i class="fab fa-linkedin-in"></i></a></li>
                                    <li class="lista-social"><a href="https://instagram.com"><img src={instagram} alt='instagram' className='lista-social'/><i class="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Base */} 
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            {/* Copyright Area */} 
                                <div class="copyright">&copy; 2024 FIEB Passeios. Todos os direitos reservados</div> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer
