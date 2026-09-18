import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const AccessRestricted = ({ requiredModule, onReturn }) => {
  const { currentRole } = useRole();

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '40px', textAlign: 'center', background: '#fff', borderRadius: 12,
      margin: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <ShieldAlert size={40} color="#dc2626" />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0a1628', marginBottom: 12 }}>Access Restricted</h2>
      <p style={{ color: '#64748b', fontSize: 15, maxWidth: 400, marginBottom: 32 }}>
        Your current role does not have permission to access the <strong>{requiredModule}</strong> module.
      </p>
      
      <div style={{ background: '#f8fafc', padding: 20, borderRadius: 10, width: '100%', maxWidth: 400, marginBottom: 32, border: '1px solid #e2e8f0', textAlign: 'left' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Current Role</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0a1628' }}>{currentRole.user} — {currentRole.name}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Required Access</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#dc2626' }}>{requiredModule} Module</div>
        </div>
      </div>

      <button className="btn-primary" onClick={onReturn} style={{ padding: '10px 24px', fontSize: 14 }}>
        Return to Dashboard
      </button>
    </div>
  );
};
