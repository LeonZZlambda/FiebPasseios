import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentFormData, paymentSchema } from '../../validations/payment.validation';
import { Payment, PaymentMethod, PaymentStatus } from '../../types/payment.types';
import { getPaymentMethodLabel, getPaymentStatusLabel } from '../../types/payment.types';
import './PaymentForm.css';

interface PaymentFormProps {
  payment?: Payment;
  participantId: string;
  tripId: string;
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PaymentForm({
  payment,
  participantId,
  tripId,
  onSubmit,
  onCancel,
  isLoading,
}: PaymentFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: payment
      ? {
          participantId: payment.participantId,
          tripId: payment.tripId,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          paymentStatus: payment.paymentStatus,
          paymentDate: payment.paymentDate,
          dueDate: payment.dueDate,
          notes: payment.notes,
        }
      : {
          participantId: participantId,
          tripId: tripId,
          amount: 0,
          paymentMethod: PaymentMethod.CASH,
          paymentStatus: PaymentStatus.PENDING,
          paymentDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: '',
        },
  });

  const handleFormSubmit = async (data: PaymentFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="payment-form">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="amount" className="form-label">
            Valor do Pagamento (R$) *
          </label>
          <input
            type="number"
            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
            id="amount"
            min="0.01"
            max="100000"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.amount && <div className="invalid-feedback">{errors.amount.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Método de Pagamento *
          </label>
          <select
            className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`}
            id="paymentMethod"
            {...register('paymentMethod')}
          >
            {Object.values(PaymentMethod).map((method) => (
              <option key={method} value={method}>
                {getPaymentMethodLabel(method)}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <div className="invalid-feedback">{errors.paymentMethod.message}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="paymentStatus" className="form-label">
            Status do Pagamento *
          </label>
          <select
            className={`form-select ${errors.paymentStatus ? 'is-invalid' : ''}`}
            id="paymentStatus"
            {...register('paymentStatus')}
          >
            {Object.values(PaymentStatus).map((status) => (
              <option key={status} value={status}>
                {getPaymentStatusLabel(status)}
              </option>
            ))}
          </select>
          {errors.paymentStatus && (
            <div className="invalid-feedback">{errors.paymentStatus.message}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="paymentDate" className="form-label">
            Data de Pagamento *
          </label>
          <input
            type="date"
            className={`form-control ${errors.paymentDate ? 'is-invalid' : ''}`}
            id="paymentDate"
            {...register('paymentDate')}
          />
          {errors.paymentDate && <div className="invalid-feedback">{errors.paymentDate.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="dueDate" className="form-label">
            Data de Vencimento *
          </label>
          <input
            type="date"
            className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
            id="dueDate"
            {...register('dueDate')}
          />
          {errors.dueDate && <div className="invalid-feedback">{errors.dueDate.message}</div>}
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="notes" className="form-label">
            Notas (opcional)
          </label>
          <textarea
            className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
            id="notes"
            rows={3}
            {...register('notes')}
            placeholder="Observações adicionais sobre o pagamento"
          />
          {errors.notes && <div className="invalid-feedback">{errors.notes.message}</div>}
        </div>
      </div>

      <div className="payment-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !isDirty}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              Salvando...
            </>
          ) : (
            payment ? 'Atualizar Pagamento' : 'Registrar Pagamento'
          )}
        </button>
      </div>
    </form>
  );
}
