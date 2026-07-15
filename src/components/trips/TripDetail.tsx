import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trip, TripStatus } from '../../types/trip.types';
import {
  getTripStatusLabel,
  getTransportTypeLabel,
  getTripStatusColor,
  isValidStatusTransition,
} from '../../types/trip.types';
import TripStatusBadge from './TripStatusBadge';
import LoadingSpinner from '../ui/LoadingSpinner';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useChangeTripStatus, useDeleteTrip, useArchiveTrip } from '../../hooks/useTrips';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './TripDetail.css';

interface TripDetailProps {
  trip: Trip;
  loading: boolean;
  onEdit: () => void;
  onRefresh: () => void;
}

export default function TripDetail({ trip, loading, onEdit, onRefresh }: TripDetailProps): JSX.Element {
  const navigate = useNavigate();
  const [statusDialog, setStatusDialog] = useState<{ isOpen: boolean; newStatus: TripStatus | null }>({
    isOpen: false,
    newStatus: null,
  });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [archiveDialog, setArchiveDialog] = useState(false);

  const { changeStatus, loading: changingStatus } = useChangeTripStatus();
  const { deleteTrip, loading: deleting } = useDeleteTrip();
  const { archiveTrip, loading: archiving } = useArchiveTrip();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
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

  const handleStatusChange = (newStatus: TripStatus) => {
    if (isValidStatusTransition(trip.status, newStatus)) {
      setStatusDialog({ isOpen: true, newStatus });
    }
  };

  const confirmStatusChange = async () => {
    if (statusDialog.newStatus) {
      try {
        await changeStatus(trip.id, statusDialog.newStatus);
        setStatusDialog({ isOpen: false, newStatus: null });
        onRefresh();
      } catch (error) {
        console.error('Error changing status:', error);
      }
    }
  };

  const handleDelete = () => {
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTrip(trip.id);
      setDeleteDialog(false);
      navigate('/trips');
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleArchive = async () => {
    try {
      await archiveTrip(trip.id, !trip.archived);
      setArchiveDialog(false);
      onRefresh();
    } catch (error) {
      console.error('Error archiving trip:', error);
    }
  };

  const availableStatuses = Object.values(TripStatus).filter((status) =>
    isValidStatusTransition(trip.status, status)
  );

  const capacityPercentage = (trip.currentParticipants / trip.maximumCapacity) * 100;

  if (loading) {
    return <LoadingSpinner message="Carregando detalhes do passeio..." />;
  }

  return (
    <div className="trip-detail">
      <div className="trip-detail-header">
        <div className="trip-detail-header-info">
          <h2 className="trip-detail-title">{trip.title}</h2>
          <TripStatusBadge status={trip.status} size="large" />
        </div>
        <div className="trip-detail-header-actions">
          <button className="btn btn-primary" onClick={onEdit}>
            Editar
          </button>
          <button className="btn btn-outline-warning" onClick={() => setArchiveDialog(true)}>
            {trip.archived ? 'Desarquivar' : 'Arquivar'}
          </button>
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </div>

      <div className="trip-detail-content">
        <div className="trip-detail-section">
          <h3 className="trip-detail-section-title">Informações Gerais</h3>
          <div className="trip-detail-grid">
            <div className="trip-detail-item">
              <span className="trip-detail-label">Destino:</span>
              <span className="trip-detail-value">{trip.destination}</span>
            </div>
            <div className="trip-detail-item">
              <span className="trip-detail-label">Coordenador:</span>
              <span className="trip-detail-value">{trip.coordinator}</span>
            </div>
            <div className="trip-detail-item">
              <span className="trip-detail-label">Transporte:</span>
              <span className="trip-detail-value">{getTransportTypeLabel(trip.transportType)}</span>
            </div>
            <div className="trip-detail-item">
              <span className="trip-detail-label">Preço:</span>
              <span className="trip-detail-value trip-price">{formatPrice(trip.price)}</span>
            </div>
          </div>
        </div>

        <div className="trip-detail-section">
          <h3 className="trip-detail-section-title">Datas</h3>
          <div className="trip-detail-grid">
            <div className="trip-detail-item">
              <span className="trip-detail-label">Partida:</span>
              <span className="trip-detail-value">{formatDate(trip.departureDate)}</span>
            </div>
            <div className="trip-detail-item">
              <span className="trip-detail-label">Retorno:</span>
              <span className="trip-detail-value">{formatDate(trip.returnDate)}</span>
            </div>
          </div>
        </div>

        <div className="trip-detail-section">
          <div className="trip-detail-section-header">
            <h3 className="trip-detail-section-title">Participantes</h3>
            <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/trips/${trip.id}/participants`)}>
              Gerenciar Participantes
            </button>
          </div>
          <div className="trip-detail-capacity">
            <div className="trip-detail-capacity-info">
              <span className="trip-detail-label">Capacidade:</span>
              <span className="trip-detail-value">
                {trip.currentParticipants} / {trip.maximumCapacity}
              </span>
            </div>
            <div className="trip-detail-progress">
              <div
                className={`trip-detail-progress-bar ${
                  capacityPercentage >= 100
                    ? 'capacity-full'
                    : capacityPercentage >= 80
                    ? 'capacity-high'
                    : 'capacity-normal'
                }`}
                role="progressbar"
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                aria-valuenow={trip.currentParticipants}
                aria-valuemin={0}
                aria-valuemax={trip.maximumCapacity}
              />
            </div>
            <span className="trip-detail-capacity-percentage">
              {capacityPercentage.toFixed(0)}% preenchido
            </span>
          </div>
        </div>

        {trip.description && (
          <div className="trip-detail-section">
            <h3 className="trip-detail-section-title">Descrição</h3>
            <p className="trip-detail-description">{trip.description}</p>
          </div>
        )}

        {trip.notes && (
          <div className="trip-detail-section">
            <h3 className="trip-detail-section-title">Notas</h3>
            <p className="trip-detail-notes">{trip.notes}</p>
          </div>
        )}

        <div className="trip-detail-section">
          <h3 className="trip-detail-section-title">Alterar Status</h3>
          <div className="trip-detail-status-actions">
            {availableStatuses.length > 0 ? (
              availableStatuses.map((status) => (
                <button
                  key={status}
                  className={`btn btn-outline-${getTripStatusColor(status)}`}
                  onClick={() => handleStatusChange(status)}
                  disabled={changingStatus}
                >
                  {getTripStatusLabel(status)}
                </button>
              ))
            ) : (
              <p className="trip-detail-muted">Nenhuma transição de status disponível</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={statusDialog.isOpen}
        title="Alterar Status"
        message={`Tem certeza que deseja alterar o status de "${getTripStatusLabel(trip.status)}" para "${getTripStatusLabel(statusDialog.newStatus!)}"?`}
        confirmText="Alterar"
        cancelText="Cancelar"
        variant="info"
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusDialog({ isOpen: false, newStatus: null })}
      />

      <ConfirmDialog
        isOpen={deleteDialog}
        title="Excluir Passeio"
        message={`Tem certeza que deseja excluir o passeio "${trip.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog(false)}
      />

      <ConfirmDialog
        isOpen={archiveDialog}
        title={trip.archived ? 'Desarquivar Passeio' : 'Arquivar Passeio'}
        message={`Tem certeza que deseja ${trip.archived ? 'desarquivar' : 'arquivar'} o passeio "${trip.title}"?`}
        confirmText={trip.archived ? 'Desarquivar' : 'Arquivar'}
        cancelText="Cancelar"
        variant="warning"
        onConfirm={handleArchive}
        onCancel={() => setArchiveDialog(false)}
      />
    </div>
  );
}
