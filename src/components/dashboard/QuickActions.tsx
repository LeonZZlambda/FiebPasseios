import React from 'react';
import { QuickAction } from '../../types/dashboard.types';
import './QuickActions.css';

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

export default function QuickActions({ actions, title = 'Ações Rápidas' }: QuickActionsProps): JSX.Element {
  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <h3 className="quick-actions-title">{title}</h3>
      </div>
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`quick-action-btn quick-action-${action.color}`}
            onClick={action.onClick}
            disabled={action.disabled}
            aria-label={action.label}
          >
            <span className="quick-action-icon">{action.icon}</span>
            <span className="quick-action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
