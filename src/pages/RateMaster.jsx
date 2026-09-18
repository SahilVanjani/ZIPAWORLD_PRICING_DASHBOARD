import React, { useState } from 'react';
import { mockRateMaster } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { Search, Plus, Download, X } from 'lucide-react';
import { formatINRFull } from '../utils/helpers';

const CARRIERS = ['All', 'CMA CGM', 'MSC', 'Maersk', 'Hapag-Lloyd', 'COSCO', 'ONE', 'Evergreen', 'Yang Ming'];
const ORIGINS = ['All', 'Nhava Sheva', 'Mundra', 'Chennai', 'Kolkata', 'Hazira'];
const CONTAINERS = ['All', '20GP', '40GP', '40HC', '45HC', 'LCL'];

const AddRateModal = ({ onClose }) =>
<div className="modal-overlay" onClick={onClose}>
    <div className="modal" style={{ width: 600, padding: 0 }} onClick={(e) => e.stopPropagation()}>
      <div style={{ background: 'var(--zw-navy)', padding: '20px 24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Add New Rate</h3>
          <p style={{ color: '#94a3b8', fontSize: 12 }}>Enter rate details to add to Rate Master</p>
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: 6, cursor: 'pointer', color: 'white' }}>
          <X size={16} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
        { label: 'Carrier', type: 'select', options: CARRIERS.filter((c) => c !== 'All') },
        { label: 'Service', type: 'text', placeholder: 'e.g. FAL 1 Direct' },
        { label: 'Origin', type: 'select', options: ORIGINS.filter((o) => o !== 'All') },
        { label: 'Destination', type: 'text', placeholder: 'e.g. Rotterdam' },
        { label: 'Container Type', type: 'select', options: ['20GP', '40GP', '40HC', '45HC', 'LCL'] },
        { label: 'Currency', type: 'select', options: ['INR', 'USD', 'EUR'] },
        { label: 'Ocean Freight', type: 'number', placeholder: '0.00' },
        { label: 'Origin Charges', type: 'number', placeholder: '0.00' },
        { label: 'Destination Charges', type: 'number', placeholder: '0.00' },
        { label: 'Other Charges', type: 'number', placeholder: '0.00' },
        { label: 'Validity From', type: 'date' },
        { label: 'Validity To', type: 'date' }].
        map((field) =>
        <div key={field.label}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{field.label}</label>
              {field.type === 'select' ?
          <select className="form-input" style={{ width: '100%' }}>
                  {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select> :

          <input className="form-input" type={field.type} placeholder={field.placeholder} style={{ width: '100%' }} />
          }
            </div>
        )}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}>Save Rate</button>
        </div>
      </div>
    </div>
  </div>;


export const RateMaster = () => {
  const [search, setSearch] = useState('');
  const [filterCarrier, setFilterCarrier] = useState('All');
  const [filterOrigin, setFilterOrigin] = useState('All');
  const [filterContainer, setFilterContainer] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = mockRateMaster.filter((r) => {
    if (filterCarrier !== 'All' && r.carrier !== filterCarrier) return false;
    if (filterOrigin !== 'All' && r.origin !== filterOrigin) return false;
    if (filterContainer !== 'All' && r.container !== filterContainer) return false;
    if (filterStatus !== 'All' && r.status !== filterStatus) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!r.carrier.toLowerCase().includes(s) && !r.origin.toLowerCase().includes(s) && !r.destination.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="page-content animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>Rate Master</h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>{mockRateMaster.length} active rate entries across {CARRIERS.length - 1} carriers</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" style={{ gap: 5, fontSize: 12 }}>
            <Download size={13} /> Export
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add Rate
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
        { label: 'Active Rates', value: mockRateMaster.filter((r) => r.status === 'Active').length, color: '#16a34a', bg: '#f0fdf4' },
        { label: 'Expiring Soon', value: mockRateMaster.filter((r) => r.status === 'Expiring').length, color: '#e65100', bg: '#fff3e0' },
        { label: 'Expired', value: mockRateMaster.filter((r) => r.status === 'Expired').length, color: '#b71c1c', bg: '#fff5f5' },
        { label: 'Carriers Covered', value: [...new Set(mockRateMaster.map((r) => r.carrier))].length, color: '#1565c0', bg: '#e3f2fd' }].
        map((card) =>
        <div key={card.label} className="card" style={{ padding: '16px 20px', background: card.bg, borderColor: 'transparent' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{card.label}</div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 20px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 160px' }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input className="form-input" placeholder="Search carrier, origin, destination..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 30, width: '100%', fontSize: 12 }} />
        </div>
        <select className="form-input" style={{ fontSize: 12 }} value={filterCarrier} onChange={(e) => setFilterCarrier(e.target.value)}>
          {CARRIERS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="form-input" style={{ fontSize: 12 }} value={filterOrigin} onChange={(e) => setFilterOrigin(e.target.value)}>
          {ORIGINS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select className="form-input" style={{ fontSize: 12 }} value={filterContainer} onChange={(e) => setFilterContainer(e.target.value)}>
          {CONTAINERS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="form-input" style={{ fontSize: 12 }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          {['All', 'Active', 'Expiring', 'Expired'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Carrier</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Service</th>
                <th>Container</th>
                <th>Ocean Freight</th>
                <th>Origin Charges</th>
                <th>Dest. Charges</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Currency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((rate) =>
              <tr key={rate.id} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
                        {rate.carrier.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{rate.carrier}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12 }}>{rate.origin}</td>
                  <td style={{ fontSize: 12 }}>{rate.destination}</td>
                  <td style={{ fontSize: 12, color: '#475569' }}>{rate.service}</td>
                  <td>
                    <span style={{ fontSize: 11, fontWeight: 700, background: '#e3f2fd', color: '#1565c0', padding: '2px 8px', borderRadius: 6 }}>
                      {rate.container}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: 13 }}>{formatINRFull(rate.oceanFreight)}</td>
                  <td style={{ fontSize: 12, color: '#475569' }}>{formatINRFull(rate.originCharges)}</td>
                  <td style={{ fontSize: 12, color: '#475569' }}>{formatINRFull(rate.destinationCharges)}</td>
                  <td style={{ fontSize: 12 }}>{rate.validityFrom}</td>
                  <td style={{ fontSize: 12, color: rate.status === 'Expiring' ? '#e65100' : rate.status === 'Expired' ? '#b71c1c' : '#475569', fontWeight: rate.status !== 'Active' ? 700 : 400 }}>{rate.validityTo}</td>
                  <td>
                    <span style={{ fontSize: 11, fontWeight: 600, background: '#f1f5f9', padding: '2px 8px', borderRadius: 6 }}>{rate.currency}</span>
                  </td>
                  <td><StatusBadge status={rate.status} /></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc' }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Showing {paginated.length} of {filtered.length}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => setPage((p) => p + 1)} disabled={page * pageSize >= filtered.length}>Next →</button>
          </div>
        </div>
      </div>

      {showAddModal && <AddRateModal onClose={() => setShowAddModal(false)} />}
    </div>);

};