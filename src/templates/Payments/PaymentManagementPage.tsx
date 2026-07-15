import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import PaymentList from '../../components/payments/PaymentList';
import PaymentForm from '../../components/payments/PaymentForm';
import PaymentHistory from '../../components/payments/PaymentHistory';
import FinancialDashboardWidgets from '../../components/payments/FinancialDashboardWidgets';
import PaymentSummary from '../../components/payments/PaymentSummary';
import { usePayments, useCreatePayment, useUpdatePayment, usePaymentHistory } from '../../hooks/usePayments';
import { Payment } from '../../types/payment.types';
import type { PaymentFormData } from '../../validations/payment.validation';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import './PaymentManagementPage.css';

export default function PaymentManagementPage(): JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'history' | 'summary'>('list');

  const { data: paymentsData, loading, refetch } = usePayments(undefined, 1, 20);
  const { data: paymentHistoryData, loading: historyLoading } = usePaymentHistory(undefined, 50);
  const { createPayment, loading: creating } = useCreatePayment();
  const { updatePayment, loading: updating } = useUpdatePayment();

  const handleCreatePayment = () => {
    setEditingPayment(null);
    setShowForm(true);
  };

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  const handleSubmitPayment = async (data: PaymentFormData) => {
    try {
      if (editingPayment) {
        await updatePayment(editingPayment.id, data);
        toast.success('Pagamento atualizado com sucesso!');
      } else {
        await createPayment(data);
        toast.success('Pagamento registrado com sucesso!');
      }
      setShowForm(false);
      setEditingPayment(null);
      refetch();
    } catch (error) {
      toast.error('Erro ao salvar pagamento. Tente novamente.');
      console.error('Error saving payment:', error);
    }
  };

  const handleCancelPayment = () => {
    setShowForm(false);
    setEditingPayment(null);
  };

  if (loading) {
    return (
      <div>
          <Header goto="/dashboard" title="Gestão Financeira" logo={logo} />
          <LoadingSpinner message="Carregando pagamentos..." />
        </div>
  );
  }

  if (showForm) {
    return (
      <div>
          <Header goto="/payments" title={editingPayment ? 'Editar Pagamento' : 'Registrar Pagamento'} logo={logo} />
          <div className="payment-management-page">
            <div className="payment-form-container">
              <PaymentForm
                payment={editingPayment || undefined}
                participantId={editingPayment?.participantId || ''}
                tripId={editingPayment?.tripId || ''}
                onSubmit={handleSubmitPayment}
                onCancel={handleCancelPayment}
                isLoading={creating || updating}
              />
            </div>
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto="/dashboard" title="Gestão Financeira" logo={logo} />
        <div className="payment-management-page">
          <div className="payment-management-header">
            <div className="payment-management-info">
              <h3 className="payment-management-title">Gestão de Pagamentos</h3>
              <p className="payment-management-subtitle">Gerencie todos os pagamentos e receitas</p>
            </div>
            <div className="payment-management-actions">
              <button className="btn btn-primary" onClick={handleCreatePayment}>
                <i className="bi bi-plus-circle me-2"></i>
                Novo Pagamento
              </button>
            </div>
          </div>

          <FinancialDashboardWidgets />

          <div className="payment-management-tabs">
            <button
              className={`payment-tab ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              Pagamentos
            </button>
            <button
              className={`payment-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Histórico
            </button>
            <button
              className={`payment-tab ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Resumo
            </button>
          </div>

          <div className="payment-management-content">
            {activeTab === 'list' && (
              <PaymentList
                payments={paymentsData?.data || []}
                loading={loading}
                onEdit={handleEditPayment}
                onRefresh={refetch}
              />
            )}
            {activeTab === 'history' && (
              <PaymentHistory
                payments={paymentHistoryData || []}
                loading={historyLoading}
              />
            )}
            {activeTab === 'summary' && <PaymentSummary />}
          </div>
        </div>
      </div>
  );
}
