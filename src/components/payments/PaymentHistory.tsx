import React from 'react';
import type { PaymentHistory as PaymentHistoryType } from '../../types/payment.types';
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getPaymentMethodColor,
} from '../../types/payment.types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import './PaymentHistory.css';

interface PaymentHistoryProps {
  payments: PaymentHistoryType[];
  loading: boolean;
  onPaymentClick?: (payment: PaymentHistoryType) => void;
}

export default function PaymentHistory({
  payments,
  loading,
  onPaymentClick,
}: PaymentHistoryProps): JSX.Element {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (loading) {
    return <LoadingSpinner message="Carregando histórico de pagamentos..." />;
  }

  if (!payments || payments.length === 0) {
    return (
      <EmptyState
        icon="📜"
        title="Nenhum pagamento encontrado"
        message="Não há histórico de pagamentos disponível."
      />
    );
  }

  return (
    <div className="payment-history">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Participante</th>
            <th>Passeio</th>
            <th>Valor</th>
            <th>Método</th>
            <th>Status</th>
            <th>Data de Pagamento</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              onClick={() => onPaymentClick?.(payment)}
              className={onPaymentClick ? 'payment-history-row-clickable' : ''}
            >
              <td className="payment-history-participant">{payment.participantName}</td>
              <td className="payment-history-trip">{payment.tripName}</td>
              <td className="payment-history-amount">{formatPrice(payment.amount)}</td>
              <td>
                <span className={`badge bg-${getPaymentMethodColor(payment.paymentMethod)}`}>
                  {getPaymentMethodLabel(payment.paymentMethod)}
                </span>
              </td>
              <td>
                <span className={`badge bg-${getPaymentStatusColor(payment.paymentStatus)}`}>
                  {getPaymentStatusLabel(payment.paymentStatus)}
                </span>
              </td>
              <td>{formatDate(payment.paymentDate)}</td>
              <td>{formatDate(payment.dueDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
