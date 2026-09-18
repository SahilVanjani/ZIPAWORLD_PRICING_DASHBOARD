import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const KPICard = ({
  title, value, trend, trendLabel, icon, iconBg = '#e3f2fd',
  suffix, onClick, highlight, alertLevel = 'normal'
}) => {
  const trendColor = trend === undefined ? '' : trend > 0 ? '#16a34a' : trend < 0 ? '#dc2626' : '#6b7280';
  const borderColor = alertLevel === 'danger' ? '#fecaca' : alertLevel === 'warning' ? '#fde68a' : 'transparent';

  return (
    <div
      className="kpi-card card animate-countUp"
      style={{
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        borderLeft: highlight ? '4px solid #e8192c' : `1px solid ${borderColor || '#e8edf3'}`,
        background: alertLevel === 'danger' ? '#fff5f5' : alertLevel === 'warning' ? '#fffbeb' : 'white'
      }}
      onClick={onClick}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>
            {title}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: alertLevel === 'danger' ? '#b71c1c' : '#0a1628', lineHeight: 1 }}>
              {value}
            </span>
            {suffix && <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{suffix}</span>}
          </div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          {icon}
        </div>
      </div>
      {trend !== undefined &&
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {trend > 0 ? <TrendingUp size={13} color={trendColor} /> :
        trend < 0 ? <TrendingDown size={13} color={trendColor} /> :
        <Minus size={13} color={trendColor} />}
          <span style={{ fontSize: 12, color: trendColor, fontWeight: 600 }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>
            {trendLabel || 'vs prev period'}
          </span>
        </div>
      }
    </div>);
};
