import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import './Usuario.css';

const accessCards = [
  {
    title: 'Criar usuário',
    description: 'Adicionar novos colaboradores com nível de acesso definido.',
    to: '/usuarionovo',
    label: 'Novo cadastro',
    tone: 'primary',
  },
  {
    title: 'Gerenciar usuários',
    description: 'Acompanhar status, perfis e editar contas existentes.',
    to: '/usuarioslista',
    label: 'Ver lista',
    tone: 'warning',
  },
];

export default function Usuario(): JSX.Element {
  return (
    <div className="management-page">
      <Header goto="/home" title="Usuários" logo={logo} />
      <div className="container management-shell">
        <section className="management-hero">
          <div>
            <span className="management-kicker">Administração</span>
            <h1 className="management-title">Gestão de usuários</h1>
            <p className="management-description">
              Crie, revise e organize acessos com uma visão mais clara dos colaboradores do sistema.
            </p>
          </div>
        </section>

        <section className="user-card-grid">
          {accessCards.map((card) => (
            <article key={card.title} className={`user-card user-card-${card.tone}`}>
              <span className="user-card-icon">
                <i className={`bi ${card.tone === 'primary' ? 'bi-person-plus' : 'bi-people'}`}></i>
              </span>
              <h2 className="user-card-title">{card.title}</h2>
              <p className="user-card-description">{card.description}</p>
              <Link to={card.to} className="btn btn-primary user-card-action">
                {card.label}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
