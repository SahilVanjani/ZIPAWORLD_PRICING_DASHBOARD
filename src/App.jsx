import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { PricingQueries } from './pages/PricingQueries';
import { RateIntelligence } from './pages/RateIntelligence';
import { RateMaster } from './pages/RateMaster';
import { CarrierAnalysis } from './pages/CarrierAnalysis';
import { Analytics } from './pages/Analytics';
import { SLAMonitor } from './pages/SLAMonitor';
import { ComingSoon } from './pages/ComingSoon';
import { AirDashboard } from './modules/air/pages/AirDashboard';
import { AirPricingQueries } from './modules/air/pages/AirPricingQueries';
import { AirRateIntelligence } from './modules/air/pages/AirRateIntelligence';
import { AirRateMaster } from './modules/air/pages/AirRateMaster';
import { AirCarrierAnalysis } from './modules/air/pages/AirCarrierAnalysis';
import { AirAnalytics } from './modules/air/pages/AirAnalytics';
import { AirSLAMonitor } from './modules/air/pages/AirSLAMonitor';
import { AirReports } from './modules/air/pages/AirReports';

// New Query Modal (mock only)
const NewQueryModal = ({ onClose }) =>
<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
    <div style={{ background: 'white', borderRadius: 16, width: 640, maxWidth: '95vw', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
      <div style={{ background: 'var(--zw-navy)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>New Pricing Query</h3>
          <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>Enter shipment details to create a new pricing request</p>
        </div>
        <button onClick={onClose} style={{ color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: 6, cursor: 'pointer', fontSize: 16 }}>✕</button>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
        { label: 'Customer Name', type: 'text', placeholder: 'e.g. ABC Exports Pvt Ltd' },
        { label: 'Source', type: 'select', options: ['Email', 'Portal', 'Walk-in', 'Call'] },
        { label: 'Origin Port', type: 'select', options: ['Nhava Sheva', 'Mundra', 'Chennai', 'Kolkata', 'Hazira'] },
        { label: 'Destination Port', type: 'text', placeholder: 'e.g. Rotterdam, Hamburg' },
        { label: 'Shipment Type', type: 'select', options: ['FCL', 'LCL'] },
        { label: 'Container Type', type: 'select', options: ['20GP', '40GP', '40HC', '45HC'] },
        { label: 'Weight', type: 'text', placeholder: 'e.g. 18 MT' },
        { label: 'Commodity', type: 'text', placeholder: 'e.g. General Cargo, Textiles' },
        { label: 'Incoterm', type: 'select', options: ['FOB', 'CIF', 'CFR', 'EXW', 'DAP'] },
        { label: 'Assign To', type: 'select', options: ['Sahil', 'Rahul', 'Amit', 'Neha', 'Priya'] }].
        map((f) =>
        <div key={f.label}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
              {f.type === 'select' ?
          <select className="form-input" style={{ width: '100%' }}>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select> :

          <input className="form-input" type="text" placeholder={f.placeholder} style={{ width: '100%' }} />
          }
            </div>
        )}
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Remarks</label>
            <textarea className="form-input" rows={2} placeholder="Any special instructions or remarks..." style={{ width: '100%', resize: 'none' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}>
            Create Query
          </button>
        </div>
        <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 10 }}>
          📊 Demo Mode — No data will be saved to a database
        </p>
      </div>
    </div>
  </div>;

const Reports = () =>
<div className="page-content animate-fadeIn">
    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>Reports</h2>
    <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Download and schedule pricing performance reports</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {[
    { title: 'Daily Pricing Summary', desc: 'Query volume, TAT, SLA compliance for today', badge: 'Daily' },
    { title: 'Weekly Performance Report', desc: 'Week-on-week pricing team and carrier analysis', badge: 'Weekly' },
    { title: 'SLA Breach Report', desc: 'All SLA breaches with root cause analysis', badge: 'On-demand' },
    { title: 'Carrier Rate Report', desc: 'Carrier-wise rate comparison and trends', badge: 'Monthly' },
    { title: 'Rate Coverage Analysis', desc: 'Missing and expiring rates by trade lane', badge: 'Weekly' },
    { title: 'Team Performance Report', desc: 'Individual and team-level pricing KPIs', badge: 'Monthly' }].
    map((r) =>
    <div key={r.title} className="card" style={{ padding: '20px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', flex: 1 }}>{r.title}</h3>
            <span style={{ fontSize: 10, fontWeight: 700, background: '#e3f2fd', color: '#1565c0', padding: '2px 8px', borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>{r.badge}</span>
          </div>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16, lineHeight: 1.5 }}>{r.desc}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ fontSize: 11, padding: '5px 12px' }}>Preview</button>
            <button className="btn-primary" style={{ fontSize: 11, padding: '5px 12px' }}>Download PDF</button>
          </div>
        </div>
    )}
    </div>
    <div style={{ marginTop: 16, padding: '14px 20px', background: '#fef3c7', borderRadius: 10, border: '1px solid #fde68a', fontSize: 13, color: '#92400e', fontWeight: 500 }}>
      📊 Reports are in demo mode — no real data will be exported. All reports show sample ZIPWORLD Pricing data for presentation.
    </div>
  </div>;

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [initialStatus, setInitialStatus] = useState('ALL');
  const [showNewQuery, setShowNewQuery] = useState(false);
  const [transportMode, setTransportMode] = useState('OCEAN');

  const handleNavigate = (page, status) => {
    setActivePage(page);
    if (status) setInitialStatus(status);else
    setInitialStatus('ALL');
  };

  const renderPage = () => {
    if (transportMode === 'COURIER' || transportMode === 'ROAD' || transportMode === 'OTHERS') {
      return <ComingSoon mode={transportMode} />;
    }

    if (transportMode === 'AIR') {
      switch (activePage) {
        case 'dashboard': return <AirDashboard />;
        case 'queries': return <AirPricingQueries />;
        case 'rate-intel': return <AirRateIntelligence />;
        case 'rate-master': return <AirRateMaster />;
        case 'carriers': return <AirCarrierAnalysis />;
        case 'analytics': return <AirAnalytics />;
        case 'sla': return <AirSLAMonitor />;
        case 'reports': return <AirReports />;
        default: return <AirDashboard />;
      }
    }

    switch (activePage) {
      case 'dashboard':return <Dashboard onNavigate={handleNavigate} />;
      case 'queries':return <PricingQueries initialStatus={initialStatus} />;
      case 'rate-intel':return <RateIntelligence />;
      case 'rate-master':return <RateMaster />;
      case 'carriers':return <CarrierAnalysis />;
      case 'analytics':return <Analytics />;
      case 'sla':return <SLAMonitor />;
      case 'reports':return <Reports />;
      default:return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={activePage} onNavigate={handleNavigate} transportMode={transportMode} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar 
          activePage={activePage} 
          onNewQuery={() => setShowNewQuery(true)} 
          transportMode={transportMode}
          onTransportModeChange={setTransportMode}
        />
        <main style={{ flex: 1, overflowY: 'auto', background: '#f0f4f8' }}>
          {renderPage()}
        </main>
      </div>
      {showNewQuery && <NewQueryModal onClose={() => setShowNewQuery(false)} />}
    </div>);
}

export default App;