/**
 * Service for managing trip operations
 * Handles all CRUD operations and business logic for trips
 */

import http from '../common/http-common';
import {
  Trip,
  CreateTripPayload,
  UpdateTripPayload,
  TripListResponse,
  TripFilters,
  TripSort,
  TripStatus,
  isValidStatusTransition,
} from '../types/trip.types';

const API_URL = 'trips/';

/**
 * Trip Service Class
 */
class TripService {
  /**
   * Get all trips with optional filters and pagination
   */
  async getAllTrips(
    filters?: TripFilters,
    page: number = 1,
    pageSize: number = 10,
    sort?: TripSort
  ): Promise<TripListResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      if (filters) {
        if (filters.status) params.append('status', filters.status);
        if (filters.destination) params.append('destination', filters.destination);
        if (filters.coordinator) params.append('coordinator', filters.coordinator);
        if (filters.transportType) params.append('transportType', filters.transportType);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.archived !== undefined) params.append('archived', filters.archived.toString());
      }

      if (sort) {
        params.append('sortBy', sort.field);
        params.append('sortOrder', sort.direction);
      }

      const response = await http.mainInstance.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  }

  /**
   * Get a single trip by ID
   */
  async getTripById(id: string): Promise<Trip> {
    try {
      const response = await http.mainInstance.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new trip
   */
  async createTrip(tripData: CreateTripPayload): Promise<Trip> {
    try {
      const response = await http.mainInstance.post(API_URL, tripData);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }

  /**
   * Update an existing trip
   */
  async updateTrip(id: string, tripData: UpdateTripPayload): Promise<Trip> {
    try {
      const response = await http.mainInstance.put(`${API_URL}${id}`, tripData);
      return response.data;
    } catch (error) {
      console.error(`Error updating trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a trip
   */
  async deleteTrip(id: string): Promise<void> {
    try {
      await http.mainInstance.delete(`${API_URL}${id}`);
    } catch (error) {
      console.error(`Error deleting trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Duplicate a trip
   */
  async duplicateTrip(id: string): Promise<Trip> {
    try {
      const response = await http.mainInstance.post(`${API_URL}${id}/duplicate`);
      return response.data;
    } catch (error) {
      console.error(`Error duplicating trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Archive a trip
   */
  async archiveTrip(id: string): Promise<Trip> {
    try {
      const response = await http.mainInstance.patch(`${API_URL}${id}/archive`, {
        archived: true,
      });
      return response.data;
    } catch (error) {
      console.error(`Error archiving trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Unarchive a trip
   */
  async unarchiveTrip(id: string): Promise<Trip> {
    try {
      const response = await http.mainInstance.patch(`${API_URL}${id}/archive`, {
        archived: false,
      });
      return response.data;
    } catch (error) {
      console.error(`Error unarchiving trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Change trip status with validation
   */
  async changeTripStatus(id: string, newStatus: TripStatus): Promise<Trip> {
    try {
      // First, get the current trip to validate the transition
      const currentTrip = await this.getTripById(id);

      // Validate the status transition
      if (!isValidStatusTransition(currentTrip.status, newStatus)) {
        throw new Error(
          `Invalid status transition from ${currentTrip.status} to ${newStatus}`
        );
      }

      const response = await http.mainInstance.patch(`${API_URL}${id}/status`, {
        status: newStatus,
      });
      return response.data;
    } catch (error) {
      console.error(`Error changing status for trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get available status transitions for a trip
   */
  async getAvailableTransitions(id: string): Promise<TripStatus[]> {
    try {
      const trip = await this.getTripById(id);
      const transitions: TripStatus[] = [];

      for (const status of Object.values(TripStatus)) {
        if (isValidStatusTransition(trip.status, status)) {
          transitions.push(status);
        }
      }

      return transitions;
    } catch (error) {
      console.error(`Error getting transitions for trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Update participant count for a trip
   */
  async updateParticipantCount(id: string, count: number): Promise<Trip> {
    try {
      const response = await http.mainInstance.patch(`${API_URL}${id}/participants`, {
        currentParticipants: count,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating participant count for trip ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get trip statistics
   */
  async getTripStatistics(): Promise<{
    total: number;
    byStatus: Record<TripStatus, number>;
    upcoming: number;
    inProgress: number;
    completed: number;
  }> {
    try {
      const response = await http.mainInstance.get(`${API_URL}statistics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip statistics:', error);
      throw error;
    }
  }
}

export default new TripService();
