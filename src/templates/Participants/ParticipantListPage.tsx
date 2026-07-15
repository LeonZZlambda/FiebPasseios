import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import ParticipantList from '../../components/participants/ParticipantList';
import CapacityIndicator from '../../components/participants/CapacityIndicator';
import { useParticipantsByTrip, useTripCapacity, useExportParticipants } from '../../hooks/useParticipants';
import { useTrip } from '../../hooks/useTrips';
import { Participant } from '../../types/participant.types';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
// legacy css removed

export default function ParticipantListPage(): JSX.Element {
  const navigate = useNavigate();
  const { tripId } = useParams<{ tripId: string }>();
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  
  const { data: trip, loading: tripLoading } = useTrip(tripId || '');
  const { data: participants, loading: participantsLoading, refetch } = useParticipantsByTrip(tripId || '');
  const { data: capacity, loading: capacityLoading } = useTripCapacity(tripId || '');
  const { exportParticipants, loading: exporting } = useExportParticipants();

  const handleEdit = (participant: Participant) => {
    navigate(`/trips/${tripId}/participants/${participant.id}/edit`);
  };

  const handleRegisterNew = () => {
    navigate(`/trips/${tripId}/participants/create`);
  };

  const handleExport = async () => {
    try {
      await exportParticipants(tripId);
      toast.success('Lista de participantes exportada com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar lista de participantes.');
      console.error('Error exporting participants:', error);
    }
  };

  if (tripLoading || participantsLoading || capacityLoading) {
    return (
      <div>
          <Header goto={`/trips/${tripId}`} title="Participantes" logo={logo} />
          <LoadingSpinner message="Carregando participantes..." />
        </div>
  );
  }

  if (!trip) {
    return (
      <div>
          <Header goto="/trips" title="Participantes" logo={logo} />
          <div className="alert alert-danger" role="alert">
            Passeio não encontrado
          </div>
        </div>
  );
  }

  return (
    <div>
        <Header goto={`/trips/${tripId}`} title={`Participantes - ${trip.title}`} logo={logo} />
        <div className="participant-list-page">
          <div className="participant-list-page-header">
            <div className="participant-list-page-info">
              <h3 className="participant-list-page-title">Gerenciamento de Participantes</h3>
              <p className="participant-list-page-subtitle">{trip.title}</p>
            </div>
            <div className="participant-list-page-actions">
              <button className="btn btn-primary" onClick={handleRegisterNew}>
                <i className="bi bi-plus-circle me-2"></i>
                Novo Participante
              </button>
              <button className="btn btn-outline-secondary" onClick={handleExport} disabled={exporting}>
                <i className="bi bi-download me-2"></i>
                {exporting ? 'Exportando...' : 'Exportar'}
              </button>
            </div>
          </div>

          {capacity && (
            <div className="participant-list-page-capacity">
              <CapacityIndicator capacity={capacity} showDetails={true} size="large" />
            </div>
          )}

          <ParticipantList
            participants={participants}
            loading={participantsLoading}
            onEdit={handleEdit}
            onRefresh={refetch}
          />
        </div>
      </div>
  );
}
