import React from 'react';
import { ReportType, ExportFormat, ReportFilters } from '../../types/report.types';
import { useExportReport, usePrintableReport } from '../../hooks/useReports';
import { getReportTypeLabel, getExportFormatLabel } from '../../types/report.types';
import './ReportExport.css';

interface ReportExportProps {
  reportType: ReportType;
  filters?: ReportFilters;
  onExport?: () => void;
}

export default function ReportExport({
  reportType,
  filters,
  onExport,
}: ReportExportProps): JSX.Element {
  const { exportReport, loading: exporting } = useExportReport();
  const { generatePrintableReport, loading: printing } = usePrintableReport();

  const handleExport = async (format: ExportFormat) => {
    if (format === ExportFormat.PRINT) {
      try {
        await generatePrintableReport(reportType, filters);
        onExport?.();
      } catch (error) {
        console.error('Error generating printable report:', error);
      }
    } else {
      try {
        await exportReport(reportType, format, filters);
        onExport?.();
      } catch (error) {
        console.error('Error exporting report:', error);
      }
    }
  };

  return (
    <div className="report-export">
      <div className="report-export-header">
        <h5 className="report-export-title">Exportar Relatório</h5>
        <span className="report-export-subtitle">{getReportTypeLabel(reportType)}</span>
      </div>

      <div className="report-export-options">
        <button
          className="report-export-btn btn btn-outline-success"
          onClick={() => handleExport(ExportFormat.CSV)}
          disabled={exporting || printing}
          title="Exportar para CSV"
        >
          <span className="report-export-icon">📄</span>
          <span className="report-export-label">CSV</span>
        </button>

        <button
          className="report-export-btn btn btn-outline-primary"
          onClick={() => handleExport(ExportFormat.EXCEL)}
          disabled={exporting || printing}
          title="Exportar para Excel"
        >
          <span className="report-export-icon">📊</span>
          <span className="report-export-label">Excel</span>
        </button>

        <button
          className="report-export-btn btn btn-outline-danger"
          onClick={() => handleExport(ExportFormat.PDF)}
          disabled={exporting || printing}
          title="Exportar para PDF"
        >
          <span className="report-export-icon">📕</span>
          <span className="report-export-label">PDF</span>
        </button>

        <button
          className="report-export-btn btn btn-outline-secondary"
          onClick={() => handleExport(ExportFormat.PRINT)}
          disabled={exporting || printing}
          title="Imprimir relatório"
        >
          <span className="report-export-icon">🖨️</span>
          <span className="report-export-label">Imprimir</span>
        </button>
      </div>

      {(exporting || printing) && (
        <div className="report-export-loading">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
          <span>Processando exportação...</span>
        </div>
      )}
    </div>
  );
}
