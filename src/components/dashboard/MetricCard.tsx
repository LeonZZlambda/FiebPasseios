import React from 'react';
import { MetricCardConfig } from '../../types/dashboard.types';
import './MetricCard.css';

interface MetricCardProps {
  config: MetricCardConfig;
  loading?: boolean;
}

export default function MetricCard({ config, loading = false }: MetricCardProps): JSX.Element {
  const colorClasses = {
    primary: 'metric-primary',
    success: 'metric-success',
    warning: 'metric-warning',
    danger: 'metric-danger',
    info: 'metric-info',
    secondary: 'metric-secondary',
  };

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('pt-BR').format(value);
    }
    return value;
  };

  if (loading) {
    return (
      <div className={`metric-card ${colorClasses[config.color]} metric-loading`}>
        <div className="metric-skeleton">
          <div className="skeleton-icon"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-value"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`metric-card ${colorClasses[config.color]}`}>
      <div className="metric-header">
        <div className="metric-icon">{config.icon}</div>
        <div className="metric-title">{config.title}</div>
      </div>

      <div className="metric-value">{formatValue(config.value)}</div>

      {config.description && (
        <div className="metric-description">{config.description}</div>
      )}

      {config.trend && (
        <div className={`metric-trend ${config.trend.isPositive ? 'trend-positive' : 'trend-negative'}`}>
          <span className="trend-icon">
            {config.trend.isPositive ? '↑' : '↓'}
          </span>
          <span className="trend-value">{Math.abs(config.trend.value)}%</span>
          <span className="trend-label">{config.trend.label}</span>
        </div>
      )}
    </div>
  );
}
