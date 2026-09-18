import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend } from
'recharts';
import { mockRatesForQuery } from '../data/mockData';
import { formatINRFull } from '../utils/helpers';
import { Star, Award, CheckCircle, Clock, Calendar } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const METRIC_OPTIONS = [
{ key: 'total', label: 'Total Cost' },
{ key: 'oceanFreight', label: 'Ocean Freight' },
{ key: 'originCharges', label: 'Origin Charges' },
{ key: 'destinationCharges', label: 'Destination Charges' },
{ key: 'transitDays', label: 'Transit Days' }];


const CARRIER_COLORS = {
  'CMA CGM': '#1565c0',
  'MSC': '#6a1b9a',
  'Maersk': '#01579b',
  'Hapag-Lloyd': '#e65100',
  'COSCO': '#880e4f',
  'ONE': '#e91e63',
  'Evergreen': '#2e7d32',
  'Yang Ming': '#00796b'
};





const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <p style={{ fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>{label}</p>
        {payload.map((p) =>
        <p key={p.dataKey} style={{ fontSize: 13, color: '#475569' }}>
            {p.name}: <strong style={{ color: p.fill }}>{p.dataKey === 'transitDays' ? `${p.value} days` : formatINRFull(p.value)}</strong>
          </p>
        )}
      </div>);

  }
  return null;
};

export const RateComparison = () => {
  const [metric, setMetric] = useState('total');
  const rates = mockRatesForQuery;
  const recommended = rates.find((r) => r.recommended);

  const sorted = [...rates].sort((a, b) => a[metric] - b[metric]);

  return (
    <div>
      {/* Best Rate Recommendation Card */}
      {recommended &&
      <div style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1565c0 100%)',
        borderRadius: 12, padding: '20px 24px', marginBottom: 20,
        position: 'relative', overflow: 'hidden'
      }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', right: 20, bottom: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Award size={16} color="#fbbf24" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  AI Rate Recommendation — Demo
                </span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                {recommended.carrier}
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#4ade80', marginBottom: 8 }}>
                {formatINRFull(recommended.total)}
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  Transit: <span style={{ color: 'white', fontWeight: 600 }}>{recommended.transitDays} days</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  Service: <span style={{ color: 'white', fontWeight: 600 }}>{recommended.service}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  Valid till: <span style={{ color: 'white', fontWeight: 600 }}>{recommended.validityTo}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#16a34a', padding: '8px 14px', borderRadius: 20, marginBottom: 12 }}>
                <Star size={14} color="white" fill="white" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>BEST VALUE</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Potential Saving</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#4ade80' }}>₹{recommended.saving?.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>vs highest available</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            {['Lowest total cost', 'Competitive origin charges', 'Competitive destination charges', 'Valid rate', 'Direct service'].map((r) =>
          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#4ade80' }}>
                <CheckCircle size={12} color="#4ade80" />
                {r}
              </div>
          )}
          </div>
        </div>
      }

      {/* Rate Table */}
      <div className="card" style={{ marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700, color: '#0a1628', fontSize: 15 }}>All Available Rates</h3>
          <div style={{ display: 'flex', gap: 4 }}>
            {METRIC_OPTIONS.map((opt) =>
            <button
              key={opt.key}
              className={`tab-btn ${metric === opt.key ? 'active' : ''}`}
              onClick={() => setMetric(opt.key)}
              style={{ fontSize: 11 }}>
              
                {opt.label}
              </button>
            )}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Carrier</th>
                <th>Ocean Freight</th>
                <th>Origin Charges</th>
                <th>Dest. Charges</th>
                <th>Other</th>
                <th style={{ color: '#0a1628', fontWeight: 700 }}>Total</th>
                <th>Transit</th>
                <th>Service</th>
                <th>Valid Till</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((rate, idx) =>
              <tr
                key={rate.id}
                className={rate.recommended ? 'best-rate' : ''}
                style={{ cursor: 'pointer' }}>
                
                  <td>
                    <span className={`badge ${idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : ''}`}
                  style={{ padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700, background: idx === 0 ? '#dcfce7' : idx === 1 ? '#dbeafe' : '#fef3c7', color: idx === 0 ? '#15803d' : idx === 1 ? '#1d4ed8' : '#92400e' }}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: CARRIER_COLORS[rate.carrier] || '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>{rate.carrier.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0a1628', fontSize: 13 }}>{rate.carrier}</div>
                        {rate.recommended && <div className="best-rate-badge" style={{ marginTop: 2 }}><Star size={9} fill="white" /> Best Value</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#475569' }}>{formatINRFull(rate.oceanFreight)}</td>
                  <td style={{ color: '#475569' }}>{formatINRFull(rate.originCharges)}</td>
                  <td style={{ color: '#475569' }}>{formatINRFull(rate.destinationCharges)}</td>
                  <td style={{ color: '#475569' }}>{formatINRFull(rate.otherCharges)}</td>
                  <td style={{ fontWeight: 800, color: rate.recommended ? '#16a34a' : '#0a1628', fontSize: 14 }}>
                    {formatINRFull(rate.total)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} color="#94a3b8" />
                      <span style={{ fontSize: 13 }}>{rate.transitDays}d</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: '#475569' }}>{rate.service}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={11} color="#94a3b8" />
                      <span style={{ fontSize: 12 }}>{rate.validityTo}</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status="Active" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card" style={{ padding: '20px', marginBottom: 20 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0a1628' }}>Total Rate Comparison</h3>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>* Green bar = Recommended carrier</div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sorted} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="carrier" tick={{ fontSize: 12, fill: '#475569' }} />
            <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#475569' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={metric} radius={[6, 6, 0, 0]}>
              {sorted.map((rate, idx) =>
              <Cell key={idx} fill={rate.recommended ? '#16a34a' : CARRIER_COLORS[rate.carrier] || '#64748b'} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stacked Bar */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0a1628', marginBottom: 16 }}>Rate Component Breakdown</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={rates} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="carrier" tick={{ fontSize: 12, fill: '#475569' }} />
            <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#475569' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="oceanFreight" name="Ocean Freight" stackId="a" fill="#1565c0" />
            <Bar dataKey="originCharges" name="Origin Charges" stackId="a" fill="#0288d1" />
            <Bar dataKey="destinationCharges" name="Dest. Charges" stackId="a" fill="#7c3aed" />
            <Bar dataKey="otherCharges" name="Other" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>);

};