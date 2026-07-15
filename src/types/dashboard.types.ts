/**
 * Dashboard metrics and data types
 */

import { TripStatus } from './trip.types';
import { PaymentStatus, AttendanceStatus } from './participant.types';

/**
 * Dashboard metrics summary
 */
export interface DashboardMetrics {
  totalTrips: number;
  activeTrips: number;
  totalParticipants: number;
  occupancyRate: number;
  revenueProjection: number;
}

/**
 * Trip status distribution for charts
 */
export interface TripStatusDistribution {
  status: TripStatus;
  count: number;
  percentage: number;
}

/**
 * Participant count per trip
 */
export interface TripParticipantCount {
  tripId: string;
  tripName: string;
  participantCount: number;
  maximumCapacity: number;
  occupancyRate: number;
}

/**
 * Monthly registration data
 */
export interface MonthlyRegistration {
  month: string;
  year: number;
  registrationCount: number;
  revenue: number;
}

/**
 * Upcoming trip for table
 */
export interface UpcomingTrip {
  id: string;
  title: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  currentParticipants: number;
  maximumCapacity: number;
  status: TripStatus;
  price: number;
}

/**
 * Recent registration for table
 */
export interface RecentRegistration {
  id: string;
  participantName: string;
  tripName: string;
  registrationDate: string;
  paymentStatus: PaymentStatus;
  attendanceStatus: AttendanceStatus;
  amount: number;
}

/**
 * Dashboard data aggregation
 */
export interface DashboardData {
  metrics: DashboardMetrics;
  tripStatusDistribution: TripStatusDistribution[];
  tripParticipantCounts: TripParticipantCount[];
  monthlyRegistrations: MonthlyRegistration[];
  upcomingTrips: UpcomingTrip[];
  recentRegistrations: RecentRegistration[];
}

/**
 * Metric card configuration
 */
export interface MetricCardConfig {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  description?: string;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * Table column configuration
 */
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

/**
 * Quick action configuration
 */
export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Time range filter
 */
export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

/**
 * Dashboard filters
 */
export interface DashboardFilters {
  timeRange: TimeRange;
  status?: TripStatus;
}
