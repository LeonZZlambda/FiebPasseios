/**
 * Trip status enum representing the lifecycle of an educational trip
 */
export enum TripStatus {
  DRAFT = 'DRAFT',
  PLANNED = 'PLANNED',
  OPEN_FOR_REGISTRATION = 'OPEN_FOR_REGISTRATION',
  FULL = 'FULL',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

/**
 * Transport type enum for trip transportation options
 */
export enum TransportType {
  BUS = 'BUS',
  VAN = 'VAN',
  TRAIN = 'TRAIN',
  AIRPLANE = 'AIRPLANE',
  BOAT = 'BOAT',
  PRIVATE_VEHICLE = 'PRIVATE_VEHICLE',
  OTHER = 'OTHER',
}

/**
 * Trip entity interface
 */
export interface Trip {
  id: string;
  title: string;
  description: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  maximumCapacity: number;
  currentParticipants: number;
  price: number;
  status: TripStatus;
  coordinator: string;
  transportType: TransportType;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
}

/**
 * Trip creation payload (without id, timestamps, and computed fields)
 */
export interface CreateTripPayload {
  title: string;
  description: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  maximumCapacity: number;
  price: number;
  status: TripStatus;
  coordinator: string;
  transportType: TransportType;
  notes?: string;
}

/**
 * Trip update payload (all fields optional)
 */
export interface UpdateTripPayload {
  title?: string;
  description?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  maximumCapacity?: number;
  price?: number;
  status?: TripStatus;
  coordinator?: string;
  transportType?: TransportType;
  notes?: string;
  archived?: boolean;
}

/**
 * Trip filter options for list view
 */
export interface TripFilters {
  searchQuery?: string;
  status?: TripStatus;
  destination?: string;
  coordinator?: string;
  transportType?: TransportType;
  startDate?: string;
  endDate?: string;
  archived?: boolean;
}

/**
 * Trip sort options
 */
export interface TripSort {
  field: keyof Trip;
  direction: 'asc' | 'desc';
}

/**
 * Trip list response with pagination
 */
export interface TripListResponse {
  data: Trip[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Trip status transition rules
 * Defines which status transitions are valid
 */
export const STATUS_TRANSITIONS: Record<TripStatus, TripStatus[]> = {
  [TripStatus.DRAFT]: [TripStatus.PLANNED, TripStatus.CANCELLED],
  [TripStatus.PLANNED]: [
    TripStatus.OPEN_FOR_REGISTRATION,
    TripStatus.DRAFT,
    TripStatus.CANCELLED,
  ],
  [TripStatus.OPEN_FOR_REGISTRATION]: [
    TripStatus.FULL,
    TripStatus.CONFIRMED,
    TripStatus.PLANNED,
    TripStatus.CANCELLED,
  ],
  [TripStatus.FULL]: [
    TripStatus.CONFIRMED,
    TripStatus.OPEN_FOR_REGISTRATION,
    TripStatus.PLANNED,
    TripStatus.CANCELLED,
  ],
  [TripStatus.CONFIRMED]: [
    TripStatus.IN_PROGRESS,
    TripStatus.OPEN_FOR_REGISTRATION,
    TripStatus.PLANNED,
    TripStatus.CANCELLED,
  ],
  [TripStatus.IN_PROGRESS]: [TripStatus.COMPLETED, TripStatus.CANCELLED],
  [TripStatus.COMPLETED]: [], // Terminal state
  [TripStatus.CANCELLED]: [], // Terminal state
};

/**
 * Check if a status transition is valid
 */
export function isValidStatusTransition(
  from: TripStatus,
  to: TripStatus
): boolean {
  return STATUS_TRANSITIONS[from].includes(to);
}

/**
 * Get display label for trip status
 */
export function getTripStatusLabel(status: TripStatus): string {
  const labels: Record<TripStatus, string> = {
    [TripStatus.DRAFT]: 'Rascunho',
    [TripStatus.PLANNED]: 'Planejado',
    [TripStatus.OPEN_FOR_REGISTRATION]: 'Aberto para Inscrição',
    [TripStatus.FULL]: 'Lotado',
    [TripStatus.CONFIRMED]: 'Confirmado',
    [TripStatus.IN_PROGRESS]: 'Em Andamento',
    [TripStatus.COMPLETED]: 'Concluído',
    [TripStatus.CANCELLED]: 'Cancelado',
  };
  return labels[status];
}

/**
 * Get display label for transport type
 */
export function getTransportTypeLabel(type: TransportType): string {
  const labels: Record<TransportType, string> = {
    [TransportType.BUS]: 'Ônibus',
    [TransportType.VAN]: 'Van',
    [TransportType.TRAIN]: 'Trem',
    [TransportType.AIRPLANE]: 'Avião',
    [TransportType.BOAT]: 'Barco',
    [TransportType.PRIVATE_VEHICLE]: 'Veículo Particular',
    [TransportType.OTHER]: 'Outro',
  };
  return labels[type];
}

/**
 * Get Bootstrap color class for trip status
 */
export function getTripStatusColor(status: TripStatus): string {
  const colors: Record<TripStatus, string> = {
    [TripStatus.DRAFT]: 'secondary',
    [TripStatus.PLANNED]: 'info',
    [TripStatus.OPEN_FOR_REGISTRATION]: 'success',
    [TripStatus.FULL]: 'warning',
    [TripStatus.CONFIRMED]: 'primary',
    [TripStatus.IN_PROGRESS]: 'primary',
    [TripStatus.COMPLETED]: 'success',
    [TripStatus.CANCELLED]: 'danger',
  };
  return colors[status];
}
