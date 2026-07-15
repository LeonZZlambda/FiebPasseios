import React from 'react';
import { TableColumn } from '../../types/dashboard.types';
import EmptyState from '../ui/EmptyState';
import LoadingSpinner from '../ui/LoadingSpinner';
import './DataTable.css';

interface DataTableProps<T> {
  title: string;
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  maxHeight?: number;
}

export default function DataTable<T>({
  title,
  columns,
  data,
  loading = false,
  empty = false,
  emptyMessage = 'Nenhum dado disponível',
  onRowClick,
  maxHeight,
}: DataTableProps<T>): JSX.Element {
  if (loading) {
    return (
      <div className="data-table">
        <div className="data-table-header">
          <h3 className="data-table-title">{title}</h3>
        </div>
        <div className="data-table-body">
          <LoadingSpinner message="Carregando dados..." size="small" />
        </div>
      </div>
    );
  }

  if (empty || data.length === 0) {
    return (
      <div className="data-table">
        <div className="data-table-header">
          <h3 className="data-table-title">{title}</h3>
        </div>
        <div className="data-table-body">
          <EmptyState icon="📊" title={emptyMessage} message="" />
        </div>
      </div>
    );
  }

  return (
    <div className="data-table">
      <div className="data-table-header">
        <h3 className="data-table-title">{title}</h3>
      </div>
      <div className="data-table-body" style={maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={String(column.key)} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'data-table-row-clickable' : ''}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {column.render
                        ? column.render(row[column.key], row)
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
