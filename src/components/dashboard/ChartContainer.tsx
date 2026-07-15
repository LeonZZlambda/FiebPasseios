import React from 'react';
import { ChartDataPoint } from '../../types/dashboard.types';
import './ChartContainer.css';

interface ChartContainerProps {
  title: string;
  type: 'bar' | 'pie' | 'line';
  data: ChartDataPoint[];
  loading?: boolean;
  height?: number;
}

export default function ChartContainer({
  title,
  type,
  data,
  loading = false,
  height = 300,
}: ChartContainerProps): JSX.Element {
  if (loading) {
    return (
      <div className="chart-container chart-loading">
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
        </div>
        <div className="chart-skeleton" style={{ height: `${height}px` }}></div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));

  const renderBarChart = () => (
    <div className="bar-chart">
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-wrapper">
            <div
              className="chart-bar"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#0d6efd',
              }}
            >
              <span className="chart-bar-value">{item.value}</span>
            </div>
            <span className="chart-bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
      <div className="pie-chart">
        <svg viewBox="0 0 100 100" className="pie-chart-svg">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            currentAngle += angle;

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color || '#0d6efd'}
                className="pie-slice"
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: item.color || '#0d6efd' }}
              ></div>
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineChart = () => (
    <div className="line-chart">
      <svg viewBox="0 0 400 200" className="line-chart-svg">
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 380 + 10;
          const y = 190 - (item.value / maxValue) * 180;
          return (
            <React.Fragment key={index}>
              <circle cx={x} cy={y} r="4" fill={item.color || '#0d6efd'} />
              {index < data.length - 1 && (
                <line
                  x1={x}
                  y1={y}
                  x2={((index + 1) / (data.length - 1)) * 380 + 10}
                  y2={190 - (data[index + 1].value / maxValue) * 180}
                  stroke={item.color || '#0d6efd'}
                  strokeWidth="2"
                />
              )}
              <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fill="#6c757d">
                {item.value}
              </text>
              <text x={x} y={210} textAnchor="middle" fontSize="11" fill="#6c757d">
                {item.label}
              </text>
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
      </div>
      <div className="chart-body" style={{ height: `${height}px` }}>
        {type === 'bar' && renderBarChart()}
        {type === 'pie' && renderPieChart()}
        {type === 'line' && renderLineChart()}
      </div>
    </div>
  );
}
