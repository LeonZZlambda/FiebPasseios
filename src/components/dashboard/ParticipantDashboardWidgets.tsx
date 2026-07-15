import React from 'react';
import { ParticipantDashboardStats } from '../../types/participant.types';
import { useParticipantDashboardStats } from '../../hooks/useParticipants';
import LoadingSpinner from '../ui/LoadingSpinner';
import './ParticipantDashboardWidgets.css';

interface ParticipantDashboardWidgetsProps {
  tripId?: string;
}

export default function ParticipantDashboardWidgets({
  tripId,
}: ParticipantDashboardWidgetsProps): JSX.Element {
  const { data: stats, loading, error } = useParticipantDashboardStats();

  if (loading) {
    return <LoadingSpinner message="Carregando estatísticas..." size="small" />;
  }

  if (error || !stats) {
    return (
      <div className="alert alert-warning" role="alert">
        Não foi possível carregar as estatísticas dos participantes.
      </div>
    );
  }

  const widgets = [
    {
      title: 'Total de Participantes',
      value: stats.totalParticipants,
      icon: '👥',
      color: 'primary',
      description: 'Participantes cadastrados',
    },
    {
      title: 'Vagas Restantes',
      value: stats.totalRemainingSeats,
      icon: '🪑',
      color: 'success',
      description: 'Vagas disponíveis',
    },
    {
      title: 'Taxa de Ocupação',
      value: `${stats.overallOccupancyRate.toFixed(1)}%`,
      icon: '📊',
      color: 'info',
      description: 'Capacidade utilizada',
    },
    {
      title: 'Taxa de Presença',
      value: `${stats.overallAttendanceRate.toFixed(1)}%`,
      icon: '✓',
      color: 'warning',
      description: 'Participantes presentes',
    },
  ];

  return (
    <div className="participant-dashboard-widgets">
      <h4 className="dashboard-title">Estatísticas de Participantes</h4>
      <div className="dashboard-widgets-grid">
        {widgets.map((widget) => (
          <div key={widget.title} className={`dashboard-widget widget-${widget.color}`}>
            <div className="widget-header">
              <span className="widget-icon">{widget.icon}</span>
              <span className="widget-title">{widget.title}</span>
            </div>
            <div className="widget-value">{widget.value}</div>
            <div className="widget-description">{widget.description}</div>
          </div>
        ))}
      </div>

      {stats.byTrip && stats.byTrip.length > 0 && (
        <div className="dashboard-trip-breakdown">
          <h5 className="breakdown-title">Detalhes por Passeio</h5>
          <div className="breakdown-table">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Passeio</th>
                  <th>Participantes</th>
                  <th>Ocupação</th>
                  <th>Presença</th>
                </tr>
              </thead>
              <tbody>
                {stats.byTrip.map((trip) => (
                  <tr key={trip.tripId}>
                    <td>{trip.tripName}</td>
                    <td>{trip.participantCount}</td>
                    <td>{trip.occupancyRate.toFixed(1)}%</td>
                    <td>{trip.attendanceRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
