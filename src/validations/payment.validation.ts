import { z } from 'zod';
import { PaymentMethod, PaymentStatus } from '../types/payment.types';

/**
 * Zod schema for payment creation and validation
 */
export const paymentSchema = z
  .object({
    participantId: z.string().min(1, 'O ID do participante é obrigatório'),
    tripId: z.string().min(1, 'O ID do passeio é obrigatório'),
    amount: z
      .number()
      .min(0.01, 'O valor deve ser maior que 0')
      .max(100000, 'O valor deve ser no máximo 100000'),
    paymentMethod: z.nativeEnum(PaymentMethod),
    paymentStatus: z.nativeEnum(PaymentStatus),
    paymentDate: z.string().min(1, 'A data de pagamento é obrigatória'),
    dueDate: z.string().min(1, 'A data de vencimento é obrigatória'),
    notes: z
      .string()
      .max(500, 'As notas devem ter no máximo 500 caracteres')
      .optional(),
  })
  .refine((data) => {
    const paymentDate = new Date(data.paymentDate);
    const dueDate = new Date(data.dueDate);
    return paymentDate <= dueDate;
  }, {
    message: 'A data de pagamento não pode ser posterior à data de vencimento',
    path: ['paymentDate'],
  });

/**
 * Type inference from payment schema
 */
export type PaymentFormData = z.infer<typeof paymentSchema>;

/**
 * Schema for payment update (all fields optional)
 */
export const paymentUpdateSchema = z
  .object({
    amount: z
      .number()
      .min(0.01, 'O valor deve ser maior que 0')
      .max(100000, 'O valor deve ser no máximo 100000')
      .optional(),
    paymentMethod: z.nativeEnum(PaymentMethod).optional(),
    paymentStatus: z.nativeEnum(PaymentStatus).optional(),
    paymentDate: z.string().min(1, 'A data de pagamento é obrigatória').optional(),
    dueDate: z.string().min(1, 'A data de vencimento é obrigatória').optional(),
    notes: z
      .string()
      .max(500, 'As notas devem ter no máximo 500 caracteres')
      .optional(),
  })
  .refine((data) => {
    if (data.paymentDate && data.dueDate) {
      const paymentDate = new Date(data.paymentDate);
      const dueDate = new Date(data.dueDate);
      return paymentDate <= dueDate;
    }
    return true;
  }, {
    message: 'A data de pagamento não pode ser posterior à data de vencimento',
    path: ['paymentDate'],
  });

export type PaymentUpdateFormData = z.infer<typeof paymentUpdateSchema>;

/**
 * Schema for payment filters
 */
export const paymentFiltersSchema = z.object({
  tripId: z.string().optional(),
  participantId: z.string().optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  searchQuery: z.string().optional(),
});

export type PaymentFiltersData = z.infer<typeof paymentFiltersSchema>;
