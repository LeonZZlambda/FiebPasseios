import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import TripStatusBadge from '../trips/TripStatusBadge';
import './UpcomingTrips.css';

interface Trip {
  id: string;
  title?: string;
  name?: string;
  destination: string;
  departureDate?: string;
  returnDate?: string;
  date?: string;
  status: string;
  currentParticipants: number;
  maximumCapacity?: number;
  maxParticipants?: number;
}

interface UpcomingTripsProps {
  trips: Trip[];
  loading?: boolean;
  title?: string;
  maxItems?: number;
  onViewDetails?: (tripId: string) => void;
}

function safeFormatDate(dateString?: string): string {
  if (!dateString) return '--/--/----';
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) return '--/--/----';
  return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
}

export default function UpcomingTrips({
  trips,
  loading,
  title = 'Próximos Passeios',
  maxItems = 5,
  onViewDetails,
}: UpcomingTripsProps): JSX.Element {
  const getCapacityPercentage = (current: number, maximum: number): number => {
    if (!maximum) return 0;
    return (current / maximum) * 100;
  };

  const getCapacityColor = (percentage: number): string => {
    if (percentage >= 100) return 'capacity-full';
    if (percentage >= 80) return 'capacity-high';
    if (percentage >= 50) return 'capacity-medium';
    return 'capacity-low';
  };

  const displayTrips = (trips || []).slice(0, maxItems).map((trip) => ({
    ...trip,
    displayTitle: trip.title || trip.name || 'Passeio',
    displayDepartureDate: safeFormatDate(trip.departureDate || trip.date),
    displayReturnDate: safeFormatDate(trip.returnDate || trip.date),
    displayCapacity: trip.maximumCapacity || trip.maxParticipants || 0,
  }));

  if (loading) {
    return (
      <div className="upcoming-trips">
        <div className="upcoming-trips-header">
          <h3 className="upcoming-trips-title">{title}</h3>
        </div>
        <div className="upcoming-trips-loading">
          <LoadingSpinner message="" />
        </div>
      </div>
    );
  }

  if (displayTrips.length === 0) {
    return (
      <div className="upcoming-trips">
        <div className="upcoming-trips-header">
          <h3 className="upcoming-trips-title">{title}</h3>
        </div>
        <div className="upcoming-trips-empty">
          <EmptyState
            icon="🚌"
            title="Nenhum passeio agendado"
            message="Não há passeios programados para os próximos dias."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="upcoming-trips">
      <div className="upcoming-trips-header">
        <h3 className="upcoming-trips-title">{title}</h3>
      </div>
      <div className="upcoming-trips-list">
        {displayTrips.map((trip) => {
          const capacity = trip.displayCapacity || 1;
          const capacityPercentage = getCapacityPercentage(trip.currentParticipants, capacity);

          return (
            <div
              key={trip.id}
              className="upcoming-trip-card"
              onClick={() => onViewDetails?.(trip.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onViewDetails?.(trip.id);
                }
              }}
            >
              <div className="upcoming-trip-header">
                <div className="upcoming-trip-title">{trip.displayTitle}</div>
                <TripStatusBadge status={trip.status as any} />
              </div>

              <div className="upcoming-trip-destination">
                <span className="destination-icon">📍</span>
                <span className="destination-text">{trip.destination}</span>
              </div>

              <div className="upcoming-trip-dates">
                <div className="trip-date">
                  <span className="date-icon">📅</span>
                  <span className="date-text">{trip.displayDepartureDate}</span>
                </div>
                <div className="trip-date">
                  <span className="date-icon">↩️</span>
                  <span className="date-text">{trip.displayReturnDate}</span>
                </div>
              </div>

              <div className="upcoming-trip-capacity">
                <div className="capacity-info">
                  <span className="capacity-icon">👥</span>
                  <span className="capacity-text">
                    {trip.currentParticipants} / {capacity}
                  </span>
                </div>
                <div className={`capacity-bar ${getCapacityColor(capacityPercentage)}`}>
                  <div
                    className="capacity-fill"
                    style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
