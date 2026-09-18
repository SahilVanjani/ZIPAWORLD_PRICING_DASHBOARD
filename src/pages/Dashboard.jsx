import React, { useState } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  LineChart, Line } from
'recharts';
import {
  List, Clock, TrendingDown, Shield, CheckCircle,
  AlertTriangle, XCircle, Zap, BarChart3,
  ArrowRight } from
'lucide-react';
import { mockKPIs, mockQueries, mockDailyVolume, mockTATTrend, mockStatusDistribution, mockPricingFunnel } from '../data/mockData';
import { KPICard } from '../components/KPICard';
import { StatusBadge } from '../components/StatusBadge';
import { QueryDetail } from '../components/QueryDetail';
import { formatAge, getSLAColor } from '../utils/helpers';






const RADIAN = Math.PI / 180;
const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

export const Dashboard = ({ onNavigate }) => {
  const [selectedQuery, setSelectedQuery] = useState(null);

  const recentQueries = mockQueries.slice(0, 8);
  const pendingQueries = mockQueries.filter((q) => q.status === 'Pending');
  const breachedQueries = mockQueries.filter((q) => q.status === 'SLA Breached');

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0a1628', letterSpacing: '-0.5px', marginBottom: 4 }}>
              Pricing Control Tower
            </h2>
            <p style={{ color: '#64748b', fontSize: 14 }}>
              Real-time visibility into pricing queries, response performance and carrier rates
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #1565c0 100%)',
            color: 'white', padding: '10px 18px', borderRadius: 10, textAlign: 'right'
          }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Last Updated</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>12 Sep 2026, 23:39</div>
            <div style={{ fontSize: 11, color: '#4ade80', marginTop: 2 }}>● Live Demo</div>
          </div>
        </div>

        {breachedQueries.length > 0 &&
        <div style={{
          marginTop: 12, background: '#fff5f5', border: '1px solid #fecaca',
          borderLeft: '4px solid #e8192c', borderRadius: 8, padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
            <AlertTriangle size={16} color="#e8192c" />
            <span style={{ fontSize: 13, color: '#b71c1c', fontWeight: 600 }}>
              {breachedQueries.length} queries have breached SLA! Immediate action required.
            </span>
            <button
            onClick={() => onNavigate('sla')}
            style={{ marginLeft: 'auto', fontSize: 12, color: '#e8192c', background: 'none', border: '1px solid #fecaca', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}>
            
              View SLA Monitor →
            </button>
          </div>
        }
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <KPICard
          title="Total Queries"
          value={mockKPIs.totalQueries}
          trend={mockKPIs.trends.totalQueries}
          icon={<List size={20} color="#1565c0" />}
          iconBg="#e3f2fd"
          onClick={() => onNavigate('queries')} />
        
        <KPICard
          title="Pending Queries"
          value={mockKPIs.pending}
          trend={mockKPIs.trends.pending}
          icon={<Clock size={20} color="#e65100" />}
          iconBg="#fff3e0"
          highlight
          alertLevel="warning"
          onClick={() => onNavigate('queries', 'Pending')} />
        
        <KPICard
          title="Rates Available"
          value={mockKPIs.ratesAvailable}
          trend={mockKPIs.trends.ratesAvailable}
          icon={<BarChart3 size={20} color="#0288d1" />}
          iconBg="#e1f5fe" />
        
        <KPICard
          title="Rates Quoted"
          value={mockKPIs.ratesQuoted}
          trend={mockKPIs.trends.ratesQuoted}
          icon={<Zap size={20} color="#7c3aed" />}
          iconBg="#f3e5f5" />
        
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <KPICard
          title="Rates Confirmed"
          value={mockKPIs.ratesConfirmed}
          trend={mockKPIs.trends.ratesConfirmed}
          icon={<CheckCircle size={20} color="#16a34a" />}
          iconBg="#e8f5e9" />
        
        <KPICard
          title="SLA Breached"
          value={mockKPIs.slaBreached}
          trend={mockKPIs.trends.slaBreached}
          icon={<XCircle size={20} color="#e8192c" />}
          iconBg="#ffebee"
          alertLevel="danger"
          onClick={() => onNavigate('sla')} />
        
        <KPICard
          title="Avg Response TAT"
          value={mockKPIs.avgResponseTAT}
          suffix=" min"
          trend={mockKPIs.trends.avgResponseTAT}
          icon={<Clock size={20} color="#f59e0b" />}
          iconBg="#fff8e1" />
        
        <KPICard
          title="SLA Compliance"
          value={mockKPIs.slaCompliance}
          suffix="%"
          trend={mockKPIs.trends.slaCompliance}
          icon={<Shield size={20} color="#16a34a" />}
          iconBg="#e8f5e9" />
        
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Query Volume */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>Query Volume (Last 8 Days)</h3>
            <button onClick={() => onNavigate('analytics')} style={{ fontSize: 12, color: '#1565c0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View Analytics →</button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockDailyVolume}>
              <defs>
                <linearGradient id="qvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1565c0" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1565c0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="queries" stroke="#1565c0" fill="url(#qvGrad)" strokeWidth={2} dot={{ fill: '#1565c0', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Donut */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 12 }}>Query Status</h3>
          <PieChart width={180} height={140} style={{ margin: '0 auto', display: 'block' }}>
            <Pie data={mockStatusDistribution} cx={90} cy={70} innerRadius={40} outerRadius={65} dataKey="value" labelLine={false} label={CustomPieLabel}>
              {mockStatusDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div style={{ marginTop: 8 }}>
            {mockStatusDistribution.slice(0, 4).map((s) =>
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                <span style={{ fontSize: 11, color: '#475569', flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{s.value}</span>
              </div>
            )}
          </div>
        </div>

        {/* TAT Trend */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 12 }}>Response TAT</h3>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#1565c0' }}>{mockKPIs.avgResponseTAT}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>avg minutes</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#f0fdf4', padding: '3px 10px', borderRadius: 12, marginTop: 6 }}>
              <TrendingDown size={12} color="#16a34a" />
              <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>↓ 4.3% improving</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={mockTATTrend}>
              <Line type="monotone" dataKey="tat" stroke="#1565c0" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="target" stroke="#fca5a5" strokeDasharray="4 2" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pricing Query Queue + Best Rate */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Recent Queries */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>
              Pricing Query Queue
              <span style={{ marginLeft: 8, background: '#e8192c', color: 'white', fontSize: 11, padding: '1px 7px', borderRadius: 10, fontWeight: 700 }}>
                {pendingQueries.length} Pending
              </span>
            </h3>
            <button onClick={() => onNavigate('queries')} className="btn-secondary" style={{ fontSize: 12, gap: 5 }}>
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Query ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Type</th>
                  <th>Assigned</th>
                  <th>Status</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {recentQueries.map((q) => {
                  const slaColor = getSLAColor(q.ageMinutes, q.slaMinutes);
                  return (
                    <tr
                      key={q.id}
                      className={q.status === 'SLA Breached' ? 'sla-breached' : q.ageMinutes / q.slaMinutes >= 0.8 ? 'sla-warning' : ''}
                      onClick={() => setSelectedQuery(q)}
                      style={{ cursor: 'pointer' }}>
                      
                      <td><span style={{ fontWeight: 700, color: '#1565c0', fontSize: 12 }}>{q.id}</span></td>
                      <td style={{ fontSize: 12, maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.customer}</td>
                      <td style={{ fontSize: 11, color: '#475569' }}>{q.origin.split(' ')[0]} → {q.destination.split(' ')[0]}</td>
                      <td>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#1565c0', background: '#e3f2fd', padding: '2px 6px', borderRadius: 4 }}>{q.shipmentType}</span>
                      </td>
                      <td style={{ fontSize: 12 }}>{q.assignedTo}</td>
                      <td><StatusBadge status={q.status} /></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Clock size={11} color={slaColor} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: slaColor }}>{formatAge(q.ageMinutes)}</span>
                        </div>
                      </td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Rate Snapshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, #0a1628 0%, #1565c0 100%)', color: 'white' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 6 }}>
              ⚡ BEST RATE — PR-2026-00124
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 4 }}>CMA CGM</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#4ade80', marginBottom: 4 }}>₹1,05,000</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Nhava Sheva → Rotterdam • 40HC</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '6px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Saving</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>₹6,000</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '6px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Transit</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>26 days</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '6px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Valid</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>30 Sep</div>
              </div>
            </div>
            <button onClick={() => onNavigate('rate-intel')} style={{ marginTop: 12, width: '100%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
              View All Rates →
            </button>
          </div>

          {/* Funnel mini */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 13, color: '#0a1628', marginBottom: 12 }}>Pricing Funnel</h3>
            {mockPricingFunnel.slice(0, 4).map((stage, i) =>
            <div key={stage.stage} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: '#475569' }}>{stage.stage}</span>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{stage.count}</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: '#f1f5f9' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: stage.color, width: `${stage.pct}%` }} />
                </div>
              </div>
            )}
            <button onClick={() => onNavigate('analytics')} style={{ marginTop: 8, fontSize: 11, color: '#1565c0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Full Analytics →
            </button>
          </div>

          {/* SLA Snapshot */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 13, color: '#0a1628', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Shield size={13} color="#16a34a" /> SLA Compliance
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: '#16a34a' }}>93.4</span>
              <span style={{ fontSize: 14, color: '#16a34a', fontWeight: 600 }}>%</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: '#e2e8f0', marginBottom: 10 }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #16a34a, #4ade80)', width: '93.4%' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: '#f0fdf4', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#16a34a' }}>{mockQueries.length - breachedQueries.length}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>Within SLA</div>
              </div>
              <div style={{ flex: 1, background: '#fff5f5', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#b71c1c' }}>{breachedQueries.length}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>Breached</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedQuery &&
      <QueryDetail query={selectedQuery} onClose={() => setSelectedQuery(null)} />
      }
    </div>);

};