import React, { useState } from 'react';
import { Trip, TripFilters, TripSort, TripStatus, TransportType } from '../../types/trip.types';
import { getTripStatusLabel, getTransportTypeLabel } from '../../types/trip.types';
import TripCard from './TripCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useDeleteTrip, useDuplicateTrip, useArchiveTrip } from '../../hooks/useTrips';
import './TripList.css';

interface TripListProps {
  trips: Trip[];
  loading: boolean;
  onEdit: (trip: Trip) => void;
  onRefresh: () => void;
  onFilterChange?: (filters: TripFilters) => void;
  onSortChange?: (sort: TripSort) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

export default function TripList({
  trips,
  loading,
  onEdit,
  onRefresh,
  onFilterChange,
  onSortChange,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: TripListProps): JSX.Element {
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; trip: Trip | null }>({
    isOpen: false,
    trip: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TripStatus | ''>('');
  const [sortField, setSortField] = useState<keyof Trip>('departureDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { deleteTrip, loading: deleting } = useDeleteTrip();
  const { duplicateTrip, loading: duplicating } = useDuplicateTrip();
  const { archiveTrip, loading: archiving } = useArchiveTrip();

  const handleDelete = (trip: Trip) => {
    setDeleteDialog({ isOpen: true, trip });
  };

  const confirmDelete = async () => {
    if (deleteDialog.trip) {
      try {
        await deleteTrip(deleteDialog.trip.id);
        setDeleteDialog({ isOpen: false, trip: null });
        onRefresh();
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  const handleArchive = async (trip: Trip) => {
    try {
      await archiveTrip(trip.id, !trip.archived);
      onRefresh();
    } catch (error) {
      console.error('Error archiving trip:', error);
    }
  };

  const handleDuplicate = async (trip: Trip) => {
    try {
      await duplicateTrip(trip.id);
      onRefresh();
    } catch (error) {
      console.error('Error duplicating trip:', error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (onFilterChange) {
      onFilterChange({ searchQuery: value, status: statusFilter || undefined });
    }
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as TripStatus | '');
    if (onFilterChange) {
      onFilterChange({ searchQuery, status: (value as TripStatus) || undefined });
    }
  };

  const handleSort = (field: keyof Trip) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    if (onSortChange) {
      onSortChange({ field, direction: newDirection });
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = !searchQuery || 
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  if (loading) {
    return <LoadingSpinner message="Carregando passeios..." />;
  }

  if (!trips || trips.length === 0) {
    return (
      <EmptyState
        icon="🚌"
        title="Nenhum passeio encontrado"
        message="Não há passeios cadastrados no momento. Crie um novo passeio para começar."
      />
    );
  }

  if (sortedTrips.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Nenhum resultado encontrado"
        message="Não há passeios que correspondam aos filtros selecionados."
      />
    );
  }

  return (
    <>
      <div className="trip-list-controls">
        <div className="trip-search">
          <input
            type="text"
            className="input"
            placeholder="Buscar por título ou destino..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        
        <div className="trip-filters">
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
          >
            <option value="">Todos os status</option>
            {Object.values(TripStatus).map((status) => (
              <option key={status} value={status}>
                {getTripStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>

        <div className="trip-sort">
          <select
            className="select"
            value={`${sortField}-${sortDirection}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-') as [keyof Trip, 'asc' | 'desc'];
              handleSort(field);
            }}
          >
            <option value="departureDate-asc">Data de Partida (crescente)</option>
            <option value="departureDate-desc">Data de Partida (decrescente)</option>
            <option value="title-asc">Título (A-Z)</option>
            <option value="title-desc">Título (Z-A)</option>
            <option value="price-asc">Preço (menor)</option>
            <option value="price-desc">Preço (maior)</option>
          </select>
        </div>
      </div>

      <div className="trip-list">
        {sortedTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onEdit={onEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onArchive={handleArchive}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="trip-pagination">
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Excluir Passeio"
        message={`Tem certeza que deseja excluir o passeio "${deleteDialog.trip?.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, trip: null })}
      />
    </>
  );
}
