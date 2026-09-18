import React, { useState } from 'react';
import { Database, Search, Filter } from 'lucide-react';
import { airRates } from '../data/airRates';

export const AirRateMaster = () => {
  const [search, setSearch] = useState('');

  const filteredRates = airRates.filter(r => 
    r.airline.toLowerCase().includes(search.toLowerCase()) || 
    r.origin.toLowerCase().includes(search.toLowerCase()) ||
    r.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-content animate-fadeIn">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Database size={28} color="#1565c0" />
            Air Rate Master
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Central repository for all active and historical air freight rates
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ position: 'relative', width: 300 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              className="form-input"
              placeholder="Search airline, origin, destination..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 32, width: '100%', fontSize: 13 }}
            />
          </div>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Filter size={14} /> Filter Rates
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '1000px', fontSize: 12 }}>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Route</th>
                <th>Service</th>
                <th>Currency</th>
                <th>M</th>
                <th>N</th>
                <th>+45</th>
                <th>+100</th>
                <th>+300</th>
                <th>+500</th>
                <th>+1000</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600, color: '#1565c0' }}>{r.airline}</td>
                  <td style={{ fontWeight: 700 }}>{r.origin} ✈ {r.destination}</td>
                  <td>{r.service}</td>
                  <td>{r.currency}</td>
                  <td>{r.m}</td>
                  <td>{r.n}</td>
                  <td>{r.p45 || '-'}</td>
                  <td>{r.p100 || '-'}</td>
                  <td>{r.p300 || '-'}</td>
                  <td>{r.p500 || '-'}</td>
                  <td>{r.p1000 || '-'}</td>
                  <td>
                    <span style={{ 
                      fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, 
                      background: r.status === 'ACTIVE' ? '#dcfce7' : r.status === 'EXPIRING SOON' ? '#fef3c7' : '#fee2e2', 
                      color: r.status === 'ACTIVE' ? '#166534' : r.status === 'EXPIRING SOON' ? '#92400e' : '#991b1b' 
                    }}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
