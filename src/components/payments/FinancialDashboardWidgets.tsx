import React from 'react';
import { FinancialSummary } from '../../types/payment.types';
import { useFinancialSummary } from '../../hooks/usePayments';
import LoadingSpinner from '../ui/LoadingSpinner';
import './FinancialDashboardWidgets.css';

interface FinancialDashboardWidgetsProps {
  tripId?: string;
}

export default function FinancialDashboardWidgets({
  tripId,
}: FinancialDashboardWidgetsProps): JSX.Element {
  const { data: summary, loading, error } = useFinancialSummary(tripId);
  const safeSummary: FinancialSummary = {
    expectedRevenue: summary?.expectedRevenue ?? 0,
    collectedRevenue: summary?.collectedRevenue ?? 0,
    pendingPayments: summary?.pendingPayments ?? 0,
    overduePayments: summary?.overduePayments ?? 0,
    paymentCompletionRate: summary?.paymentCompletionRate ?? 0,
    totalPayments: summary?.totalPayments ?? 0,
    averagePaymentAmount: summary?.averagePaymentAmount ?? 0,
  };

  if (loading) {
    return <LoadingSpinner message="Carregando dados financeiros..." size="small" />;
  }

  if (error || !summary) {
    return (
      <div className="alert alert-warning" role="alert">
        Não foi possível carregar os dados financeiros.
      </div>
    );
  }

  const widgets = [
    {
      title: 'Receita Esperada',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(safeSummary.expectedRevenue),
      icon: '💰',
      color: 'primary',
      description: 'Total esperado',
    },
    {
      title: 'Receita Coletada',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(safeSummary.collectedRevenue),
      icon: '✅',
      color: 'success',
      description: 'Total recebido',
    },
    {
      title: 'Pagamentos Pendentes',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(safeSummary.pendingPayments),
      icon: '⏳',
      color: 'warning',
      description: 'A receber',
    },
    {
      title: 'Pagamentos Atrasados',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(safeSummary.overduePayments),
      icon: '⚠️',
      color: 'danger',
      description: 'Vencidos',
    },
    {
      title: 'Taxa de Conclusão',
      value: `${safeSummary.paymentCompletionRate.toFixed(1)}%`,
      icon: '📊',
      color: 'info',
      description: 'Pagamentos completos',
    },
  ];

  return (
    <div className="financial-dashboard-widgets">
      <h4 className="dashboard-title">Resumo Financeiro</h4>
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

      <div className="financial-stats">
        <h5 className="stats-title">Estatísticas Adicionais</h5>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total de Pagamentos:</span>
            <span className="stat-value">{safeSummary.totalPayments}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Valor Médio:</span>
            <span className="stat-value">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(safeSummary.averagePaymentAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
