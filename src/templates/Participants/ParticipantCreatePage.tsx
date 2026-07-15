import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import ParticipantForm from '../../components/participants/ParticipantForm';
import { useCreateParticipant } from '../../hooks/useParticipants';
import { ParticipantFormData } from '../../validations/participant.validation';
import { toast } from 'react-hot-toast';
import { useTrip } from '../../hooks/useTrips';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
// legacy css removed

export default function ParticipantCreatePage(): JSX.Element {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const { data: trip, loading } = useTrip(tripId || '');
  const { createParticipant, loading: creating } = useCreateParticipant();

  const handleSubmit = async (data: ParticipantFormData) => {
    try {
      await createParticipant(data);
      toast.success('Participante registrado com sucesso!');
      navigate(`/trips/${tripId}/participants`);
    } catch (error) {
      toast.error('Erro ao registrar participante. Tente novamente.');
      console.error('Error creating participant:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/trips/${tripId}/participants`);
  };

  if (loading) {
    return (
      <div>
          <Header goto={`/trips/${tripId}/participants`} title="Registrar Participante" logo={logo} />
          <LoadingSpinner message="Carregando..." />
        </div>
  );
  }

  if (!trip) {
    return (
      <div>
          <Header goto="/trips" title="Registrar Participante" logo={logo} />
          <div className="alert alert-danger" role="alert">
            Passeio não encontrado
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto={`/trips/${tripId}/participants`} title="Registrar Participante" logo={logo} />
        <div className="participant-create-page">
          <div className="participant-create-page-info">
            <h3 className="participant-create-page-title">Registrar Novo Participante</h3>
            <p className="participant-create-page-subtitle">Passeio: {trip.title}</p>
          </div>
          <ParticipantForm
            tripId={tripId || ''}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={creating}
          />
        </div>
      </div>
  );
}
