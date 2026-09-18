import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Plus, Calendar, ChevronDown } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';
import { mockNotifications } from '../data/mockData';

const pageTitles = {
  dashboard: 'Pricing Control Tower',
  queries: 'Pricing Queries',
  'rate-intel': 'Rate Intelligence',
  'rate-master': 'Rate Master',
  carriers: 'Carrier Analysis',
  analytics: 'Analytics',
  sla: 'SLA Monitor',
  reports: 'Reports'
};

const TRANSPORT_MODES = ['AIR', 'OCEAN', 'COURIER', 'ROAD', 'OTHERS'];

const MODE_ICONS = { AIR: '✈', OCEAN: '⚓', COURIER: '📦', ROAD: '🚛', OTHERS: '⚙' };

export const TopBar = ({ activePage, onNewQuery, transportMode, onTransportModeChange }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [dateRange] = useState('06 Sep – 12 Sep 2026');
  const notifRef = useRef(null);
  const unread = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pageTitle = transportMode === 'AIR'
    ? (pageTitles[activePage] ? `Air — ${pageTitles[activePage]}` : 'Air Pricing Control Tower')
    : (pageTitles[activePage] || 'Pricing Control Tower');

  return (
    <header style={{
      height: 60, background: 'white', borderBottom: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', paddingInline: '20px',
      gap: 12, position: 'sticky', top: 0, zIndex: 40,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
    }}>

      {/* Page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <h1 style={{ fontSize: 15, fontWeight: 700, color: '#0a1628', letterSpacing: '-0.3px', whiteSpace: 'nowrap', margin: 0 }}>
          {pageTitle}
        </h1>
        <span style={{ fontSize: 10, background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
          Demo
        </span>
      </div>

      {/* Vertical divider */}
      <div style={{ width: 1, height: 28, background: '#e2e8f0', flexShrink: 0 }} />

      {/* Transport Mode Pill Selector */}
      <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 8, padding: 3, gap: 1, flexShrink: 0 }}>
        {TRANSPORT_MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => onTransportModeChange(mode)}
            title={mode}
            style={{
              background: transportMode === mode ? 'white' : 'transparent',
              color: transportMode === mode ? '#0a1628' : '#94a3b8',
              fontWeight: transportMode === mode ? 700 : 500,
              boxShadow: transportMode === mode ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              border: 'none', padding: '5px 11px', borderRadius: 6,
              fontSize: 11, cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
            }}>
            <span style={{ fontSize: 12 }}>{MODE_ICONS[mode]}</span>
            {mode}
          </button>
        ))}
      </div>

      {/* Flex spacer */}
      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{ position: 'relative', width: 210, flexShrink: 0 }}>
        <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input className="form-input" placeholder="Search queries, customers..." style={{ paddingLeft: 28, width: '100%', fontSize: 12 }} />
      </div>

      {/* Date filter */}
      <button className="btn-secondary" style={{ gap: 5, fontSize: 12, padding: '6px 12px', flexShrink: 0 }}>
        <Calendar size={13} />
        <span style={{ whiteSpace: 'nowrap' }}>{dateRange}</span>
        <ChevronDown size={11} />
      </button>

      {/* Notifications */}
      <div ref={notifRef} style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setShowNotif(!showNotif)}
          style={{
            position: 'relative', border: '1px solid #e2e8f0', background: 'white',
            borderRadius: 8, padding: '7px 9px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', transition: 'all 0.15s'
          }}>
          <Bell size={16} color="#475569" />
          {unread > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4, width: 8, height: 8,
              borderRadius: '50%', background: '#e8192c', border: '1px solid white'
            }} />
          )}
        </button>
        {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
      </div>

      {/* User avatar */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: 8,
        border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 10px',
        background: 'white', cursor: 'pointer', flexShrink: 0
      }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={14} color="white" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#0a1628' }}>Pricing Team</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>Manager</div>
        </div>
        <ChevronDown size={12} color="#94a3b8" />
      </button>

      {/* New Query CTA */}
      <button className="btn-primary" onClick={onNewQuery} style={{ flexShrink: 0 }}>
        <Plus size={14} />
        New Query
      </button>
    </header>
  );
};