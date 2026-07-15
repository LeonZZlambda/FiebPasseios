import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const mensagens: MensagemItem[] = [
  {
    id: '1',
    date: '14/07/2026',
    sender: 'Ana Silva',
    email: 'ana.silva@email.com',
    status: 'Nova',
    subject: 'Sugestão para o passeio do MASP',
    excerpt: 'Gostaria de sugerir uma melhor organização dos grupos de saída...',
    message:
      'Gostaria de sugerir uma melhor organização dos grupos de saída. Acho que isso ajudaria bastante no embarque dos alunos e evitaria atrasos.',
  },
  {
    id: '2',
    date: '13/07/2026',
    sender: 'Carlos Pereira',
    email: 'carlos.pereira@email.com',
    status: 'Lida',
    subject: 'Dúvida sobre autorização',
    excerpt: 'Tenho uma dúvida sobre o prazo de envio das autorizações...',
    message:
      'Tenho uma dúvida sobre o prazo de envio das autorizações. Existe uma data limite definida para os responsáveis?',
  },
  {
    id: '3',
    date: '12/07/2026',
    sender: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    status: 'Arquivada',
    subject: 'Agradecimento',
    excerpt: 'Parabéns pela organização do passeio ao zoológico...',
    message:
      'Parabéns pela organização do passeio ao zoológico. A equipe foi muito atenciosa e tudo correu muito bem.',
  },
];

export default function Mensagem(): JSX.Element {
  const navigate = useNavigate();

  const openMessage = (message: MensagemItem) => {
    navigate('/mensagemLer', { state: message });
  };

  const stats = [
    { label: 'Novas', value: mensagens.filter((m) => m.status === 'Nova').length, tone: 'primary' },
    { label: 'Lidas', value: mensagens.filter((m) => m.status === 'Lida').length, tone: 'success' },
    { label: 'Arquivadas', value: mensagens.filter((m) => m.status === 'Arquivada').length, tone: 'secondary' },
  ];

  return (
    <div className="management-page">
      <Header goto="/home" title="Avaliações" logo={logo} />
      <div className="container management-shell">
        <section className="management-hero">
          <div>
            <span className="management-kicker">Canal de feedback</span>
            <h1 className="management-title">Avaliações e mensagens</h1>
            <p className="management-description">
              Centralize sugestões, dúvidas e retornos dos responsáveis em um fluxo simples de leitura e ação.
            </p>
          </div>
          <div className="management-hero-actions">
            <button className="btn btn-primary">Marcar todas como lidas</button>
          </div>
        </section>

        <section className="management-stats">
          {stats.map((stat) => (
            <article key={stat.label} className={`management-stat stat-${stat.tone}`}>
              <span className="management-stat-label">{stat.label}</span>
              <strong className="management-stat-value">{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="management-card">
          <div className="management-card-header">
            <h2 className="management-card-title">Caixa de entrada</h2>
            <div className="management-filters">
              <button className="chip chip-active">Todas</button>
              <button className="chip">Novas</button>
              <button className="chip">Lidas</button>
              <button className="chip">Arquivadas</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Assunto</th>
                  <th>Emissor</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mensagens.map((message) => (
                  <tr key={message.id}>
                    <td className="text-secondary">{message.id}</td>
                    <td>
                      <div className="fw-semibold">{message.subject}</div>
                      <div className="text-secondary small">{message.excerpt}</div>
                    </td>
                    <td>
                      <div className="fw-semibold">{message.sender}</div>
                      <div className="text-secondary small">{message.email}</div>
                    </td>
                    <td>
                      <span className={`status-pill status-${message.status.toLowerCase()}`}>{message.status}</span>
                    </td>
                    <td className="text-secondary">{message.date}</td>
                    <td className="text-end">
                      <button type="button" onClick={() => openMessage(message)} className="btn btn-outline-primary btn-sm">
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
