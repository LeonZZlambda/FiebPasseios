import React from 'react';
import type { FinancialReport as FinancialReportType } from '../../types/report.types';
import { useFinancialReport } from '../../hooks/useReports';
import { ReportType } from '../../types/report.types';
import ReportExport from './ReportExport';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import './FinancialReport.css';

interface FinancialReportProps {
  filters?: any;
}

export default function FinancialReport({ filters }: FinancialReportProps): JSX.Element {
  const { data, loading, error, refetch } = useFinancialReport(filters);
  const safeReport: FinancialReportType = {
    period: data?.period ?? '',
    totalRevenue: data?.totalRevenue ?? 0,
    collectedRevenue: data?.collectedRevenue ?? 0,
    pendingRevenue: data?.pendingRevenue ?? 0,
    overdueRevenue: data?.overdueRevenue ?? 0,
    refundedRevenue: data?.refundedRevenue ?? 0,
    paymentCount: data?.paymentCount ?? 0,
    averagePaymentAmount: data?.averagePaymentAmount ?? 0,
    paymentCompletionRate: data?.paymentCompletionRate ?? 0,
    byTrip: data?.byTrip ?? [],
    byPaymentMethod: data?.byPaymentMethod ?? {},
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value?: number) => {
    return `${(value ?? 0).toFixed(1)}%`;
  };

  if (loading) {
    return <LoadingSpinner message="Carregando relatório financeiro..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Erro ao carregar relatório: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        icon="💰"
        title="Nenhum dado encontrado"
        message="Não há dados financeiros disponíveis para o período selecionado."
      />
    );
  }

  return (
    <div className="financial-report">
      <div className="report-header">
        <h4 className="report-title">Relatório Financeiro</h4>
        <ReportExport reportType={ReportType.FINANCIAL} filters={filters} onExport={refetch} />
      </div>

      <div className="financial-summary">
        <div className="financial-card">
          <span className="financial-label">Receita Total</span>
          <span className="financial-value">{formatCurrency(safeReport.totalRevenue)}</span>
        </div>
        <div className="financial-card">
          <span className="financial-label">Receita Coletada</span>
          <span className="financial-value financial-success">{formatCurrency(safeReport.collectedRevenue)}</span>
        </div>
        <div className="financial-card">
          <span className="financial-label">Receita Pendente</span>
          <span className="financial-value financial-warning">{formatCurrency(safeReport.pendingRevenue)}</span>
        </div>
        <div className="financial-card">
          <span className="financial-label">Receita Atrasada</span>
          <span className="financial-value financial-danger">{formatCurrency(safeReport.overdueRevenue)}</span>
        </div>
        <div className="financial-card">
          <span className="financial-label">Receita Reembolsada</span>
          <span className="financial-value financial-secondary">{formatCurrency(safeReport.refundedRevenue)}</span>
        </div>
        <div className="financial-card">
          <span className="financial-label">Taxa de Conclusão</span>
          <span className="financial-value">{formatPercentage(safeReport.paymentCompletionRate)}</span>
        </div>
      </div>

      <div className="financial-details">
        <h5 className="financial-section-title">Detalhes por Passeio</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Passeio</th>
              <th>Receita</th>
              <th>Participantes</th>
            </tr>
          </thead>
          <tbody>
            {safeReport.byTrip.map((trip, index) => (
              <tr key={index}>
                <td>{trip.tripName}</td>
                <td>{formatCurrency(trip.revenue)}</td>
                <td>{trip.participantCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="financial-details">
        <h5 className="financial-section-title">Por Método de Pagamento</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Método</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(safeReport.byPaymentMethod).map(([method, value]) => (
              <tr key={method}>
                <td>{method}</td>
                <td>{formatCurrency(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
