import React, { useState } from 'react';
import { Participant } from '../../types/participant.types';
import ParticipantCard from './ParticipantCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useDeleteParticipant, useMarkAttendance } from '../../hooks/useParticipants';
import './ParticipantList.css';

interface ParticipantListProps {
  participants: Participant[];
  loading: boolean;
  onEdit: (participant: Participant) => void;
  onRefresh: () => void;
}

export default function ParticipantList({
  participants,
  loading,
  onEdit,
  onRefresh,
}: ParticipantListProps): JSX.Element {
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; participant: Participant | null }>({
    isOpen: false,
    participant: null,
  });

  const { deleteParticipant, loading: deleting } = useDeleteParticipant();
  const { markAttendance, loading: markingAttendance } = useMarkAttendance();

  const handleDelete = (participant: Participant) => {
    setDeleteDialog({ isOpen: true, participant });
  };

  const confirmDelete = async () => {
    if (deleteDialog.participant) {
      try {
        await deleteParticipant(deleteDialog.participant.id);
        setDeleteDialog({ isOpen: false, participant: null });
        onRefresh();
      } catch (error) {
        console.error('Error deleting participant:', error);
      }
    }
  };

  const handleMarkAttendance = async (participant: Participant, attended: boolean) => {
    try {
      await markAttendance(participant.id, attended);
      onRefresh();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Carregando participantes..." />;
  }

  if (!participants || participants.length === 0) {
    return (
      <EmptyState
        icon="👥"
        title="Nenhum participante encontrado"
        message="Não há participantes cadastrados neste passeio. Adicione participantes para começar."
      />
    );
  }

  return (
    <>
      <div className="participant-list">
        {participants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            onEdit={onEdit}
            onDelete={handleDelete}
            onMarkAttendance={handleMarkAttendance}
          />
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Excluir Participante"
        message={`Tem certeza que deseja excluir o participante "${deleteDialog.participant?.fullName}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, participant: null })}
      />
    </>
  );
}
