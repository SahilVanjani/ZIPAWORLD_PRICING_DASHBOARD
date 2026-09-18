import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  Legend } from
'recharts';
import {
  mockDailyVolume, mockTATTrend, mockStatusDistribution,
  mockShipmentTypes, mockTradeLanes, mockCarrierCompetitiveness,
  mockPricingFunnel, mockHourlyVolume, mockRateValidity,
  mockRateCoverage, mockSavingsTrend, mockTeam } from
'../data/mockData';

import { KPICard } from '../components/KPICard';
import {
  BarChart3, Clock, Target, TrendingDown, PieChart as PieIcon,
  Shield, Percent } from
'lucide-react';

const RADIAN = Math.PI / 180;
const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>);

};

const ChartCard = ({ title, subtitle, children, action }) =>
<div className="card" style={{ padding: '20px', height: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0a1628', marginBottom: 2 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 12, color: '#94a3b8' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>;


const MetricToggle = ({ options, value, onChange }) =>
<div style={{ display: 'flex', gap: 3 }}>
    {options.map((opt) =>
  <button
    key={opt}
    className={`tab-btn ${value === opt ? 'active' : ''}`}
    onClick={() => onChange(opt)}
    style={{ fontSize: 11, padding: '4px 10px' }}>
    
        {opt}
      </button>
  )}
  </div>;


export const Analytics = () => {
  const [volumeView, setVolumeView] = useState('Daily');
  const [laneMetric, setLaneMetric] = useState('Query Count');
  const [carrierMetric, setCarrierMetric] = useState('Best Rate Wins');

  const carrierData = mockCarrierCompetitiveness.map((c) => ({
    ...c,
    value: carrierMetric === 'Best Rate Wins' ? c.bestWins :
    carrierMetric === 'Average Rate' ? Math.round(c.avgRate / 1000) :
    carrierMetric === 'Rate Coverage' ? c.coverage :
    carrierMetric === 'Average Transit' ? c.avgTransit : c.quotes
  }));

  const laneData = mockTradeLanes.map((l) => ({
    ...l,
    value: laneMetric === 'Query Count' ? l.queries :
    laneMetric === 'Average Rate' ? Math.round(l.avgRate / 1000) : l.avgTat
  }));

  return (
    <div className="page-content animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>Pricing Analytics</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>Management-level insights — pricing performance, carrier analysis, team efficiency</p>
        <div style={{ display: 'inline-flex', marginTop: 8, background: '#fef3c7', padding: '4px 12px', borderRadius: 20, border: '1px solid #fde68a' }}>
          <span style={{ fontSize: 11, color: '#92400e', fontWeight: 600 }}>📊 All data shown is DEMO DATA for presentation purposes</span>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        <KPICard title="Total Queries" value={184} trend={8.4} icon={<BarChart3 size={20} color="#1565c0" />} iconBg="#e3f2fd" />
        <KPICard title="Avg TAT" value={42} suffix="min" trend={-4.3} icon={<Clock size={20} color="#7c3aed" />} iconBg="#f3e5f5" />
        <KPICard title="SLA Compliance" value="93.4" suffix="%" trend={1.2} icon={<Shield size={20} color="#16a34a" />} iconBg="#e8f5e9" />
        <KPICard title="Rate Coverage" value="92" suffix="%" trend={2.1} icon={<Target size={20} color="#0288d1" />} iconBg="#e1f5fe" />
        <KPICard title="Best Rate Hit" value="73" suffix="%" trend={5.8} icon={<TrendingDown size={20} color="#16a34a" />} iconBg="#e8f5e9" />
        <KPICard title="Quote Conversion" value="54.9" suffix="%" trend={3.2} icon={<Percent size={20} color="#f59e0b" />} iconBg="#fff8e1" />
        <KPICard title="Avg Saving" value="₹12.7K" trend={7.1} icon={<TrendingDown size={20} color="#e8192c" />} iconBg="#ffebee" />
        <KPICard title="No Rate %" value="8" suffix="%" trend={-1.8} icon={<PieIcon size={20} color="#94a3b8" />} iconBg="#f5f5f5" />
      </div>

      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <ChartCard
          title="Pricing Query Volume"
          subtitle="Queries received over time"
          action={<MetricToggle options={['Daily', 'Weekly', 'Monthly']} value={volumeView} onChange={setVolumeView} />}>
          
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockDailyVolume}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1565c0" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1565c0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
              <Tooltip />
              <Area type="monotone" dataKey="queries" stroke="#1565c0" fill="url(#volGrad)" strokeWidth={2} dot={{ fill: '#1565c0', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="FCL vs LCL" subtitle="Shipment type distribution">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={200} height={200}>
              <Pie data={mockShipmentTypes} cx={100} cy={100} innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={CustomPieLabel}>
                {mockShipmentTypes.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
              <Legend formatter={(value) => <span style={{ fontSize: 12, color: '#475569' }}>{value}</span>} />
            </PieChart>
          </div>
          <div style={{ display: 'flex', justify: 'center', gap: 16, justifyContent: 'center' }}>
            {mockShipmentTypes.map((s) =>
            <div key={s.name} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.name}</div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <ChartCard title="Response TAT Trend" subtitle="Daily average vs 60-min SLA target">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockTATTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
              <Tooltip formatter={(v, n) => [`${v} min`, n === 'tat' ? 'Avg TAT' : 'SLA Target']} />
              <Legend formatter={(v) => v === 'tat' ? 'Avg Response TAT' : 'SLA Target (60 min)'} />
              <Line type="monotone" dataKey="target" stroke="#fca5a5" strokeDasharray="6 3" strokeWidth={2} dot={false} name="target" />
              <Line type="monotone" dataKey="tat" stroke="#1565c0" strokeWidth={2.5} dot={{ fill: '#1565c0', r: 4 }} name="tat" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Query Status Distribution" subtitle="Current distribution across all statuses">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <PieChart width={180} height={200}>
              <Pie data={mockStatusDistribution} cx={90} cy={100} innerRadius={50} outerRadius={85} dataKey="value" labelLine={false} label={CustomPieLabel}>
                {mockStatusDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
            <div style={{ flex: 1 }}>
              {mockStatusDistribution.map((s) =>
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#475569', flex: 1 }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0a1628' }}>{s.value}</span>
                </div>
              )}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Row 3 — Top Trade Lanes + Carrier */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <ChartCard
          title="Top Pricing Trade Lanes"
          action={<MetricToggle options={['Query Count', 'Average Rate', 'Average TAT']} value={laneMetric} onChange={setLaneMetric} />}>
          
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={laneData} layout="vertical" margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => laneMetric === 'Average Rate' ? `₹${v}K` : v} />
              <YAxis type="category" dataKey="lane" tick={{ fontSize: 10, fill: '#475569' }} width={180} />
              <Tooltip formatter={(v) => laneMetric === 'Average Rate' ? `₹${(v * 1000).toLocaleString('en-IN')}` : v} />
              <Bar dataKey="value" fill="#1565c0" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Carrier Competitiveness"
          action={<MetricToggle options={['Best Rate Wins', 'Average Rate', 'Rate Coverage', 'Average Transit', 'Total Quotes']} value={carrierMetric} onChange={setCarrierMetric} />}>
          
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={carrierData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="carrier" tick={{ fontSize: 10, fill: '#475569' }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {carrierData.map((_, i) =>
                <Cell key={i} fill={i === 0 ? '#16a34a' : '#1565c0'} opacity={i === 0 ? 1 : 0.7} />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 4 — Savings + Rate Validity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <ChartCard title="Pricing Savings Analysis" subtitle="Highest vs Recommended rate — monthly trend (DEMO DATA)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockSavingsTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`} />
              <Legend />
              <Bar dataKey="highest" name="Highest Rate" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Bar dataKey="recommended" name="Recommended" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <div style={{ flex: 1, background: '#ffebee', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Highest Available</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#b71c1c' }}>₹1,34,500</div>
            </div>
            <div style={{ flex: 1, background: '#f0fdf4', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Recommended</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#15803d' }}>₹1,21,800</div>
            </div>
            <div style={{ flex: 1, background: '#e3f2fd', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Avg Saving</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1565c0' }}>₹12,700</div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Rate Validity Status">
          <PieChart width={200} height={180} style={{ margin: '0 auto', display: 'block' }}>
            <Pie data={mockRateValidity} cx={100} cy={90} outerRadius={80} dataKey="value" labelLine={false} label={CustomPieLabel}>
              {mockRateValidity.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div style={{ marginTop: 8 }}>
            {mockRateValidity.map((r) =>
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: r.color }} />
                <span style={{ fontSize: 11, color: '#475569', flex: 1 }}>{r.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{r.value}</span>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>({Math.round(r.value / 100 * 100)}%)</span>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Row 5 — Rate Coverage */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <ChartCard title="Rate Coverage by Segment">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockRateCoverage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="segment" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
              <Bar dataKey="found" name="Rate Found" fill="#16a34a" stackId="a" />
              <Bar dataKey="notFound" name="No Rate" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pricing Funnel */}
        <ChartCard title="Pricing Conversion Funnel" subtitle="Query to booking journey">
          <div style={{ padding: '8px 0' }}>
            {mockPricingFunnel.map((stage, idx) =>
            <div key={stage.stage} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{stage.stage}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0a1628' }}>{stage.count}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{stage.pct.toFixed(1)}%</span>
                  </div>
                </div>
                <div style={{ height: 24, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                  <div style={{
                  height: '100%', borderRadius: 4,
                  width: `${stage.pct}%`,
                  background: stage.color,
                  transition: 'width 0.6s ease',
                  display: 'flex', alignItems: 'center', paddingLeft: 8
                }}>
                    {stage.pct > 15 && <span style={{ fontSize: 11, color: 'white', fontWeight: 700 }}>{stage.count}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Row 6 — Peak Hours Heatmap */}
      <div style={{ marginBottom: 16 }}>
        <ChartCard title="Pricing Query Volume by Hour" subtitle="Workload distribution across the week — identify peak pricing hours">
          <div style={{ overflowX: 'auto', marginTop: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', gap: 4, minWidth: 600 }}>
              <div />
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) =>
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#475569', paddingBottom: 8 }}>{d}</div>
              )}
              {mockHourlyVolume.map((row) =>
              <React.Fragment key={row.hour}>
                  <div style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', paddingRight: 8 }}>{row.hour}</div>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                  const val = row[day];
                  const max = 26;
                  const intensity = val / max;
                  const bg = `rgba(21, 101, 192, ${0.1 + intensity * 0.9})`;
                  return (
                    <div
                      key={day}
                      className="heat-cell"
                      style={{ height: 32, background: bg, color: intensity > 0.5 ? 'white' : '#0a1628', fontSize: 11 }}
                      title={`${day} ${row.hour}: ${val} queries`}>
                      
                        {val}
                      </div>);

                })}
                </React.Fragment>
              )}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Row 7 — Team Performance */}
      <ChartCard title="Pricing Team Performance" subtitle="Individual performance metrics">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>Pending</th>
                <th>Avg TAT</th>
                <th>SLA %</th>
                <th>Quotes</th>
                <th>Conversion %</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {mockTeam.map((m) =>
              <tr key={m.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white' }}>
                        {m.name[0]}
                      </div>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{m.assigned}</td>
                  <td style={{ color: '#16a34a', fontWeight: 600 }}>{m.completed}</td>
                  <td style={{ color: '#e65100', fontWeight: 600 }}>{m.pending}</td>
                  <td>
                    <span style={{ color: m.avgTat <= 40 ? '#16a34a' : '#e65100', fontWeight: 700 }}>{m.avgTat} min</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 700, color: m.slaCompliance >= 95 ? '#16a34a' : '#f59e0b' }}>{m.slaCompliance}%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{m.quotes}</td>
                  <td style={{ fontWeight: 600 }}>{m.conversionRate}%</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3 }}>
                        <div style={{ height: '100%', borderRadius: 3, background: '#16a34a', width: `${m.slaCompliance}%` }} />
                      </div>
                      <span style={{ fontSize: 11, color: '#94a3b8', width: 34 }}>{m.slaCompliance}%</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>);

};