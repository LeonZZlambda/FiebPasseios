import React from 'react';
import { Payment } from '../../types/payment.types';
import {
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getPaymentMethodColor,
  isPaymentOverdue,
} from '../../types/payment.types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './PaymentCard.css';

interface PaymentCardProps {
  payment: Payment;
  onEdit?: (payment: Payment) => void;
  onDelete?: (payment: Payment) => void;
  onMarkAsPaid?: (payment: Payment) => void;
}

export default function PaymentCard({
  payment,
  onEdit,
  onDelete,
  onMarkAsPaid,
}: PaymentCardProps): JSX.Element {
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

  const isOverdue = isPaymentOverdue(payment.dueDate, payment.paymentStatus);

  return (
    <div className={`payment-card ${isOverdue ? 'payment-overdue' : ''}`}>
      <div className="payment-card-header">
        <div className="payment-card-amount">{formatPrice(payment.amount)}</div>
        <div className="payment-card-badges">
          <span className={`badge bg-${getPaymentStatusColor(payment.paymentStatus)}`}>
            {getPaymentStatusLabel(payment.paymentStatus)}
          </span>
          <span className={`badge bg-${getPaymentMethodColor(payment.paymentMethod)}`}>
            {getPaymentMethodLabel(payment.paymentMethod)}
          </span>
        </div>
      </div>

      <div className="payment-card-body">
        <div className="payment-card-info">
          <span className="payment-card-label">Data de Pagamento:</span>
          <span className="payment-card-value">{formatDate(payment.paymentDate)}</span>
        </div>

        <div className="payment-card-info">
          <span className="payment-card-label">Data de Vencimento:</span>
          <span className={`payment-card-value ${isOverdue ? 'text-danger' : ''}`}>
            {formatDate(payment.dueDate)}
            {isOverdue && <span className="payment-overdue-badge">Atrasado</span>}
          </span>
        </div>

        {payment.notes && (
          <div className="payment-card-notes">
            <span className="payment-card-label">Notas:</span>
            <p className="payment-card-text">{payment.notes}</p>
          </div>
        )}
      </div>

      <div className="payment-card-footer">
        {onMarkAsPaid && payment.paymentStatus !== 'PAID' && payment.paymentStatus !== 'REFUNDED' && (
          <button
            className="btn btn-outline-success btn-sm payment-card-btn"
            onClick={() => onMarkAsPaid(payment)}
            title="Marcar como pago"
          >
            ✓ Pago
          </button>
        )}
        {onEdit && (
          <button
            className="btn btn-outline-primary btn-sm payment-card-btn"
            onClick={() => onEdit(payment)}
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            className="btn btn-outline-danger btn-sm payment-card-btn"
            onClick={() => onDelete(payment)}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
