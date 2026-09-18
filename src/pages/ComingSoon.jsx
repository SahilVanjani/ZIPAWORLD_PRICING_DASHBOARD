import React from 'react';
import { Package, Truck, Globe } from 'lucide-react';

export const ComingSoon = ({ mode }) => {
  const modeData = {
    COURIER: { icon: Package, title: 'Courier Module', desc: 'Global parcel and document express rates.' },
    ROAD: { icon: Truck, title: 'Road Transport', desc: 'FTL and LTL domestic road freight pricing.' },
    OTHERS: { icon: Globe, title: 'Other Services', desc: 'Customs, warehousing, and additional logistics services.' }
  };

  const data = modeData[mode] || modeData.OTHERS;
  const Icon = data.icon;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#0a1628' }}>
      <div style={{ background: '#f1f5f9', padding: '40px', borderRadius: '50%', marginBottom: '24px' }}>
        <Icon size={64} color="#94a3b8" />
      </div>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: '12px' }}>{data.title} Coming Soon</h2>
      <p style={{ color: '#64748b', fontSize: 16, textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
        The {data.title.toLowerCase()} is currently under development. Stay tuned for real-time {data.desc.toLowerCase()}
      </p>
      
      <div style={{ marginTop: '40px', padding: '16px 24px', background: '#e3f2fd', color: '#1565c0', borderRadius: '12px', fontWeight: 600, border: '1px solid #bfdbfe' }}>
        Currently available modules: Air Freight, Ocean Freight
      </div>
    </div>
  );
};
