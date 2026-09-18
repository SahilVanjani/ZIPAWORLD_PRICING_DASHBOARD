import React, { useState } from 'react';
import {
  BarChart2, Star, TrendingUp, TrendingDown, Clock, CheckCircle,
  AlertTriangle, Globe, Filter, Award
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import { airAirlines } from '../data/airAirlines';

const carrierStats = [
  {
    iata: 'EK', name: 'Emirates', rating: 4.8, color: '#c8102e',
    quotes30d: 45, confirmed30d: 22, avgTat: 15, avgRate: 1.25, ontime: 96,
    routes: ['DEL-DXB', 'BOM-DXB', 'MAA-DXB'], type: 'FSC',
    strengths: ['Fastest TAT', 'Most routes', 'High reliability'],
    radarData: { price: 80, speed: 95, reliability: 96, coverage: 90, support: 88 }
  },
  {
    iata: 'QR', name: 'Qatar Airways', rating: 4.9, color: '#8d1b3d',
    quotes30d: 38, confirmed30d: 18, avgTat: 20, avgRate: 1.30, ontime: 94,
    routes: ['BOM-DOH', 'DEL-DOH', 'HYD-DOH'], type: 'FSC',
    strengths: ['Best pricing for Europe', 'Wide European network'],
    radarData: { price: 75, speed: 88, reliability: 94, coverage: 85, support: 90 }
  },
  {
    iata: 'LH', name: 'Lufthansa Cargo', rating: 4.6, color: '#05164d',
    quotes30d: 32, confirmed30d: 15, avgTat: 25, avgRate: 2.10, ontime: 92,
    routes: ['DEL-FRA', 'BOM-FRA', 'BLR-FRA'], type: 'FSC',
    strengths: ['Best for EU', 'Pharma certified', 'GDP compliance'],
    radarData: { price: 60, speed: 75, reliability: 92, coverage: 78, support: 85 }
  },
  {
    iata: 'SQ', name: 'Singapore Airlines Cargo', rating: 4.9, color: '#f5a623',
    quotes30d: 28, confirmed30d: 12, avgTat: 18, avgRate: 1.15, ontime: 97,
    routes: ['MAA-SIN', 'DEL-SIN', 'BOM-SIN'], type: 'FSC',
    strengths: ['Best SE Asia rates', 'Highest on-time performance'],
    radarData: { price: 85, speed: 90, reliability: 97, coverage: 72, support: 92 }
  },
  {
    iata: 'AI', name: 'Air India', rating: 3.8, color: '#e03a3c',
    quotes30d: 20, confirmed30d: 5, avgTat: 45, avgRate: 2.80, ontime: 78,
    routes: ['DEL-JFK', 'DEL-LHR', 'BOM-LHR'], type: 'FSC',
    strengths: ['Direct India-USA routes'],
    radarData: { price: 55, speed: 50, reliability: 78, coverage: 70, support: 60 }
  },
  {
    iata: 'TK', name: 'Turkish Cargo', rating: 4.5, color: '#e30a17',
    quotes30d: 22, confirmed30d: 11, avgTat: 28, avgRate: 1.65, ontime: 89,
    routes: ['HYD-CDG', 'DEL-CDG', 'BOM-CDG'], type: 'FSC',
    strengths: ['Best for Africa routes', 'Competitive EU pricing'],
    radarData: { price: 70, speed: 72, reliability: 89, coverage: 82, support: 75 }
  },
];

const tatBarData = carrierStats.map(c => ({ name: c.name.split(' ')[0], tat: c.avgTat, target: 30 }));
const quoteBarData = carrierStats.map(c => ({ name: c.name.split(' ')[0], quotes: c.quotes30d, confirmed: c.confirmed30d }));

export const AirCarrierAnalysis = () => {
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState('rating');

  const sorted = [...carrierStats].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'tat') return a.avgTat - b.avgTat;
    if (sortBy === 'rate') return a.avgRate - b.avgRate;
    if (sortBy === 'ontime') return b.ontime - a.ontime;
    return 0;
  });

  const selectedCarrier = selected ? carrierStats.find(c => c.iata === selected) : null;
  const radarData = selectedCarrier ? [
    { subject: 'Price', value: selectedCarrier.radarData.price },
    { subject: 'Speed', value: selectedCarrier.radarData.speed },
    { subject: 'Reliability', value: selectedCarrier.radarData.reliability },
    { subject: 'Coverage', value: selectedCarrier.radarData.coverage },
    { subject: 'Support', value: selectedCarrier.radarData.support },
  ] : [];

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 size={28} color="#e8192c" />
            Carrier Analysis
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>Airline performance benchmarking & scoring</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Sort by:</span>
          {[['rating', 'Rating'], ['tat', 'TAT'], ['rate', 'Rate'], ['ontime', 'On-time']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                border: sortBy === key ? '2px solid #e8192c' : '1px solid #e2e8f0',
                background: sortBy === key ? '#fff0f1' : 'white',
                color: sortBy === key ? '#e8192c' : '#475569', cursor: 'pointer'
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Carrier Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {sorted.map((c, i) => (
          <div
            key={c.iata}
            className="card"
            style={{
              padding: 20, cursor: 'pointer',
              border: selected === c.iata ? '2px solid #e8192c' : '1px solid #e8edf3',
              background: selected === c.iata ? '#fff8f8' : 'white',
              transition: 'all 0.15s'
            }}
            onClick={() => setSelected(selected === c.iata ? null : c.iata)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: c.color }}>
                  {c.iata}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#0a1628' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.type} · {c.routes.length} routes</div>
                </div>
              </div>
              {i === 0 && sortBy === 'rating' && <Award size={16} color="#f59e0b" />}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { label: 'Rating', value: `${c.rating}/5`, color: '#f59e0b' },
                { label: 'Avg TAT', value: `${c.avgTat}m`, color: c.avgTat <= 20 ? '#16a34a' : c.avgTat <= 35 ? '#f59e0b' : '#dc2626' },
                { label: 'Avg Rate', value: `$${c.avgRate}/kg`, color: '#1565c0' },
                { label: 'On-Time', value: `${c.ontime}%`, color: c.ontime >= 90 ? '#16a34a' : c.ontime >= 80 ? '#f59e0b' : '#dc2626' },
              ].map(m => (
                <div key={m.label} style={{ background: '#f8fafc', borderRadius: 6, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {c.strengths.map(s => (
                <span key={s} style={{ fontSize: 10, fontWeight: 600, background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 10 }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
              <span>Quotes: <strong style={{ color: '#0a1628' }}>{c.quotes30d}</strong></span>
              <span>Confirmed: <strong style={{ color: '#16a34a' }}>{c.confirmed30d}</strong></span>
              <span>Rate: <strong style={{ color: '#0a1628' }}>{Math.round(c.confirmed30d / c.quotes30d * 100)}%</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedCarrier ? '1fr 1fr 1fr' : '1fr 1fr', gap: 20 }}>
        {/* TAT Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Avg TAT by Airline</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Minutes to first quote (30d avg)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tatBarData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={60} />
              <Tooltip formatter={v => `${v} min`} />
              <Bar dataKey="tat" name="Avg TAT" fill="#e8192c" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quote vs Confirmed */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Quotes vs Confirmed (30d)</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Volume · Click airline card to see radar</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quoteBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="quotes" name="Quotes" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="confirmed" name="Confirmed" fill="#1565c0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart (only shown when carrier selected) */}
        {selectedCarrier && (
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>
              {selectedCarrier.name} · Scorecard
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Performance across 5 dimensions (0-100)</div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar dataKey="value" stroke={selectedCarrier.color} fill={selectedCarrier.color} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
