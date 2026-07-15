import React from 'react';
import type { AttendanceReport as AttendanceReportType, ReportColumn } from '../../types/report.types';
import { useAttendanceReport } from '../../hooks/useReports';
import { ReportType } from '../../types/report.types';
import ReportTable from './ReportTable';
import ReportExport from './ReportExport';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getAttendanceStatusLabel } from '../../types/participant.types';

interface AttendanceReportProps {
  filters?: any;
}

export default function AttendanceReport({ filters }: AttendanceReportProps): JSX.Element {
  const { data, loading, error, refetch } = useAttendanceReport(filters);

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

  const columns: ReportColumn<AttendanceReportType>[] = [
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
      key: 'totalParticipants',
      label: 'Total de Participantes',
      width: '150px',
    },
    {
      key: 'attended',
      label: 'Presentes',
      width: '100px',
    },
    {
      key: 'absent',
      label: 'Ausentes',
      width: '100px',
    },
    {
      key: 'pending',
      label: 'Pendentes',
      width: '100px',
    },
    {
      key: 'attendanceRate',
      label: 'Taxa de Frequência',
      format: formatPercentage,
      width: '150px',
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Carregando relatório de frequência..." />;
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
        icon="📋"
        title="Nenhum dado encontrado"
        message="Não há dados de frequência disponíveis para o período selecionado."
      />
    );
  }

  return (
    <div className="attendance-report">
      <div className="report-header">
        <h4 className="report-title">Relatório de Frequência</h4>
        <ReportExport reportType={ReportType.ATTENDANCE} filters={filters} onExport={refetch} />
      </div>
      <ReportTable
        title="Dados de Frequência"
        columns={columns}
        data={data.data}
        maxHeight={400}
      />
    </div>
  );
}
