/**
 * Custom hooks for participant data fetching and mutations
 */

import { useState, useEffect, useCallback } from 'react';
import ParticipantService from '../services/ParticipantService';
import {
  Participant,
  CreateParticipantPayload,
  UpdateParticipantPayload,
  TransferParticipantPayload,
  ParticipantListResponse,
  ParticipantFilters,
  CapacityInfo,
  ParticipantDashboardStats,
} from '../types/participant.types';

/**
 * Hook for fetching participants with filtering and pagination
 */
export function useParticipants(
  filters?: ParticipantFilters,
  page: number = 1,
  pageSize: number = 10
) {
  const [data, setData] = useState<ParticipantListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ParticipantService.getAllParticipants(filters, page, pageSize);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch participants');
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  return { data, loading, error, refetch: fetchParticipants };
}

/**
 * Hook for fetching participants for a specific trip
 */
export function useParticipantsByTrip(tripId: string) {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const participants = await ParticipantService.getParticipantsByTripId(tripId);
      setData(participants);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch participants');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      fetchParticipants();
    }
  }, [tripId, fetchParticipants]);

  return { data, loading, error, refetch: fetchParticipants };
}

/**
 * Hook for fetching a single participant by ID
 */
export function useParticipant(id: string) {
  const [data, setData] = useState<Participant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParticipant() {
      setLoading(true);
      setError(null);
      try {
        const participant = await ParticipantService.getParticipantById(id);
        setData(participant);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch participant');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchParticipant();
    }
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for creating a new participant
 */
export function useCreateParticipant() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createParticipant = useCallback(async (participantData: CreateParticipantPayload) => {
    setLoading(true);
    setError(null);
    try {
      const participant = await ParticipantService.createParticipant(participantData);
      return participant;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create participant';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createParticipant, loading, error };
}

/**
 * Hook for updating a participant
 */
export function useUpdateParticipant() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateParticipant = useCallback(async (id: string, participantData: UpdateParticipantPayload) => {
    setLoading(true);
    setError(null);
    try {
      const participant = await ParticipantService.updateParticipant(id, participantData);
      return participant;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update participant';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateParticipant, loading, error };
}

/**
 * Hook for deleting a participant
 */
export function useDeleteParticipant() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteParticipant = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await ParticipantService.deleteParticipant(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete participant';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteParticipant, loading, error };
}

/**
 * Hook for transferring a participant to another trip
 */
export function useTransferParticipant() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transferParticipant = useCallback(async (transferData: TransferParticipantPayload) => {
    setLoading(true);
    setError(null);
    try {
      const participant = await ParticipantService.transferParticipant(transferData);
      return participant;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to transfer participant';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { transferParticipant, loading, error };
}

/**
 * Hook for marking participant attendance
 */
export function useMarkAttendance() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const markAttendance = useCallback(async (id: string, attended: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const participant = await ParticipantService.markAttendance(id, attended);
      return participant;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark attendance';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { markAttendance, loading, error };
}

/**
 * Hook for updating payment status
 */
export function useUpdatePaymentStatus() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updatePaymentStatus = useCallback(async (
    id: string,
    paymentStatus: string,
    paymentAmount?: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const participant = await ParticipantService.updatePaymentStatus(id, paymentStatus, paymentAmount);
      return participant;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment status';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updatePaymentStatus, loading, error };
}

/**
 * Hook for getting trip capacity information
 */
export function useTripCapacity(tripId: string) {
  const [data, setData] = useState<CapacityInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCapacity = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const capacity = await ParticipantService.getTripCapacity(tripId);
      setData(capacity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch capacity');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      fetchCapacity();
    }
  }, [tripId, fetchCapacity]);

  return { data, loading, error, refetch: fetchCapacity };
}

/**
 * Hook for getting participant dashboard statistics
 */
export function useParticipantDashboardStats() {
  const [data, setData] = useState<ParticipantDashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await ParticipantService.getDashboardStatistics();
      setData(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return { data, loading, error, refetch: fetchStatistics };
}

/**
 * Hook for exporting participants
 */
export function useExportParticipants() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const exportParticipants = useCallback(async (tripId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const blob = await ParticipantService.exportParticipants(tripId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = tripId ? `participants-trip-${tripId}.csv` : 'participants-all.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export participants';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportParticipants, loading, error };
}

/**
 * Hook for getting participant count for a trip
 */
export function useParticipantCount(tripId: string) {
  const [data, setData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const count = await ParticipantService.getParticipantCount(tripId);
      setData(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch participant count');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      fetchCount();
    }
  }, [tripId, fetchCount]);

  return { data, loading, error, refetch: fetchCount };
}
