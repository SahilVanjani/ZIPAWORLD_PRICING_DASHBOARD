import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Plus, Calendar, ChevronDown } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';
import { mockNotifications } from '../data/mockData';
import { useRole } from '../context/RoleContext';
import { ROLES } from '../config/roles';

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
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [dateRange] = useState('06 Sep – 12 Sep 2026');
  const notifRef = useRef(null);
  const roleRef = useRef(null);
  const unread = mockNotifications.filter((n) => !n.read).length;
  
  const { currentRole, changeRole } = useRole();

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (roleRef.current && !roleRef.current.contains(e.target)) setShowRoleSwitcher(false);
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
        {TRANSPORT_MODES.map((mode) => {
          const isAir = mode === 'AIR';
          const isOcean = mode === 'OCEAN';
          
          let isDisabled = false;
          if (isAir && !currentRole.permissions.air) isDisabled = true;
          if (isOcean && !currentRole.permissions.ocean) isDisabled = true;

          return (
            <button
              key={mode}
              onClick={() => {
                if (!isDisabled) onTransportModeChange(mode);
              }}
              title={isDisabled ? 'Access Restricted' : mode}
              style={{
                background: transportMode === mode ? 'white' : 'transparent',
                color: transportMode === mode ? '#0a1628' : (isDisabled ? '#cbd5e1' : '#94a3b8'),
                fontWeight: transportMode === mode ? 700 : 500,
                boxShadow: transportMode === mode ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                border: 'none', padding: '5px 11px', borderRadius: 6,
                fontSize: 11, cursor: isDisabled ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                opacity: isDisabled ? 0.6 : 1
              }}>
              <span style={{ fontSize: 12 }}>{MODE_ICONS[mode]}</span>
              {mode}
            </button>
          );
        })}
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

      {/* User avatar & Role Switcher */}
      <div ref={roleRef} style={{ position: 'relative', flexShrink: 0 }}>
        <button 
          onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 10px',
            background: 'white', cursor: 'pointer', flexShrink: 0,
            boxShadow: showRoleSwitcher ? '0 0 0 2px rgba(232,25,44,0.1)' : 'none'
          }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>
              {currentRole.user.charAt(0)}
            </span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0a1628' }}>{currentRole.name}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>{currentRole.user.split(' ')[0]}</div>
          </div>
          <ChevronDown size={12} color="#94a3b8" />
        </button>

        {showRoleSwitcher && (
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 8,
            width: 260, background: 'white', borderRadius: 12,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0',
            zIndex: 100, overflow: 'hidden'
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                SWITCH PERSONA ROLE
              </div>
            </div>
            <div style={{ padding: 8 }}>
              {Object.values(ROLES).map((role) => {
                const isSelected = currentRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      changeRole(role.id);
                      setShowRoleSwitcher(false);
                      setToastMessage(`Switched to ${role.user} — ${role.name}`);
                      setTimeout(() => setToastMessage(''), 3000);
                    }}
                    style={{
                      width: '100%', display: 'flex', flexDirection: 'column',
                      padding: '10px 12px', border: isSelected ? '1px solid #fca5a5' : '1px solid transparent',
                      background: isSelected ? '#fef2f2' : 'transparent',
                      borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                      marginBottom: 4, position: 'relative', transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <div style={{ fontSize: 13, fontWeight: isSelected ? 700 : 600, color: isSelected ? '#b91c1c' : '#0a1628' }}>
                        {role.user}
                      </div>
                      {isSelected && <span style={{ color: '#dc2626', fontSize: 14 }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 11, color: isSelected ? '#ef4444' : '#64748b', marginTop: 2 }}>
                      {role.name}
                    </div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                      {role.access}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* New Query CTA */}
      <button className="btn-primary" onClick={onNewQuery} style={{ flexShrink: 0 }}>
        <Plus size={14} />
        New Query
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#0a1628', color: 'white', padding: '12px 24px',
          borderRadius: 8, boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          fontSize: 14, fontWeight: 500, zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 8,
          animation: 'fadeInUp 0.3s ease-out forwards'
        }}>
          <span style={{ color: '#4ade80' }}>✓</span>
          {toastMessage}
        </div>
      )}
    </header>
  );
};