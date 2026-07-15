/**
 * Service for reporting and export functionality
 * Handles data fetching for various report types and export operations
 */

import http from '../common/http-common';
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

const API_URL = 'reports/';

/**
 * Report Service Class
 */
class ReportService {
  /**
   * Get trip summary report
   */
  async getTripSummaryReport(filters?: ReportFilters): Promise<ReportData<TripSummaryReport>> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.status) params.append('status', filters.status);
      }

      const response = await http.mainInstance.get(`${API_URL}trip-summary?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip summary report:', error);
      throw error;
    }
  }

  /**
   * Get participant report
   */
  async getParticipantReport(filters?: ReportFilters): Promise<ReportData<ParticipantReport>> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.participantId) params.append('participantId', filters.participantId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.attendanceStatus) params.append('attendanceStatus', filters.attendanceStatus);
        if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);
      }

      const response = await http.mainInstance.get(`${API_URL}participant?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching participant report:', error);
      throw error;
    }
  }

  /**
   * Get attendance report
   */
  async getAttendanceReport(filters?: ReportFilters): Promise<ReportData<AttendanceReport>> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.attendanceStatus) params.append('attendanceStatus', filters.attendanceStatus);
      }

      const response = await http.mainInstance.get(`${API_URL}attendance?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance report:', error);
      throw error;
    }
  }

  /**
   * Get financial report
   */
  async getFinancialReport(filters?: ReportFilters): Promise<FinancialReport> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
      }

      const response = await http.mainInstance.get(`${API_URL}financial?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching financial report:', error);
      throw error;
    }
  }

  /**
   * Get occupancy report
   */
  async getOccupancyReport(filters?: ReportFilters): Promise<ReportData<OccupancyReport>> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.status) params.append('status', filters.status);
      }

      const response = await http.mainInstance.get(`${API_URL}occupancy?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching occupancy report:', error);
      throw error;
    }
  }

  /**
   * Get report analytics
   */
  async getReportAnalytics(filters?: ReportFilters): Promise<ReportAnalytics> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
      }

      const response = await http.mainInstance.get(`${API_URL}analytics?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching report analytics:', error);
      throw error;
    }
  }

  /**
   * Export report to specified format
   */
  async exportReport(
    reportType: ReportType,
    format: ExportFormat,
    filters?: ReportFilters
  ): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      params.append('reportType', reportType);
      params.append('format', format);

      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.status) params.append('status', filters.status);
        if (filters.participantId) params.append('participantId', filters.participantId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.attendanceStatus) params.append('attendanceStatus', filters.attendanceStatus);
      }

      const response = await http.mainInstance.get(`${API_URL}export?${params.toString()}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting report:', error);
      throw error;
    }
  }

  /**
   * Generate printable report
   */
  async generatePrintableReport(
    reportType: ReportType,
    filters?: ReportFilters
  ): Promise<string> {
    try {
      const params = new URLSearchParams();
      params.append('reportType', reportType);

      if (filters) {
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.status) params.append('status', filters.status);
        if (filters.participantId) params.append('participantId', filters.participantId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.attendanceStatus) params.append('attendanceStatus', filters.attendanceStatus);
      }

      const response = await http.mainInstance.get(`${API_URL}print?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error generating printable report:', error);
      throw error;
    }
  }

  /**
   * Get available trips for filtering
   */
  async getAvailableTrips(): Promise<Array<{ id: string; name: string }>> {
    try {
      const response = await http.mainInstance.get(`${API_URL}trips`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available trips:', error);
      throw error;
    }
  }

  /**
   * Get available participants for filtering
   */
  async getAvailableParticipants(): Promise<Array<{ id: string; name: string }>> {
    try {
      const response = await http.mainInstance.get(`${API_URL}participants`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available participants:', error);
      throw error;
    }
  }
}

export default new ReportService();
