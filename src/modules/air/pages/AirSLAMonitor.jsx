import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Clock, TrendingDown } from 'lucide-react';
import { airExportQueries, airImportQueries } from '../data/airQueries';
import { formatAge } from '../utils/helpers';

const SLA_LIMITS = {
  Express: 30,
  Standard: 60,
};

const STATUS_WEIGHTS = {
  'Pending': 0,
  'Rate Available': 1,
  'Quoted': 2,
  'Confirmed': 3,
  'Closed': 3,
};

export const AirSLAMonitor = () => {
  const [tradeType, setTradeType] = useState('EXPORT');
  const allQueries = [...airExportQueries, ...airImportQueries];
  const queries = tradeType === 'EXPORT' ? airExportQueries : airImportQueries;

  const activeQueries = queries.filter(q => q.status !== 'Confirmed' && q.status !== 'Closed');
  
  const breached = activeQueries.filter(q => q.ageMinutes >= SLA_LIMITS[q.service]);
  const atRisk = activeQueries.filter(q => {
    const limit = SLA_LIMITS[q.service];
    return q.ageMinutes < limit && q.ageMinutes >= limit * 0.7;
  });
  const withinSLA = activeQueries.filter(q => q.ageMinutes < SLA_LIMITS[q.service] * 0.7);

  const slaScore = activeQueries.length > 0
    ? Math.round(withinSLA.length / activeQueries.length * 100)
    : 100;

  const getSLAStyle = (q) => {
    const limit = SLA_LIMITS[q.service];
    const pct = q.ageMinutes / limit;
    if (pct >= 1) return { bg: '#fee2e2', color: '#991b1b', label: '⚠ BREACHED', barColor: '#dc2626' };
    if (pct >= 0.7) return { bg: '#fef3c7', color: '#92400e', label: '⚡ AT RISK', barColor: '#f59e0b' };
    return { bg: '#dcfce7', color: '#166534', label: '✓ OK', barColor: '#16a34a' };
  };

  const teamSLA = ['Sahil', 'Rahul', 'Amit', 'Neha', 'Priya'].map(name => {
    const myQueries = activeQueries.filter(q => q.assignedTo === name);
    const myBreached = myQueries.filter(q => q.ageMinutes >= SLA_LIMITS[q.service]);
    return {
      name,
      total: myQueries.length,
      breached: myBreached.length,
      score: myQueries.length > 0 ? Math.round((1 - myBreached.length / myQueries.length) * 100) : 100
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={28} color="#e8192c" />
            SLA Monitor
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Real-time SLA health · Express: 30 min · Standard: 60 min
          </p>
        </div>

        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: 8, padding: 4 }}>
          {['EXPORT', 'IMPORT', 'ALL'].map(t => (
            <button
              key={t}
              onClick={() => setTradeType(t)}
              style={{
                background: tradeType === t ? 'white' : 'transparent',
                color: tradeType === t ? '#0a1628' : '#64748b',
                fontWeight: tradeType === t ? 700 : 600,
                boxShadow: tradeType === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                border: 'none', padding: '6px 16px', borderRadius: 6, fontSize: 12, cursor: 'pointer'
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SLA Score + KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Score */}
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: slaScore >= 80 ? '#f0fdf4' : slaScore >= 60 ? '#fffbeb' : '#fef2f2', border: `2px solid ${slaScore >= 80 ? '#bbf7d0' : slaScore >= 60 ? '#fde68a' : '#fecaca'}` }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: slaScore >= 80 ? '#15803d' : slaScore >= 60 ? '#d97706' : '#b91c1c', lineHeight: 1 }}>
            {slaScore}%
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginTop: 6 }}>SLA Score</div>
          <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 4 }}>Active queries within SLA</div>
        </div>

        {/* Breached */}
        <div className="card" style={{ padding: 20, background: '#fef2f2', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>SLA Breached</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#b91c1c' }}>{breached.length}</div>
              <div style={{ fontSize: 12, color: '#dc2626', fontWeight: 600, marginTop: 4 }}>Immediate action required</div>
            </div>
            <AlertTriangle size={28} color="#dc2626" />
          </div>
        </div>

        {/* At Risk */}
        <div className="card" style={{ padding: 20, background: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>At Risk</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#d97706' }}>{atRisk.length}</div>
              <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600, marginTop: 4 }}>{'>'} 70% of SLA used</div>
            </div>
            <Clock size={28} color="#f59e0b" />
          </div>
        </div>

        {/* Within SLA */}
        <div className="card" style={{ padding: 20, background: '#f0fdf4', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Within SLA</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#15803d' }}>{withinSLA.length}</div>
              <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginTop: 4 }}>On track ✓</div>
            </div>
            <CheckCircle size={28} color="#16a34a" />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Active Queries SLA Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, fontSize: 14, color: '#0a1628' }}>
            Active Queries — SLA Status
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 420 }}>
            <table className="data-table" style={{ width: '100%', fontSize: 12 }}>
              <thead>
                <tr>
                  <th>Query ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Service</th>
                  <th>Assigned</th>
                  <th>Age</th>
                  <th>SLA Used</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeQueries
                  .sort((a, b) => (b.ageMinutes / SLA_LIMITS[b.service]) - (a.ageMinutes / SLA_LIMITS[a.service]))
                  .slice(0, 25)
                  .map(q => {
                    const limit = SLA_LIMITS[q.service];
                    const pct = Math.min(q.ageMinutes / limit * 100, 100);
                    const sla = getSLAStyle(q);
                    return (
                      <tr key={q.id} style={{ background: sla.bg + '60' }}>
                        <td style={{ fontWeight: 700, color: '#1565c0' }}>{q.id}</td>
                        <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {q.customer.split(' ').slice(0, 2).join(' ')}
                        </td>
                        <td style={{ fontWeight: 700 }}>{q.origin} ✈ {q.destination}</td>
                        <td>
                          <span style={{ fontSize: 10, fontWeight: 700, background: q.service === 'Express' ? '#fce7f3' : '#e0f2fe', color: q.service === 'Express' ? '#9d174d' : '#0369a1', padding: '2px 6px', borderRadius: 10 }}>
                            {q.service}
                          </span>
                        </td>
                        <td>{q.assignedTo}</td>
                        <td style={{ fontWeight: 700, color: sla.barColor }}>{formatAge(q.ageMinutes)}</td>
                        <td style={{ minWidth: 120 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: sla.barColor, borderRadius: 3, transition: 'width 0.3s' }} />
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: sla.barColor, width: 35 }}>{Math.round(pct)}%</span>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: sla.bg, color: sla.color }}>
                            {sla.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team SLA Leaderboard */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>Team SLA Scorecard</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {teamSLA.map((m, i) => (
              <div key={m.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 20, height: 20, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#64748b' }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0a1628' }}>{m.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: m.score >= 80 ? '#15803d' : m.score >= 60 ? '#d97706' : '#b91c1c' }}>
                    {m.score}%
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ flex: 1, height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${m.score}%`, height: '100%', background: m.score >= 80 ? '#16a34a' : m.score >= 60 ? '#f59e0b' : '#dc2626', borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>
                  {m.total} active · {m.breached} breached
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
