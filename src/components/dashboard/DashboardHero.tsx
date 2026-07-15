import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './DashboardHero.css';

interface DashboardHeroProps {
  userName?: string;
  summary?: string;
}

export default function DashboardHero({ userName, summary }: DashboardHeroProps): JSX.Element {
  const today = format(new Date(), 'EEEE, dd de MMMM de yyyy', { locale: ptBR });
  const greeting = getGreeting();

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  return (
    <div className="dashboard-hero">
      <div className="dashboard-hero-content">
        <div className="dashboard-hero-greeting">
          <span className="greeting-text">{greeting}</span>
          {userName && <span className="user-name">{userName}</span>}
        </div>
        <h1 className="dashboard-hero-title">Bem-vindo ao FiebPasseios</h1>
        {summary && <p className="dashboard-hero-summary">{summary}</p>}
        <p className="dashboard-hero-date">{today}</p>
      </div>
    </div>
  );
}
