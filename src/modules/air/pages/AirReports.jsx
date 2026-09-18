import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Filter } from 'lucide-react';

const reports = [
  {
    id: 'r1',
    title: 'Daily Air Pricing Summary',
    desc: 'Query volume, TAT performance, SLA compliance, airline-wise breakdown for today.',
    badge: 'Daily',
    icon: '📊',
    badgeColor: '#dbeafe',
    badgeText: '#1d4ed8',
    lastGenerated: 'Today, 09:00',
  },
  {
    id: 'r2',
    title: 'Weekly Performance Report',
    desc: 'Week-on-week pricing team performance, carrier analysis, and top trade lanes.',
    badge: 'Weekly',
    icon: '📈',
    badgeColor: '#dcfce7',
    badgeText: '#15803d',
    lastGenerated: 'Mon, 09:00',
  },
  {
    id: 'r3',
    title: 'SLA Breach Report',
    desc: 'All SLA breached queries with root-cause analysis, assignee breakdown, and trends.',
    badge: 'On-demand',
    icon: '⚠️',
    badgeColor: '#fee2e2',
    badgeText: '#b91c1c',
    lastGenerated: 'Yesterday, 17:30',
  },
  {
    id: 'r4',
    title: 'Carrier Rate Report',
    desc: 'Airline-wise rate comparison, validity tracking, and route-level benchmarking.',
    badge: 'Monthly',
    icon: '✈️',
    badgeColor: '#f3e8ff',
    badgeText: '#7c3aed',
    lastGenerated: '1 Sep, 09:00',
  },
  {
    id: 'r5',
    title: 'Rate Coverage Analysis',
    desc: 'Missing, expiring, and expired rates by trade lane with procurement gaps.',
    badge: 'Weekly',
    icon: '🗺️',
    badgeColor: '#fef3c7',
    badgeText: '#92400e',
    lastGenerated: 'Mon, 09:00',
  },
  {
    id: 'r6',
    title: 'Team Productivity Report',
    desc: 'Individual and team-level query handling, conversion rates, and TAT analytics.',
    badge: 'Monthly',
    icon: '👥',
    badgeColor: '#e0f2fe',
    badgeText: '#0369a1',
    lastGenerated: '1 Sep, 09:00',
  },
  {
    id: 'r7',
    title: 'Import vs Export Analysis',
    desc: 'Side-by-side import and export volume, revenue, and margin comparison.',
    badge: 'Monthly',
    icon: '🔄',
    badgeColor: '#d1fae5',
    badgeText: '#065f46',
    lastGenerated: '1 Sep, 09:00',
  },
  {
    id: 'r8',
    title: 'Customer Pricing Report',
    desc: 'Customer-level pricing history, quote acceptance rates, and revenue potential.',
    badge: 'On-demand',
    icon: '🏢',
    badgeColor: '#fce7f3',
    badgeText: '#9d174d',
    lastGenerated: '14 Sep, 11:00',
  },
  {
    id: 'r9',
    title: 'Commodity Rate Analysis',
    desc: 'Rate trends by commodity type, chargeable weight, and special handling categories.',
    badge: 'Quarterly',
    icon: '📦',
    badgeColor: '#fff7ed',
    badgeText: '#c2410c',
    lastGenerated: '1 Jul, 09:00',
  },
];

const scheduledReports = [
  { name: 'Daily Summary', schedule: 'Every day at 09:00', nextRun: 'Tomorrow 09:00', status: 'Active' },
  { name: 'Weekly Performance', schedule: 'Every Monday at 09:00', nextRun: 'Mon 23 Sep 09:00', status: 'Active' },
  { name: 'Monthly Carrier Report', schedule: '1st of each month at 09:00', nextRun: '1 Oct 09:00', status: 'Active' },
];

export const AirReports = () => {
  const [downloading, setDownloading] = useState(null);
  const [search, setSearch] = useState('');

  const handleDownload = (id) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 1500);
  };

  const filtered = reports.filter(r =>
    !search ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={28} color="#e8192c" />
            Air Reports
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Download, preview, and schedule air freight pricing reports
          </p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Calendar size={14} /> Schedule Report
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: 'relative', maxWidth: 360 }}>
          <Filter size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            className="form-input"
            placeholder="Search reports..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 32, width: '100%', fontSize: 13 }}
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {filtered.map(r => (
          <div key={r.id} className="card" style={{ padding: 20, transition: 'transform 0.15s', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: 13, color: '#0a1628', lineHeight: 1.3 }}>{r.title}</h3>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, background: r.badgeColor, color: r.badgeText, padding: '2px 8px', borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>
                {r.badge}
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 14, lineHeight: 1.5 }}>{r.desc}</p>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 14 }}>
              Last generated: <strong style={{ color: '#475569' }}>{r.lastGenerated}</strong>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" style={{ fontSize: 11, padding: '5px 12px', flex: 1 }}>
                Preview
              </button>
              <button
                className="btn-primary"
                style={{ fontSize: 11, padding: '5px 12px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                onClick={() => handleDownload(r.id)}>
                {downloading === r.id ? (
                  <span>Generating...</span>
                ) : (
                  <><Download size={12} /> Download PDF</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Reports */}
      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={16} color="#1565c0" /> Scheduled Reports
        </div>
        <table className="data-table" style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Schedule</th>
              <th>Next Run</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scheduledReports.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td style={{ color: '#64748b' }}>{r.schedule}</td>
                <td style={{ color: '#64748b' }}>{r.nextRun}</td>
                <td>
                  <span style={{ fontSize: 11, fontWeight: 700, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 10 }}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Demo Notice */}
      <div style={{ padding: '14px 20px', background: '#fef3c7', borderRadius: 10, border: '1px solid #fde68a', fontSize: 13, color: '#92400e', fontWeight: 500 }}>
        📊 Reports are in demo mode — no real data will be exported. All reports display sample ZIPWORLD Air Pricing data for management presentation.
      </div>
    </div>
  );
};
