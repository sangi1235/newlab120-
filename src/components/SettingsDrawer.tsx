import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Sun, Moon, Type, Volume2, Shield } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, fontScale, setFontScale } = useApp();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9990,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(24, 17, 19, 0.4)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-color)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            App Settings
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)',
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Settings Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', flexGrow: 1, overflowY: 'auto' }}>
          
          {/* Theme Section */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={18} /> Visual Mode
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setTheme('light')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: theme === 'light' ? 'var(--primary-light)' : 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Sun size={18} /> Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: theme === 'dark' ? 'var(--primary-light)' : 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Moon size={18} /> Dark
              </button>
            </div>
          </div>

          {/* Accessibility Font Size Section */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Type size={18} /> Text Size (Accessibility)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Default</span>
                <span>Extra Large</span>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.3"
                step="0.15"
                value={fontScale}
                onChange={(e) => setFontScale(parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                {[0.85, 1.0, 1.15, 1.3].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setFontScale(scale)}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      border: fontScale === scale ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      background: fontScale === scale ? 'var(--primary-light)' : 'transparent',
                      color: 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {scale * 100}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications config */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={18} /> Notifications
            </h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
              <span>Enable Toast Notifications</span>
            </label>
          </div>

          {/* Privacy info */}
          <div style={{ marginTop: 'auto', padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Shield size={14} /> Offline Mode Active
            </h5>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Ethereal Elegance utilizes local storage. Your shopping cart, wishlist, settings, and custom attire requests are securely cached on this browser.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
