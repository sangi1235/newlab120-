import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../data/products';
import { Heart, ShoppingCart, Star, X, Check, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setActivePage 
  } = useApp();

  const [quickAddProductId, setQuickAddProductId] = useState<string | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');
  const [chosenColor, setChosenColor] = useState<string>('');

  const handleOpenQuickAdd = (product: Product) => {
    setQuickAddProductId(product.id);
    setChosenSize(product.size[0]);
    setChosenColor(product.color);
  };

  const handleQuickAddConfirm = (product: Product) => {
    addToCart(product, chosenSize, chosenColor, 1);
    setQuickAddProductId(null);
  };

  // Empty State
  if (wishlist.length === 0) {
    return (
      <div 
        className="glass-card animate-fade-in"
        style={{ 
          padding: '80px 40px', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '20px',
          maxWidth: '600px',
          margin: '40px auto',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ color: 'var(--primary-dark)', background: 'var(--primary-light)', padding: '20px', borderRadius: '50%', display: 'inline-flex' }}>
          <Heart size={48} fill="var(--primary)" color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Your Wishlist Lookbook is Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.5 }}>
          Create your dream wedding ensemble by saving products to your wishlist as you explore.
        </p>
        <button 
          onClick={() => setActivePage('shop')} 
          className="btn btn-primary"
          style={{ padding: '12px 28px', marginTop: '10px' }}
        >
          Explore Collection <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', animation: 'fadeIn var(--transition-smooth)' }}>
      {/* Title */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Saved Lookbook</h1>
        <p style={{ color: 'var(--text-muted)' }}>Your curated list of ethereal bridal gowns, suits, and luxury accessories.</p>
      </div>

      {/* Grid of Saved Items */}
      <div className="product-grid" style={{ margin: 0 }}>
        {wishlist.map((product) => {
          const isQuickAdding = quickAddProductId === product.id;

          return (
            <div 
              key={product.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {/* Category & Remove Button overlays */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', zIndex: 5 }}>
                <span className="badge badge-new" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>
                  {product.category}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    padding: '6px',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    display: 'flex',
                    boxShadow: 'var(--shadow-sm)',
                    color: 'var(--primary)'
                  }}
                  title="Remove from Wishlist"
                >
                  <Heart size={16} fill="var(--primary)" />
                </button>
              </div>

              {/* Product Image */}
              <div 
                onClick={() => { setActivePage('shop'); }}
                style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--border-color)', position: 'relative', cursor: 'pointer' }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  className="wish-img"
                />
              </div>

              {/* Details card */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    {product.name}
                  </h4>
                  
                  {/* Rating Block */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', color: 'var(--accent)' }}>
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span>{product.rating} ({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Attributes summaries */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                    {product.silhouette}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--border-color)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                    {product.color}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--border-color)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                    {product.theme}
                  </span>
                </div>

                {/* Pricing and Action row */}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    ${product.price}
                  </span>

                  {!isQuickAdding ? (
                    <button
                      onClick={() => handleOpenQuickAdd(product)}
                      className="btn btn-outline"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuickAddProductId(null)}
                      style={{
                        background: 'var(--border-color)',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                        display: 'flex'
                      }}
                      title="Cancel"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Quick Selection Dropdown Overlay inside card */}
                {isQuickAdding && (
                  <div 
                    className="animate-slide-up"
                    style={{
                      background: 'var(--primary-light)',
                      border: '1px solid var(--primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginTop: '10px'
                    }}
                  >
                    {/* Size Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Select Size:</span>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {product.size.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setChosenSize(sz)}
                            style={{
                              padding: '4px 8px',
                              fontSize: '0.75rem',
                              border: chosenSize === sz ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)',
                              borderRadius: 'var(--radius-sm)',
                              background: chosenSize === sz ? 'var(--primary)' : 'var(--bg-surface)',
                              color: 'var(--text-main)',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>Color: <strong>{chosenColor}</strong></span>
                    </div>

                    <button
                      onClick={() => handleQuickAddConfirm(product)}
                      className="btn btn-primary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Check size={14} /> Add to Cart
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .glass-card:hover .wish-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
};

export default Wishlist;
