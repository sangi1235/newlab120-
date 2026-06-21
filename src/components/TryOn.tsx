import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { 
  Sparkles, 
  RotateCcw, 
  Upload, 
  Heart, 
  ShoppingCart, 
  ZoomIn, 
  ZoomOut, 
  Move,
  Plus,
  Minus
} from 'lucide-react';

export const TryOn: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, addNotification } = useApp();
  
  // States
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0].id);
  const [selectedModel, setSelectedModel] = useState<string>('/model_bridal.png');
  const [customImage, setCustomImage] = useState<string | null>(null);
  
  // Transform states
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [rotate, setRotate] = useState<number>(0);
  
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const [chosenSize, setChosenSize] = useState<string>(selectedProduct.size[0]);
  const [chosenColor, setChosenColor] = useState<string>(selectedProduct.color);
  
  // Drag states
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Color configuration map for premium SVG fabric sheens
  const colorMap: Record<string, { fill: string; stroke: string; glow: string }> = {
    Ivory: { fill: 'url(#grad-ivory)', stroke: '#e6ded4', glow: 'rgba(253, 245, 230, 0.4)' },
    Crimson: { fill: 'url(#grad-crimson)', stroke: '#900c3f', glow: 'rgba(220, 20, 60, 0.4)' },
    Charcoal: { fill: 'url(#grad-charcoal)', stroke: '#333333', glow: 'rgba(50, 50, 50, 0.4)' },
    Blush: { fill: 'url(#grad-blush)', stroke: '#e8b0b8', glow: 'rgba(255, 182, 193, 0.4)' },
    Cream: { fill: 'url(#grad-cream)', stroke: '#e5dec9', glow: 'rgba(24df, 240, 218, 0.4)' },
    Emerald: { fill: 'url(#grad-emerald)', stroke: '#064e3b', glow: 'rgba(4, 120, 87, 0.4)' }
  };
  
  // Predefined models
  const models = [
    { name: 'Bridal Profile', path: '/model_bridal.png' },
    { name: 'Groom Profile', path: '/model_groom.png' },
    { name: 'Guest Silhouette', path: '/model_guest.png' }
  ];
  
  // Synchronize options when product changes
  useEffect(() => {
    setChosenSize(selectedProduct.size[0]);
    setChosenColor(selectedProduct.color);
    resetTransforms();
  }, [selectedProductId]);
  
  const resetTransforms = () => {
    setTranslateX(0);
    setTranslateY(0);
    setScale(1.0);
    setRotate(0);
  };
  
  // Custom photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      addNotification("Custom photo uploaded successfully!", "success");
    }
  };
  
  // Dragging event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { x: translateX, y: translateY };
    canvasRef.current?.setPointerCapture(e.pointerId);
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    // Map screen drag pixels to viewBox coordinates relative to container width
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      // SVGs standard width inside viewport is roughly 300 viewBox units
      const scaleFactor = 300 / rect.width;
      setTranslateX(startOffset.current.x + dx * scaleFactor);
      setTranslateY(startOffset.current.y + dy * scaleFactor);
    }
  };
  
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    canvasRef.current?.releasePointerCapture(e.pointerId);
  };
  
  const handleAddToCart = () => {
    addToCart(selectedProduct, chosenSize, chosenColor, 1);
  };
  
  const handleSaveToWishlist = () => {
    toggleWishlist(selectedProduct);
  };
  
  const activeColorTheme = colorMap[chosenColor] || { fill: 'rgba(212, 154, 106, 0.4)', stroke: 'var(--accent)', glow: 'rgba(212, 154, 106, 0.2)' };
  const favorited = isInWishlist(selectedProduct.id);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', animation: 'fadeIn var(--transition-smooth)' }}>
      {/* Header section */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Virtual Try‑On Studio</h1>
          <p style={{ color: 'var(--text-muted)' }}>Visualize our signature cuts on pre-selected models or upload your own portrait.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--primary-light)', padding: '6px 12px', borderRadius: 'var(--radius-full)', color: 'var(--primary-dark)', fontSize: '0.85rem', fontWeight: 700, alignItems: 'center' }}>
          <Sparkles size={14} /> Interactive Silhouette Overlay
        </div>
      </div>
      
      {/* Main Studio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }} className="tryon-grid">
        
        {/* LEFT COLUMN: Canvas & Transform Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Try On Canvas */}
          <div 
            ref={canvasRef}
            className="tryon-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              cursor: isDragging.current ? 'grabbing' : 'grab',
              touchAction: 'none',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--border-color) 100%)',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Model Image */}
            <img 
              src={customImage || selectedModel}
              alt="Try On Model"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            />
            
            {/* Custom SVG Overlay */}
            {selectedProduct.svgOverlay && (
              <svg
                viewBox="0 0 250 380"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}
              >
                {/* Custom Gradient Defs for High-end Fabric Effect */}
                <defs>
                  <linearGradient id="grad-ivory" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#fdfbf7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#ece6db" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="grad-crimson" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#c9184a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#590d22" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="grad-charcoal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#555555" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#2b2b2b" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#121212" stopOpacity="0.65" />
                  </linearGradient>
                  <linearGradient id="grad-blush" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffebf0" stopOpacity="0.65" />
                    <stop offset="50%" stopColor="#f8c1cc" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#e8a0b0" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="grad-cream" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbf9f4" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#ede6d7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#d8cca8" stopOpacity="0.55" />
                  </linearGradient>
                  <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#047857" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#064e3b" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="glow-effect" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={activeColorTheme.stroke} floodOpacity="0.25" />
                  </filter>
                </defs>
                
                {/* Transform group */}
                <g 
                  transform={`translate(${translateX + 25}, ${translateY + 10}) translate(100, 190) scale(${scale}) rotate(${rotate}) translate(-100, -190)`}
                  style={{ transition: isDragging.current ? 'none' : 'transform 0.15s ease-out' }}
                >
                  <path
                    d={selectedProduct.svgOverlay}
                    fill={activeColorTheme.fill}
                    stroke={activeColorTheme.stroke}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow-effect)"
                    style={{ transition: 'fill 0.3s ease, stroke 0.3s ease' }}
                  />
                </g>
              </svg>
            )}
            
            {/* Canvas Hint Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(24, 17, 19, 0.65)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'none',
              backdropFilter: 'blur(4px)'
            }}>
              <Move size={12} /> Drag apparel to reposition
            </div>
            
            {/* Floating Zoom Controls */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <button 
                onClick={() => setScale(prev => Math.min(prev + 0.1, 2.5))}
                style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-light)', padding: '6px', borderRadius: 'var(--radius-full)', cursor: 'pointer', display: 'flex', backdropFilter: 'blur(8px)', color: 'var(--text-main)' }}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button 
                onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-light)', padding: '6px', borderRadius: 'var(--radius-full)', cursor: 'pointer', display: 'flex', backdropFilter: 'blur(8px)', color: 'var(--text-main)' }}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
            </div>
          </div>
          
          {/* Model Portait selectors & Upload button */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Choose Model Figure:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {models.map(m => (
                  <button
                    key={m.path}
                    onClick={() => {
                      setSelectedModel(m.path);
                      setCustomImage(null);
                    }}
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: selectedModel === m.path && !customImage ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)',
                      background: selectedModel === m.path && !customImage ? 'var(--primary)' : 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontWeight: 600
                    }}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom Photo Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Use Custom Photo:</span>
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: customImage ? 'var(--primary-light)' : 'var(--bg-surface)',
                  border: customImage ? '1px dashed var(--primary)' : '1px solid var(--border-color)',
                  color: customImage ? 'var(--primary-dark)' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  width: 'fit-content'
                }}
              >
                <Upload size={14} /> {customImage ? 'Change Portrait' : 'Upload Photo'}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>
          </div>
          
          {/* Fine Tuning Sliders Card */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Fine-Tune Apparel Alignment</h4>
              <button 
                onClick={resetTransforms}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={12} /> Reset Fits
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              
              {/* Translate X */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Horizontal (X)</span>
                  <span>{translateX.toFixed(0)}px</span>
                </div>
                <input 
                  type="range" 
                  min="-150" 
                  max="150" 
                  value={translateX}
                  onChange={(e) => setTranslateX(parseInt(e.target.value))}
                  style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
              
              {/* Translate Y */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Vertical (Y)</span>
                  <span>{translateY.toFixed(0)}px</span>
                </div>
                <input 
                  type="range" 
                  min="-200" 
                  max="200" 
                  value={translateY}
                  onChange={(e) => setTranslateY(parseInt(e.target.value))}
                  style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
              
              {/* Scale */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Zoom Scale</span>
                  <span>{(scale * 100).toFixed(0)}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button 
                    onClick={() => setScale(prev => Math.max(prev - 0.05, 0.5))}
                    style={{ border: 'none', background: 'var(--border-color)', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', display: 'flex' }}
                  >
                    <Minus size={12} />
                  </button>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    style={{ flexGrow: 1, accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <button 
                    onClick={() => setScale(prev => Math.min(prev + 0.05, 2.5))}
                    style={{ border: 'none', background: 'var(--border-color)', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', display: 'flex' }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              
              {/* Rotation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Rotation (Angle)</span>
                  <span>{rotate}°</span>
                </div>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  value={rotate}
                  onChange={(e) => setRotate(parseInt(e.target.value))}
                  style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
              
            </div>
          </div>
          
        </div>
        
        {/* RIGHT COLUMN: Product Details & Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Product selector grid */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Select Apparel to Try On</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {products.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedProductId === p.id ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    background: selectedProductId === p.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    alignItems: 'center',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <img 
                    src={p.image} 
                    alt={p.name}
                    style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'var(--text-main)' }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ${p.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Product Details & Specs */}
          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
            
            {/* Category badge & save button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-new" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>
                {selectedProduct.category}
              </span>
              <button
                onClick={handleSaveToWishlist}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  padding: '8px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  display: 'flex',
                  boxShadow: 'var(--shadow-sm)',
                  color: favorited ? 'var(--primary)' : 'var(--text-muted)'
                }}
                title={favorited ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <Heart size={16} fill={favorited ? 'var(--primary)' : 'none'} />
              </button>
            </div>
            
            {/* Title & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{selectedProduct.name}</h2>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ${selectedProduct.price}
              </div>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {selectedProduct.description}
            </p>
            
            {/* Attributes List */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Silhouette Style:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{selectedProduct.silhouette}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Design Theme:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{selectedProduct.theme}</span>
              </div>
            </div>
            
            {/* Color Swatch Picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Fabric Color:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {Object.keys(colorMap).map(col => {
                  return (
                    <button
                      key={col}
                      onClick={() => setChosenColor(col)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: chosenColor === col ? '2px solid var(--text-main)' : '1px solid var(--border-color)',
                        background: col === 'Ivory' ? '#fdfbf7' : 
                                    col === 'Crimson' ? '#c9184a' :
                                    col === 'Charcoal' ? '#2b2b2b' :
                                    col === 'Blush' ? '#f8c1cc' :
                                    col === 'Cream' ? '#ede6d7' : '#047857', // Emerald
                        cursor: 'pointer',
                        padding: 0,
                        position: 'relative',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                      }}
                      title={col}
                    >
                      {chosenColor === col && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: col === 'Ivory' || col === 'Cream' || col === 'Blush' ? '#333' : '#fff',
                          transform: 'translate(-50%, -50%)'
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Size chip selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Fit Size:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedProduct.size.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setChosenSize(sz)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: chosenSize === sz ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)',
                      background: chosenSize === sz ? 'var(--primary)' : 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontWeight: 600
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add to Cart Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flexGrow: 1, padding: '14px 24px', fontSize: '0.95rem' }}
              >
                <ShoppingCart size={18} /> Confirm & Add to Cart
              </button>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .tryon-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
    </div>
  );
};

export default TryOn;
