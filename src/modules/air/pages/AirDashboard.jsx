import React, { useState } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  LineChart, Line, BarChart, Bar, Legend
} from 'recharts';
import {
  Plane, PlaneLanding, PlaneTakeoff, Clock, 
  TrendingDown, Shield, CheckCircle, AlertTriangle, 
  Zap, BarChart3, ArrowRight, DollarSign, Activity
} from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { StatusBadge } from '../components/StatusBadge';
import { formatAge } from '../utils/helpers';
import { AirQueryDetail } from '../components/AirQueryDetail';
import { airExportQueries, airImportQueries } from '../data/airQueries';
import { airAnalyticsData } from '../data/airAnalytics';

const RADIAN = Math.PI / 180;
const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

export const AirDashboard = () => {
  const [tradeType, setTradeType] = useState('EXPORT');
  const [selectedQuery, setSelectedQuery] = useState(null);

  const queries = tradeType === 'EXPORT' ? airExportQueries : airImportQueries;
  const kpis = tradeType === 'EXPORT' ? airAnalyticsData.kpis.export : airAnalyticsData.kpis.import;
  
  const recentQueries = queries.slice(0, 8);
  const pendingQueries = queries.filter(q => q.status === 'Pending');

  return (
    <div className="page-content animate-fadeIn">
      {/* Header & Toggle */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Plane size={28} color="#e8192c" />
            Air Pricing Control Tower
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Real-time Air Import & Export Pricing Intelligence
          </p>
        </div>
        
        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '4px' }}>
          <button
            onClick={() => setTradeType('EXPORT')}
            style={{
              background: tradeType === 'EXPORT' ? 'white' : 'transparent',
              color: tradeType === 'EXPORT' ? '#0a1628' : '#64748b',
              fontWeight: tradeType === 'EXPORT' ? 700 : 600,
              boxShadow: tradeType === 'EXPORT' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              border: 'none', padding: '6px 20px', borderRadius: '6px', fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
            }}
          >
            <PlaneTakeoff size={16} color={tradeType === 'EXPORT' ? '#1565c0' : '#94a3b8'} />
            AIR EXPORT
          </button>
          <button
            onClick={() => setTradeType('IMPORT')}
            style={{
              background: tradeType === 'IMPORT' ? 'white' : 'transparent',
              color: tradeType === 'IMPORT' ? '#0a1628' : '#64748b',
              fontWeight: tradeType === 'IMPORT' ? 700 : 600,
              boxShadow: tradeType === 'IMPORT' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              border: 'none', padding: '6px 20px', borderRadius: '6px', fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
            }}
          >
            <PlaneLanding size={16} color={tradeType === 'IMPORT' ? '#e8192c' : '#94a3b8'} />
            AIR IMPORT
          </button>
        </div>
      </div>

      {/* KPI Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}>
        <KPICard
          title="Total Queries"
          value={kpis.totalQueries}
          icon={<Activity size={20} color="#1565c0" />}
          iconBg="#e3f2fd" />
        
        <KPICard
          title="Pending Queries"
          value={kpis.pending}
          icon={<Clock size={20} color="#e65100" />}
          iconBg="#fff3e0"
          highlight
          alertLevel="warning" />
        
        <KPICard
          title="Rates Available"
          value={kpis.ratesAvailable}
          icon={<BarChart3 size={20} color="#0288d1" />}
          iconBg="#e1f5fe" />
        
        <KPICard
          title="Rates Quoted"
          value={kpis.ratesQuoted}
          icon={<Zap size={20} color="#7c3aed" />}
          iconBg="#f3e5f5" />
      </div>

      {/* KPI Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <KPICard
          title="Rates Confirmed"
          value={kpis.ratesConfirmed}
          icon={<CheckCircle size={20} color="#16a34a" />}
          iconBg="#e8f5e9" />
        
        <KPICard
          title="Avg Response Time"
          value={kpis.avgResponseTime}
          suffix=" min"
          icon={<Clock size={20} color="#f59e0b" />}
          iconBg="#fff8e1" />
        
        <KPICard
          title="Best Rate Opportunities"
          value={kpis.bestRateOpportunities}
          icon={<Shield size={20} color="#0ea5e9" />}
          iconBg="#e0f2fe" />

        <KPICard
          title="Potential Savings"
          value={`₹${kpis.potentialSavings}`}
          icon={<DollarSign size={20} color="#16a34a" />}
          iconBg="#dcfce7" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Query Volume Trend */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>Query Volume Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={airAnalyticsData.queryVolumeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="received" stroke="#1565c0" strokeWidth={2} dot={{ r: 3 }} name="Received" />
              <Line type="monotone" dataKey="quoted" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Quoted" />
              <Line type="monotone" dataKey="confirmed" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Confirmed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 12 }}>Query Status</h3>
          <PieChart width={180} height={140} style={{ margin: '0 auto', display: 'block' }}>
            <Pie data={airAnalyticsData.queryStatusDistribution} cx={90} cy={70} innerRadius={40} outerRadius={65} dataKey="value" labelLine={false} label={CustomPieLabel}>
              {airAnalyticsData.queryStatusDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div style={{ marginTop: 8 }}>
            {airAnalyticsData.queryStatusDistribution.map((s) =>
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                <span style={{ fontSize: 11, color: '#475569', flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{s.value}</span>
              </div>
            )}
          </div>
        </div>

        {/* Import vs Export */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 12 }}>Import vs Export</h3>
          <PieChart width={180} height={140} style={{ margin: '0 auto', display: 'block' }}>
            <Pie data={airAnalyticsData.importVsExport} cx={90} cy={70} innerRadius={35} outerRadius={65} dataKey="value" labelLine={false} label={CustomPieLabel}>
              {airAnalyticsData.importVsExport.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div style={{ marginTop: 8 }}>
            {airAnalyticsData.importVsExport.map((s) =>
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                <span style={{ fontSize: 11, color: '#475569', flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{s.value}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tables & Deep Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        
        {/* Pending Queries Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>
              Pending {tradeType} Pricing Queries
              <span style={{ marginLeft: 8, background: '#e8192c', color: 'white', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                {pendingQueries.length} Pending
              </span>
            </h3>
          </div>
          <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <table className="data-table" style={{ width: '100%', minWidth: '800px' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1 }}>
                <tr>
                  <th>Query ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Commodity</th>
                  <th>Chargeable</th>
                  <th>Status</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {recentQueries.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => setSelectedQuery(q)}
                    style={{ cursor: 'pointer' }}
                    className="hover-row"
                  >
                    <td><span style={{ fontWeight: 700, color: '#1565c0', fontSize: 12 }}>{q.id}</span></td>
                    <td style={{ fontSize: 12, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.customer}</td>
                    <td style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>{q.origin} ✈ {q.destination}</td>
                    <td style={{ fontSize: 12, color: '#475569' }}>{q.commodity}</td>
                    <td style={{ fontSize: 12, fontWeight: 700 }}>{q.chargeableWeight} KG</td>
                    <td><StatusBadge status={q.status} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={11} color={q.ageMinutes > 120 ? '#e8192c' : '#f59e0b'} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: q.ageMinutes > 120 ? '#e8192c' : '#f59e0b' }}>
                          {formatAge(q.ageMinutes)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Management Insights & Carrier Performance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>Airline Performance</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={airAnalyticsData.airlinePerformance} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="airline" type="category" tick={{ fontSize: 10 }} width={100} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="quotes" fill="#1565c0" radius={[0, 4, 4, 0]} name="Quotes Received" barSize={12} />
                <Bar dataKey="confirmed" fill="#10b981" radius={[0, 4, 4, 0]} name="Quotes Confirmed" barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, #0a1628 0%, #1e293b 100%)', color: 'white' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingDown size={16} color="#4ade80" /> TAT Analytics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Average TAT</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#4ade80' }}>{airAnalyticsData.tatAnalytics.average}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Fastest Response</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>{airAnalyticsData.tatAnalytics.fastest}</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {selectedQuery && (
        <AirQueryDetail query={selectedQuery} onClose={() => setSelectedQuery(null)} />
      )}
    </div>
  );
};
