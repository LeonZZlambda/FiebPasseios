import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TripFormData, tripSchema } from '../../validations/trip.validation';
import { Trip, TripStatus, TransportType } from '../../types/trip.types';
import { getTripStatusLabel, getTransportTypeLabel } from '../../types/trip.types';
import LoadingSpinner from '../ui/LoadingSpinner';
import './TripForm.css';

interface TripFormProps {
  trip?: Trip;
  onSubmit: (data: TripFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TripForm({ trip, onSubmit, onCancel, isLoading }: TripFormProps): JSX.Element {
  const departureDate = trip?.departureDate ? trip.departureDate.split('T')[0] : '';
  const returnDate = trip?.returnDate ? trip.returnDate.split('T')[0] : '';

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: trip
      ? {
          title: trip.title,
          description: trip.description,
          destination: trip.destination,
          departureDate,
          returnDate,
          maximumCapacity: trip.maximumCapacity,
          price: trip.price,
          status: trip.status,
          coordinator: trip.coordinator,
          transportType: trip.transportType,
          notes: trip.notes,
        }
      : {
          title: '',
          description: '',
          destination: '',
          departureDate: '',
          returnDate: '',
          maximumCapacity: 1,
          price: 0,
          status: TripStatus.DRAFT,
          coordinator: '',
          transportType: TransportType.BUS,
          notes: '',
        },
  });

  const handleFormSubmit = async (data: TripFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="trip-form">
      <div className="trip-form-grid">
        <div className="trip-form-col trip-form-col-full">
          <label htmlFor="title" className="input-label">
            Título *
          </label>
          <input
            type="text"
            className={`input ${errors.title ? 'error' : ''}`}
            id="title"
            {...register('title')}
            placeholder="Digite o título do passeio"
          />
          {errors.title && <div className="input-helper error">{errors.title.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-full">
          <label htmlFor="description" className="input-label">
            Descrição *
          </label>
          <textarea
            className={`textarea ${errors.description ? 'error' : ''}`}
            id="description"
            rows={4}
            {...register('description')}
            placeholder="Descreva o passeio educacional"
          />
          {errors.description && <div className="input-helper error">{errors.description.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-half">
          <label htmlFor="destination" className="input-label">
            Destino *
          </label>
          <input
            type="text"
            className={`input ${errors.destination ? 'error' : ''}`}
            id="destination"
            {...register('destination')}
            placeholder="Digite o destino"
          />
          {errors.destination && <div className="input-helper error">{errors.destination.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-half">
          <label htmlFor="coordinator" className="input-label">
            Coordenador *
          </label>
          <input
            type="text"
            className={`input ${errors.coordinator ? 'error' : ''}`}
            id="coordinator"
            {...register('coordinator')}
            placeholder="Nome do coordenador"
          />
          {errors.coordinator && <div className="input-helper error">{errors.coordinator.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-half">
          <label htmlFor="departureDate" className="input-label">
            Data de Partida *
          </label>
          <input
            type="date"
            className={`input ${errors.departureDate ? 'error' : ''}`}
            id="departureDate"
            {...register('departureDate')}
          />
          {errors.departureDate && (
            <div className="input-helper error">{errors.departureDate.message}</div>
          )}
        </div>

        <div className="trip-form-col trip-form-col-half">
          <label htmlFor="returnDate" className="input-label">
            Data de Retorno *
          </label>
          <input
            type="date"
            className={`input ${errors.returnDate ? 'error' : ''}`}
            id="returnDate"
            {...register('returnDate')}
          />
          {errors.returnDate && <div className="input-helper error">{errors.returnDate.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-third">
          <label htmlFor="maximumCapacity" className="input-label">
            Capacidade Máxima *
          </label>
          <input
            type="number"
            className={`input ${errors.maximumCapacity ? 'error' : ''}`}
            id="maximumCapacity"
            min="1"
            max="1000"
            {...register('maximumCapacity', { valueAsNumber: true })}
            placeholder="Número máximo de participantes"
          />
          {errors.maximumCapacity && (
            <div className="input-helper error">{errors.maximumCapacity.message}</div>
          )}
        </div>

        <div className="trip-form-col trip-form-col-third">
          <label htmlFor="price" className="input-label">
            Preço (R$) *
          </label>
          <input
            type="number"
            className={`input ${errors.price ? 'error' : ''}`}
            id="price"
            min="0"
            max="100000"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && <div className="input-helper error">{errors.price.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-third">
          <label htmlFor="transportType" className="input-label">
            Tipo de Transporte *
          </label>
          <select
            className={`select ${errors.transportType ? 'error' : ''}`}
            id="transportType"
            {...register('transportType')}
          >
            {Object.values(TransportType).map((type) => (
              <option key={type} value={type}>
                {getTransportTypeLabel(type)}
              </option>
            ))}
          </select>
          {errors.transportType && (
            <div className="input-helper error">{errors.transportType.message}</div>
          )}
        </div>

        <div className="trip-form-col trip-form-col-full">
          <label htmlFor="status" className="input-label">
            Status *
          </label>
          <select
            className={`select ${errors.status ? 'error' : ''}`}
            id="status"
            {...register('status')}
          >
            {Object.values(TripStatus).map((status) => (
              <option key={status} value={status}>
                {getTripStatusLabel(status)}
              </option>
            ))}
          </select>
          {errors.status && <div className="input-helper error">{errors.status.message}</div>}
        </div>

        <div className="trip-form-col trip-form-col-full">
          <label htmlFor="notes" className="input-label">
            Notas (opcional)
          </label>
          <textarea
            className={`textarea ${errors.notes ? 'error' : ''}`}
            id="notes"
            rows={3}
            {...register('notes')}
            placeholder="Observações adicionais sobre o passeio"
          />
          {errors.notes && <div className="input-helper error">{errors.notes.message}</div>}
        </div>
      </div>

      <div className="trip-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !isDirty}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="small" />
              Salvando...
            </>
          ) : (
            trip ? 'Atualizar Passeio' : 'Criar Passeio'
          )}
        </button>
      </div>
    </form>
  );
}
