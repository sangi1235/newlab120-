import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SettingsDrawer } from './SettingsDrawer';
import { OnboardingTrigger } from './Onboarding';
import { 
  ShoppingBag, 
  Heart, 
  Settings, 
  Search, 
  Menu, 
  X, 
  Scissors
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    cart, 
    wishlist, 
    filters, 
    setFilters 
  } = useApp();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Collection' },
    { id: 'tryon', label: 'Virtual Try-On' },
    { id: 'contact', label: 'Custom Request' },
    { id: 'blog', label: 'Trends Blog' },
    { id: 'about', label: 'About Story' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    if (activePage !== 'shop') {
      setActivePage('shop');
    }
  };

  return (
    <>
      <header
        className="glass-panel glass-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo Branding */}
          <div 
            onClick={() => setActivePage('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer',
              color: 'var(--text-main)' 
            }}
          >
            <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
              <Scissors size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 800, margin: 0, lineHeight: 1 }}>
                Ethereal Elegance
              </h2>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
                Wedding Attire 2025
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none' }} className="md-flex-nav">
            <ul style={{ listStyle: 'none', display: 'flex', gap: '24px', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setActivePage(link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.9rem',
                      fontWeight: activePage === link.id ? 700 : 500,
                      color: activePage === link.id ? 'var(--primary-dark)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '8px 4px',
                      position: 'relative',
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    {link.label}
                    {activePage === link.id && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--primary)',
                          borderRadius: 'var(--radius-full)',
                          animation: 'fadeIn var(--transition-fast)'
                        }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Search Input Button */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              {showSearch ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', animation: 'scaleUp var(--transition-fast)' }}>
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search attire..."
                    autoFocus
                    style={{
                      padding: '6px 12px 6px 32px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--primary)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.85rem',
                      width: '180px',
                      color: 'var(--text-main)'
                    }}
                  />
                  <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
                  <button 
                    onClick={() => { setShowSearch(false); setFilters(prev => ({ ...prev, searchQuery: '' })); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    padding: '8px',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    color: 'var(--text-main)',
                    display: 'flex'
                  }}
                  title="Search products"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setActivePage('wishlist')}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                color: 'var(--text-main)',
                display: 'flex',
                position: 'relative'
              }}
              title="View Wishlist"
            >
              <Heart size={18} fill={wishlistItemsCount > 0 ? 'var(--primary)' : 'none'} color={wishlistItemsCount > 0 ? 'var(--primary)' : 'currentColor'} />
              {wishlistItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'var(--primary)',
                    color: 'var(--text-on-primary)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {wishlistItemsCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setActivePage('cart')}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                color: 'var(--text-main)',
                display: 'flex',
                position: 'relative'
              }}
              title="View Cart"
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'var(--accent)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Tour guide trigger */}
            <div style={{ display: 'none' }} className="md-flex">
              <OnboardingTrigger />
            </div>

            {/* Settings Toggler */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                color: 'var(--text-main)',
                display: 'flex'
              }}
              title="Settings"
            >
              <Settings size={18} />
            </button>

            {/* Mobile Menu Toggler */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                color: 'var(--text-main)',
                display: 'flex'
              }}
              className="md-hide-burger"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            zIndex: 998,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            animation: 'fadeIn var(--transition-fast)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: '0 30px 60px rgba(24, 17, 19, 0.12)'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: activePage === link.id ? 700 : 500,
                    color: activePage === link.id ? 'var(--primary-dark)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '8px 0',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <OnboardingTrigger />
            <div style={{ height: '1px', background: 'var(--border-color)' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              © 2025 Ethereal Elegance. Premium Wedding Attire.
            </p>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Responsive layout CSS hacks inserted dynamically */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex-nav { display: block !important; }
          .md-flex { display: inline-flex !important; }
          .md-hide-burger { display: none !important; }
        }
      `}</style>
    </>
  );
};
