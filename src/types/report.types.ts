/**
 * Report types and interfaces
 */

import { TripStatus } from './trip.types';
import { PaymentStatus, AttendanceStatus } from './participant.types';

/**
 * Report type enum
 */
export enum ReportType {
  TRIP_SUMMARY = 'TRIP_SUMMARY',
  PARTICIPANT = 'PARTICIPANT',
  ATTENDANCE = 'ATTENDANCE',
  FINANCIAL = 'FINANCIAL',
  OCCUPANCY = 'OCCUPANCY',
  ANALYTICS = 'ANALYTICS',
}

/**
 * Export format enum
 */
export enum ExportFormat {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  PDF = 'PDF',
  PRINT = 'PRINT',
}

/**
 * Report filter options
 */
export interface ReportFilters {
  dateFrom?: string;
  dateTo?: string;
  tripId?: string;
  status?: TripStatus;
  participantId?: string;
  paymentStatus?: PaymentStatus;
  attendanceStatus?: AttendanceStatus;
  searchQuery?: string;
}

/**
 * Trip summary report data
 */
export interface TripSummaryReport {
  tripId: string;
  tripName: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  status: TripStatus;
  totalParticipants: number;
  maximumCapacity: number;
  occupancyRate: number;
  totalRevenue: number;
  collectedRevenue: number;
  pendingRevenue: number;
  attendanceRate: number;
}

/**
 * Participant report data
 */
export interface ParticipantReport {
  participantId: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  tripName: string;
  tripDestination: string;
  tripDate: string;
  registrationDate: string;
  paymentStatus: PaymentStatus;
  attendanceStatus: AttendanceStatus;
  amountPaid: number;
  amountDue: number;
}

/**
 * Attendance report data
 */
export interface AttendanceReport {
  tripId: string;
  tripName: string;
  tripDate: string;
  totalParticipants: number;
  attended: number;
  absent: number;
  pending: number;
  attendanceRate: number;
  participants: Array<{
    participantName: string;
    status: AttendanceStatus;
  }>;
}

/**
 * Financial report data
 */
export interface FinancialReport {
  period: string;
  totalRevenue: number;
  collectedRevenue: number;
  pendingRevenue: number;
  overdueRevenue: number;
  refundedRevenue: number;
  paymentCount: number;
  averagePaymentAmount: number;
  paymentCompletionRate: number;
  byTrip: Array<{
    tripId: string;
    tripName: string;
    revenue: number;
    participantCount: number;
  }>;
  byPaymentMethod: Record<string, number>;
}

/**
 * Occupancy report data
 */
export interface OccupancyReport {
  tripId: string;
  tripName: string;
  tripDate: string;
  maximumCapacity: number;
  currentParticipants: number;
  remainingSeats: number;
  occupancyRate: number;
  status: TripStatus;
  isFull: boolean;
}

/**
 * Trend data point for analytics
 */
export interface TrendDataPoint {
  label: string;
  value: number;
  date: string;
}

/**
 * Analytics data for dashboard
 */
export interface ReportAnalytics {
  occupancyTrends: TrendDataPoint[];
  participationTrends: TrendDataPoint[];
  revenueTrends: TrendDataPoint[];
  attendanceTrends: TrendDataPoint[];
  summary: {
    totalTrips: number;
    totalParticipants: number;
    totalRevenue: number;
    averageAttendanceRate: number;
    averageOccupancyRate: number;
  };
}

/**
 * Report column configuration
 */
export interface ReportColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  format?: (value: any) => string | React.ReactNode;
  width?: string;
}

/**
 * Report export configuration
 */
export interface ReportExportConfig {
  format: ExportFormat;
  filename: string;
  includeHeaders: boolean;
  dateRange?: {
    from: string;
    to: string;
  };
}

/**
 * Report data response
 */
export interface ReportData<T> {
  data: T[];
  total: number;
  generatedAt: string;
  filters: ReportFilters;
}

/**
 * Get display label for report type
 */
export function getReportTypeLabel(type: ReportType): string {
  const labels: Record<ReportType, string> = {
    [ReportType.TRIP_SUMMARY]: 'Resumo de Passeios',
    [ReportType.PARTICIPANT]: 'Relatório de Participantes',
    [ReportType.ATTENDANCE]: 'Relatório de Frequência',
    [ReportType.FINANCIAL]: 'Relatório Financeiro',
    [ReportType.OCCUPANCY]: 'Relatório de Ocupação',
    [ReportType.ANALYTICS]: 'Analytics',
  };
  return labels[type];
}

/**
 * Get display label for export format
 */
export function getExportFormatLabel(format: ExportFormat): string {
  const labels: Record<ExportFormat, string> = {
    [ExportFormat.CSV]: 'CSV',
    [ExportFormat.EXCEL]: 'Excel',
    [ExportFormat.PDF]: 'PDF',
    [ExportFormat.PRINT]: 'Imprimir',
  };
  return labels[format];
}
