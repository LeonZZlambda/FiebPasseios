import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import './ActivityFeed.css';

interface Activity {
  id: string;
  type: 'registration' | 'trip_update' | 'status_change';
  title: string;
  description: string;
  timestamp: Date;
  icon?: React.ReactNode;
}

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
  title?: string;
  maxItems?: number;
}

export default function ActivityFeed({
  activities,
  loading,
  title = 'Atividades Recentes',
  maxItems = 5,
}: ActivityFeedProps): JSX.Element {
  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const getActivityIcon = (type: Activity['type']): React.ReactNode => {
    switch (type) {
      case 'registration':
        return '👤';
      case 'trip_update':
        return '🚌';
      case 'status_change':
        return '🔄';
      default:
        return '📋';
    }
  };

  const getActivityColor = (type: Activity['type']): string => {
    switch (type) {
      case 'registration':
        return 'activity-registration';
      case 'trip_update':
        return 'activity-trip';
      case 'status_change':
        return 'activity-status';
      default:
        return 'activity-default';
    }
  };

  if (loading) {
    return (
      <div className="activity-feed">
        <div className="activity-feed-header">
          <h3 className="activity-feed-title">{title}</h3>
        </div>
        <div className="activity-feed-loading">
          <LoadingSpinner message="" />
        </div>
      </div>
    );
  }

  const displayActivities = activities.slice(0, maxItems);

  if (!displayActivities || displayActivities.length === 0) {
    return (
      <div className="activity-feed">
        <div className="activity-feed-header">
          <h3 className="activity-feed-title">{title}</h3>
        </div>
        <div className="activity-feed-empty">
          <EmptyState
            icon="📋"
            title="Nenhuma atividade"
            message="Não há atividades recentes para exibir."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      <div className="activity-feed-header">
        <h3 className="activity-feed-title">{title}</h3>
      </div>
      <div className="activity-feed-list">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className={`activity-item ${getActivityColor(activity.type)}`}
          >
            <div className="activity-icon">
              {activity.icon || getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-description">{activity.description}</div>
              <div className="activity-time">{formatTime(activity.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
