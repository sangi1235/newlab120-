import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Heart, Sparkles, Scissors, ShieldCheck, Mail, Users } from 'lucide-react';

export const About: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', animation: 'fadeIn var(--transition-smooth)' }}>
      {/* Hero Header */}
      <section 
        className="glass-card"
        style={{
          position: 'relative',
          padding: '80px 40px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(253, 242, 244, 0.7) 0%, rgba(255, 255, 255, 0.8) 100%)',
          border: '1px solid var(--primary-light)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '-20%',
          width: '70%',
          height: '90%',
          borderRadius: 'var(--radius-full)',
          background: 'radial-gradient(circle, rgba(249, 184, 200, 0.2) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: 'var(--text-light)',
            background: 'var(--primary-light)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)'
          }}>
            Our Story & Philosophy
          </span>
          <h1 style={{ fontSize: '3rem', lineHeight: 1.1, margin: '10px 0' }}>
            Ethereal <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Atelier</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '650px', lineHeight: 1.6 }}>
            Founded on the legacy of fine haute couture, Ethereal Atelier blends the timeless romance of classical tailoring with modern visualization to prepare you for your eternal day.
          </p>
        </div>
      </section>

      {/* Main Philosophy Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
            <Scissors size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Traditional Craftsmanship</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Every bridal gown and custom groom suit begins as a unique drawing. Our master drapers and pattern-makers translate dreams into fabrics, using premium French Chantilly laces, heavy silk crepes, and luxury Italian wools.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Digital Precision</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            We believe couture should be accessible. By incorporating cutting-edge try-on capabilities and precise measurement intakes, we ensure that whether you visit our showroom or order online, the fit is absolutely perfect.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
            <Heart size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Dedicated Care</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Planning a wedding can be complex. From initial discovery to final stitching, our concierge stylists support your choices, assist in coordinating bridal parties, and orchestrate fittings to minimize stress.
          </p>
        </div>
      </section>

      {/* Brand Values & Stats */}
      <section 
        className="glass-card"
        style={{ 
          padding: '50px 30px', 
          background: 'var(--bg-surface)', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Why Choose Ethereal Atelier</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Our dedication to excellence is reflected in our process and values.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '30px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ display: 'inline-flex', color: 'var(--accent)', marginBottom: '10px' }}><Award size={32} /></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>15+ Years</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '5px' }}>Bespoke Experience</p>
          </div>
          <div>
            <div style={{ display: 'inline-flex', color: 'var(--accent)', marginBottom: '10px' }}><ShieldCheck size={32} /></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>100% Fit</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '5px' }}>Garment Guarantee</p>
          </div>
          <div>
            <div style={{ display: 'inline-flex', color: 'var(--accent)', marginBottom: '10px' }}><Users size={32} /></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>10,000+</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '5px' }}>Happy Couples</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          Let Us Create Something Beautiful Together
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Explore our seasonal collection online, or schedule an styling consultation with our tailoring experts.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
          <button 
            onClick={() => setActivePage('shop')} 
            className="btn btn-primary"
            style={{ padding: '12px 24px' }}
          >
            Browse Collection
          </button>
          <button 
            onClick={() => setActivePage('contact')} 
            className="btn btn-outline"
            style={{ padding: '12px 24px', border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            <Mail size={16} /> Contact Stylists
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
