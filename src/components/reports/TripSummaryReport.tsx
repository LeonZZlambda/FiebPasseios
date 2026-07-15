import React from 'react';
import type { TripSummaryReport as TripSummaryReportType, ReportColumn } from '../../types/report.types';
import { useTripSummaryReport } from '../../hooks/useReports';
import { ReportType } from '../../types/report.types';
import ReportTable from './ReportTable';
import ReportExport from './ReportExport';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getTripStatusLabel } from '../../types/trip.types';

interface TripSummaryReportProps {
  filters?: any;
}

export default function TripSummaryReport({ filters }: TripSummaryReportProps): JSX.Element {
  const { data, loading, error, refetch } = useTripSummaryReport(filters);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const columns: ReportColumn<TripSummaryReportType>[] = [
    {
      key: 'tripName',
      label: 'Passeio',
      width: '200px',
    },
    {
      key: 'destination',
      label: 'Destino',
      width: '150px',
    },
    {
      key: 'departureDate',
      label: 'Data de Partida',
      format: formatDate,
      width: '120px',
    },
    {
      key: 'returnDate',
      label: 'Data de Retorno',
      format: formatDate,
      width: '120px',
    },
    {
      key: 'status',
      label: 'Status',
      format: (value: any) => getTripStatusLabel(value),
      width: '100px',
    },
    {
      key: 'totalParticipants',
      label: 'Participantes',
      format: (value: any) => `${value}`,
      width: '100px',
    },
    {
      key: 'occupancyRate',
      label: 'Ocupação',
      format: formatPercentage,
      width: '80px',
    },
    {
      key: 'totalRevenue',
      label: 'Receita Total',
      format: formatCurrency,
      width: '120px',
    },
    {
      key: 'collectedRevenue',
      label: 'Receita Coletada',
      format: formatCurrency,
      width: '120px',
    },
    {
      key: 'attendanceRate',
      label: 'Taxa de Frequência',
      format: formatPercentage,
      width: '120px',
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Carregando relatório de resumo de passeios..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Erro ao carregar relatório: {error}
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <EmptyState
        icon="🚌"
        title="Nenhum dado encontrado"
        message="Não há dados de passeios disponíveis para o período selecionado."
      />
    );
  }

  return (
    <div className="trip-summary-report">
      <div className="report-header">
        <h4 className="report-title">Resumo de Passeios</h4>
        <ReportExport reportType={ReportType.TRIP_SUMMARY} filters={filters} onExport={refetch} />
      </div>
      <ReportTable
        title="Dados dos Passeios"
        columns={columns}
        data={data.data}
        maxHeight={400}
      />
    </div>
  );
}
