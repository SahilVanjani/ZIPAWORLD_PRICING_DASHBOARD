import React, { useState } from 'react';
import {
  LayoutDashboard, List, BarChart3, Database, Anchor,
  ShieldCheck, FileText, ChevronRight,
  Globe, Package, TrendingUp, Truck } from
'lucide-react';

const navItems = [
{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
{ id: 'queries', label: 'Pricing Queries', icon: List },
{ id: 'rate-intel', label: 'Rate Intelligence', icon: TrendingUp },
{ id: 'rate-master', label: 'Rate Master', icon: Database },
{ id: 'carriers', label: 'Carrier Analysis', icon: Anchor },
{ id: 'analytics', label: 'Analytics', icon: BarChart3 },
{ id: 'sla', label: 'SLA Monitor', icon: ShieldCheck },
{ id: 'reports', label: 'Reports', icon: FileText }];

const otherItems = [
{ id: 'operations', label: 'Operations', icon: Package },
{ id: 'shipments', label: 'Shipments', icon: Truck },
{ id: 'trade-lanes', label: 'Trade Lanes', icon: Globe }];

export const Sidebar = ({ activePage, onNavigate, transportMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: collapsed ? 64 : 240,
      minWidth: collapsed ? 64 : 240,
      background: 'var(--zw-navy)',
      height: '100vh',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s ease',
      overflow: 'hidden',
      position: 'sticky', top: 0,
      zIndex: 50
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#e8192c', letterSpacing: '-1px' }}>Z</span>
          </div>
          {!collapsed &&
          <div>
              <div style={{ fontWeight: 800, color: 'white', fontSize: 14, lineHeight: 1.2, letterSpacing: '-0.3px' }}>
                zip<span style={{ color: '#e8192c' }}>a</span>world
              </div>
              <div style={{ fontSize: 9, color: '#64748b', letterSpacing: '0.5px', fontWeight: 500, textTransform: 'uppercase' }}>
                Logistics E-Mall of India
              </div>
            </div>
          }
        </div>
        {!collapsed &&
        <div style={{ marginTop: 12, padding: '8px 10px', background: 'rgba(232,25,44,0.12)', borderRadius: 6, border: '1px solid rgba(232,25,44,0.2)' }}>
            <div style={{ fontSize: 9, color: '#f87171', letterSpacing: '0.8px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>
              ⚡ {transportMode === 'AIR' ? 'Air Pricing Control Tower' : 'Ocean Pricing Control Tower'}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Dedicated Pricing Module</div>
          </div>
        }
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        <div style={{ marginBottom: 8 }}>
          {!collapsed && <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 8px 8px' }}>Pricing</div>}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                style={{ width: '100%', border: 'none', background: 'none', justifyContent: collapsed ? 'center' : 'flex-start', cursor: 'pointer' }}
                title={collapsed ? item.label : undefined}>
                <Icon size={16} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && isActive && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
              </button>);
          })}
        </div>

        {!collapsed &&
        <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 8px 8px' }}>System</div>
            {otherItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="sidebar-link"
                style={{ width: '100%', border: 'none', background: 'none', opacity: 0.5, cursor: 'default' }}>
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  <span>{item.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, background: 'rgba(255,255,255,0.1)', padding: '1px 6px', borderRadius: 3 }}>→ Ops</span>
                </button>);
          })}
          </div>
        }
      </div>

      {/* Collapse toggle */}
      <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-link"
          style={{ width: '100%', border: 'none', background: 'none', justifyContent: 'center' }}>
          <ChevronRight size={16} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s' }} />
          {!collapsed && <span style={{ marginLeft: 4 }}>Collapse</span>}
        </button>
      </div>
    </aside>);
};