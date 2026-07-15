import React from 'react';
import type { ParticipantReport as ParticipantReportType, ReportColumn } from '../../types/report.types';
import { useParticipantReport } from '../../hooks/useReports';
import { ReportType } from '../../types/report.types';
import ReportTable from './ReportTable';
import ReportExport from './ReportExport';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPaymentStatusLabel, getAttendanceStatusLabel } from '../../types/participant.types';

interface ParticipantReportProps {
  filters?: any;
}

export default function ParticipantReport({ filters }: ParticipantReportProps): JSX.Element {
  const { data, loading, error, refetch } = useParticipantReport(filters);

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

  const columns: ReportColumn<ParticipantReportType>[] = [
    {
      key: 'participantName',
      label: 'Participante',
      width: '200px',
    },
    {
      key: 'participantEmail',
      label: 'Email',
      width: '200px',
    },
    {
      key: 'participantPhone',
      label: 'Telefone',
      width: '120px',
    },
    {
      key: 'tripName',
      label: 'Passeio',
      width: '180px',
    },
    {
      key: 'tripDestination',
      label: 'Destino',
      width: '150px',
    },
    {
      key: 'tripDate',
      label: 'Data do Passeio',
      format: formatDate,
      width: '120px',
    },
    {
      key: 'registrationDate',
      label: 'Data de Registro',
      format: formatDate,
      width: '120px',
    },
    {
      key: 'paymentStatus',
      label: 'Status de Pagamento',
      format: (value: any) => getPaymentStatusLabel(value),
      width: '150px',
    },
    {
      key: 'attendanceStatus',
      label: 'Status de Frequência',
      format: (value: any) => getAttendanceStatusLabel(value),
      width: '150px',
    },
    {
      key: 'amountPaid',
      label: 'Valor Pago',
      format: formatCurrency,
      width: '120px',
    },
    {
      key: 'amountDue',
      label: 'Valor Devido',
      format: formatCurrency,
      width: '120px',
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Carregando relatório de participantes..." />;
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
        icon="👥"
        title="Nenhum dado encontrado"
        message="Não há dados de participantes disponíveis para o período selecionado."
      />
    );
  }

  return (
    <div className="participant-report">
      <div className="report-header">
        <h4 className="report-title">Relatório de Participantes</h4>
        <ReportExport reportType={ReportType.PARTICIPANT} filters={filters} onExport={refetch} />
      </div>
      <ReportTable
        title="Dados dos Participantes"
        columns={columns}
        data={data.data}
        maxHeight={400}
      />
    </div>
  );
}
