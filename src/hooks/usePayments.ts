/**
 * Custom hooks for payment data fetching and mutations
 */

import { useState, useEffect, useCallback } from 'react';
import PaymentService from '../services/PaymentService';
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

/**
 * Hook for fetching payments with filtering and pagination
 */
export function usePayments(
  filters?: PaymentFilters,
  page: number = 1,
  pageSize: number = 10
) {
  const [data, setData] = useState<PaymentListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await PaymentService.getAllPayments(filters, page, pageSize);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { data, loading, error, refetch: fetchPayments };
}

/**
 * Hook for fetching payments for a specific trip
 */
export function usePaymentsByTrip(tripId: string) {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payments = await PaymentService.getPaymentsByTripId(tripId);
      setData(payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      fetchPayments();
    }
  }, [tripId, fetchPayments]);

  return { data, loading, error, refetch: fetchPayments };
}

/**
 * Hook for fetching payments for a specific participant
 */
export function usePaymentsByParticipant(participantId: string) {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payments = await PaymentService.getPaymentsByParticipantId(participantId);
      setData(payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  }, [participantId]);

  useEffect(() => {
    if (participantId) {
      fetchPayments();
    }
  }, [participantId, fetchPayments]);

  return { data, loading, error, refetch: fetchPayments };
}

/**
 * Hook for fetching a single payment by ID
 */
export function usePayment(id: string) {
  const [data, setData] = useState<Payment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPayment() {
      setLoading(true);
      setError(null);
      try {
        const payment = await PaymentService.getPaymentById(id);
        setData(payment);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch payment');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPayment();
    }
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for creating a new payment
 */
export function useCreatePayment() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = useCallback(async (paymentData: CreatePaymentPayload) => {
    setLoading(true);
    setError(null);
    try {
      const payment = await PaymentService.createPayment(paymentData);
      return payment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create payment';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createPayment, loading, error };
}

/**
 * Hook for updating a payment
 */
export function useUpdatePayment() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updatePayment = useCallback(async (id: string, paymentData: UpdatePaymentPayload) => {
    setLoading(true);
    setError(null);
    try {
      const payment = await PaymentService.updatePayment(id, paymentData);
      return payment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updatePayment, loading, error };
}

/**
 * Hook for deleting a payment
 */
export function useDeletePayment() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deletePayment = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await PaymentService.deletePayment(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete payment';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deletePayment, loading, error };
}

/**
 * Hook for updating payment status
 */
export function useUpdatePaymentStatus() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updatePaymentStatus = useCallback(async (id: string, status: PaymentStatus) => {
    setLoading(true);
    setError(null);
    try {
      const payment = await PaymentService.updatePaymentStatus(id, status);
      return payment;
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
 * Hook for getting outstanding balances
 */
export function useOutstandingBalances(tripId?: string) {
  const [data, setData] = useState<OutstandingBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const balances = await PaymentService.getOutstandingBalances(tripId);
      setData(balances);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch outstanding balances');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { data, loading, error, refetch: fetchBalances };
}

/**
 * Hook for getting financial summary
 */
export function useFinancialSummary(tripId?: string) {
  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await PaymentService.getFinancialSummary(tripId);
      setData(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch financial summary');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, loading, error, refetch: fetchSummary };
}

/**
 * Hook for getting payment history
 */
export function usePaymentHistory(filters?: PaymentFilters, limit: number = 50) {
  const [data, setData] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const history = await PaymentService.getPaymentHistory(filters, limit);
      setData(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment history');
    } finally {
      setLoading(false);
    }
  }, [filters, limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { data, loading, error, refetch: fetchHistory };
}

/**
 * Hook for getting payment summary for reporting
 */
export function usePaymentSummary(dateFrom?: string, dateTo?: string) {
  const [data, setData] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await PaymentService.getPaymentSummary(dateFrom, dateTo);
      setData(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment summary');
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, loading, error, refetch: fetchSummary };
}

/**
 * Hook for exporting payments
 */
export function useExportPayments() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const exportPayments = useCallback(async (filters?: PaymentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const blob = await PaymentService.exportPayments(filters);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payments-export.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export payments';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportPayments, loading, error };
}

/**
 * Hook for processing refunds
 */
export function useProcessRefund() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processRefund = useCallback(async (id: string, refundAmount: number, reason?: string) => {
    setLoading(true);
    setError(null);
    try {
      const payment = await PaymentService.processRefund(id, refundAmount, reason);
      return payment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process refund';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { processRefund, loading, error };
}
