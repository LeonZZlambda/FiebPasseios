import React, { useState } from 'react';
import type { PaymentSummary } from '../../types/payment.types';
import { usePaymentSummary, useExportPayments } from '../../hooks/usePayments';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import './PaymentSummary.css';

interface PaymentSummaryProps {
  dateFrom?: string;
  dateTo?: string;
}

export default function PaymentSummary({
  dateFrom,
  dateTo,
}: PaymentSummaryProps): JSX.Element {
  const [selectedView, setSelectedView] = useState<'status' | 'method' | 'trip' | 'month'>('status');
  const { data: summary, loading, error, refetch } = usePaymentSummary(dateFrom, dateTo);
  const { exportPayments, loading: exporting } = useExportPayments();
  const safeSummary: PaymentSummary = {
    byStatus: summary?.byStatus ?? {},
    byMethod: summary?.byMethod ?? {},
    byTrip: summary?.byTrip ?? [],
    byMonth: summary?.byMonth ?? [],
  };

  const handleExport = async () => {
    try {
      await exportPayments({ dateFrom, dateTo });
    } catch (error) {
      console.error('Error exporting payments:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Carregando resumo de pagamentos..." />;
  }

  if (error || !summary) {
    return (
      <div className="alert alert-warning" role="alert">
        Não foi possível carregar o resumo de pagamentos.
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderStatusView = () => (
    <div className="summary-view">
      <h5 className="summary-view-title">Por Status</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Status</th>
            <th>Valor Total</th>
            <th>Porcentagem</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(safeSummary.byStatus).map(([status, value]) => (
            <tr key={status}>
              <td>{status}</td>
              <td>{formatPrice(value)}</td>
              <td>
                {safeSummary.byStatus.PAID > 0
                  ? ((value / safeSummary.byStatus.PAID) * 100).toFixed(1)
                  : '0'}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMethodView = () => (
    <div className="summary-view">
      <h5 className="summary-view-title">Por Método de Pagamento</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Método</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(safeSummary.byMethod).map(([method, value]) => (
            <tr key={method}>
              <td>{method}</td>
              <td>{formatPrice(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTripView = () => (
    <div className="summary-view">
      <h5 className="summary-view-title">Por Passeio</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Passeio</th>
            <th>Receita Total</th>
            <th>Receita Coletada</th>
            <th>Pendente</th>
            <th>Pagamentos</th>
          </tr>
        </thead>
        <tbody>
          {safeSummary.byTrip.map((trip) => (
            <tr key={trip.tripId}>
              <td>{trip.tripName}</td>
              <td>{formatPrice(trip.totalRevenue)}</td>
              <td>{formatPrice(trip.collectedRevenue)}</td>
              <td>{formatPrice(trip.pendingRevenue)}</td>
              <td>{trip.paymentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMonthView = () => (
    <div className="summary-view">
      <h5 className="summary-view-title">Por Mês</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Receita</th>
            <th>Pagamentos</th>
          </tr>
        </thead>
        <tbody>
          {safeSummary.byMonth.map((month) => (
            <tr key={`${month.year}-${month.month}`}>
              <td>
                {month.month}/{month.year}
              </td>
              <td>{formatPrice(month.revenue)}</td>
              <td>{month.paymentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="payment-summary">
      <div className="summary-header">
        <h4 className="summary-title">Resumo de Pagamentos</h4>
        <div className="summary-actions">
          <button className="btn btn-outline-secondary btn-sm" onClick={refetch}>
            Atualizar
          </button>
          <button className="btn btn-outline-primary btn-sm" onClick={handleExport} disabled={exporting}>
            {exporting ? 'Exportando...' : 'Exportar'}
          </button>
        </div>
      </div>

      <div className="summary-tabs">
        <button
          className={`summary-tab ${selectedView === 'status' ? 'active' : ''}`}
          onClick={() => setSelectedView('status')}
        >
          Por Status
        </button>
        <button
          className={`summary-tab ${selectedView === 'method' ? 'active' : ''}`}
          onClick={() => setSelectedView('method')}
        >
          Por Método
        </button>
        <button
          className={`summary-tab ${selectedView === 'trip' ? 'active' : ''}`}
          onClick={() => setSelectedView('trip')}
        >
          Por Passeio
        </button>
        <button
          className={`summary-tab ${selectedView === 'month' ? 'active' : ''}`}
          onClick={() => setSelectedView('month')}
        >
          Por Mês
        </button>
      </div>

      <div className="summary-content">
        {selectedView === 'status' && renderStatusView()}
        {selectedView === 'method' && renderMethodView()}
        {selectedView === 'trip' && renderTripView()}
        {selectedView === 'month' && renderMonthView()}
      </div>
    </div>
  );
}
