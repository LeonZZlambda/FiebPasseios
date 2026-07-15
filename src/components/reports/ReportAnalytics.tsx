import React from 'react';
import type { ReportAnalytics as ReportAnalyticsType } from '../../types/report.types';
import { useReportAnalytics } from '../../hooks/useReports';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import './ReportAnalytics.css';

interface ReportAnalyticsProps {
  filters?: any;
}

export default function ReportAnalytics({ filters }: ReportAnalyticsProps): JSX.Element {
  const { data, loading, error } = useReportAnalytics(filters);
  const safeData = {
    occupancyTrends: data?.occupancyTrends ?? [],
    participationTrends: data?.participationTrends ?? [],
    revenueTrends: data?.revenueTrends ?? [],
    attendanceTrends: data?.attendanceTrends ?? [],
    summary: {
      totalTrips: data?.summary?.totalTrips ?? 0,
      totalParticipants: data?.summary?.totalParticipants ?? 0,
      totalRevenue: data?.summary?.totalRevenue ?? 0,
      averageAttendanceRate: data?.summary?.averageAttendanceRate ?? 0,
      averageOccupancyRate: data?.summary?.averageOccupancyRate ?? 0,
    },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return <LoadingSpinner message="Carregando analytics..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Erro ao carregar analytics: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        icon="📈"
        title="Nenhum dado encontrado"
        message="Não há dados de analytics disponíveis para o período selecionado."
      />
    );
  }

  return (
    <div className="report-analytics">
      <h4 className="analytics-title">Analytics</h4>

      <div className="analytics-summary">
        <div className="analytics-card">
          <span className="analytics-label">Total de Passeios</span>
          <span className="analytics-value">{safeData.summary.totalTrips}</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-label">Total de Participantes</span>
          <span className="analytics-value">{safeData.summary.totalParticipants}</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-label">Receita Total</span>
          <span className="analytics-value">{formatCurrency(safeData.summary.totalRevenue)}</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-label">Taxa Média de Frequência</span>
          <span className="analytics-value">{formatPercentage(safeData.summary.averageAttendanceRate)}</span>
        </div>
        <div className="analytics-card">
          <span className="analytics-label">Taxa Média de Ocupação</span>
          <span className="analytics-value">{formatPercentage(safeData.summary.averageOccupancyRate)}</span>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="analytics-chart">
          <h5 className="chart-title">Tendência de Ocupação</h5>
          <div className="chart-content">
            {safeData.occupancyTrends.length > 0 ? (
              <div className="chart-bars">
                {safeData.occupancyTrends.map((point, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{ height: `${Math.min(point.value, 100)}%` }}
                      title={`${point.label}: ${formatPercentage(point.value)}`}
                    />
                    <span className="chart-label">{point.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="chart-empty">Sem dados disponíveis</p>
            )}
          </div>
        </div>

        <div className="analytics-chart">
          <h5 className="chart-title">Tendência de Participação</h5>
          <div className="chart-content">
            {safeData.participationTrends.length > 0 ? (
              <div className="chart-bars">
                {safeData.participationTrends.map((point, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar chart-bar-secondary"
                      style={{ height: `${Math.min(point.value, 100)}%` }}
                      title={`${point.label}: ${point.value}`}
                    />
                    <span className="chart-label">{point.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="chart-empty">Sem dados disponíveis</p>
            )}
          </div>
        </div>

        <div className="analytics-chart">
          <h5 className="chart-title">Tendência de Receita</h5>
          <div className="chart-content">
            {safeData.revenueTrends.length > 0 ? (
              <div className="chart-bars">
                {safeData.revenueTrends.map((point, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar chart-bar-success"
                      style={{ height: `${Math.min((point.value / Math.max(...safeData.revenueTrends.map(p => p.value))) * 100, 100)}%` }}
                      title={`${point.label}: ${formatCurrency(point.value)}`}
                    />
                    <span className="chart-label">{point.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="chart-empty">Sem dados disponíveis</p>
            )}
          </div>
        </div>

        <div className="analytics-chart">
          <h5 className="chart-title">Tendência de Frequência</h5>
          <div className="chart-content">
            {safeData.attendanceTrends.length > 0 ? (
              <div className="chart-bars">
                {safeData.attendanceTrends.map((point, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar chart-bar-info"
                      style={{ height: `${Math.min(point.value, 100)}%` }}
                      title={`${point.label}: ${formatPercentage(point.value)}`}
                    />
                    <span className="chart-label">{point.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="chart-empty">Sem dados disponíveis</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
