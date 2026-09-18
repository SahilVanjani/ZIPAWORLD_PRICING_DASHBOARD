import React from 'react';

const statusConfig = {
  'Pending': { cls: 'badge badge-pending', dot: '#e65100' },
  'In Progress': { cls: 'badge badge-inprogress', dot: '#1565c0' },
  'Rate Available': { cls: 'badge badge-available', dot: '#2e7d32' },
  'Rates Available': { cls: 'badge badge-available', dot: '#2e7d32' },
  'Quoted': { cls: 'badge badge-quoted', dot: '#6a1b9a' },
  'Confirmed': { cls: 'badge badge-confirmed', dot: '#1b5e20' },
  'Closed': { cls: 'badge badge-confirmed', dot: '#1b5e20' },
  'SLA Breached': { cls: 'badge badge-breached', dot: '#b71c1c' },
  'No Rate': { cls: 'badge badge-norate', dot: '#616161' },
  'Active': { cls: 'badge badge-confirmed', dot: '#1b5e20' },
  'Expiring': { cls: 'badge badge-pending', dot: '#e65100' },
  'Expired': { cls: 'badge badge-breached', dot: '#b71c1c' }
};

export const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || { cls: 'badge', dot: '#9e9e9e' };
  return (
    <span className={cfg.cls}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, display: 'inline-block', flexShrink: 0 }} />
      {status}
    </span>);
};
