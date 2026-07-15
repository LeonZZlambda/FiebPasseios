import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';
import ReportFilter from '../../components/reports/ReportFilter';
import TripSummaryReport from '../../components/reports/TripSummaryReport';
import ParticipantReport from '../../components/reports/ParticipantReport';
import AttendanceReport from '../../components/reports/AttendanceReport';
import FinancialReport from '../../components/reports/FinancialReport';
import OccupancyReport from '../../components/reports/OccupancyReport';
import ReportAnalytics from '../../components/reports/ReportAnalytics';
import { ReportFilters, ReportType } from '../../types/report.types';
import './ReportsPage.css';

export default function ReportsPage(): JSX.Element {
  const [activeReport, setActiveReport] = useState<ReportType>(ReportType.TRIP_SUMMARY);
  const [filters, setFilters] = useState<ReportFilters>({});

  const handleFiltersChange = (newFilters: ReportFilters) => {
    setFilters(newFilters);
  };

  const renderReport = () => {
    switch (activeReport) {
      case ReportType.TRIP_SUMMARY:
        return <TripSummaryReport filters={filters} />;
      case ReportType.PARTICIPANT:
        return <ParticipantReport filters={filters} />;
      case ReportType.ATTENDANCE:
        return <AttendanceReport filters={filters} />;
      case ReportType.FINANCIAL:
        return <FinancialReport filters={filters} />;
      case ReportType.OCCUPANCY:
        return <OccupancyReport filters={filters} />;
      default:
        return <TripSummaryReport filters={filters} />;
    }
  };

  return (
    <div>
        <Header goto="/dashboard" title="Relatórios" logo={logo} />
        <div className="reports-page">
          <div className="reports-header">
            <h3 className="reports-title">Relatórios e Analytics</h3>
            <p className="reports-subtitle">Gere relatórios detalhados e exporte dados para análise</p>
          </div>

          <div className="reports-tabs">
            <button
              className={`report-tab ${activeReport === ReportType.TRIP_SUMMARY ? 'active' : ''}`}
              onClick={() => setActiveReport(ReportType.TRIP_SUMMARY)}
            >
              Resumo de Passeios
            </button>
            <button
              className={`report-tab ${activeReport === ReportType.PARTICIPANT ? 'active' : ''}`}
              onClick={() => setActiveReport(ReportType.PARTICIPANT)}
            >
              Participantes
            </button>
            <button
              className={`report-tab ${activeReport === ReportType.ATTENDANCE ? 'active' : ''}`}
              onClick={() => setActiveReport(ReportType.ATTENDANCE)}
            >
              Frequência
            </button>
            <button
              className={`report-tab ${activeReport === ReportType.FINANCIAL ? 'active' : ''}`}
              onClick={() => setActiveReport(ReportType.FINANCIAL)}
            >
              Financeiro
            </button>
            <button
              className={`report-tab ${activeReport === ReportType.OCCUPANCY ? 'active' : ''}`}
              onClick={() => setActiveReport(ReportType.OCCUPANCY)}
            >
              Ocupação
            </button>
            <button
              className={`report-tab ${activeReport === ReportType.ANALYTICS ? 'active' : ''}`}
              onClick={() => setActiveReport(ReportType.ANALYTICS)}
            >
              Analytics
            </button>
          </div>

          <ReportFilter
            filters={filters}
            onFiltersChange={handleFiltersChange}
            showTripFilter={true}
            showParticipantFilter={activeReport === ReportType.PARTICIPANT}
            showStatusFilter={activeReport === ReportType.TRIP_SUMMARY || activeReport === ReportType.OCCUPANCY}
            showPaymentStatusFilter={activeReport === ReportType.PARTICIPANT || activeReport === ReportType.FINANCIAL}
            showAttendanceStatusFilter={activeReport === ReportType.PARTICIPANT || activeReport === ReportType.ATTENDANCE}
          />

          <div className="reports-content">
            {activeReport === ReportType.ANALYTICS ? (
              <ReportAnalytics filters={filters} />
            ) : (
              renderReport()
            )}
          </div>
        </div>
      </div>
  );
}
