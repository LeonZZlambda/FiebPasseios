import React from 'react';
import type { OccupancyReport as OccupancyReportType, ReportColumn } from '../../types/report.types';
import { useOccupancyReport } from '../../hooks/useReports';
import { ReportType } from '../../types/report.types';
import ReportTable from './ReportTable';
import ReportExport from './ReportExport';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getTripStatusLabel } from '../../types/trip.types';

interface OccupancyReportProps {
  filters?: any;
}

export default function OccupancyReport({ filters }: OccupancyReportProps): JSX.Element {
  const { data, loading, error, refetch } = useOccupancyReport(filters);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const columns: ReportColumn<OccupancyReportType>[] = [
    {
      key: 'tripName',
      label: 'Passeio',
      width: '200px',
    },
    {
      key: 'tripDate',
      label: 'Data do Passeio',
      format: formatDate,
      width: '120px',
    },
    {
      key: 'maximumCapacity',
      label: 'Capacidade Máxima',
      width: '150px',
    },
    {
      key: 'currentParticipants',
      label: 'Participantes Atuais',
      width: '150px',
    },
    {
      key: 'remainingSeats',
      label: 'Vagas Restantes',
      width: '120px',
    },
    {
      key: 'occupancyRate',
      label: 'Taxa de Ocupação',
      format: formatPercentage,
      width: '120px',
    },
    {
      key: 'status',
      label: 'Status',
      format: (value: any) => getTripStatusLabel(value),
      width: '100px',
    },
    {
      key: 'isFull',
      label: 'Lotado',
      format: (value: any) => (value ? 'Sim' : 'Não'),
      width: '80px',
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Carregando relatório de ocupação..." />;
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
        icon="📊"
        title="Nenhum dado encontrado"
        message="Não há dados de ocupação disponíveis para o período selecionado."
      />
    );
  }

  return (
    <div className="occupancy-report">
      <div className="report-header">
        <h4 className="report-title">Relatório de Ocupação</h4>
        <ReportExport reportType={ReportType.OCCUPANCY} filters={filters} onExport={refetch} />
      </div>
      <ReportTable
        title="Dados de Ocupação"
        columns={columns}
        data={data.data}
        maxHeight={400}
      />
    </div>
  );
}
