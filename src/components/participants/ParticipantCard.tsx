import React from 'react';
import { Participant } from '../../types/participant.types';
import {
  getPaymentStatusLabel,
  getAttendanceStatusLabel,
  getPaymentStatusColor,
  getAttendanceStatusColor,
} from '../../types/participant.types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './ParticipantCard.css';

interface ParticipantCardProps {
  participant: Participant;
  onEdit?: (participant: Participant) => void;
  onDelete?: (participant: Participant) => void;
  onMarkAttendance?: (participant: Participant, attended: boolean) => void;
}

export default function ParticipantCard({
  participant,
  onEdit,
  onDelete,
  onMarkAttendance,
}: ParticipantCardProps): JSX.Element {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="participant-card">
      <div className="participant-card-header">
        <h5 className="participant-card-name">{participant.fullName}</h5>
        <div className="participant-card-badges">
          <span className={`badge bg-${getPaymentStatusColor(participant.paymentStatus)}`}>
            {getPaymentStatusLabel(participant.paymentStatus)}
          </span>
          <span className={`badge bg-${getAttendanceStatusColor(participant.attendanceStatus)}`}>
            {getAttendanceStatusLabel(participant.attendanceStatus)}
          </span>
        </div>
      </div>

      <div className="participant-card-body">
        <div className="participant-card-info">
          <span className="participant-card-label">Email:</span>
          <span className="participant-card-value">{participant.email}</span>
        </div>

        <div className="participant-card-info">
          <span className="participant-card-label">Telefone:</span>
          <span className="participant-card-value">{participant.phone}</span>
        </div>

        <div className="participant-card-info">
          <span className="participant-card-label">Contato de Emergência:</span>
          <span className="participant-card-value">{participant.emergencyContact}</span>
        </div>

        <div className="participant-card-info">
          <span className="participant-card-label">Data de Registro:</span>
          <span className="participant-card-value">{formatDate(participant.registrationDate)}</span>
        </div>

        <div className="participant-card-info">
          <span className="participant-card-label">Valor Pago:</span>
          <span className="participant-card-value">{formatPrice(participant.paymentAmount)}</span>
        </div>

        {participant.notes && (
          <div className="participant-card-notes">
            <span className="participant-card-label">Notas:</span>
            <p className="participant-card-text">{participant.notes}</p>
          </div>
        )}
      </div>

      <div className="participant-card-footer">
        {onEdit && (
          <button
            className="btn btn-outline-primary btn-sm participant-card-btn"
            onClick={() => onEdit(participant)}
          >
            Editar
          </button>
        )}
        {onMarkAttendance && (
          <div className="participant-card-attendance">
            <button
              className="btn btn-outline-success btn-sm participant-card-btn"
              onClick={() => onMarkAttendance(participant, true)}
              title="Marcar como presente"
            >
              ✓ Presente
            </button>
            <button
              className="btn btn-outline-danger btn-sm participant-card-btn"
              onClick={() => onMarkAttendance(participant, false)}
              title="Marcar como ausente"
            >
              ✗ Ausente
            </button>
          </div>
        )}
        {onDelete && (
          <button
            className="btn btn-outline-danger btn-sm participant-card-btn"
            onClick={() => onDelete(participant)}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
