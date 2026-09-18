import React, { useState } from 'react';
import { mockCarriers } from '../data/mockData';
import { RateComparison } from '../components/RateComparison';
import { Search, Filter } from 'lucide-react';

export const RateIntelligence = () => {
  const [selectedQuery, setSelectedQuery] = useState('PR-2026-00124');

  const queries = [
  'PR-2026-00124 — ABC Exports → Rotterdam (40HC)',
  'PR-2026-00125 — Global Textile → Hamburg (40GP)',
  'PR-2026-00138 — VasthraExim → New York (40HC)',
  'PR-2026-00133 — Dalmia Industries → Los Angeles (40HC)'];


  return (
    <div className="page-content animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>Rate Intelligence</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>Compare all available carrier rates for any query and identify the best value option</p>
      </div>

      <div className="card" style={{ padding: '14px 20px', marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '0 0 360px' }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <select className="form-input" style={{ paddingLeft: 30, width: '100%', fontSize: 12 }}>
            {queries.map((q) => <option key={q}>{q}</option>)}
          </select>
        </div>
        <button className="btn-secondary" style={{ gap: 5, fontSize: 12 }}>
          <Filter size={13} /> Filter Carriers
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {mockCarriers.slice(0, 6).map((c) =>
          <div
            key={c.id}
            style={{
              width: 28, height: 28, borderRadius: 6, background: c.color, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 800, color: 'white', opacity: 0.85,
              transition: 'opacity 0.15s'
            }}
            title={c.name}>
            
              {c.name.slice(0, 2)}
            </div>
          )}
          <div style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', paddingLeft: 4 }}>+2 more</div>
        </div>
      </div>

      <RateComparison />
    </div>);

};