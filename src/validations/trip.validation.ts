import { z } from 'zod';
import { TripStatus, TransportType } from '../types/trip.types';

/**
 * Zod schema for trip creation and validation
 */
export const tripSchema = z
  .object({
    title: z
      .string()
      .min(3, 'O título deve ter pelo menos 3 caracteres')
      .max(100, 'O título deve ter no máximo 100 caracteres'),
    description: z
      .string()
      .min(10, 'A descrição deve ter pelo menos 10 caracteres')
      .max(1000, 'A descrição deve ter no máximo 1000 caracteres'),
    destination: z
      .string()
      .min(3, 'O destino deve ter pelo menos 3 caracteres')
      .max(100, 'O destino deve ter no máximo 100 caracteres'),
    departureDate: z.string().min(1, 'A data de partida é obrigatória'),
    returnDate: z.string().min(1, 'A data de retorno é obrigatória'),
    maximumCapacity: z
      .number()
      .min(1, 'A capacidade máxima deve ser maior que 0')
      .max(1000, 'A capacidade máxima deve ser no máximo 1000'),
    price: z
      .number()
      .min(0, 'O preço deve ser maior ou igual a 0')
      .max(100000, 'O preço deve ser no máximo 100000'),
    status: z.nativeEnum(TripStatus),
    coordinator: z
      .string()
      .min(3, 'O coordenador deve ter pelo menos 3 caracteres')
      .max(100, 'O coordenador deve ter no máximo 100 caracteres'),
    transportType: z.nativeEnum(TransportType),
    notes: z
      .string()
      .max(500, 'As notas devem ter no máximo 500 caracteres')
      .optional(),
  })
  .refine((data) => new Date(data.returnDate) >= new Date(data.departureDate), {
    message: 'A data de retorno deve ser maior ou igual à data de partida',
    path: ['returnDate'],
  });

/**
 * Type inference from trip schema
 */
export type TripFormData = z.infer<typeof tripSchema>;

/**
 * Schema for trip status change
 */
export const tripStatusChangeSchema = z.object({
  status: z.nativeEnum(TripStatus),
});

export type TripStatusChangeData = z.infer<typeof tripStatusChangeSchema>;

/**
 * Schema for trip filters
 */
export const tripFiltersSchema = z.object({
  status: z.nativeEnum(TripStatus).optional(),
  destination: z.string().optional(),
  coordinator: z.string().optional(),
  transportType: z.nativeEnum(TransportType).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  archived: z.boolean().optional(),
});

export type TripFiltersData = z.infer<typeof tripFiltersSchema>;
