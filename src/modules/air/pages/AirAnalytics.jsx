import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertTriangle, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { airAnalyticsData } from '../data/airAnalytics';
import { KPICard } from '../components/KPICard';

const COLORS = ['#e8192c', '#1565c0', '#7c3aed', '#16a34a', '#f59e0b'];

const RADIAN = Math.PI / 180;
const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

export const AirAnalytics = () => {
  const [tradeType, setTradeType] = useState('EXPORT');
  const d = airAnalyticsData;
  const kpis = tradeType === 'EXPORT' ? d.kpis.export : d.kpis.import;

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart3 size={28} color="#e8192c" />
            Air Analytics
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>Performance insights, trends & team productivity</p>
        </div>

        {/* Trade Toggle */}
        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: 8, padding: 4 }}>
          {['EXPORT', 'IMPORT'].map(t => (
            <button
              key={t}
              onClick={() => setTradeType(t)}
              style={{
                background: tradeType === t ? 'white' : 'transparent',
                color: tradeType === t ? '#0a1628' : '#64748b',
                fontWeight: tradeType === t ? 700 : 600,
                boxShadow: tradeType === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                border: 'none', padding: '6px 20px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6
              }}>
              {t === 'EXPORT' ? <PlaneTakeoff size={14} /> : <PlaneLanding size={14} />}
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <KPICard
          title="Total Queries"
          value={kpis.totalQueries}
          icon={<BarChart3 size={20} color="#1565c0" />}
          iconBg="#e3f2fd"
          trend={8}
          trendLabel="vs last week"
        />
        <KPICard
          title="Pending"
          value={kpis.pending}
          icon={<Clock size={20} color="#f59e0b" />}
          iconBg="#fef3c7"
          alertLevel={kpis.pending > 20 ? 'warning' : 'normal'}
        />
        <KPICard
          title="Avg Response Time"
          value={kpis.avgResponseTime}
          suffix="min"
          icon={<TrendingUp size={20} color="#16a34a" />}
          iconBg="#dcfce7"
          trend={-5}
          trendLabel="improvement"
        />
        <KPICard
          title="Potential Savings"
          value={`₹${kpis.potentialSavings}`}
          icon={<CheckCircle size={20} color="#7c3aed" />}
          iconBg="#f3e8ff"
          trend={12}
          trendLabel="vs last month"
        />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Volume Trend */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Query Volume Trend</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Daily queries received, quoted & confirmed</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={d.queryVolumeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="received" name="Received" stroke="#e8192c" fill="#fff0f1" strokeWidth={2} />
              <Area type="monotone" dataKey="quoted" name="Quoted" stroke="#1565c0" fill="#e3f2fd" strokeWidth={2} />
              <Area type="monotone" dataKey="confirmed" name="Confirmed" stroke="#16a34a" fill="#dcfce7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie - Status Distribution */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Query Status Mix</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Current pipeline breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={d.queryStatusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                labelLine={false}
                label={CustomPieLabel}>
                {d.queryStatusDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {d.queryStatusDistribution.map(s => (
              <span key={s.name} style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Response Time Trend */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Avg Response Time (TAT)</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Minutes to first quote response · 7 day</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={d.avgResponseTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[25, 55]} />
              <Tooltip formatter={v => `${v} min`} />
              <Line type="monotone" dataKey="tat" stroke="#e8192c" strokeWidth={2.5} dot={{ r: 4, fill: '#e8192c' }} name="TAT" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Airline Performance Table */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Airline Performance</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Quote volume, TAT & confirmation rate</div>
          <table className="data-table" style={{ width: '100%', fontSize: 12 }}>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Quotes</th>
                <th>Avg TAT</th>
                <th>Avg Rate</th>
                <th>Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {d.airlinePerformance.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#0a1628' }}>{a.airline}</td>
                  <td>{a.quotes}</td>
                  <td style={{ color: a.avgTat <= 20 ? '#16a34a' : a.avgTat <= 35 ? '#f59e0b' : '#dc2626', fontWeight: 700 }}>
                    {a.avgTat}m
                  </td>
                  <td>${a.avgRate.toFixed(2)}</td>
                  <td style={{ color: '#16a34a', fontWeight: 700 }}>{a.confirmed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Query Aging */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 4 }}>Query Aging Distribution</div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Pending queries by age bucket</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={d.queryAging}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Queries" fill="#e8192c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TAT Stats */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>TAT Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Average TAT', value: d.tatAnalytics.average, color: '#1565c0' },
              { label: 'Median TAT', value: d.tatAnalytics.median, color: '#7c3aed' },
              { label: 'Fastest Response', value: d.tatAnalytics.fastest, color: '#16a34a' },
              { label: 'Longest Pending', value: d.tatAnalytics.longest, color: '#dc2626' },
            ].map(s => (
              <div key={s.label} style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: 12, color: '#166534', fontWeight: 600 }}>
              ✅ 78% of queries responded within 60-minute SLA target this week
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
