import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';
import profile from '../../assets/images/social/profile.svg';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar(): JSX.Element {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    `sidebar-nav-link ${isActive ? 'sidebar-nav-link-active' : ''}`;

  return (
    <>
      <button
        type="button"
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="sidebar-navigation"
        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        title={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      <div className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <img src={profile} alt="profile" className="sidebar-profile" />
          <div className="sidebar-welcome">
            <span className="sidebar-kicker">Área administrativa</span>
            <h1 className="sidebar-welcome-text">
              {loading ? 'Carregando...' : `Olá, ${user?.name || 'Visitante'}`}
            </h1>
          </div>
        </div>

        <nav className="sidebar-nav" id="sidebar-navigation">
          <NavLink className={getNavClass} to={'/home'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/dashboard'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/trips'} end onClick={() => setMobileOpen(false)}>
            <i className="bi bi-bus-front"></i>
            <span>Gerenciar Passeios</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/trips/create'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-plus-circle"></i>
            <span>Criar Passeio</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/payments'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-cash-coin"></i>
            <span>Gestão Financeira</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/reports'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-graph-up"></i>
            <span>Relatórios</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/mensagem'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-chat-dots"></i>
            <span>Avaliações</span>
          </NavLink>
          <NavLink className={getNavClass} to={'/usuario'} onClick={() => setMobileOpen(false)}>
            <i className="bi bi-people"></i>
            <span>Usuários</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}
