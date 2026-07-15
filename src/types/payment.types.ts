/**
 * Payment method enum for payment transactions
 */
export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
}

/**
 * Payment status enum for payment tracking
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  OVERDUE = 'OVERDUE',
}

/**
 * Payment entity interface
 */
export interface Payment {
  id: string;
  participantId: string;
  tripId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDate: string;
  dueDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment creation payload (without id, timestamps, and computed fields)
 */
export interface CreatePaymentPayload {
  participantId: string;
  tripId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDate: string;
  dueDate: string;
  notes?: string;
}

/**
 * Payment update payload (all fields optional)
 */
export interface UpdatePaymentPayload {
  amount?: number;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  paymentDate?: string;
  dueDate?: string;
  notes?: string;
}

/**
 * Payment filter options for list view
 */
export interface PaymentFilters {
  tripId?: string;
  participantId?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

/**
 * Payment list response with pagination
 */
export interface PaymentListResponse {
  data: Payment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Outstanding balance for a participant
 */
export interface OutstandingBalance {
  participantId: string;
  participantName: string;
  tripId: string;
  tripName: string;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentStatus: PaymentStatus;
  dueDate: string;
  isOverdue: boolean;
}

/**
 * Financial summary metrics
 */
export interface FinancialSummary {
  expectedRevenue: number;
  collectedRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  paymentCompletionRate: number;
  totalPayments: number;
  averagePaymentAmount: number;
}

/**
 * Payment history entry
 */
export interface PaymentHistory {
  id: string;
  participantName: string;
  tripName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDate: string;
  dueDate: string;
  notes?: string;
}

/**
 * Payment summary for reporting
 */
export interface PaymentSummary {
  byStatus: Record<PaymentStatus, number>;
  byMethod: Record<PaymentMethod, number>;
  byTrip: Array<{
    tripId: string;
    tripName: string;
    totalRevenue: number;
    collectedRevenue: number;
    pendingRevenue: number;
    paymentCount: number;
  }>;
  byMonth: Array<{
    month: string;
    year: number;
    revenue: number;
    paymentCount: number;
  }>;
}

/**
 * Get display label for payment method
 */
export function getPaymentMethodLabel(method: PaymentMethod): string {
  const labels: Record<PaymentMethod, string> = {
    [PaymentMethod.CASH]: 'Dinheiro',
    [PaymentMethod.CREDIT_CARD]: 'Cartão de Crédito',
    [PaymentMethod.DEBIT_CARD]: 'Cartão de Débito',
    [PaymentMethod.PIX]: 'PIX',
    [PaymentMethod.BANK_TRANSFER]: 'Transferência Bancária',
    [PaymentMethod.CHECK]: 'Cheque',
  };
  return labels[method];
}

/**
 * Get display label for payment status
 */
export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    [PaymentStatus.PENDING]: 'Pendente',
    [PaymentStatus.PARTIAL]: 'Parcial',
    [PaymentStatus.PAID]: 'Pago',
    [PaymentStatus.REFUNDED]: 'Reembolsado',
    [PaymentStatus.OVERDUE]: 'Atrasado',
  };
  return labels[status];
}

/**
 * Get Bootstrap color class for payment status
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    [PaymentStatus.PENDING]: 'warning',
    [PaymentStatus.PARTIAL]: 'info',
    [PaymentStatus.PAID]: 'success',
    [PaymentStatus.REFUNDED]: 'secondary',
    [PaymentStatus.OVERDUE]: 'danger',
  };
  return colors[status];
}

/**
 * Get Bootstrap color class for payment method
 */
export function getPaymentMethodColor(method: PaymentMethod): string {
  const colors: Record<PaymentMethod, string> = {
    [PaymentMethod.CASH]: 'success',
    [PaymentMethod.CREDIT_CARD]: 'primary',
    [PaymentMethod.DEBIT_CARD]: 'info',
    [PaymentMethod.PIX]: 'warning',
    [PaymentMethod.BANK_TRANSFER]: 'dark',
    [PaymentMethod.CHECK]: 'secondary',
  };
  return colors[method];
}

/**
 * Check if payment is overdue
 */
export function isPaymentOverdue(dueDate: string, paymentStatus: PaymentStatus): boolean {
  if (paymentStatus === PaymentStatus.PAID || paymentStatus === PaymentStatus.REFUNDED) {
    return false;
  }
  const due = new Date(dueDate);
  const now = new Date();
  return due < now;
}

/**
 * Calculate outstanding balance
 */
export function calculateOutstandingBalance(totalAmount: number, paidAmount: number): number {
  return Math.max(0, totalAmount - paidAmount);
}

/**
 * Get payment completion percentage
 */
export function getPaymentCompletionPercentage(paidAmount: number, totalAmount: number): number {
  if (totalAmount === 0) return 0;
  return (paidAmount / totalAmount) * 100;
}
