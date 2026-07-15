import React from 'react';
import MetricsCard from './MetricsCard';
import './MetricsGrid.css';

interface Metric {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  onClick?: () => void;
}

interface MetricsGridProps {
  metrics: Metric[];
  loading?: boolean;
}

export default function MetricsGrid({ metrics, loading }: MetricsGridProps): JSX.Element {
  if (loading) {
    return (
      <div className="metrics-grid">
        {[...Array(5)].map((_, index) => (
          <MetricsCard
            key={index}
            title=""
            value=""
            loading
            variant="primary"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="metrics-grid">
      {metrics.map((metric, index) => (
        <MetricsCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeText={metric.changeText}
          icon={metric.icon}
          loading={metric.loading}
          variant={metric.variant}
          onClick={metric.onClick}
        />
      ))}
    </div>
  );
}
