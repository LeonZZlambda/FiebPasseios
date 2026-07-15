/**
 * Service for payment management
 * Handles CRUD operations, financial calculations, and reporting
 */

import http from '../common/http-common';
import {
  Payment,
  CreatePaymentPayload,
  UpdatePaymentPayload,
  PaymentFilters,
  PaymentListResponse,
  OutstandingBalance,
  FinancialSummary,
  PaymentHistory,
  PaymentSummary,
  PaymentStatus,
} from '../types/payment.types';

const API_URL = 'payments/';

/**
 * Payment Service Class
 */
class PaymentService {
  /**
   * Get all payments with filters and pagination
   */
  async getAllPayments(
    filters?: PaymentFilters,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaymentListResponse> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.participantId) params.append('participantId', filters.participantId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);
      }
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      const response = await http.mainInstance.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  /**
   * Get a single payment by ID
   */
  async getPaymentById(id: string): Promise<Payment> {
    try {
      const response = await http.mainInstance.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }

  /**
   * Get payments for a specific trip
   */
  async getPaymentsByTripId(tripId: string): Promise<Payment[]> {
    try {
      const response = await http.mainInstance.get(`${API_URL}trip/${tripId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments by trip:', error);
      throw error;
    }
  }

  /**
   * Get payments for a specific participant
   */
  async getPaymentsByParticipantId(participantId: string): Promise<Payment[]> {
    try {
      const response = await http.mainInstance.get(`${API_URL}participant/${participantId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments by participant:', error);
      throw error;
    }
  }

  /**
   * Create a new payment
   */
  async createPayment(paymentData: CreatePaymentPayload): Promise<Payment> {
    try {
      const response = await http.mainInstance.post(API_URL, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  /**
   * Update an existing payment
   */
  async updatePayment(id: string, paymentData: UpdatePaymentPayload): Promise<Payment> {
    try {
      const response = await http.mainInstance.put(`${API_URL}${id}`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }

  /**
   * Delete a payment
   */
  async deletePayment(id: string): Promise<void> {
    try {
      await http.mainInstance.delete(`${API_URL}${id}`);
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<Payment> {
    try {
      const response = await http.mainInstance.patch(`${API_URL}${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }

  /**
   * Get outstanding balances
   */
  async getOutstandingBalances(tripId?: string): Promise<OutstandingBalance[]> {
    try {
      const params = new URLSearchParams();
      if (tripId) params.append('tripId', tripId);
      const response = await http.mainInstance.get(`${API_URL}outstanding?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching outstanding balances:', error);
      throw error;
    }
  }

  /**
   * Get financial summary
   */
  async getFinancialSummary(tripId?: string): Promise<FinancialSummary> {
    try {
      const params = new URLSearchParams();
      if (tripId) params.append('tripId', tripId);
      const response = await http.mainInstance.get(`${API_URL}summary?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      throw error;
    }
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(
    filters?: PaymentFilters,
    limit: number = 50
  ): Promise<PaymentHistory[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.participantId) params.append('participantId', filters.participantId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
      }
      params.append('limit', limit.toString());

      const response = await http.mainInstance.get(`${API_URL}history?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }

  /**
   * Get payment summary for reporting
   */
  async getPaymentSummary(
    dateFrom?: string,
    dateTo?: string
  ): Promise<PaymentSummary> {
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      const response = await http.mainInstance.get(`${API_URL}report?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment summary:', error);
      throw error;
    }
  }

  /**
   * Export payments to CSV
   */
  async exportPayments(filters?: PaymentFilters): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.tripId) params.append('tripId', filters.tripId);
        if (filters.participantId) params.append('participantId', filters.participantId);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
      }

      const response = await http.mainInstance.get(`${API_URL}export?${params.toString()}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting payments:', error);
      throw error;
    }
  }

  /**
   * Process refund
   */
  async processRefund(id: string, refundAmount: number, reason?: string): Promise<Payment> {
    try {
      const response = await http.mainInstance.post(`${API_URL}${id}/refund`, {
        refundAmount,
        reason,
      });
      return response.data;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  /**
   * Get payment count for a trip
   */
  async getPaymentCount(tripId: string): Promise<number> {
    try {
      const response = await http.mainInstance.get(`${API_URL}trip/${tripId}/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment count:', error);
      throw error;
    }
  }
}

export default new PaymentService();
