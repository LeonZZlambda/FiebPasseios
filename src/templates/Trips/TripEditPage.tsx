import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import TripForm from '../../components/trips/TripForm';
import { useTrip, useUpdateTrip } from '../../hooks/useTrips';
import { TripFormData } from '../../validations/trip.validation';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
// legacy css removed

export default function TripEditPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: trip, loading, error } = useTrip(id || '');
  const { updateTrip, loading: updating } = useUpdateTrip();

  const handleSubmit = async (data: TripFormData) => {
    if (!id) return;
    try {
      await updateTrip(id, data);
      toast.success('Passeio atualizado com sucesso!');
      navigate(`/trips/${id}`);
    } catch (error) {
      toast.error('Erro ao atualizar passeio. Tente novamente.');
      console.error('Error updating trip:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/trips/${id}`);
  };

  if (loading) {
    return (
      <div>
          <Header goto="/trips" title="Editar Passeio" logo={logo} />
          <LoadingSpinner message="Carregando passeio..." />
        </div>
  );
  }

  if (error || !trip) {
    return (
      <div>
          <Header goto="/trips" title="Editar Passeio" logo={logo} />
          <div className="alert alert-danger" role="alert">
            {error || 'Passeio não encontrado'}
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto={`/trips/${id}`} title="Editar Passeio" logo={logo} />
        <div className="trip-edit-page">
          <TripForm
            trip={trip}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={updating}
          />
        </div>
      </div>
  );
}
