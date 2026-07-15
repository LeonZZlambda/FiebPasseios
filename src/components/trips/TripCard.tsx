import React from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '../../types/trip.types';
import TripStatusBadge from './TripStatusBadge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './TripCard.css';

interface TripCardProps {
  trip: Trip;
  onEdit?: (trip: Trip) => void;
  onDelete?: (trip: Trip) => void;
  onDuplicate?: (trip: Trip) => void;
  onArchive?: (trip: Trip) => void;
}

export default function TripCard({ trip, onEdit, onDelete, onDuplicate, onArchive }: TripCardProps): JSX.Element {
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

  const capacityPercentage = (trip.currentParticipants / trip.maximumCapacity) * 100;

  return (
    <div className="trip-card">
      <div className="trip-card-header">
        <h5 className="trip-card-title">{trip.title}</h5>
        <TripStatusBadge status={trip.status} />
      </div>

      <div className="trip-card-body">
        <div className="trip-card-info">
          <span className="trip-card-label">Destino:</span>
          <span className="trip-card-value">{trip.destination}</span>
        </div>

        <div className="trip-card-info">
          <span className="trip-card-label">Coordenador:</span>
          <span className="trip-card-value">{trip.coordinator}</span>
        </div>

        <div className="trip-card-dates">
          <div className="trip-card-date">
            <span className="trip-card-label">Partida:</span>
            <span className="trip-card-value">{formatDate(trip.departureDate)}</span>
          </div>
          <div className="trip-card-date">
            <span className="trip-card-label">Retorno:</span>
            <span className="trip-card-value">{formatDate(trip.returnDate)}</span>
          </div>
        </div>

        <div className="trip-card-capacity">
          <div className="trip-card-capacity-header">
            <span className="trip-card-label">Participantes:</span>
            <span className="trip-card-value">
              {trip.currentParticipants}/{trip.maximumCapacity}
            </span>
          </div>
          <div className="trip-card-progress">
            <div
              className={`trip-card-progress-bar ${
                capacityPercentage >= 100 ? 'capacity-full' : capacityPercentage >= 80 ? 'capacity-high' : 'capacity-normal'
              }`}
              role="progressbar"
              style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              aria-valuenow={trip.currentParticipants}
              aria-valuemin={0}
              aria-valuemax={trip.maximumCapacity}
            />
          </div>
        </div>

        <div className="trip-card-price">
          <span className="trip-card-label">Preço:</span>
          <span className="trip-card-value trip-price">{formatPrice(trip.price)}</span>
        </div>

        {trip.description && (
          <div className="trip-card-description">
            <p className="trip-card-text">{trip.description}</p>
          </div>
        )}
      </div>

      <div className="trip-card-footer">
        <Link to={`/trips/${trip.id}`} className="btn btn-primary btn-sm trip-card-btn">
          Ver Detalhes
        </Link>
        {onEdit && (
          <button
            className="btn btn-outline-secondary btn-sm trip-card-btn"
            onClick={() => onEdit(trip)}
          >
            Editar
          </button>
        )}
        {onDuplicate && (
          <button
            className="btn btn-outline-info btn-sm trip-card-btn"
            onClick={() => onDuplicate(trip)}
          >
            Duplicar
          </button>
        )}
        {onArchive && (
          <button
            className="btn btn-outline-warning btn-sm trip-card-btn"
            onClick={() => onArchive(trip)}
          >
            {trip.archived ? 'Desarquivar' : 'Arquivar'}
          </button>
        )}
        {onDelete && (
          <button
            className="btn btn-outline-danger btn-sm trip-card-btn"
            onClick={() => onDelete(trip)}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
