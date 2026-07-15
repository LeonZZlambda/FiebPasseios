/**
 * Service for fetching dashboard data
 * Aggregates data from trips and participants for dashboard visualization
 */

import http from '../common/http-common';
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

const API_URL = 'dashboard/';

/**
 * Dashboard Service Class
 */
class DashboardService {
  /**
   * Get complete dashboard data
   */
  async getDashboardData(filters?: DashboardFilters): Promise<DashboardData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
        if (filters.status) params.append('status', filters.status);
      }

      const response = await http.mainInstance.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  /**
   * Get dashboard metrics
   */
  async getMetrics(filters?: DashboardFilters): Promise<DashboardMetrics> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
      }

      const response = await http.mainInstance.get(`${API_URL}metrics?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }

  /**
   * Get trip status distribution
   */
  async getTripStatusDistribution(filters?: DashboardFilters): Promise<TripStatusDistribution[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
      }

      const response = await http.mainInstance.get(
        `${API_URL}trip-status-distribution?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching trip status distribution:', error);
      throw error;
    }
  }

  /**
   * Get participant counts per trip
   */
  async getTripParticipantCounts(filters?: DashboardFilters): Promise<TripParticipantCount[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
      }

      const response = await http.mainInstance.get(
        `${API_URL}trip-participant-counts?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching trip participant counts:', error);
      throw error;
    }
  }

  /**
   * Get monthly registrations
   */
  async getMonthlyRegistrations(filters?: DashboardFilters): Promise<MonthlyRegistration[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
      }

      const response = await http.mainInstance.get(`${API_URL}monthly-registrations?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly registrations:', error);
      throw error;
    }
  }

  /**
   * Get upcoming trips
   */
  async getUpcomingTrips(limit: number = 5): Promise<UpcomingTrip[]> {
    try {
      const response = await http.mainInstance.get(`${API_URL}upcoming-trips?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming trips:', error);
      throw error;
    }
  }

  /**
   * Get recent registrations
   */
  async getRecentRegistrations(limit: number = 5): Promise<RecentRegistration[]> {
    try {
      const response = await http.mainInstance.get(`${API_URL}recent-registrations?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent registrations:', error);
      throw error;
    }
  }

  /**
   * Export dashboard data
   */
  async exportDashboardData(format: 'csv' | 'json' = 'csv'): Promise<Blob> {
    try {
      const response = await http.mainInstance.get(`${API_URL}export?format=${format}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting dashboard data:', error);
      throw error;
    }
  }
}

export default new DashboardService();
