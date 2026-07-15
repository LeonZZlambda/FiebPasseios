import React from 'react';
import { ReportColumn } from '../../types/report.types';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import './ReportTable.css';

interface ReportTableProps<T> {
  title: string;
  columns: ReportColumn<T>[];
  data: T[];
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  maxHeight?: number;
}

export default function ReportTable<T>({
  title,
  columns,
  data,
  loading = false,
  empty = false,
  emptyMessage = 'Nenhum dado disponível',
  maxHeight,
}: ReportTableProps<T>): JSX.Element {
  if (loading) {
    return (
      <div className="report-table">
        <div className="report-table-header">
          <h3 className="report-table-title">{title}</h3>
        </div>
        <div className="report-table-body">
          <LoadingSpinner message="Carregando dados..." size="small" />
        </div>
      </div>
    );
  }

  if (empty || data.length === 0) {
    return (
      <div className="report-table">
        <div className="report-table-header">
          <h3 className="report-table-title">{title}</h3>
        </div>
        <div className="report-table-body">
          <EmptyState icon="📊" title={emptyMessage} message="" />
        </div>
      </div>
    );
  }

  return (
    <div className="report-table">
      <div className="report-table-header">
        <h3 className="report-table-title">{title}</h3>
        <span className="report-table-count">{data.length} registros</span>
      </div>
      <div className="report-table-body" style={maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={String(column.key)} style={column.width ? { width: column.width } : undefined}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {column.format
                        ? column.format(row[column.key])
                        : String(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
