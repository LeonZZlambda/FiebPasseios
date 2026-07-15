import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import TripDetail from '../../components/trips/TripDetail';
import { useTrip } from '../../hooks/useTrips';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
// legacy css removed

export default function TripDetailPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: trip, loading, error } = useTrip(id || '');

  const handleEdit = () => {
    navigate(`/trips/${id}/edit`);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div>
          <Header goto="/trips" title="Detalhes do Passeio" logo={logo} />
          <LoadingSpinner message="Carregando detalhes do passeio..." />
        </div>
  );
  }

  if (error || !trip) {
    return (
      <div>
          <Header goto="/trips" title="Detalhes do Passeio" logo={logo} />
          <div className="alert alert-danger" role="alert">
            {error || 'Passeio não encontrado'}
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto="/trips" title="Detalhes do Passeio" logo={logo} />
        <div className="trip-detail-page">
          <TripDetail trip={trip} loading={loading} onEdit={handleEdit} onRefresh={handleRefresh} />
        </div>
      </div>
  );
}
