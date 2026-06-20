import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Scissors, Heart, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { setActivePage, setFilters } = useApp();

  const handleCollectionClick = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    setActivePage('shop');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', animation: 'fadeIn var(--transition-smooth)' }}>
      {/* Hero Section */}
      <section 
        className="glass-card"
        style={{
          position: 'relative',
          padding: '100px 40px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(253, 242, 244, 0.7) 0%, rgba(255, 255, 255, 0.8) 100%)',
          border: '1px solid var(--primary-light)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '30px',
          overflow: 'hidden'
        }}
      >
        {/* Glow Effects */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-30%',
          width: '80%',
          height: '100%',
          borderRadius: 'var(--radius-full)',
          background: 'radial-gradient(circle, rgba(249, 184, 200, 0.15) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50%',
          right: '-30%',
          width: '80%',
          height: '100%',
          borderRadius: 'var(--radius-full)',
          background: 'radial-gradient(circle, rgba(212, 154, 106, 0.1) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'var(--primary-light)', 
            color: 'var(--primary-dark)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            <Sparkles size={14} /> The 2025 Wedding Attire Collection
          </div>

          <h1 style={{ fontSize: '3.2rem', maxWidth: '800px', lineHeight: 1.1, margin: '10px 0' }}>
            Ethereal Elegance For Your <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Eternal Day</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
            Explore bespoke bridal gowns, tailor-made groom suits, and custom bridal party attire. Virtually try on designs and submit detailed measurements for master tailoring.
          </p>
        </div>

        <div style={{ zIndex: 1, display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => { setFilters(prev => ({ ...prev, category: 'All' })); setActivePage('shop'); }}
            className="btn btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Explore Collection <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setActivePage('tryon')}
            className="btn btn-outline"
            style={{ padding: '14px 28px', fontSize: '1rem', border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            Virtual Try-On Studio
          </button>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Curated Collections</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
            Handcrafted pieces designed for elegance, distinction, and premium comfort throughout your celebration.
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '30px' 
          }}
        >
          {/* Bridal Card */}
          <div 
            onClick={() => handleCollectionClick('Bridal')}
            className="glass-card"
            style={{ 
              height: '420px', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '30px'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuA9ynyuOQKZz86yg3wwuy6PRyiXJp1PitM3Fqw2MaSKtH7cuThjJ7rALfXNkVVQfJJ-hzMWq8GUIKqypWNGzOFZZDgfm0TWds1UAZ-MxOOj0vap9TCFdbzzs-1t67xF89l6L8G3_HoRhHn9TdCSb_7LJYMyTs1NpfDZ4hVOoNakEwluc7qVoqStyfAyh1BSG33V7rqIxkoCswTgNNOnYoPfqVrFve9yCFB8nJJGZUf5q0gpRZWyUBIORDCUJ0AzCtSZcoeLVEePQ_t0)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                zIndex: 0
              }}
              className="card-bg"
            />
            {/* Dark Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(24, 17, 19, 0.8) 0%, rgba(24, 17, 19, 0.2) 60%, transparent 100%)',
              zIndex: 1
            }} />
            
            <div style={{ zIndex: 2, color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--primary)' }}>Bridal Attire</span>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff' }}>Ethereal Bridal Gowns</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                Lace detailing, flowing silk organza, and custom silhouettes crafted for your walk down the aisle.
              </p>
            </div>
          </div>

          {/* Groom Card */}
          <div 
            onClick={() => handleCollectionClick('Groom')}
            className="glass-card"
            style={{ 
              height: '420px', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '30px'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBrz-C4Ml1LzgxkmNncBfmxxTCRO0ZKrHHbKS9t8e6FGd0owIdosUvoJAdSwvpygeymfvF32Mb4WHGKTstBz0jEAdO0AxHPfxohS6J58mgjjjfui5Y_t4bVquY14RVU9hzv-2PN7f_L3AMdMG9mCm44vfa1nPkV0hGJCqZONz5rz1BnUOZuZY51ldEVAHdMBhukslnqvn7zHrtcm7LOy9D1hWBR-_wUsK1HNtn1I0xqPZKE_jKWdN4Ul9PPwaT19EolzUZA8DQsg8QD)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                zIndex: 0
              }}
              className="card-bg"
            />
            {/* Dark Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(24, 17, 19, 0.8) 0%, rgba(24, 17, 19, 0.2) 60%, transparent 100%)',
              zIndex: 1
            }} />
            
            <div style={{ zIndex: 2, color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)' }}>Groom Attire</span>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff' }}>Sharp Tailored Suits</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                Slim-fit designs, Italian merino wool blend suits, and custom silk linings for the sophisticated groom.
              </p>
            </div>
          </div>

          {/* Guest Card */}
          <div 
            onClick={() => handleCollectionClick('Guests')}
            className="glass-card"
            style={{ 
              height: '420px', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '30px'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuD_qHvmuKwSs2rrz_tcj6XtSQtXIfGAVDBUcmcXlMu_Znz5xtRBUavzdbURW0odoh__byNkDYsgFCibJToPi-vd_5wXpsqx3qs8dI-1Lu8csHPkIUpV4IXC8maHWO0-RorrQu6cAAuhzvVC_D-ivyY7Zmi6CUqDGKyGVa2dOysgyn81RfXetti16MNQSOBDLvK7wdNDsbIkFYC-CLLI97grXXmcQLGp54uIQeZyrc1wmBC7qocwlI6SuYow5_AZyt-Dy1DyW7AEt8h0)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                zIndex: 0
              }}
              className="card-bg"
            />
            {/* Dark Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(24, 17, 19, 0.8) 0%, rgba(24, 17, 19, 0.2) 60%, transparent 100%)',
              zIndex: 1
            }} />
            
            <div style={{ zIndex: 2, color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--primary)' }}>Guest & Bridal Party</span>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff' }}>Elegant Guest Collection</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                Empire waisted blushing gowns, metallic belted fusion saris, and contemporary looks for special attendees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Interactive Wedding Studio</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
            We've revolutionized wedding attire selection by blending digital try-on utility with luxury tailoring.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          
          {/* Feature 1 */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Virtual Try-On Room</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Upload your photo or select our high-fashion models to visualize gown and suit overlays. Adjust scale, position, and rotation dynamically to find your perfect style match.
            </p>
            <button 
              onClick={() => setActivePage('tryon')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}
            >
              Open Studio <ArrowRight size={14} />
            </button>
          </div>

          {/* Feature 2 */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
              <Scissors size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Custom Alterations</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Provide your bust, waist, hips, and height measurements directly on our bespoke intake form. Choose fabrics like fine silk, brocade, and French lace to get quotes from our design house.
            </p>
            <button 
              onClick={() => setActivePage('contact')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}
            >
              Submit Request <ArrowRight size={14} />
            </button>
          </div>

          {/* Feature 3 */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '12px', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Ethereal Lookbook</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Save outfits you love to your personal wishlist, compare bridal party matches, and customize details. Toggle visual mode configurations to match your viewing preferences.
            </p>
            <button 
              onClick={() => setActivePage('wishlist')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}
            >
              View Wishlist <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* Lookbook Quote Section */}
      <section 
        style={{
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '60px 20px',
          textAlign: 'center',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          fontStyle: 'italic',
          color: 'var(--text-light)',
          lineHeight: 1.4,
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        "A wedding dress is both an intimate and personal fabric that captures a moment in time, sealing the beauty of a new beginning forever."
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontStyle: 'normal', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '16px' }}>
          — Ethereal Atelier Lead Designer
        </div>
      </section>

      {/* Styled JSX Hover Animations */}
      <style>{`
        .glass-card:hover .card-bg {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
