import React, { useState, useMemo } from 'react';
import {
  Clock, ChevronUp, ChevronDown, ChevronsUpDown,
  Filter, Search, Download, RefreshCw } from
'lucide-react';
import { mockQueries } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { QueryDetail } from '../components/QueryDetail';
import { formatTime, formatAge, getSLAColor, getSLALabel } from '../utils/helpers';

const TABS = [
{ id: 'ALL', label: 'All' },
{ id: 'Pending', label: 'Pending' },
{ id: 'In Progress', label: 'In Progress' },
{ id: 'Rates Available', label: 'Rates Available' },
{ id: 'Quoted', label: 'Quoted' },
{ id: 'Confirmed', label: 'Confirmed' },
{ id: 'SLA Breached', label: 'SLA Breached' }];








export const PricingQueries = ({ initialStatus = 'ALL' }) => {
  const [activeTab, setActiveTab] = useState(initialStatus);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('receivedAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterCarrier, setFilterCarrier] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const pageSize = 12;

  const origins = [...new Set(mockQueries.map((q) => q.origin))];
  const employees = [...new Set(mockQueries.map((q) => q.assignedTo))];

  const filtered = useMemo(() => {
    let data = [...mockQueries];
    if (activeTab !== 'ALL') data = data.filter((q) => q.status === activeTab);
    if (search) {
      const s = search.toLowerCase();
      data = data.filter((q) =>
      q.id.toLowerCase().includes(s) ||
      q.customer.toLowerCase().includes(s) ||
      q.origin.toLowerCase().includes(s) ||
      q.destination.toLowerCase().includes(s)
      );
    }
    if (filterOrigin) data = data.filter((q) => q.origin === filterOrigin);
    if (filterEmployee) data = data.filter((q) => q.assignedTo === filterEmployee);
    data.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return data;
  }, [activeTab, search, filterOrigin, filterEmployee, sortKey, sortDir]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');else
    {setSortKey(key);setSortDir('asc');}
  };

  const SortIcon = ({ k }) => {
    if (sortKey !== k) return <ChevronsUpDown size={12} color="#94a3b8" />;
    return sortDir === 'asc' ? <ChevronUp size={12} color="#1565c0" /> : <ChevronDown size={12} color="#1565c0" />;
  };

  const tabCounts = TABS.map((tab) => ({
    ...tab,
    count: tab.id === 'ALL' ? mockQueries.length : mockQueries.filter((q) => q.status === tab.id).length
  }));

  return (
    <div className="page-content animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>Pricing Query Queue</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>Track, manage and respond to all incoming pricing queries in real time</p>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '14px 20px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            className="form-input"
            placeholder="Search ID, customer, origin, destination..."
            value={search}
            onChange={(e) => {setSearch(e.target.value);setPage(1);}}
            style={{ paddingLeft: 30, width: '100%', fontSize: 12 }} />
          
        </div>
        <select className="form-input" style={{ fontSize: 12 }} value={filterOrigin} onChange={(e) => {setFilterOrigin(e.target.value);setPage(1);}}>
          <option value="">All Origins</option>
          {origins.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <select className="form-input" style={{ fontSize: 12 }} value={filterEmployee} onChange={(e) => {setFilterEmployee(e.target.value);setPage(1);}}>
          <option value="">All Employees</option>
          {employees.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <button className="btn-secondary" style={{ fontSize: 12, gap: 5 }}>
          <Filter size={13} /> Filters
        </button>
        <button className="btn-secondary" style={{ fontSize: 12, gap: 5 }}>
          <Download size={13} /> Export
        </button>
        <button className="btn-secondary" style={{ fontSize: 12, gap: 5 }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '12px 16px', borderBottom: '2px solid #f1f5f9', flexWrap: 'wrap', background: '#fafbfc' }}>
          {tabCounts.map((tab) =>
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {setActiveTab(tab.id);setPage(1);}}>
            
              {tab.label}
              <span style={{
              marginLeft: 6, fontSize: 10, fontWeight: 700,
              background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
              color: activeTab === tab.id ? 'white' : '#64748b',
              padding: '1px 6px', borderRadius: 10
            }}>
                {tab.count}
              </span>
            </button>
          )}
          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
            {filtered.length} records found
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                {[
                ['id', 'Query ID'],
                ['receivedAt', 'Received At'],
                ['customer', 'Customer'],
                ['origin', 'Origin'],
                ['destination', 'Destination'],
                ['shipmentType', 'Shipment'],
                ['container', 'Container'],
                ['weight', 'Weight'],
                ['assignedTo', 'Assigned To'],
                ['status', 'Status'],
                ['ageMinutes', 'Age'],
                [null, 'SLA'],
                [null, 'Action']].
                map(([key, label]) =>
                <th key={label} style={{ cursor: key ? 'pointer' : 'default' }} onClick={() => key && handleSort(key)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {label}
                      {key && <SortIcon k={key} />}
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ?
              <tr><td colSpan={13} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No records found</td></tr> :
              paginated.map((query) => {
                const slaColor = getSLAColor(query.ageMinutes, query.slaMinutes);
                const rowClass = query.status === 'SLA Breached' ? 'sla-breached' : query.ageMinutes / query.slaMinutes >= 0.8 ? 'sla-warning' : '';
                return (
                  <tr
                    key={query.id}
                    className={rowClass}
                    onClick={() => setSelectedQuery(query)}
                    style={{ cursor: 'pointer' }}>
                    
                    <td>
                      <span style={{ fontWeight: 700, color: '#1565c0', fontSize: 13 }}>{query.id}</span>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      <div style={{ fontWeight: 600 }}>{formatTime(query.receivedAt)}</div>
                      <div style={{ color: '#94a3b8', fontSize: 11 }}>10 Sep 2026</div>
                    </td>
                    <td style={{ fontWeight: 500, fontSize: 13, maxWidth: 160 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{query.customer}</div>
                    </td>
                    <td style={{ fontSize: 12, color: '#475569' }}>{query.origin}</td>
                    <td style={{ fontSize: 12, color: '#475569' }}>{query.destination}</td>
                    <td>
                      <span style={{ fontSize: 12, fontWeight: 700, color: query.shipmentType === 'FCL' ? '#1565c0' : '#0288d1', background: query.shipmentType === 'FCL' ? '#e3f2fd' : '#e1f5fe', padding: '2px 8px', borderRadius: 6 }}>
                        {query.shipmentType}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: '#475569' }}>{query.container}</td>
                    <td style={{ fontSize: 12, color: '#475569' }}>{query.weight}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>
                          {query.assignedTo[0]}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{query.assignedTo}</span>
                      </div>
                    </td>
                    <td><StatusBadge status={query.status} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} color={slaColor} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: slaColor }}>{formatAge(query.ageMinutes)}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontSize: 11, color: slaColor, fontWeight: 600 }}>{getSLALabel(query.ageMinutes, query.slaMinutes)}</div>
                        <div style={{ height: 4, borderRadius: 2, background: '#e2e8f0', marginTop: 4, width: 80 }}>
                          <div style={{ height: '100%', borderRadius: 2, background: slaColor, width: `${Math.min(100, query.ageMinutes / query.slaMinutes * 100)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn-secondary"
                        style={{ fontSize: 11, padding: '4px 10px' }}
                        onClick={(e) => {e.stopPropagation();setSelectedQuery(query);}}>
                        
                        View
                      </button>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc' }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>
            Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              className="btn-secondary"
              style={{ padding: '5px 12px', fontSize: 12 }}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}>
              
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) =>
            <button
              key={i + 1}
              style={{
                width: 32, height: 32, borderRadius: 6, border: '1px solid',
                fontSize: 12, cursor: 'pointer', fontWeight: page === i + 1 ? 700 : 400,
                background: page === i + 1 ? '#0a1628' : 'white',
                color: page === i + 1 ? 'white' : '#475569',
                borderColor: page === i + 1 ? '#0a1628' : '#e2e8f0'
              }}
              onClick={() => setPage(i + 1)}>
              
                {i + 1}
              </button>
            )}
            <button
              className="btn-secondary"
              style={{ padding: '5px 12px', fontSize: 12 }}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}>
              
              Next →
            </button>
          </div>
        </div>
      </div>

      {selectedQuery &&
      <QueryDetail query={selectedQuery} onClose={() => setSelectedQuery(null)} />
      }
    </div>);

};