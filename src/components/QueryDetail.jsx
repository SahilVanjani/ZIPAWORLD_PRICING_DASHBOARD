import React, { useState } from 'react';
import {
  X, Package, MapPin, Clock, User2, Zap, FileText,
  ChevronRight, BarChart2, Info } from
'lucide-react';

import { StatusBadge } from './StatusBadge';
import { QueryTimeline } from './QueryTimeline';
import { RateComparison } from './RateComparison';
import { formatDateTime, formatAge, getSLAColor, getSLALabel } from '../utils/helpers';








export const QueryDetail = ({ query, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const slaColor = getSLAColor(query.ageMinutes, query.slaMinutes);

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer animate-slideInRight">
        {/* Header */}
        <div style={{
          background: 'var(--zw-navy)', padding: '20px 24px',
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontWeight: 800, fontSize: 20, color: 'white' }}>{query.id}</span>
                <StatusBadge status={query.status} />
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  <span style={{ color: '#64748b' }}>Customer:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{query.customer}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  <span style={{ color: '#64748b' }}>Assigned:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{query.assignedTo}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>
                  <span style={{ color: '#64748b' }}>Source:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{query.source}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'white' }}>
              
              <X size={18} />
            </button>
          </div>

          {/* SLA bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>
                Age: <strong style={{ color: slaColor }}>{formatAge(query.ageMinutes)}</strong>
              </span>
              <span style={{ fontSize: 12, color: slaColor, fontWeight: 600 }}>
                {getSLALabel(query.ageMinutes, query.slaMinutes)}
              </span>
            </div>
            <div className="sla-bar">
              <div
                className="sla-bar-fill"
                style={{
                  width: `${Math.min(100, query.ageMinutes / query.slaMinutes * 100)}%`,
                  background: slaColor
                }} />
              
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginTop: 16 }}>
            {[
            { id: 'overview', label: 'Overview', icon: <Info size={13} /> },
            { id: 'rates', label: 'Rate Intelligence', icon: <BarChart2 size={13} /> },
            { id: 'timeline', label: 'Timeline', icon: <Clock size={13} /> }].
            map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 6, border: 'none',
                background: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.1)',
                color: activeTab === tab.id ? '#0a1628' : '#94a3b8',
                fontWeight: 600, fontSize: 12, cursor: 'pointer',
                transition: 'all 0.15s'
              }}>
              
                {tab.icon}
                {tab.label}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {activeTab === 'overview' &&
          <div className="animate-fadeIn">
              {/* Shipment Intelligence */}
              <div className="card" style={{ padding: '20px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} color="#1565c0" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>Shipment Intelligence</h3>
                    <p style={{ fontSize: 11, color: '#94a3b8' }}>Auto-classified from query data</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', padding: '4px 10px', borderRadius: 20, border: '1px solid #bbf7d0' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                    <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>Shipment profile identified</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {[
                { label: 'Shipment Type', value: query.shipmentType, icon: <Package size={14} color="#1565c0" /> },
                { label: 'Container', value: query.container, icon: <Package size={14} color="#7c3aed" /> },
                { label: 'Weight', value: query.weight, icon: <Package size={14} color="#f59e0b" /> },
                { label: 'Commodity', value: query.commodity, icon: <FileText size={14} color="#16a34a" /> },
                { label: 'Origin', value: query.origin, icon: <MapPin size={14} color="#e8192c" /> },
                { label: 'Destination', value: query.destination, icon: <MapPin size={14} color="#0288d1" /> },
                { label: 'Trade Lane', value: `${query.origin.split(' ')[0]} → ${query.destination.split(' ')[0]}`, icon: <ChevronRight size={14} color="#475569" /> },
                { label: 'Incoterm', value: query.incoterm || 'N/A', icon: <FileText size={14} color="#475569" /> }].
                map((item) =>
                <div key={item.label} style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', border: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                        {item.icon}
                        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{item.label}</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0a1628' }}>{item.value}</div>
                    </div>
                )}
                </div>
              </div>

              {/* Timeline Info */}
              <div className="card" style={{ padding: '20px', marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} color="#1565c0" />
                  Query Timeline Summary
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {[
                { label: 'Received At', value: formatDateTime(query.receivedAt) },
                { label: 'Assigned At', value: formatDateTime(query.assignedAt || '') },
                { label: 'Rates Retrieved', value: formatDateTime(query.ratesFoundAt || '') },
                { label: 'Rates Reverted', value: formatDateTime(query.ratesRevertedAt || '') },
                { label: 'Total Response TAT', value: query.tatMinutes ? `${query.tatMinutes} minutes` : '—', highlight: true },
                { label: 'SLA Target', value: `${query.slaMinutes} minutes`, highlight: false }].
                map((item) =>
                <div key={item.label} style={{ background: item.highlight ? '#f0fdf4' : '#f8fafc', borderRadius: 8, padding: '10px 14px', border: `1px solid ${item.highlight ? '#bbf7d0' : '#f1f5f9'}` }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: item.highlight ? '#15803d' : '#0a1628' }}>{item.value}</div>
                    </div>
                )}
                </div>
              </div>

              {/* Assigned Agent */}
              <div className="card" style={{ padding: '20px' }}>
                <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <User2 size={16} color="#1565c0" />
                  Assigned Team Member
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{query.assignedTo[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0a1628' }}>{query.assignedTo}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Pricing Analyst</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: '#16a34a', background: '#f0fdf4', padding: '2px 8px', borderRadius: 12 }}>Avg TAT: 38 min</span>
                      <span style={{ fontSize: 11, color: '#1565c0', background: '#e3f2fd', padding: '2px 8px', borderRadius: 12 }}>SLA: 96%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'rates' &&
          <div className="animate-fadeIn">
              <RateComparison queryId={query.id} />
            </div>
          }

          {activeTab === 'timeline' &&
          <div className="animate-fadeIn">
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0a1628', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} color="#1565c0" />
                  Query Lifecycle Timeline
                </h3>
                <QueryTimeline query={query} />
              </div>
            </div>
          }
        </div>
      </div>
    </>);

};