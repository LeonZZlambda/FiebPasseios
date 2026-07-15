import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import './Mensagem.css';

type MensagemItem = {
  id: string;
  date: string;
  sender: string;
  email: string;
  status: 'Nova' | 'Lida' | 'Arquivada';
  subject: string;
  excerpt: string;
  message: string;
};

export default function MensagemLer(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const message = (location.state as MensagemItem | undefined) ?? {
    id: '1',
    date: '14/07/2026',
    sender: 'Ana Silva',
    email: 'ana.silva@email.com',
    status: 'Nova',
    subject: 'Sugestão para o passeio do MASP',
    excerpt: 'Gostaria de sugerir uma melhor organização dos grupos de saída...',
    message:
      'Gostaria de sugerir uma melhor organização dos grupos de saída. Acho que isso ajudaria bastante no embarque dos alunos e evitaria atrasos.',
  };

  return (
    <div className="management-page">
      <Header goto="/mensagem" title="Ler Avaliação" logo={logo} />
      <div className="container management-shell">
        <section className="management-card">
          <div className="message-detail-header">
            <div>
              <span className={`status-pill status-${message.status.toLowerCase()}`}>{message.status}</span>
              <h1 className="management-title mt-3">{message.subject}</h1>
              <p className="management-description mb-0">{message.excerpt}</p>
            </div>
            <div className="message-detail-actions">
              <button className="btn btn-outline-secondary" onClick={() => navigate('/mensagem')}>
                Voltar
              </button>
              <button className="btn btn-warning">Marcar como lida</button>
              <button className="btn btn-outline-danger">Arquivar</button>
            </div>
          </div>

          <div className="message-detail-grid">
            <div className="message-detail-meta">
              <span>ID</span>
              <strong>{message.id}</strong>
            </div>
            <div className="message-detail-meta">
              <span>Data</span>
              <strong>{message.date}</strong>
            </div>
            <div className="message-detail-meta">
              <span>Emissor</span>
              <strong>{message.sender}</strong>
            </div>
            <div className="message-detail-meta">
              <span>Email</span>
              <strong>{message.email}</strong>
            </div>
          </div>

          <div className="message-body">
            <h2 className="message-body-title">Mensagem</h2>
            <p>{message.message}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
