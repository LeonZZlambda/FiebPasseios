import React from 'react';
import { CapacityInfo } from '../../types/participant.types';
import './CapacityIndicator.css';

interface CapacityIndicatorProps {
  capacity: CapacityInfo;
  showDetails?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function CapacityIndicator({
  capacity,
  showDetails = true,
  size = 'medium',
}: CapacityIndicatorProps): JSX.Element {
  const sizeClasses = {
    small: 'capacity-small',
    medium: 'capacity-medium',
    large: 'capacity-large',
  };

  const getProgressColor = () => {
    if (capacity.isFull) return 'bg-danger';
    if (capacity.occupancyPercentage >= 80) return 'bg-warning';
    if (capacity.occupancyPercentage >= 50) return 'bg-info';
    return 'bg-success';
  };

  const getStatusText = () => {
    if (capacity.isFull) return 'Lotado';
    if (capacity.occupancyPercentage >= 80) return 'Quase cheio';
    if (capacity.occupancyPercentage >= 50) return 'Disponível';
    return 'Muitas vagas';
  };

  return (
    <div className={`capacity-indicator ${sizeClasses[size]}`}>
      <div className="capacity-header">
        <span className="capacity-label">Capacidade</span>
        {showDetails && (
          <span className={`capacity-status ${capacity.isFull ? 'text-danger' : 'text-success'}`}>
            {getStatusText()}
          </span>
        )}
      </div>

      <div className="capacity-progress">
        <div className="progress" style={{ height: size === 'small' ? '8px' : '12px' }}>
          <div
            className={`progress-bar ${getProgressColor()}`}
            role="progressbar"
            style={{ width: `${Math.min(capacity.occupancyPercentage, 100)}%` }}
            aria-valuenow={capacity.currentParticipants}
            aria-valuemin={0}
            aria-valuemax={capacity.maximumCapacity}
          />
        </div>
      </div>

      {showDetails && (
        <div className="capacity-details">
          <div className="capacity-detail">
            <span className="capacity-detail-label">Participantes:</span>
            <span className="capacity-detail-value">
              {capacity.currentParticipants} / {capacity.maximumCapacity}
            </span>
          </div>
          <div className="capacity-detail">
            <span className="capacity-detail-label">Vagas Restantes:</span>
            <span className="capacity-detail-value">{capacity.remainingSeats}</span>
          </div>
          <div className="capacity-detail">
            <span className="capacity-detail-label">Ocupação:</span>
            <span className="capacity-detail-value">{capacity.occupancyPercentage.toFixed(1)}%</span>
          </div>
        </div>
      )}

      {capacity.isFull && (
        <div className="capacity-warning">
          <span className="bi bi-exclamation-triangle me-2"></span>
          Capacidade máxima atingida
        </div>
      )}
    </div>
  );
}
