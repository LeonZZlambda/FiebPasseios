import { Link } from 'react-router-dom';
import React from 'react';

function SobreNos() {

  return (
      <nav className='fieb-logo justfy-content-center align-items-center min-vh-100 mt-5 p-4'>

          <h1 className='title1 display-4 text-center mb-4'>
            Bem-vindo(a) à FiebPasseios
          </h1>
          <h3 className='title2 text-secondary text-center mb-4'>
            Facilitamos a criação, organização e gestão de passeios educacionais na FIEB&reg;
          </h3>

          <section className='mb-5'>
            <h2 className='h3'>O que é o FiebPasseios?</h2>
            <p className='text-muted'>
              O FiebPasseios é um sistema desenvolvido especialmente para a comunidade escolar da FIEB, 
              com o objetivo de tornar mais prático o processo de planejamento e organização de passeios educacionais. 
              Com a nossa plataforma, você pode criar, editar e gerenciar passeios de forma rápida e intuitiva, 
              garantindo uma experiência educativa enriquecedora para os alunos.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3'>Principais Funcionalidades</h2>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item border-0'>
                <i className='bi bi-check-circle-fill text-success'></i> Criar passeios educacionais de maneira simples e rápida
              </li>
              <li className='list-group-item border-0'>
                <i className='bi bi-check-circle-fill text-success'></i> Definir e editar detalhes do passeio, como local, data e preço
              </li>
              <li className='list-group-item border-0'>
                <i className='bi bi-check-circle-fill text-success'></i> Notificar alunos e responsáveis sobre os passeios planejados
              </li>
              <li className='list-group-item border-0'>
                <i className='bi bi-check-circle-fill text-success'></i> Facilidade para compartilhar informações com as unidades da FIEB
              </li>
            </ul>
          </section>

          <section className='text-center mb-5'>
            <h2 className='h3 '>Comece Agora</h2>
            <p className='text-muted'>
              Pronto para organizar o próximo passeio educacional? Clique no botão abaixo e comece a usar o FiebPasseios.
            </p>

            <Link to='/home' className='btn fw-medium btn-lg shadow-sm btn_fieb'>
              Acessar FiebPasseios
            </Link>
          </section>
      </nav>
  );
}

export default SobreNos;
