import React from 'react';
import { TripStatus, getTripStatusLabel, getTripStatusColor } from '../../types/trip.types';

interface TripStatusBadgeProps {
  status: TripStatus;
  size?: 'small' | 'medium' | 'large';
}

export default function TripStatusBadge({ status, size = 'medium' }: TripStatusBadgeProps): JSX.Element {
  const colorClass = getTripStatusColor(status);
  const label = getTripStatusLabel(status);

  const sizeClasses = {
    small: 'badge-sm',
    medium: '',
    large: 'badge-lg',
  };

  return (
    <span className={`badge bg-${colorClass} ${sizeClasses[size]}`}>
      {label}
    </span>
  );
}
