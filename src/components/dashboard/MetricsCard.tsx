import React from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import './MetricsCard.css';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  onClick?: () => void;
}

export default function MetricsCard({
  title,
  value,
  change,
  changeText,
  icon,
  loading,
  variant = 'primary',
  onClick,
}: MetricsCardProps): JSX.Element {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('pt-BR').format(val);
    }
    return val;
  };

  const formatChange = (val: number): string => {
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(val / 100);
    return val >= 0 ? `+${formatted}` : formatted;
  };

  const getChangeColor = (): string => {
    if (!change) return '';
    return change >= 0 ? 'positive' : 'negative';
  };

  if (loading) {
    return (
      <div className="metrics-card metrics-card-loading">
        <LoadingSpinner message="" />
      </div>
    );
  }

  return (
    <div className={`metrics-card metrics-card-${variant} ${onClick ? 'metrics-card-clickable' : ''}`} onClick={onClick}>
      <div className="metrics-card-header">
        <div className="metrics-card-icon">{icon}</div>
        <div className="metrics-card-title">{title}</div>
      </div>
      <div className="metrics-card-body">
        <div className="metrics-card-value">{formatValue(value)}</div>
        {(change !== undefined || changeText) && (
          <div className={`metrics-card-change ${getChangeColor()}`}>
            {change !== undefined && <span className="change-value">{formatChange(change)}</span>}
            {changeText && <span className="change-text">{changeText}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
