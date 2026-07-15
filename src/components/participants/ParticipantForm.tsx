import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ParticipantFormData, participantSchema } from '../../validations/participant.validation';
import { Participant, PaymentStatus, AttendanceStatus } from '../../types/participant.types';
import { getPaymentStatusLabel, getAttendanceStatusLabel } from '../../types/participant.types';
import './ParticipantForm.css';

interface ParticipantFormProps {
  participant?: Participant;
  tripId: string;
  onSubmit: (data: ParticipantFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ParticipantForm({
  participant,
  tripId,
  onSubmit,
  onCancel,
  isLoading,
}: ParticipantFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
    defaultValues: participant
      ? {
          tripId: participant.tripId,
          fullName: participant.fullName,
          email: participant.email,
          phone: participant.phone,
          emergencyContact: participant.emergencyContact,
          paymentStatus: participant.paymentStatus,
          attendanceStatus: participant.attendanceStatus,
          paymentAmount: participant.paymentAmount,
          notes: participant.notes,
        }
      : {
          tripId: tripId,
          fullName: '',
          email: '',
          phone: '',
          emergencyContact: '',
          paymentStatus: PaymentStatus.PENDING,
          attendanceStatus: AttendanceStatus.REGISTERED,
          paymentAmount: 0,
          notes: '',
        },
  });

  const handleFormSubmit = async (data: ParticipantFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="participant-form">
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="fullName" className="form-label">
            Nome Completo *
          </label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            id="fullName"
            {...register('fullName')}
            placeholder="Digite o nome completo do participante"
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            {...register('email')}
            placeholder="Digite o email do participante"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">
            Telefone *
          </label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            {...register('phone')}
            placeholder="Digite o telefone do participante"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="emergencyContact" className="form-label">
            Contato de Emergência *
          </label>
          <input
            type="text"
            className={`form-control ${errors.emergencyContact ? 'is-invalid' : ''}`}
            id="emergencyContact"
            {...register('emergencyContact')}
            placeholder="Nome e telefone do contato de emergência"
          />
          {errors.emergencyContact && (
            <div className="invalid-feedback">{errors.emergencyContact.message}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="paymentStatus" className="form-label">
            Status de Pagamento *
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
          <label htmlFor="attendanceStatus" className="form-label">
            Status de Presença *
          </label>
          <select
            className={`form-select ${errors.attendanceStatus ? 'is-invalid' : ''}`}
            id="attendanceStatus"
            {...register('attendanceStatus')}
          >
            {Object.values(AttendanceStatus).map((status) => (
              <option key={status} value={status}>
                {getAttendanceStatusLabel(status)}
              </option>
            ))}
          </select>
          {errors.attendanceStatus && (
            <div className="invalid-feedback">{errors.attendanceStatus.message}</div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="paymentAmount" className="form-label">
            Valor do Pagamento (R$)
          </label>
          <input
            type="number"
            className={`form-control ${errors.paymentAmount ? 'is-invalid' : ''}`}
            id="paymentAmount"
            min="0"
            max="100000"
            step="0.01"
            {...register('paymentAmount', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.paymentAmount && <div className="invalid-feedback">{errors.paymentAmount.message}</div>}
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
            placeholder="Observações adicionais sobre o participante"
          />
          {errors.notes && <div className="invalid-feedback">{errors.notes.message}</div>}
        </div>
      </div>

      <div className="participant-form-actions">
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
            participant ? 'Atualizar Participante' : 'Registrar Participante'
          )}
        </button>
      </div>
    </form>
  );
}
