import React, { useState } from 'react';
import { Payment } from '../../types/payment.types';
import PaymentCard from './PaymentCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useDeletePayment, useUpdatePaymentStatus } from '../../hooks/usePayments';
import './PaymentList.css';

interface PaymentListProps {
  payments: Payment[];
  loading: boolean;
  onEdit: (payment: Payment) => void;
  onRefresh: () => void;
}

export default function PaymentList({
  payments,
  loading,
  onEdit,
  onRefresh,
}: PaymentListProps): JSX.Element {
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; payment: Payment | null }>({
    isOpen: false,
    payment: null,
  });

  const { deletePayment, loading: deleting } = useDeletePayment();
  const { updatePaymentStatus, loading: updatingStatus } = useUpdatePaymentStatus();

  const handleDelete = (payment: Payment) => {
    setDeleteDialog({ isOpen: true, payment });
  };

  const confirmDelete = async () => {
    if (deleteDialog.payment) {
      try {
        await deletePayment(deleteDialog.payment.id);
        setDeleteDialog({ isOpen: false, payment: null });
        onRefresh();
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const handleMarkAsPaid = async (payment: Payment) => {
    try {
      await updatePaymentStatus(payment.id, 'PAID' as any);
      onRefresh();
    } catch (error) {
      console.error('Error marking payment as paid:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Carregando pagamentos..." />;
  }

  if (!payments || payments.length === 0) {
    return (
      <EmptyState
        icon="💳"
        title="Nenhum pagamento encontrado"
        message="Não há pagamentos registrados. Adicione pagamentos para começar."
      />
    );
  }

  return (
    <>
      <div className="payment-list">
        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onEdit={onEdit}
            onDelete={handleDelete}
            onMarkAsPaid={handleMarkAsPaid}
          />
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Excluir Pagamento"
        message={`Tem certeza que deseja excluir o pagamento de ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(deleteDialog.payment?.amount || 0)}? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, payment: null })}
      />
    </>
  );
}
