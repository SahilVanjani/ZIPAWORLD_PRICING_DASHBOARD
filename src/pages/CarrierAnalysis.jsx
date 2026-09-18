import React, { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from
'recharts';
import { mockCarriers } from '../data/mockData';
import { formatINRFull } from '../utils/helpers';
import { Anchor, TrendingUp, Clock, Award, CheckCircle, BarChart2 } from 'lucide-react';

const CARRIER_COLORS = {
  'CMA CGM': '#1565c0', 'MSC': '#6a1b9a', 'Maersk': '#01579b',
  'Hapag-Lloyd': '#e65100', 'COSCO': '#880e4f', 'ONE': '#e91e63',
  'Evergreen': '#2e7d32', 'Yang Ming': '#00796b'
};

export const CarrierAnalysis = () => {
  const [selected, setSelected] = useState(mockCarriers[0]);

  const radarData = [
  { subject: 'Best Rate Wins', A: selected.bestRateWins / 40 * 100 },
  { subject: 'Rate Coverage', A: selected.rateCoverage },
  { subject: 'Performance', A: selected.performanceScore },
  { subject: 'Quotes Volume', A: selected.totalQuotes / 150 * 100 },
  { subject: 'Transit Speed', A: Math.max(0, 100 - (selected.avgTransit - 20) * 5) }];


  return (
    <div className="page-content animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>Carrier Analysis</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>Compare shipping line performance, rates, and competitiveness</p>
      </div>

      {/* Carrier Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {mockCarriers.map((carrier) =>
        <div
          key={carrier.id}
          className="carrier-card"
          onClick={() => setSelected(carrier)}
          style={{
            borderColor: selected.id === carrier.id ? CARRIER_COLORS[carrier.name] : '#e8edf3',
            boxShadow: selected.id === carrier.id ? `0 4px 20px ${CARRIER_COLORS[carrier.name]}30` : undefined
          }}>
          
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: CARRIER_COLORS[carrier.name], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{carrier.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>{carrier.name}</div>
                {selected.id === carrier.id &&
              <div style={{ fontSize: 10, color: CARRIER_COLORS[carrier.name], fontWeight: 700 }}>● Selected</div>
              }
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
            { label: 'Avg Rate', value: `₹${(carrier.avgRate / 1000).toFixed(0)}K` },
            { label: 'Best Wins', value: carrier.bestRateWins },
            { label: 'Total Quotes', value: carrier.totalQuotes },
            { label: 'Avg Transit', value: `${carrier.avgTransit}d` }].
            map((m) =>
            <div key={m.label} style={{ background: '#f8fafc', borderRadius: 6, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0a1628' }}>{m.value}</div>
                </div>
            )}
            </div>

            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>Performance Score</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: CARRIER_COLORS[carrier.name] }}>{carrier.performanceScore}%</span>
              </div>
              <div className="sla-bar">
                <div className="sla-bar-fill" style={{ width: `${carrier.performanceScore}%`, background: CARRIER_COLORS[carrier.name] }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Carrier Detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: CARRIER_COLORS[selected.name], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{selected.name.slice(0, 2)}</span>
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0a1628' }}>{selected.name}</h3>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Performance Overview</div>
            </div>
          </div>

          {[
          { icon: <TrendingUp size={14} />, label: 'Average Rate', value: formatINRFull(selected.avgRate), color: '#1565c0' },
          { icon: <Award size={14} />, label: 'Best Rate Wins', value: `${selected.bestRateWins} queries`, color: '#16a34a' },
          { icon: <BarChart2 size={14} />, label: 'Total Quotes', value: selected.totalQuotes, color: '#7c3aed' },
          { icon: <Clock size={14} />, label: 'Avg Transit Time', value: `${selected.avgTransit} days`, color: '#f59e0b' },
          { icon: <CheckCircle size={14} />, label: 'Rate Coverage', value: `${selected.rateCoverage}%`, color: '#0288d1' },
          { icon: <Anchor size={14} />, label: 'Performance Score', value: `${selected.performanceScore}/100`, color: selected.performanceScore >= 90 ? '#16a34a' : '#f59e0b' }].
          map((item) =>
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: item.color }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: '#64748b' }}>{item.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0a1628' }}>{item.value}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: '20px', flex: 1 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>Performance Radar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} />
                <Radar name={selected.name} dataKey="A" stroke={CARRIER_COLORS[selected.name]} fill={CARRIER_COLORS[selected.name]} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>Best Rate Wins Comparison</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockCarriers.map((c) => ({ name: c.name, wins: c.bestRateWins }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="wins" radius={[4, 4, 0, 0]}>
                  {mockCarriers.map((c) =>
                  <Cell key={c.id} fill={c.id === selected.id ? CARRIER_COLORS[c.name] : '#e2e8f0'} />
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

};