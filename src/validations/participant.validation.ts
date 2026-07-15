import { z } from 'zod';
import { PaymentStatus, AttendanceStatus } from '../types/participant.types';

/**
 * Zod schema for participant creation and validation
 */
export const participantSchema = z
  .object({
    tripId: z.string().min(1, 'O ID do passeio é obrigatório'),
    fullName: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caracteres'),
    email: z
      .string()
      .min(1, 'O email é obrigatório')
      .email('Email inválido'),
    phone: z
      .string()
      .min(10, 'O telefone deve ter pelo menos 10 caracteres')
      .max(20, 'O telefone deve ter no máximo 20 caracteres'),
    emergencyContact: z
      .string()
      .min(3, 'O contato de emergência deve ter pelo menos 3 caracteres')
      .max(100, 'O contato de emergência deve ter no máximo 100 caracteres'),
    paymentStatus: z.nativeEnum(PaymentStatus),
    attendanceStatus: z.nativeEnum(AttendanceStatus),
    paymentAmount: z
      .number()
      .min(0, 'O valor do pagamento deve ser maior ou igual a 0')
      .max(100000, 'O valor do pagamento deve ser no máximo 100000')
      .optional(),
    notes: z
      .string()
      .max(500, 'As notas devem ter no máximo 500 caracteres')
      .optional(),
  });

/**
 * Type inference from participant schema
 */
export type ParticipantFormData = z.infer<typeof participantSchema>;

/**
 * Schema for participant update (all fields optional)
 */
export const participantUpdateSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caracteres')
      .optional(),
    email: z
      .string()
      .min(1, 'O email é obrigatório')
      .email('Email inválido')
      .optional(),
    phone: z
      .string()
      .min(10, 'O telefone deve ter pelo menos 10 caracteres')
      .max(20, 'O telefone deve ter no máximo 20 caracteres')
      .optional(),
    emergencyContact: z
      .string()
      .min(3, 'O contato de emergência deve ter pelo menos 3 caracteres')
      .max(100, 'O contato de emergência deve ter no máximo 100 caracteres')
      .optional(),
    paymentStatus: z.nativeEnum(PaymentStatus).optional(),
    attendanceStatus: z.nativeEnum(AttendanceStatus).optional(),
    paymentAmount: z
      .number()
      .min(0, 'O valor do pagamento deve ser maior ou igual a 0')
      .max(100000, 'O valor do pagamento deve ser no máximo 100000')
      .optional(),
    notes: z
      .string()
      .max(500, 'As notas devem ter no máximo 500 caracteres')
      .optional(),
  });

export type ParticipantUpdateFormData = z.infer<typeof participantUpdateSchema>;

/**
 * Schema for participant transfer
 */
export const participantTransferSchema = z.object({
  fromTripId: z.string().min(1, 'O ID do passeio de origem é obrigatório'),
  toTripId: z.string().min(1, 'O ID do passeio de destino é obrigatório'),
  participantId: z.string().min(1, 'O ID do participante é obrigatório'),
});

export type ParticipantTransferData = z.infer<typeof participantTransferSchema>;

/**
 * Schema for participant filters
 */
export const participantFiltersSchema = z.object({
  tripId: z.string().optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  attendanceStatus: z.nativeEnum(AttendanceStatus).optional(),
  searchQuery: z.string().optional(),
});

export type ParticipantFiltersData = z.infer<typeof participantFiltersSchema>;
