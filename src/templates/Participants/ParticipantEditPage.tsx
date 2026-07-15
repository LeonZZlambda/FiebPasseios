import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import ParticipantForm from '../../components/participants/ParticipantForm';
import { useParticipant, useUpdateParticipant } from '../../hooks/useParticipants';
import { ParticipantFormData } from '../../validations/participant.validation';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
// legacy css removed

export default function ParticipantEditPage(): JSX.Element {
  const navigate = useNavigate();
  const { tripId, participantId } = useParams<{ tripId: string; participantId: string }>();
  const { data: participant, loading, error } = useParticipant(participantId || '');
  const { updateParticipant, loading: updating } = useUpdateParticipant();

  const handleSubmit = async (data: ParticipantFormData) => {
    if (!participantId) return;
    try {
      await updateParticipant(participantId, data);
      toast.success('Participante atualizado com sucesso!');
      navigate(`/trips/${tripId}/participants`);
    } catch (error) {
      toast.error('Erro ao atualizar participante. Tente novamente.');
      console.error('Error updating participant:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/trips/${tripId}/participants`);
  };

  if (loading) {
    return (
      <div>
          <Header goto={`/trips/${tripId}/participants`} title="Editar Participante" logo={logo} />
          <LoadingSpinner message="Carregando participante..." />
        </div>
  );
  }

  if (error || !participant) {
    return (
      <div>
          <Header goto={`/trips/${tripId}/participants`} title="Editar Participante" logo={logo} />
          <div className="alert alert-danger" role="alert">
            {error || 'Participante não encontrado'}
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto={`/trips/${tripId}/participants`} title="Editar Participante" logo={logo} />
        <div className="participant-edit-page">
          <div className="participant-edit-page-info">
            <h3 className="participant-edit-page-title">Editar Participante</h3>
            <p className="participant-edit-page-subtitle">{participant.fullName}</p>
          </div>
          <ParticipantForm
            participant={participant}
            tripId={tripId || ''}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={updating}
          />
        </div>
      </div>
  );
}
