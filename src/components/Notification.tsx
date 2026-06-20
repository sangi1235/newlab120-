import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      {notifications.map((n) => {
        let Icon = Info;
        let color = '#d49a6a';
        let bg = 'var(--bg-surface)';

        if (n.type === 'success') {
          Icon = CheckCircle;
          color = '#2e7d32';
        } else if (n.type === 'error') {
          Icon = AlertCircle;
          color = '#d32f2f';
        }

        return (
          <div
            key={n.id}
            className="animate-slide-up"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: bg,
              boxShadow: 'var(--shadow-lg)',
              borderLeft: `5px solid ${color}`,
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              pointerEvents: 'auto',
              color: 'var(--text-main)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={20} color={color} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>
                {n.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-muted)'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const Notification = NotificationContainer;
