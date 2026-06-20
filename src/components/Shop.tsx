import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products, Product } from '../data/products';
import { Star, Heart, ShoppingCart, Filter, RotateCcw, X, Check } from 'lucide-react';

export const Shop: React.FC = () => {
  const { filters, setFilters, resetFilters, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedProductOptions, setSelectedProductOptions] = useState<string | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');
  const [chosenColor, setChosenColor] = useState<string>('');

  // Extract unique filter options
  const categories = ['All', 'Bridal', 'Groom', 'Guests', 'Accessories'];
  const silhouettes = ['All', 'A-Line', 'Ballgown', 'Slim-Fit', 'Empire', 'Tailored', 'Drape'];
  const colors = ['All', 'Ivory', 'Crimson', 'Charcoal', 'Blush', 'Cream', 'Emerald'];
  const themes = ['All', 'Romantic', 'Traditional', 'Modern', 'Bohemian', 'Fusion'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', '4', '6', '8', '10', '12', '38R', '40R', '42R', '44R', 'One Size'];

  // Filter products logic
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    // Category filter
    if (filters.category !== 'All' && product.category !== filters.category) {
      return false;
    }
    // Silhouette filter
    if (filters.silhouette !== 'All' && product.silhouette !== filters.silhouette) {
      return false;
    }
    // Color filter
    if (filters.color !== 'All' && product.color !== filters.color) {
      return false;
    }
    // Theme filter
    if (filters.theme !== 'All' && product.theme !== filters.theme) {
      return false;
    }
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    // Size filter
    if (filters.size !== 'All' && !product.size.includes(filters.size)) {
      return false;
    }
    return true;
  });

  const handleOpenOptions = (product: Product) => {
    setSelectedProductOptions(product.id);
    setChosenSize(product.size[0]);
    setChosenColor(product.color); // use product base color
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, chosenSize, chosenColor, 1);
    setSelectedProductOptions(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', animation: 'fadeIn var(--transition-smooth)' }}>
      {/* Page Title */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Wedding Collection</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore and filter premium attire designed for 2025.</p>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexDirection: 'row' }} className="shop-layout">
        
        {/* Filter Sidebar (Desktop) */}
        <aside 
          className="glass-card shop-sidebar"
          style={{
            width: '280px',
            flexShrink: 0,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: 'fit-content',
            position: 'sticky',
            top: '110px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> Filters
            </h3>
            <button 
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Search Query info */}
          {filters.searchQuery && (
            <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Searching: "{filters.searchQuery}"</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Category Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="form-select"
              style={{ fontSize: '0.9rem' }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Silhouette Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Silhouette</label>
            <select
              value={filters.silhouette}
              onChange={(e) => setFilters((prev) => ({ ...prev, silhouette: e.target.value }))}
              className="form-select"
              style={{ fontSize: '0.9rem' }}
            >
              {silhouettes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Color Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Color</label>
            <select
              value={filters.color}
              onChange={(e) => setFilters((prev) => ({ ...prev, color: e.target.value }))}
              className="form-select"
              style={{ fontSize: '0.9rem' }}
            >
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Theme Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Wedding Theme</label>
            <select
              value={filters.theme}
              onChange={(e) => setFilters((prev) => ({ ...prev, theme: e.target.value }))}
              className="form-select"
              style={{ fontSize: '0.9rem' }}
            >
              {themes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Size Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Attire Size</label>
            <select
              value={filters.size}
              onChange={(e) => setFilters((prev) => ({ ...prev, size: e.target.value }))}
              className="form-select"
              style={{ fontSize: '0.9rem' }}
            >
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              <span>Max Price</span>
              <span style={{ color: 'var(--primary-dark)' }}>${filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], val] }));
              }}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer', width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>$200</span>
              <span>$2000</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Grid Header Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing {filteredProducts.length} premium products
            </span>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div 
              className="glass-card"
              style={{ 
                padding: '60px 40px', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '16px',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem' }}>No products match your filters</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px' }}>
                Try relaxing your search options, expanding the price slider, or resetting all filters.
              </p>
              <button onClick={resetFilters} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                Reset Filters
              </button>
            </div>
          )}

          {/* Grid Layout */}
          <div className="product-grid" style={{ margin: 0 }}>
            {filteredProducts.map((product) => {
              const favorited = isInWishlist(product.id);
              const showingOptions = selectedProductOptions === product.id;

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
                  {/* Category & Save Overlay */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', zIndex: 5, pointerEvents: 'none' }}>
                    <span 
                      className="badge badge-new" 
                      style={{ 
                        boxShadow: 'var(--shadow-sm)', 
                        pointerEvents: 'auto',
                        padding: '4px 10px',
                        fontSize: '0.7rem' 
                      }}
                    >
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
                        pointerEvents: 'auto',
                        boxShadow: 'var(--shadow-sm)',
                        color: favorited ? 'var(--primary)' : 'var(--text-muted)'
                      }}
                      title="Save to Wishlist"
                    >
                      <Heart size={16} fill={favorited ? 'var(--primary)' : 'none'} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--border-color)', position: 'relative' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      className="prod-img"
                    />
                  </div>

                  {/* Product Details */}
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

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '3.6em' }}>
                      {product.description}
                    </p>

                    {/* Metadata tags */}
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

                      {!showingOptions ? (
                        <button
                          onClick={() => handleOpenOptions(product)}
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
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => setSelectedProductOptions(null)}
                            style={{
                              background: 'var(--border-color)',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              color: 'var(--text-main)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Cancel"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick Selection Drawer */}
                    {showingOptions && (
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
                        {/* Size Picker */}
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

                        {/* Color selection summary (can extend later) */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span>Color: <strong>{chosenColor}</strong></span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
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
                          <Check size={14} /> Confirm & Add
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Media query styling overrides embedded */}
      <style>{`
        @media (max-width: 900px) {
          .shop-layout {
            flex-direction: column !important;
          }
          .shop-sidebar {
            width: 100% !important;
            position: relative !important;
            top: 0 !important;
          }
        }
        .glass-card:hover .prod-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
};
