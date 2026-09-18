import React, { useState } from 'react';
import { mockQueries } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { formatTime, formatAge, getSLAColor } from '../utils/helpers';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

const SLA_TARGET = 60; // minutes

export const SLAMonitor = () => {
  const [view, setView] = useState('all');

  const withinSLA = mockQueries.filter((q) => q.ageMinutes < q.slaMinutes * 0.8 && q.status !== 'Confirmed' && q.status !== 'SLA Breached');
  const nearSLA = mockQueries.filter((q) => q.ageMinutes >= q.slaMinutes * 0.8 && q.ageMinutes < q.slaMinutes && q.status !== 'Confirmed');
  const breached = mockQueries.filter((q) => q.status === 'SLA Breached' || q.ageMinutes >= q.slaMinutes);

  const slaCompliance = ((mockQueries.length - breached.length) / mockQueries.length * 100).toFixed(1);
  const avgTAT = Math.round(mockQueries.filter((q) => q.tatMinutes).reduce((a, b) => a + (b.tatMinutes || 0), 0) / mockQueries.filter((q) => q.tatMinutes).length);

  const displayData = view === 'breached' ? breached : view === 'near' ? nearSLA : [...breached, ...nearSLA, ...withinSLA];

  return (
    <div className="page-content animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>SLA Monitor</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>Real-time SLA tracking — SLA Target: <strong>60 minutes</strong></p>
      </div>

      {/* SLA KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <CheckCircle size={20} color="#16a34a" />
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SLA Compliance</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#16a34a' }}>{slaCompliance}%</div>
          <div style={{ height: 6, borderRadius: 3, background: '#e2e8f0', marginTop: 8 }}>
            <div style={{ height: '100%', borderRadius: 3, background: '#16a34a', width: `${slaCompliance}%` }} />
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Clock size={20} color="#1565c0" />
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Average TAT</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#1565c0' }}>{avgTAT}<span style={{ fontSize: 16 }}> min</span></div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Target: 60 min</div>
        </div>

        <div className="card" style={{ padding: '20px', background: '#fff3e0', borderColor: '#fde68a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <AlertTriangle size={20} color="#f59e0b" />
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Near SLA</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#e65100' }}>{nearSLA.length}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Approaching breach</div>
        </div>

        <div className="card" style={{ padding: '20px', background: '#fff5f5', borderColor: '#fecaca' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <XCircle size={20} color="#e8192c" />
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>SLA Breached</span>
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#b71c1c' }}>{breached.length}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Require immediate action</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {[
        { id: 'all', label: `All Active (${mockQueries.length})` },
        { id: 'near', label: `Near SLA (${nearSLA.length})`, color: '#f59e0b' },
        { id: 'breached', label: `Breached (${breached.length})`, color: '#e8192c' }].
        map((tab) =>
        <button
          key={tab.id}
          className={`tab-btn ${view === tab.id ? 'active' : ''}`}
          onClick={() => setView(tab.id)}>
          
            {tab.label}
          </button>
        )}
      </div>

      {/* SLA Queue */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Customer</th>
              <th>Received</th>
              <th>Current Age</th>
              <th>Remaining SLA</th>
              <th>SLA Progress</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((q) => {
              const remaining = q.slaMinutes - q.ageMinutes;
              const slaColor = getSLAColor(q.ageMinutes, q.slaMinutes);
              const pct = Math.min(100, q.ageMinutes / q.slaMinutes * 100);
              return (
                <tr key={q.id} className={q.ageMinutes >= q.slaMinutes ? 'sla-breached' : pct >= 80 ? 'sla-warning' : ''}>
                  <td><span style={{ fontWeight: 700, color: '#1565c0' }}>{q.id}</span></td>
                  <td style={{ fontSize: 13 }}>{q.customer}</td>
                  <td style={{ fontSize: 12 }}>{formatTime(q.receivedAt)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} color={slaColor} />
                      <span style={{ fontWeight: 700, color: slaColor }}>{formatAge(q.ageMinutes)}</span>
                    </div>
                  </td>
                  <td>
                    {remaining > 0 ?
                    <span style={{ fontWeight: 700, color: slaColor }}>{formatAge(remaining)} left</span> :

                    <span style={{ fontWeight: 700, color: '#b71c1c' }}>BREACHED by {formatAge(Math.abs(remaining))}</span>
                    }
                  </td>
                  <td style={{ width: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3 }}>
                        <div style={{ height: '100%', borderRadius: 3, background: slaColor, width: `${pct}%`, transition: 'width 0.5s' }} />
                      </div>
                      <span style={{ fontSize: 11, color: '#94a3b8', width: 32 }}>{pct.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
                        {q.assignedTo[0]}
                      </div>
                      <span style={{ fontSize: 12 }}>{q.assignedTo}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={q.status} /></td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
    </div>);

};