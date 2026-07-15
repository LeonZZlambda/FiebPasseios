/**
 * Custom hooks for trip data fetching and mutations
 */

import { useState, useEffect, useCallback } from 'react';
import TripService from '../services/TripService';
import {
  Trip,
  CreateTripPayload,
  UpdateTripPayload,
  TripFilters,
  TripSort,
  TripListResponse,
  TripStatus,
} from '../types/trip.types';

/**
 * Hook for fetching trips with filtering, sorting, and pagination
 */
export function useTrips(
  filters?: TripFilters,
  page: number = 1,
  pageSize: number = 10,
  sort?: TripSort
) {
  const [data, setData] = useState<TripListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await TripService.getAllTrips(filters, page, pageSize, sort);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize, sort]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return { data, loading, error, refetch: fetchTrips };
}

/**
 * Hook for fetching a single trip by ID
 */
export function useTrip(id: string) {
  const [data, setData] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrip() {
      setLoading(true);
      setError(null);
      try {
        const trip = await TripService.getTripById(id);
        setData(trip);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trip');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTrip();
    }
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for creating a new trip
 */
export function useCreateTrip() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTrip = useCallback(async (tripData: CreateTripPayload) => {
    setLoading(true);
    setError(null);
    try {
      const trip = await TripService.createTrip(tripData);
      return trip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create trip';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTrip, loading, error };
}

/**
 * Hook for updating a trip
 */
export function useUpdateTrip() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateTrip = useCallback(async (id: string, tripData: UpdateTripPayload) => {
    setLoading(true);
    setError(null);
    try {
      const trip = await TripService.updateTrip(id, tripData);
      return trip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update trip';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateTrip, loading, error };
}

/**
 * Hook for deleting a trip
 */
export function useDeleteTrip() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTrip = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await TripService.deleteTrip(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete trip';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteTrip, loading, error };
}

/**
 * Hook for duplicating a trip
 */
export function useDuplicateTrip() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const duplicateTrip = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const trip = await TripService.duplicateTrip(id);
      return trip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to duplicate trip';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { duplicateTrip, loading, error };
}

/**
 * Hook for archiving/unarchiving a trip
 */
export function useArchiveTrip() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const archiveTrip = useCallback(async (id: string, archived: boolean = true) => {
    setLoading(true);
    setError(null);
    try {
      const trip = archived
        ? await TripService.archiveTrip(id)
        : await TripService.unarchiveTrip(id);
      return trip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to archive trip';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { archiveTrip, loading, error };
}

/**
 * Hook for changing trip status
 */
export function useChangeTripStatus() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changeStatus = useCallback(async (id: string, newStatus: TripStatus) => {
    setLoading(true);
    setError(null);
    try {
      const trip = await TripService.changeTripStatus(id, newStatus);
      return trip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change trip status';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { changeStatus, loading, error };
}

/**
 * Hook for getting available status transitions for a trip
 */
export function useAvailableTransitions(id: string) {
  const [data, setData] = useState<TripStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransitions() {
      setLoading(true);
      setError(null);
      try {
        const transitions = await TripService.getAvailableTransitions(id);
        setData(transitions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transitions');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTransitions();
    }
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for updating participant count
 */
export function useUpdateParticipantCount() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCount = useCallback(async (id: string, count: number) => {
    setLoading(true);
    setError(null);
    try {
      const trip = await TripService.updateParticipantCount(id, count);
      return trip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update participant count';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateCount, loading, error };
}

/**
 * Hook for trip statistics
 */
export function useTripStatistics() {
  const [data, setData] = useState<{
    total: number;
    byStatus: Record<TripStatus, number>;
    upcoming: number;
    inProgress: number;
    completed: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await TripService.getTripStatistics();
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
