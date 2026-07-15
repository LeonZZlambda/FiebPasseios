/**
 * Service for managing participant operations
 * Handles all CRUD operations and business logic for participants
 */

import http from '../common/http-common';
import {
  Participant,
  CreateParticipantPayload,
  UpdateParticipantPayload,
  TransferParticipantPayload,
  ParticipantListResponse,
  ParticipantFilters,
  CapacityInfo,
  ParticipantDashboardStats,
  calculateCapacityInfo,
  canRegisterParticipant,
} from '../types/participant.types';
import TripService from './TripService';

const API_URL = 'participants/';

/**
 * Participant Service Class
 */
class ParticipantService {
  /**
   * Get all participants with optional filters and pagination
   */
  async getAllParticipants(
    filters?: ParticipantFilters,
    page: number = 1,
    pageSize: number = 10
  ): Promise<ParticipantListResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      if (filters) {
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.attendanceStatus) params.append('attendanceStatus', filters.attendanceStatus);
        if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);
      }

      const response = await http.mainInstance.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
  }

  /**
   * Get a single participant by ID
   */
  async getParticipantById(id: string): Promise<Participant> {
    try {
      const response = await http.mainInstance.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching participant ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get participants for a specific trip
   */
  async getParticipantsByTripId(tripId: string): Promise<Participant[]> {
    try {
      const response = await http.mainInstance.get(`${API_URL}trip/${tripId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching participants for trip ${tripId}:`, error);
      throw error;
    }
  }

  /**
   * Create a new participant
   */
  async createParticipant(participantData: CreateParticipantPayload): Promise<Participant> {
    try {
      // First check capacity
      const capacityInfo = await this.getTripCapacity(participantData.tripId);
      
      if (!canRegisterParticipant(capacityInfo.maximumCapacity, capacityInfo.currentParticipants)) {
        throw new Error('Trip capacity has been reached. Cannot register more participants.');
      }

      const response = await http.mainInstance.post(API_URL, participantData);
      
      // Check if trip should be marked as full after registration
      await this.checkAndUpdateTripStatus(participantData.tripId);
      
      return response.data;
    } catch (error) {
      console.error('Error creating participant:', error);
      throw error;
    }
  }

  /**
   * Update an existing participant
   */
  async updateParticipant(id: string, participantData: UpdateParticipantPayload): Promise<Participant> {
    try {
      const response = await http.mainInstance.put(`${API_URL}${id}`, participantData);
      return response.data;
    } catch (error) {
      console.error(`Error updating participant ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a participant
   */
  async deleteParticipant(id: string): Promise<void> {
    try {
      const participant = await this.getParticipantById(id);
      await http.mainInstance.delete(`${API_URL}${id}`);
      
      // Check if trip should be unmarked as full after deletion
      await this.checkAndUpdateTripStatus(participant.tripId);
    } catch (error) {
      console.error(`Error deleting participant ${id}:`, error);
      throw error;
    }
  }

  /**
   * Transfer a participant to another trip
   */
  async transferParticipant(transferData: TransferParticipantPayload): Promise<Participant> {
    try {
      // Check capacity of destination trip
      const destinationCapacity = await this.getTripCapacity(transferData.toTripId);
      
      if (!canRegisterParticipant(destinationCapacity.maximumCapacity, destinationCapacity.currentParticipants)) {
        throw new Error('Destination trip capacity has been reached. Cannot transfer participant.');
      }

      const response = await http.mainInstance.post(`${API_URL}transfer`, transferData);
      
      // Update status for both trips
      await this.checkAndUpdateTripStatus(transferData.fromTripId);
      await this.checkAndUpdateTripStatus(transferData.toTripId);
      
      return response.data;
    } catch (error) {
      console.error('Error transferring participant:', error);
      throw error;
    }
  }

  /**
   * Mark participant attendance
   */
  async markAttendance(id: string, attended: boolean): Promise<Participant> {
    try {
      const response = await http.mainInstance.patch(`${API_URL}${id}/attendance`, {
        attended,
      });
      return response.data;
    } catch (error) {
      console.error(`Error marking attendance for participant ${id}:`, error);
      throw error;
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(id: string, paymentStatus: string, paymentAmount?: number): Promise<Participant> {
    try {
      const response = await http.mainInstance.patch(`${API_URL}${id}/payment`, {
        paymentStatus,
        paymentAmount,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating payment status for participant ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get capacity information for a trip
   */
  async getTripCapacity(tripId: string): Promise<CapacityInfo> {
    try {
      const response = await http.mainInstance.get(`${API_URL}capacity/${tripId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching capacity for trip ${tripId}:`, error);
      throw error;
    }
  }

  /**
   * Check and update trip status based on capacity
   */
  private async checkAndUpdateTripStatus(tripId: string): Promise<void> {
    try {
      const capacityInfo = await this.getTripCapacity(tripId);
      
      if (capacityInfo.isFull) {
        // Trip should be marked as FULL
        await TripService.changeTripStatus(tripId, 'FULL' as any);
      } else {
        // Trip should be unmarked from FULL if it was FULL
        // This would require getting the current trip status and updating accordingly
        // For now, we'll leave this as the service layer should handle this logic
      }
    } catch (error) {
      console.error(`Error checking/updating trip status for ${tripId}:`, error);
      // Don't throw here as this is a secondary operation
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStatistics(): Promise<ParticipantDashboardStats> {
    try {
      const response = await http.mainInstance.get(`${API_URL}statistics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      throw error;
    }
  }

  /**
   * Export participant list to CSV
   */
  async exportParticipants(tripId?: string): Promise<Blob> {
    try {
      const params = tripId ? `?tripId=${tripId}` : '';
      const response = await http.mainInstance.get(`${API_URL}export${params}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting participants:', error);
      throw error;
    }
  }

  /**
   * Get participant count for a trip
   */
  async getParticipantCount(tripId: string): Promise<number> {
    try {
      const response = await http.mainInstance.get(`${API_URL}count/${tripId}`);
      return response.data.count;
    } catch (error) {
      console.error(`Error fetching participant count for trip ${tripId}:`, error);
      throw error;
    }
  }

  /**
   * Batch register participants
   */
  async batchRegisterParticipants(participants: CreateParticipantPayload[]): Promise<Participant[]> {
    try {
      const response = await http.mainInstance.post(`${API_URL}batch`, { participants });
      return response.data;
    } catch (error) {
      console.error('Error batch registering participants:', error);
      throw error;
    }
  }
}

export default new ParticipantService();
