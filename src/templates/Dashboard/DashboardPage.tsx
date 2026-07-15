import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import DashboardHero from '../../components/dashboard/DashboardHero';
import MetricsGrid from '../../components/dashboard/MetricsGrid';
import QuickActions from '../../components/dashboard/QuickActions';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import UpcomingTrips from '../../components/dashboard/UpcomingTrips';
import { useDashboardData, useUpcomingTrips, useRecentRegistrations, useExportDashboard } from '../../hooks/useDashboard';
import { QuickAction } from '../../types/dashboard.types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
// legacy css removed

export default function DashboardPage(): JSX.Element {
  const navigate = useNavigate();
  const [timeRange] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('30d');
  const dashboardFilters = useMemo(() => ({ timeRange }), [timeRange]);
  const { data, loading, error } = useDashboardData(dashboardFilters);
  const { data: upcomingTrips, loading: upcomingLoading } = useUpcomingTrips(5);
  const { data: recentRegistrations, loading: recentLoading } = useRecentRegistrations(5);
  const { exportData, loading: exporting } = useExportDashboard();
  const safeDashboard = {
    metrics: {
      totalTrips: data?.metrics?.totalTrips ?? 0,
      activeTrips: data?.metrics?.activeTrips ?? 0,
      totalParticipants: data?.metrics?.totalParticipants ?? 0,
      occupancyRate: data?.metrics?.occupancyRate ?? 0,
      revenueProjection: data?.metrics?.revenueProjection ?? 0,
    },
  };

  const handleCreateTrip = () => {
    navigate('/trips/create');
  };

  const handleRegisterParticipant = () => {
    navigate('/trips');
  };

  const handleExportData = async () => {
    try {
      await exportData('csv');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleTripClick = (tripId: string) => {
    navigate(`/trips/${tripId}`);
  };

  // Format metrics for MetricsGrid
  const metrics = data
    ? [
        {
          title: 'Total de Passeios',
          value: safeDashboard.metrics.totalTrips,
          change: 12,
          changeText: 'vs mês anterior',
          icon: '🚌',
          variant: 'primary' as const,
        },
        {
          title: 'Passeios Ativos',
          value: safeDashboard.metrics.activeTrips,
          change: 8,
          changeText: 'vs mês anterior',
          icon: '🎯',
          variant: 'success' as const,
        },
        {
          title: 'Total de Participantes',
          value: safeDashboard.metrics.totalParticipants,
          change: 15,
          changeText: 'vs mês anterior',
          icon: '👥',
          variant: 'info' as const,
        },
        {
          title: 'Taxa de Ocupação',
          value: `${safeDashboard.metrics.occupancyRate.toFixed(1)}%`,
          change: 5,
          changeText: 'vs mês anterior',
          icon: '📊',
          variant: 'warning' as const,
        },
        {
          title: 'Projeção de Receita',
          value: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(safeDashboard.metrics.revenueProjection),
          change: 20,
          changeText: 'vs mês anterior',
          icon: '💰',
          variant: 'success' as const,
        },
      ]
    : [];

  // Quick actions
  const quickActions: QuickAction[] = [
    {
      label: 'Criar Passeio',
      icon: '➕',
      color: 'primary',
      onClick: handleCreateTrip,
    },
    {
      label: 'Registrar Participante',
      icon: '👤',
      color: 'success',
      onClick: handleRegisterParticipant,
    },
    {
      label: 'Exportar Dados',
      icon: '📥',
      color: 'info',
      onClick: handleExportData,
      disabled: exporting,
    },
  ];

  // Format activities for ActivityFeed
  const activities = recentRegistrations
    ? recentRegistrations.map((reg: { id: string; participantName: string; tripName: string; registrationDate: string | Date }) => ({
        id: reg.id,
        type: 'registration' as const,
        title: `Novo registro: ${reg.participantName}`,
        description: `Registrado em ${reg.tripName}`,
        timestamp: new Date(reg.registrationDate),
        icon: '👤',
      }))
    : [];

  if (loading) {
    return (
      <div>
          <Header goto="/home" title="Dashboard" logo={logo} />
          <LoadingSpinner message="Carregando dashboard..." />
        </div>
  );
  }

  if (error) {
    return (
      <div>
          <Header goto="/home" title="Dashboard" logo={logo} />
          <div className="alert alert-danger" role="alert">
            Erro ao carregar dashboard: {error}
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto="/home" title="Dashboard" logo={logo} />
        <div className="dashboard-page-new">
          <DashboardHero
            userName="Administrador"
            summary="Gerencie seus passeios educacionais, acompanhe métricas e mantenha-se atualizado com as atividades recentes."
          />

          <MetricsGrid metrics={metrics} loading={loading} />

          <div className="dashboard-grid">
            <div className="dashboard-main">
              <UpcomingTrips
                trips={upcomingTrips}
                loading={upcomingLoading}
                onViewDetails={handleTripClick}
              />
            </div>

            <div className="dashboard-sidebar">
              <QuickActions actions={quickActions} />
              <ActivityFeed
                activities={activities}
                loading={recentLoading}
                maxItems={5}
              />
            </div>
          </div>
        </div>
      </div>
  );
}
