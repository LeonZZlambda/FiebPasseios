import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export default function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps): JSX.Element {
  return (
    <div className="loading-spinner-container">
      <div className={`spinner-border text-primary loading-spinner-${size}`} role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      {message && <p className="loading-message mt-3">{message}</p>}
    </div>
  );
}
