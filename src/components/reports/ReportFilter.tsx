import React from 'react';
import { ReportFilters } from '../../types/report.types';
import { TripStatus } from '../../types/trip.types';
import { PaymentStatus } from '../../types/participant.types';
import { AttendanceStatus } from '../../types/participant.types';
import { useAvailableTrips, useAvailableParticipants } from '../../hooks/useReports';
import './ReportFilter.css';

interface ReportFilterProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  showTripFilter?: boolean;
  showParticipantFilter?: boolean;
  showStatusFilter?: boolean;
  showPaymentStatusFilter?: boolean;
  showAttendanceStatusFilter?: boolean;
}

export default function ReportFilter({
  filters,
  onFiltersChange,
  showTripFilter = true,
  showParticipantFilter = true,
  showStatusFilter = true,
  showPaymentStatusFilter = true,
  showAttendanceStatusFilter = true,
}: ReportFilterProps): JSX.Element {
  const { data: availableTrips, loading: tripsLoading } = useAvailableTrips();
  const { data: availableParticipants, loading: participantsLoading } = useAvailableParticipants();

  const handleFilterChange = (key: keyof ReportFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== '');

  return (
    <div className="report-filter">
      <div className="report-filter-header">
        <h5 className="report-filter-title">Filtros</h5>
        {hasActiveFilters && (
          <button className="btn btn-link btn-sm" onClick={clearFilters}>
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="report-filter-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="dateFrom" className="form-label">
              Data Início
            </label>
            <input
              type="date"
              className="form-control"
              id="dateFrom"
              value={filters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="dateTo" className="form-label">
              Data Fim
            </label>
            <input
              type="date"
              className="form-control"
              id="dateTo"
              value={filters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>

          {showTripFilter && (
            <div className="col-md-6 mb-3">
              <label htmlFor="tripId" className="form-label">
                Passeio
              </label>
              <select
                className="form-select"
                id="tripId"
                value={filters.tripId || ''}
                onChange={(e) => handleFilterChange('tripId', e.target.value)}
                disabled={tripsLoading}
              >
                <option value="">Todos os passeios</option>
                {availableTrips.map((trip) => (
                  <option key={trip.id} value={trip.id}>
                    {trip.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showParticipantFilter && (
            <div className="col-md-6 mb-3">
              <label htmlFor="participantId" className="form-label">
                Participante
              </label>
              <select
                className="form-select"
                id="participantId"
                value={filters.participantId || ''}
                onChange={(e) => handleFilterChange('participantId', e.target.value)}
                disabled={participantsLoading}
              >
                <option value="">Todos os participantes</option>
                {availableParticipants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showStatusFilter && (
            <div className="col-md-6 mb-3">
              <label htmlFor="status" className="form-label">
                Status do Passeio
              </label>
              <select
                className="form-select"
                id="status"
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">Todos os status</option>
                {Object.values(TripStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showPaymentStatusFilter && (
            <div className="col-md-6 mb-3">
              <label htmlFor="paymentStatus" className="form-label">
                Status de Pagamento
              </label>
              <select
                className="form-select"
                id="paymentStatus"
                value={filters.paymentStatus || ''}
                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              >
                <option value="">Todos os status</option>
                {Object.values(PaymentStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showAttendanceStatusFilter && (
            <div className="col-md-6 mb-3">
              <label htmlFor="attendanceStatus" className="form-label">
                Status de Frequência
              </label>
              <select
                className="form-select"
                id="attendanceStatus"
                value={filters.attendanceStatus || ''}
                onChange={(e) => handleFilterChange('attendanceStatus', e.target.value)}
              >
                <option value="">Todos os status</option>
                {Object.values(AttendanceStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-md-12 mb-3">
            <label htmlFor="searchQuery" className="form-label">
              Busca
            </label>
            <input
              type="text"
              className="form-control"
              id="searchQuery"
              placeholder="Buscar por nome, email, etc."
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
