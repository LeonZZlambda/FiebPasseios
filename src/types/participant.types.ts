/**
 * Payment status enum for participant payments
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  REFUNDED = 'REFUNDED',
  OVERDUE = 'OVERDUE',
}

/**
 * Attendance status enum for participant attendance
 */
export enum AttendanceStatus {
  REGISTERED = 'REGISTERED',
  CONFIRMED = 'CONFIRMED',
  ATTENDED = 'ATTENDED',
  ABSENT = 'ABSENT',
  CANCELLED = 'CANCELLED',
}

/**
 * Participant entity interface
 */
export interface Participant {
  id: string;
  tripId: string;
  fullName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  registrationDate: string;
  paymentStatus: PaymentStatus;
  attendanceStatus: AttendanceStatus;
  paymentAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Participant creation payload (without id, timestamps, and computed fields)
 */
export interface CreateParticipantPayload {
  tripId: string;
  fullName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  paymentStatus: PaymentStatus;
  attendanceStatus: AttendanceStatus;
  paymentAmount?: number;
  notes?: string;
}

/**
 * Participant update payload (all fields optional)
 */
export interface UpdateParticipantPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  emergencyContact?: string;
  paymentStatus?: PaymentStatus;
  attendanceStatus?: AttendanceStatus;
  paymentAmount?: number;
  notes?: string;
}

/**
 * Participant transfer payload
 */
export interface TransferParticipantPayload {
  fromTripId: string;
  toTripId: string;
  participantId: string;
}

/**
 * Participant filter options for list view
 */
export interface ParticipantFilters {
  tripId?: string;
  paymentStatus?: PaymentStatus;
  attendanceStatus?: AttendanceStatus;
  searchQuery?: string;
}

/**
 * Participant list response with pagination
 */
export interface ParticipantListResponse {
  data: Participant[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Capacity information for a trip
 */
export interface CapacityInfo {
  tripId: string;
  maximumCapacity: number;
  currentParticipants: number;
  remainingSeats: number;
  occupancyPercentage: number;
  isFull: boolean;
}

/**
 * Dashboard statistics for participants
 */
export interface ParticipantDashboardStats {
  totalParticipants: number;
  totalRemainingSeats: number;
  overallOccupancyRate: number;
  overallAttendanceRate: number;
  byPaymentStatus: Record<PaymentStatus, number>;
  byAttendanceStatus: Record<AttendanceStatus, number>;
  byTrip: Array<{
    tripId: string;
    tripName: string;
    participantCount: number;
    occupancyRate: number;
    attendanceRate: number;
  }>;
}

/**
 * Get display label for payment status
 */
export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    [PaymentStatus.PENDING]: 'Pendente',
    [PaymentStatus.PAID]: 'Pago',
    [PaymentStatus.PARTIALLY_PAID]: 'Parcialmente Pago',
    [PaymentStatus.REFUNDED]: 'Reembolsado',
    [PaymentStatus.OVERDUE]: 'Atrasado',
  };
  return labels[status];
}

/**
 * Get display label for attendance status
 */
export function getAttendanceStatusLabel(status: AttendanceStatus): string {
  const labels: Record<AttendanceStatus, string> = {
    [AttendanceStatus.REGISTERED]: 'Registrado',
    [AttendanceStatus.CONFIRMED]: 'Confirmado',
    [AttendanceStatus.ATTENDED]: 'Presente',
    [AttendanceStatus.ABSENT]: 'Ausente',
    [AttendanceStatus.CANCELLED]: 'Cancelado',
  };
  return labels[status];
}

/**
 * Get Bootstrap color class for payment status
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    [PaymentStatus.PENDING]: 'warning',
    [PaymentStatus.PAID]: 'success',
    [PaymentStatus.PARTIALLY_PAID]: 'info',
    [PaymentStatus.REFUNDED]: 'secondary',
    [PaymentStatus.OVERDUE]: 'danger',
  };
  return colors[status];
}

/**
 * Get Bootstrap color class for attendance status
 */
export function getAttendanceStatusColor(status: AttendanceStatus): string {
  const colors: Record<AttendanceStatus, string> = {
    [AttendanceStatus.REGISTERED]: 'secondary',
    [AttendanceStatus.CONFIRMED]: 'info',
    [AttendanceStatus.ATTENDED]: 'success',
    [AttendanceStatus.ABSENT]: 'danger',
    [AttendanceStatus.CANCELLED]: 'dark',
  };
  return colors[status];
}

/**
 * Calculate capacity information
 */
export function calculateCapacityInfo(maximumCapacity: number, currentParticipants: number): CapacityInfo {
  const remainingSeats = Math.max(0, maximumCapacity - currentParticipants);
  const occupancyPercentage = maximumCapacity > 0 
    ? (currentParticipants / maximumCapacity) * 100 
    : 0;
  
  return {
    tripId: '',
    maximumCapacity,
    currentParticipants,
    remainingSeats,
    occupancyPercentage,
    isFull: currentParticipants >= maximumCapacity,
  };
}

/**
 * Check if a participant can be registered (capacity check)
 */
export function canRegisterParticipant(maximumCapacity: number, currentParticipants: number): boolean {
  return currentParticipants < maximumCapacity;
}
