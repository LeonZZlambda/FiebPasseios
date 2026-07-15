/**
 * Custom hooks for dashboard data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import DashboardService from '../services/DashboardService';
import {
  DashboardData,
  DashboardMetrics,
  TripStatusDistribution,
  TripParticipantCount,
  MonthlyRegistration,
  UpcomingTrip,
  RecentRegistration,
  DashboardFilters,
} from '../types/dashboard.types';

/**
 * Hook for fetching complete dashboard data
 */
export function useDashboardData(filters?: DashboardFilters) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dashboardData = await DashboardService.getDashboardData(filters);
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [filters?.timeRange, filters?.status]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { data, loading, error, refetch: fetchDashboardData };
}

/**
 * Hook for fetching dashboard metrics
 */
export function useDashboardMetrics(filters?: DashboardFilters) {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const metrics = await DashboardService.getMetrics(filters);
      setData(metrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  }, [filters?.timeRange]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { data, loading, error, refetch: fetchMetrics };
}

/**
 * Hook for fetching trip status distribution
 */
export function useTripStatusDistribution(filters?: DashboardFilters) {
  const [data, setData] = useState<TripStatusDistribution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDistribution = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const distribution = await DashboardService.getTripStatusDistribution(filters);
      setData(distribution);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trip status distribution');
    } finally {
      setLoading(false);
    }
  }, [filters?.timeRange]);

  useEffect(() => {
    fetchDistribution();
  }, [fetchDistribution]);

  return { data, loading, error, refetch: fetchDistribution };
}

/**
 * Hook for fetching trip participant counts
 */
export function useTripParticipantCounts(filters?: DashboardFilters) {
  const [data, setData] = useState<TripParticipantCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const counts = await DashboardService.getTripParticipantCounts(filters);
      setData(counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trip participant counts');
    } finally {
      setLoading(false);
    }
  }, [filters?.timeRange]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return { data, loading, error, refetch: fetchCounts };
}

/**
 * Hook for fetching monthly registrations
 */
export function useMonthlyRegistrations(filters?: DashboardFilters) {
  const [data, setData] = useState<MonthlyRegistration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const registrations = await DashboardService.getMonthlyRegistrations(filters);
      setData(registrations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch monthly registrations');
    } finally {
      setLoading(false);
    }
  }, [filters?.timeRange]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return { data, loading, error, refetch: fetchRegistrations };
}

/**
 * Hook for fetching upcoming trips
 */
export function useUpcomingTrips(limit: number = 5) {
  const [data, setData] = useState<UpcomingTrip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const trips = await DashboardService.getUpcomingTrips(limit);
      setData(trips);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch upcoming trips');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchUpcomingTrips();
  }, [fetchUpcomingTrips]);

  return { data, loading, error, refetch: fetchUpcomingTrips };
}

/**
 * Hook for fetching recent registrations
 */
export function useRecentRegistrations(limit: number = 5) {
  const [data, setData] = useState<RecentRegistration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const registrations = await DashboardService.getRecentRegistrations(limit);
      setData(registrations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent registrations');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecentRegistrations();
  }, [fetchRecentRegistrations]);

  return { data, loading, error, refetch: fetchRecentRegistrations };
}

/**
 * Hook for exporting dashboard data
 */
export function useExportDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const exportData = useCallback(async (format: 'csv' | 'json' = 'csv') => {
    setLoading(true);
    setError(null);
    try {
      const blob = await DashboardService.exportDashboardData(format);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-data.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export dashboard data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportData, loading, error };
}
