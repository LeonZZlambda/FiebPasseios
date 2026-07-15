/**
 * Custom hooks for report data fetching and export operations
 */

import { useState, useEffect, useCallback } from 'react';
import ReportService from '../services/ReportService';
import {
  ReportType,
  ExportFormat,
  ReportFilters,
  TripSummaryReport,
  ParticipantReport,
  AttendanceReport,
  FinancialReport,
  OccupancyReport,
  ReportAnalytics,
  ReportData,
} from '../types/report.types';

/**
 * Hook for fetching trip summary report
 */
export function useTripSummaryReport(filters?: ReportFilters) {
  const [data, setData] = useState<ReportData<TripSummaryReport> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await ReportService.getTripSummaryReport(filters);
      setData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trip summary report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

/**
 * Hook for fetching participant report
 */
export function useParticipantReport(filters?: ReportFilters) {
  const [data, setData] = useState<ReportData<ParticipantReport> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await ReportService.getParticipantReport(filters);
      setData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch participant report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

/**
 * Hook for fetching attendance report
 */
export function useAttendanceReport(filters?: ReportFilters) {
  const [data, setData] = useState<ReportData<AttendanceReport> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await ReportService.getAttendanceReport(filters);
      setData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendance report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

/**
 * Hook for fetching financial report
 */
export function useFinancialReport(filters?: ReportFilters) {
  const [data, setData] = useState<FinancialReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await ReportService.getFinancialReport(filters);
      setData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch financial report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

/**
 * Hook for fetching occupancy report
 */
export function useOccupancyReport(filters?: ReportFilters) {
  const [data, setData] = useState<ReportData<OccupancyReport> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await ReportService.getOccupancyReport(filters);
      setData(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch occupancy report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

/**
 * Hook for fetching report analytics
 */
export function useReportAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<ReportAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const analytics = await ReportService.getReportAnalytics(filters);
      setData(analytics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report analytics');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}

/**
 * Hook for exporting reports
 */
export function useExportReport() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const exportReport = useCallback(async (
    reportType: ReportType,
    format: ExportFormat,
    filters?: ReportFilters
  ) => {
    setLoading(true);
    setError(null);
    try {
      const blob = await ReportService.exportReport(reportType, format, filters);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const extension = format === ExportFormat.CSV ? 'csv' : format === ExportFormat.EXCEL ? 'xlsx' : 'pdf';
      a.download = `${reportType.toLowerCase()}-report.${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export report';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportReport, loading, error };
}

/**
 * Hook for generating printable reports
 */
export function usePrintableReport() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrintableReport = useCallback(async (
    reportType: ReportType,
    filters?: ReportFilters
  ) => {
    setLoading(true);
    setError(null);
    try {
      const printContent = await ReportService.generatePrintableReport(reportType, filters);
      
      // Open print window
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate printable report';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generatePrintableReport, loading, error };
}

/**
 * Hook for getting available trips for filtering
 */
export function useAvailableTrips() {
  const [data, setData] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      setError(null);
      try {
        const response = await ReportService.getAvailableTrips();
        // Support both array response or object with data field
        const tripsArray = Array.isArray(response) ? response : (response && (response as any).data ? (response as any).data : []);
        setData(tripsArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch available trips');
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for getting available participants for filtering
 */
export function useAvailableParticipants() {
  const [data, setData] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParticipants() {
      setLoading(true);
      setError(null);
      try {
        const response = await ReportService.getAvailableParticipants();
        const participantsArray = Array.isArray(response) ? response : (response && (response as any).data ? (response as any).data : []);
        setData(participantsArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch available participants');
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, []);

  return { data, loading, error };
}
