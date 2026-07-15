import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import TripList from '../../components/trips/TripList';
import { useTrips } from '../../hooks/useTrips';
import { Trip } from '../../types/trip.types';
import './TripListPage.css';

export default function TripListPage(): JSX.Element {
  const navigate = useNavigate();
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const { data, loading, error, refetch } = useTrips();

  const handleEdit = (trip: Trip) => {
    navigate(`/trips/${trip.id}/edit`);
  };

  const handleCreateNew = () => {
    navigate('/trips/create');
  };

  return (
    <div>
        <Header goto="/home" title="Gerenciamento de Passeios" logo={logo} />
        <div className="trip-list-page">
          <div className="trip-list-page-header">
            <h3 className="trip-list-page-title">Passeios Educacionais</h3>
            <button className="btn btn-primary" onClick={handleCreateNew}>
              <i className="bi bi-plus-circle me-2"></i>
              Novo Passeio
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              Erro ao carregar passeios: {error}
            </div>
          )}

          <div className="trip-list-content">
            <TripList
              trips={data?.data || []}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={refetch}
            />
          </div>
        </div>
      </div>
  );
}
