import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, RefreshCw, Info, Zap, Globe } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, AreaChart, Area
} from 'recharts';

const ROUTES = [
  { route: 'DEL-DXB', label: 'Delhi → Dubai', region: 'Middle East' },
  { route: 'BOM-LHR', label: 'Mumbai → London', region: 'Europe' },
  { route: 'DEL-FRA', label: 'Delhi → Frankfurt', region: 'Europe' },
  { route: 'MAA-SIN', label: 'Chennai → Singapore', region: 'Asia' },
  { route: 'DEL-JFK', label: 'Delhi → New York', region: 'Americas' },
  { route: 'BOM-DOH', label: 'Mumbai → Doha', region: 'Middle East' },
];

const rateTrendData = {
  'DEL-DXB': [
    { week: 'W34', rate: 1.15, marketAvg: 1.22 },
    { week: 'W35', rate: 1.18, marketAvg: 1.20 },
    { week: 'W36', rate: 1.22, marketAvg: 1.25 },
    { week: 'W37', rate: 1.20, marketAvg: 1.23 },
    { week: 'W38', rate: 1.25, marketAvg: 1.28 },
  ],
  'BOM-LHR': [
    { week: 'W34', rate: 2.35, marketAvg: 2.50 },
    { week: 'W35', rate: 2.40, marketAvg: 2.55 },
    { week: 'W36', rate: 2.48, marketAvg: 2.60 },
    { week: 'W37', rate: 2.45, marketAvg: 2.58 },
    { week: 'W38', rate: 2.52, marketAvg: 2.65 },
  ],
  'DEL-FRA': [
    { week: 'W34', rate: 1.80, marketAvg: 1.90 },
    { week: 'W35', rate: 1.85, marketAvg: 1.95 },
    { week: 'W36', rate: 1.90, marketAvg: 2.00 },
    { week: 'W37', rate: 1.88, marketAvg: 1.98 },
    { week: 'W38', rate: 1.95, marketAvg: 2.05 },
  ],
  'MAA-SIN': [
    { week: 'W34', rate: 0.85, marketAvg: 0.95 },
    { week: 'W35', rate: 0.88, marketAvg: 0.97 },
    { week: 'W36', rate: 0.90, marketAvg: 0.98 },
    { week: 'W37', rate: 0.87, marketAvg: 0.96 },
    { week: 'W38', rate: 0.92, marketAvg: 1.00 },
  ],
  'DEL-JFK': [
    { week: 'W34', rate: 3.10, marketAvg: 3.30 },
    { week: 'W35', rate: 3.20, marketAvg: 3.40 },
    { week: 'W36', rate: 3.35, marketAvg: 3.55 },
    { week: 'W37', rate: 3.25, marketAvg: 3.45 },
    { week: 'W38', rate: 3.40, marketAvg: 3.60 },
  ],
  'BOM-DOH': [
    { week: 'W34', rate: 1.25, marketAvg: 1.35 },
    { week: 'W35', rate: 1.28, marketAvg: 1.38 },
    { week: 'W36', rate: 1.30, marketAvg: 1.40 },
    { week: 'W37', rate: 1.27, marketAvg: 1.37 },
    { week: 'W38', rate: 1.32, marketAvg: 1.42 },
  ],
};

const airlineComparison = {
  'DEL-DXB': [
    { airline: 'Emirates', rate: 1.20, transit: 'Direct', validity: '31 Oct', status: 'ACTIVE' },
    { airline: 'Air Arabia', rate: 1.35, transit: 'Direct', validity: '30 Sep', status: 'EXPIRING' },
    { airline: 'Indigo', rate: 1.28, transit: 'Via Abu Dhabi', validity: '15 Nov', status: 'ACTIVE' },
    { airline: 'Air India', rate: 1.42, transit: 'Direct', validity: '25 Oct', status: 'ACTIVE' },
  ],
  'BOM-LHR': [
    { airline: 'British Airways', rate: 2.50, transit: 'Direct', validity: '10 Sep', status: 'EXPIRED' },
    { airline: 'Virgin Atlantic', rate: 2.65, transit: 'Direct', validity: '20 Oct', status: 'ACTIVE' },
    { airline: 'Air India', rate: 2.40, transit: 'Direct', validity: '28 Sep', status: 'EXPIRING' },
    { airline: 'Lufthansa Cargo', rate: 2.55, transit: 'Via FRA', validity: '15 Nov', status: 'ACTIVE' },
  ],
  'DEL-FRA': [
    { airline: 'Lufthansa Cargo', rate: 1.80, transit: 'Direct', validity: '15 Nov', status: 'ACTIVE' },
    { airline: 'Emirates', rate: 1.95, transit: 'Via DXB', validity: '31 Oct', status: 'ACTIVE' },
    { airline: 'Turkish Cargo', rate: 1.75, transit: 'Via IST', validity: '10 Oct', status: 'ACTIVE' },
    { airline: 'Qatar Airways', rate: 1.90, transit: 'Via DOH', validity: '30 Sep', status: 'EXPIRING' },
  ],
  'MAA-SIN': [
    { airline: 'Singapore Airlines', rate: 0.85, transit: 'Direct', validity: '31 Dec', status: 'ACTIVE' },
    { airline: 'Air India', rate: 1.00, transit: 'Direct', validity: '30 Oct', status: 'ACTIVE' },
    { airline: 'IndiGo', rate: 0.92, transit: 'Direct', validity: '25 Nov', status: 'ACTIVE' },
    { airline: 'Batik Air', rate: 0.88, transit: 'Via KUL', validity: '15 Oct', status: 'ACTIVE' },
  ],
  'DEL-JFK': [
    { airline: 'Air India', rate: 3.00, transit: 'Direct', validity: '28 Sep', status: 'EXPIRING' },
    { airline: 'American Airlines', rate: 3.40, transit: 'Via ORD', validity: '31 Oct', status: 'ACTIVE' },
    { airline: 'Emirates', rate: 3.20, transit: 'Via DXB', validity: '30 Nov', status: 'ACTIVE' },
    { airline: 'Etihad', rate: 3.35, transit: 'Via AUH', validity: '30 Nov', status: 'ACTIVE' },
  ],
  'BOM-DOH': [
    { airline: 'Qatar Airways', rate: 1.30, transit: 'Direct', validity: '25 Sep', status: 'EXPIRING' },
    { airline: 'IndiGo', rate: 1.42, transit: 'Direct', validity: '15 Nov', status: 'ACTIVE' },
    { airline: 'Air India', rate: 1.35, transit: 'Direct', validity: '31 Oct', status: 'ACTIVE' },
    { airline: 'Air Arabia', rate: 1.28, transit: 'Via SHJ', validity: '20 Oct', status: 'ACTIVE' },
  ],
};

const surchargeData = [
  { name: 'Fuel (FSC)', value: 0.18, trend: +5, note: 'IATA Sept 2026' },
  { name: 'Security (SSC)', value: 0.08, trend: 0, note: 'Standard' },
  { name: 'War Risk', value: 0.03, trend: +12, note: 'Middle East routes' },
  { name: 'CASS Fee', value: 0.02, trend: 0, note: 'Flat fee' },
  { name: 'Dangerous Goods', value: 0.15, trend: 0, note: 'IATA DG listed' },
];

export const AirRateIntelligence = () => {
  const [selectedRoute, setSelectedRoute] = useState('DEL-DXB');

  const trends = rateTrendData[selectedRoute] || [];
  const airlines = airlineComparison[selectedRoute] || [];
  const routeInfo = ROUTES.find(r => r.route === selectedRoute);
  const currentRate = trends[trends.length - 1]?.rate;
  const prevRate = trends[trends.length - 2]?.rate;
  const rateDelta = currentRate && prevRate ? ((currentRate - prevRate) / prevRate * 100).toFixed(1) : 0;

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <TrendingUp size={28} color="#e8192c" />
            Air Rate Intelligence
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Market rate trends, airline benchmarking & surcharge tracker
          </p>
        </div>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <RefreshCw size={13} /> Refresh Rates
        </button>
      </div>

      {/* Route Selector */}
      <div className="card" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Select Trade Lane</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ROUTES.map(r => (
            <button
              key={r.route}
              onClick={() => setSelectedRoute(r.route)}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                border: selectedRoute === r.route ? '2px solid #e8192c' : '1px solid #e2e8f0',
                background: selectedRoute === r.route ? '#fff0f1' : 'white',
                color: selectedRoute === r.route ? '#e8192c' : '#475569',
                cursor: 'pointer', transition: 'all 0.15s'
              }}>
              <div style={{ fontSize: 13 }}>{r.route}</div>
              <div style={{ fontSize: 10, fontWeight: 500, color: selectedRoute === r.route ? '#e8192c' : '#94a3b8', marginTop: 1 }}>{r.region}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Route KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Zipworld Rate</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0a1628' }}>${currentRate?.toFixed(2)}</div>
          <div style={{ fontSize: 12, color: Number(rateDelta) > 0 ? '#dc2626' : '#16a34a', fontWeight: 600, marginTop: 4 }}>
            {Number(rateDelta) > 0 ? '▲' : '▼'} {Math.abs(rateDelta)}% vs last week
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Market Average</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0a1628' }}>${trends[trends.length - 1]?.marketAvg?.toFixed(2)}</div>
          <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginTop: 4 }}>
            Zipworld saves {((1 - currentRate / trends[trends.length - 1]?.marketAvg) * 100).toFixed(1)}% vs market
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Active Airlines</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0a1628' }}>{airlines.filter(a => a.status === 'ACTIVE').length}</div>
          <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600, marginTop: 4 }}>
            {airlines.filter(a => a.status === 'EXPIRING').length} expiring · {airlines.filter(a => a.status === 'EXPIRED').length} expired
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Rate Trend Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Rate Trend — {routeInfo?.label}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>USD/kg · Last 5 weeks</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
              <Tooltip formatter={(v) => `$${v.toFixed(2)}/kg`} />
              <Legend />
              <Area type="monotone" dataKey="rate" name="Zipworld" stroke="#e8192c" fill="#fff0f1" strokeWidth={2} dot={{ r: 4, fill: '#e8192c' }} />
              <Area type="monotone" dataKey="marketAvg" name="Market Avg" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 4, fill: '#94a3b8' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Airline Comparison Table */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Airline Rate Comparison</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>{routeInfo?.label} · All-in base rate</div>
          <table className="data-table" style={{ width: '100%', fontSize: 12 }}>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Rate/kg</th>
                <th>Transit</th>
                <th>Valid Until</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {airlines.map((a, i) => (
                <tr key={i} style={{ background: i === 0 ? '#fff8f0' : undefined }}>
                  <td style={{ fontWeight: 600, color: '#0a1628' }}>
                    {i === 0 && <span style={{ marginRight: 4, fontSize: 10 }}>⭐</span>}
                    {a.airline}
                  </td>
                  <td style={{ fontWeight: 800, color: i === 0 ? '#16a34a' : '#0a1628' }}>${a.rate.toFixed(2)}</td>
                  <td style={{ color: '#64748b' }}>{a.transit}</td>
                  <td style={{ color: '#64748b' }}>{a.validity}</td>
                  <td>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                      background: a.status === 'ACTIVE' ? '#dcfce7' : a.status === 'EXPIRING' ? '#fef3c7' : '#fee2e2',
                      color: a.status === 'ACTIVE' ? '#166534' : a.status === 'EXPIRING' ? '#92400e' : '#991b1b'
                    }}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Surcharge Tracker */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={16} color="#f59e0b" /> Surcharge Tracker
          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400, marginLeft: 4 }}>Updated: Sept 2026 · IATA</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 16 }}>
          {surchargeData.map(s => (
            <div key={s.name} style={{ padding: '14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0a1628' }}>${s.value}</div>
              <div style={{ fontSize: 11, color: s.trend > 0 ? '#dc2626' : s.trend < 0 ? '#16a34a' : '#94a3b8', fontWeight: 600, marginTop: 4 }}>
                {s.trend > 0 ? `▲ +${s.trend}%` : s.trend < 0 ? `▼ ${s.trend}%` : '→ Unchanged'}
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
