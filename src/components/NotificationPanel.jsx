import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

const iconMap = {
  success: <CheckCircle size={16} color="#16a34a" />,
  warning: <AlertTriangle size={16} color="#f59e0b" />,
  alert: <AlertCircle size={16} color="#e8192c" />,
  info: <Info size={16} color="#1565c0" />
};





export const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <div className="notif-panel">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={16} color="#0a1628" />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#0a1628' }}>Notifications</span>
          {unread > 0 &&
          <span style={{ background: '#e8192c', color: 'white', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{unread}</span>
          }
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {unread > 0 &&
          <button onClick={markAllRead} style={{ fontSize: 11, color: '#1565c0', cursor: 'pointer', border: 'none', background: 'none', fontWeight: 600 }}>
              Mark all read
            </button>
          }
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2 }}>
            <X size={16} color="#64748b" />
          </button>
        </div>
      </div>
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.map((n) =>
        <div key={n.id} style={{
          padding: '12px 20px',
          borderBottom: '1px solid #f8fafc',
          background: n.read ? 'white' : '#f0f7ff',
          display: 'flex', gap: 10,
          cursor: 'pointer',
          transition: 'background 0.15s'
        }}
        onMouseEnter={(e) => {e.currentTarget.style.background = '#f8fafc';}}
        onMouseLeave={(e) => {e.currentTarget.style.background = n.read ? 'white' : '#f0f7ff';}}>
          
            <div style={{ flexShrink: 0, marginTop: 2 }}>{iconMap[n.type]}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.4, marginBottom: 4 }}>{n.message}</p>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{n.time}</span>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1565c0', flexShrink: 0, marginTop: 4 }} />}
          </div>
        )}
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
        <button style={{ fontSize: 12, color: '#1565c0', cursor: 'pointer', border: 'none', background: 'none', fontWeight: 600 }}>
          View all notifications
        </button>
      </div>
    </div>);

};