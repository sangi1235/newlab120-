import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer
      className="glass-card glass-footer"
      style={{
        backgroundColor: 'var(--bg-glass)',
        borderTop: '1px solid var(--border-color)',
        padding: '60px 24px 30px',
        color: 'var(--text-main)',
        marginTop: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}
      >
        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Ethereal Elegance
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Crafting premium, bespoke, and trendsetting wedding attire for brides, grooms, and bridal parties. Bringing modern innovation to traditional luxury.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}><Instagram size={20} /></a>
            <a href="#" style={{ color: 'var(--text-muted)' }}><Facebook size={20} /></a>
            <a href="#" style={{ color: 'var(--text-muted)' }}><Twitter size={20} /></a>
          </div>
        </div>

        {/* Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
            Collections
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>
              <button 
                onClick={() => setActivePage('shop')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
              >
                Bridal Gowns
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('shop')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
              >
                Groom Suits & Tuxedos
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('shop')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
              >
                Wedding Guest Dresses
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('tryon')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
              >
                Interactive Virtual Try-On
              </button>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
            Customer Care
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>
              <button 
                onClick={() => setActivePage('contact')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}
              >
                Bespoke Alteration Requests
              </button>
            </li>
            <li><button onClick={() => setActivePage('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>Sizing Guide</button></li>
            <li><button onClick={() => setActivePage('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>Shipping &amp; Returns</button></li>
            <li><button onClick={() => setActivePage('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>Frequently Asked Questions</button></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
            Design Atelier
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} /> 452 Couture Boulevard, New York, NY
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} /> +1 (555) 896-1688
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} /> atelier@etherealelegance.com
            </li>
          </ul>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-color)', maxWidth: '1200px', margin: '0 auto 24px' }} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
      >
        <p>© 2025 Ethereal Elegance. All rights reserved.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Security & Privacy
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
