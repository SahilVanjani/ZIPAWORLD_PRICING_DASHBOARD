import React, { useState } from 'react';
import { X, Clock, MapPin, Package, CheckCircle, TrendingDown, DollarSign } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { airRates } from '../data/airRates';

export const AirQueryDetail = ({ query, onClose }) => {
  const [currency, setCurrency] = useState('USD');
  
  // Filter mock rates that somewhat match the route (or just show all for demo)
  const availableRates = airRates.filter(r => r.origin === query.origin || r.destination === query.destination).slice(0, 4);
  if (availableRates.length === 0) {
    availableRates.push(...airRates.slice(0, 3)); // Fallback for demo
  }

  // Calculate actual costs
  const calculateTotal = (rate, cw) => {
    let baseFreight = 0;
    if (cw >= 1000 && rate.p1000) baseFreight = rate.p1000 * cw;
    else if (cw >= 500 && rate.p500) baseFreight = rate.p500 * cw;
    else if (cw >= 300 && rate.p300) baseFreight = rate.p300 * cw;
    else if (cw >= 100 && rate.p100) baseFreight = rate.p100 * cw;
    else if (cw >= 45 && rate.p45) baseFreight = rate.p45 * cw;
    else baseFreight = Math.max(rate.m, rate.n * cw);

    const fuel = rate.fuel * cw;
    const security = rate.security * cw;
    const total = baseFreight + fuel + security + rate.handling + rate.awb;
    return { baseFreight, fuel, security, total };
  };

  const sortedRates = [...availableRates].sort((a, b) => calculateTotal(a, query.chargeableWeight).total - calculateTotal(b, query.chargeableWeight).total);
  const bestRate = sortedRates[0];
  const bestTotal = bestRate ? calculateTotal(bestRate, query.chargeableWeight).total : 0;

  // Weight Break Opportunity
  const getOpportunity = (rate, cw) => {
    if (!rate) return null;
    let nextBreak = null;
    let currentRate = 0;
    if (cw < 45 && rate.p45) { nextBreak = { weight: 45, rate: rate.p45 }; currentRate = rate.n; }
    else if (cw < 100 && rate.p100) { nextBreak = { weight: 100, rate: rate.p100 }; currentRate = rate.p45 || rate.n; }
    else if (cw < 300 && rate.p300) { nextBreak = { weight: 300, rate: rate.p300 }; currentRate = rate.p100; }
    else if (cw < 500 && rate.p500) { nextBreak = { weight: 500, rate: rate.p500 }; currentRate = rate.p300; }
    else if (cw < 1000 && rate.p1000) { nextBreak = { weight: 1000, rate: rate.p1000 }; currentRate = rate.p500; }

    if (nextBreak) {
      const currentCost = cw * currentRate;
      const nextCost = nextBreak.weight * nextBreak.rate;
      if (nextCost < currentCost) {
        return { currentCost, nextCost, savings: currentCost - nextCost, nextBreak };
      }
    }
    return null;
  };

  const opportunity = getOpportunity(bestRate, query.chargeableWeight);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300, display: 'flex', justifyContent: 'flex-end' }}>
      <div 
        style={{ width: '80%', maxWidth: '1100px', background: '#f8fafc', height: '100%', overflowY: 'auto', boxShadow: '-10px 0 30px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}
        className="animate-slideIn"
      >
        {/* Header */}
        <div style={{ padding: '20px 30px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a1628' }}>{query.id}</h2>
              <StatusBadge status={query.status} />
              <span style={{ background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: 11, fontWeight: 700 }}>AIR {query.type.toUpperCase()}</span>
            </div>
            <div style={{ fontSize: 13, color: '#64748b' }}>{query.customer} • Assigned to: {query.assignedTo}</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#f1f5f9', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={18} color="#64748b" />
          </button>
        </div>

        <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Shipment & Weight Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> Routing</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#0a1628' }}>{query.origin}</div>
                </div>
                <div style={{ flex: 1, borderTop: '2px dashed #cbd5e1', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 8px', color: '#1565c0', fontSize: 12, fontWeight: 700 }}>✈</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#0a1628' }}>{query.destination}</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Package size={14} /> Cargo Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Commodity</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{query.commodity}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Pieces</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{query.pieces} PKG</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Dimensions</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{query.dimensions}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Service</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{query.service}</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '20px', border: '2px solid #e0f2fe', background: '#f0f9ff' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#0288d1', textTransform: 'uppercase', marginBottom: 12 }}>Chargeable Weight Calculation</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#475569' }}>Gross Weight</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{query.grossWeight} KG</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#475569' }}>Volumetric Weight</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{query.volumetricWeight.toFixed(1)} KG</span>
              </div>
              <div style={{ borderTop: '1px solid #bae6fd', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#0288d1' }}>Chargeable</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: '#0288d1' }}>{query.chargeableWeight.toFixed(1)} KG</span>
              </div>
              <div style={{ fontSize: 10, color: '#0ea5e9', marginTop: 4, textAlign: 'right' }}>Governing: {query.grossWeight > query.volumetricWeight ? 'ACTUAL' : 'VOLUMETRIC'}</div>
            </div>
          </div>

          {/* Analysis & Optimization */}
          {opportunity && (
            <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: '#22c55e', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown size={20} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#166534', marginBottom: 2 }}>Weight Break Opportunity!</h4>
                <p style={{ fontSize: 13, color: '#15803d' }}>
                  Bumping weight to the next slab (+{opportunity.nextBreak.weight} KG at ${opportunity.nextBreak.rate}/kg) is cheaper than the current cost based on actual chargeable weight.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#15803d' }}>Potential Savings</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#16a34a' }}>${opportunity.savings.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Available Rates Comparison */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>Available Airline Rates & Comparison</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <select className="form-input" value={currency} onChange={e => setCurrency(e.target.value)} style={{ padding: '4px 10px', fontSize: 12 }}>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', minWidth: '1200px', fontSize: 12 }}>
                <thead>
                  <tr>
                    <th>Airline</th>
                    <th>Route</th>
                    <th>M</th>
                    <th>N</th>
                    <th>+45</th>
                    <th>+100</th>
                    <th>+300</th>
                    <th>+500</th>
                    <th>+1000</th>
                    <th style={{ background: '#f8fafc' }}>Base Freight</th>
                    <th style={{ background: '#f8fafc' }}>Surcharges (F/S/H/A)</th>
                    <th style={{ background: '#eef2ff', color: '#3730a3' }}>Est. All-In Total</th>
                    <th>Validity</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRates.map((r, i) => {
                    const costs = calculateTotal(r, query.chargeableWeight);
                    const isBest = i === 0;
                    return (
                      <tr key={r.id} style={{ background: isBest ? '#f0fdf4' : 'transparent' }}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0a1628', display: 'flex', alignItems: 'center', gap: 6 }}>
                            {r.airline} {isBest && <span style={{ background: '#22c55e', color: 'white', fontSize: 9, padding: '2px 6px', borderRadius: 4 }}>BEST VALUE</span>}
                          </div>
                        </td>
                        <td style={{ color: '#64748b', fontWeight: 600 }}>{r.origin}-{r.destination}</td>
                        <td>{r.m}</td>
                        <td style={{ fontWeight: query.chargeableWeight < 45 ? 700 : 400 }}>{r.n}</td>
                        <td style={{ fontWeight: query.chargeableWeight >= 45 && query.chargeableWeight < 100 ? 700 : 400 }}>{r.p45 || '-'}</td>
                        <td style={{ fontWeight: query.chargeableWeight >= 100 && query.chargeableWeight < 300 ? 700 : 400 }}>{r.p100 || '-'}</td>
                        <td style={{ fontWeight: query.chargeableWeight >= 300 && query.chargeableWeight < 500 ? 700 : 400 }}>{r.p300 || '-'}</td>
                        <td style={{ fontWeight: query.chargeableWeight >= 500 && query.chargeableWeight < 1000 ? 700 : 400 }}>{r.p500 || '-'}</td>
                        <td style={{ fontWeight: query.chargeableWeight >= 1000 ? 700 : 400 }}>{r.p1000 || '-'}</td>
                        <td style={{ background: '#f8fafc', fontWeight: 600 }}>{costs.baseFreight.toFixed(2)}</td>
                        <td style={{ background: '#f8fafc', color: '#64748b' }}>
                          <div style={{ fontSize: 10 }}>F: {costs.fuel.toFixed(2)}</div>
                          <div style={{ fontSize: 10 }}>S: {costs.security.toFixed(2)}</div>
                          <div style={{ fontSize: 10 }}>H: {r.handling.toFixed(2)} | A: {r.awb.toFixed(2)}</div>
                        </td>
                        <td style={{ background: isBest ? '#dcfce7' : '#eef2ff', fontWeight: 900, color: isBest ? '#166534' : '#3730a3', fontSize: 14 }}>
                          {currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}
                          {(costs.total * (currency === 'INR' ? 83 : currency === 'EUR' ? 0.92 : 1)).toFixed(2)}
                        </td>
                        <td>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: r.status === 'ACTIVE' ? '#dcfce7' : r.status === 'EXPIRING SOON' ? '#fef3c7' : '#fee2e2', color: r.status === 'ACTIVE' ? '#166534' : r.status === 'EXPIRING SOON' ? '#92400e' : '#991b1b' }}>
                            {r.validUntil}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '12px 20px', background: '#f8fafc', fontSize: 11, color: '#64748b', borderTop: '1px solid #e2e8f0' }}>
              * Estimated All-In Total includes Base Freight based on chargeable weight, plus Fuel, Security, Handling, and AWB surcharges. This is a DEMO calculation.
            </div>
          </div>

          {/* Timeline */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#0a1628', marginBottom: 16 }}>Query Timeline</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {[
                { label: 'Received', active: true, time: query.receivedAt },
                { label: 'Entered in System', active: true, time: '2 mins later' },
                { label: 'Pricing Started', active: query.status !== 'Pending', time: '10 mins later' },
                { label: 'Rates Available', active: ['Rate Available', 'Quoted', 'Confirmed', 'Closed'].includes(query.status), time: '15 mins later' },
                { label: 'Quoted to Customer', active: ['Quoted', 'Confirmed', 'Closed'].includes(query.status), time: '35 mins later' },
                { label: 'Confirmed', active: ['Confirmed', 'Closed'].includes(query.status), time: 'Pending' }
              ].map((step, i, arr) => (
                <React.Fragment key={step.label}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 100 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: step.active ? '#1565c0' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {step.active && <CheckCircle size={14} color="white" />}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: step.active ? '#0a1628' : '#94a3b8', textAlign: 'center' }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{step.active ? (typeof step.time === 'string' && step.time.includes('Z') ? new Date(step.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : step.time) : '-'}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: step.active ? '#1565c0' : '#e2e8f0', marginTop: -32 }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
