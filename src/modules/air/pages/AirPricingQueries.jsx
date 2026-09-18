import React, { useState } from 'react';
import { List, Search, Filter, Clock, CheckCircle, AlertTriangle, ChevronRight, Plane, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { airExportQueries, airImportQueries } from '../data/airQueries';
import { StatusBadge } from '../components/StatusBadge';
import { formatAge } from '../utils/helpers';
import { AirQueryDetail } from '../components/AirQueryDetail';

const SLA_MINUTES = 60;

export const AirPricingQueries = () => {
  const [tradeType, setTradeType] = useState('EXPORT');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);

  const allQueries = tradeType === 'EXPORT' ? airExportQueries : airImportQueries;

  const statuses = ['ALL', 'Pending', 'Rate Available', 'Quoted', 'Confirmed', 'Closed'];

  const filtered = allQueries.filter(q => {
    const matchStatus = statusFilter === 'ALL' || q.status === statusFilter;
    const matchSearch = !search ||
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q.origin.toLowerCase().includes(search.toLowerCase()) ||
      q.destination.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    ALL: allQueries.length,
    Pending: allQueries.filter(q => q.status === 'Pending').length,
    'Rate Available': allQueries.filter(q => q.status === 'Rate Available').length,
    Quoted: allQueries.filter(q => q.status === 'Quoted').length,
    Confirmed: allQueries.filter(q => q.status === 'Confirmed').length,
    Closed: allQueries.filter(q => q.status === 'Closed').length,
  };

  const getSLAStyle = (q) => {
    if (q.status === 'Confirmed' || q.status === 'Closed') return { color: '#16a34a', bg: '#dcfce7' };
    if (q.ageMinutes >= SLA_MINUTES) return { color: '#b71c1c', bg: '#fee2e2' };
    if (q.ageMinutes >= SLA_MINUTES * 0.8) return { color: '#92400e', bg: '#fef3c7' };
    return { color: '#166534', bg: '#dcfce7' };
  };

  if (selectedQuery) {
    return <AirQueryDetail query={selectedQuery} onBack={() => setSelectedQuery(null)} />;
  }

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <List size={28} color="#e8192c" />
            Air Pricing Queries
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            All air freight pricing requests — Import & Export
          </p>
        </div>

        {/* Export/Import Toggle */}
        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: 8, padding: 4 }}>
          {['EXPORT', 'IMPORT'].map(t => (
            <button
              key={t}
              onClick={() => { setTradeType(t); setStatusFilter('ALL'); }}
              style={{
                background: tradeType === t ? 'white' : 'transparent',
                color: tradeType === t ? '#0a1628' : '#64748b',
                fontWeight: tradeType === t ? 700 : 600,
                boxShadow: tradeType === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                border: 'none', padding: '6px 20px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
              }}>
              {t === 'EXPORT' ? <PlaneTakeoff size={14} /> : <PlaneLanding size={14} />}
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              border: statusFilter === s ? '2px solid #e8192c' : '1px solid #e2e8f0',
              background: statusFilter === s ? '#fff0f1' : 'white',
              color: statusFilter === s ? '#e8192c' : '#475569',
              cursor: 'pointer', transition: 'all 0.15s'
            }}>
            {s} {counts[s] !== undefined && <span style={{ marginLeft: 4, background: '#f1f5f9', borderRadius: 10, padding: '0 6px' }}>{counts[s]}</span>}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            className="form-input"
            placeholder="Search by ID, customer, origin, destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 32, width: '100%', fontSize: 13 }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '900px' }}>
            <thead>
              <tr>
                <th>Query ID</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Commodity</th>
                <th>Chg. Wt.</th>
                <th>Service</th>
                <th>Assigned</th>
                <th>Age</th>
                <th>SLA</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px', fontSize: 14 }}>
                    No queries found matching your filters.
                  </td>
                </tr>
              ) : filtered.map(q => {
                const sla = getSLAStyle(q);
                return (
                  <tr
                    key={q.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedQuery(q)}>
                    <td style={{ fontWeight: 700, color: '#1565c0' }}>{q.id}</td>
                    <td style={{ maxWidth: 180 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#0a1628', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {q.customer}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>
                        {q.origin} <span style={{ color: '#e8192c' }}>✈</span> {q.destination}
                      </span>
                    </td>
                    <td style={{ color: '#475569', fontSize: 12 }}>{q.commodity}</td>
                    <td style={{ fontWeight: 600 }}>{q.chargeableWeight.toFixed(1)} kg</td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 700, background: q.service === 'Express' ? '#fce7f3' : '#e0f2fe', color: q.service === 'Express' ? '#9d174d' : '#0369a1', padding: '2px 8px', borderRadius: 10 }}>
                        {q.service}
                      </span>
                    </td>
                    <td style={{ color: '#475569', fontSize: 13 }}>{q.assignedTo}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                        <Clock size={11} color="#94a3b8" />
                        <span style={{ fontWeight: 600, color: q.ageMinutes > SLA_MINUTES ? '#b71c1c' : '#0a1628' }}>
                          {formatAge(q.ageMinutes)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 10, fontWeight: 700, background: sla.bg, color: sla.color, padding: '2px 8px', borderRadius: 10 }}>
                        {q.ageMinutes >= SLA_MINUTES && q.status !== 'Confirmed' && q.status !== 'Closed'
                          ? '⚠ Breached'
                          : q.status === 'Confirmed' || q.status === 'Closed'
                          ? '✓ Closed'
                          : `${SLA_MINUTES - q.ageMinutes}m left`}
                      </span>
                    </td>
                    <td><StatusBadge status={q.status} /></td>
                    <td>
                      <ChevronRight size={14} color="#94a3b8" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', fontSize: 12, color: '#94a3b8' }}>
          Showing {filtered.length} of {allQueries.length} queries · {tradeType} · Air Freight
        </div>
      </div>
    </div>
  );
};
