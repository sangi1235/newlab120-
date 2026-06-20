import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    setActivePage, 
    addNotification 
  } = useApp();

  const [coupon, setCoupon] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  // Subtotal Calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Coupon Verification
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'WEDDING2025') {
      setDiscountPercent(0.10);
      addNotification("Promo coupon 'WEDDING2025' successfully applied! (10% Off)", "success");
    } else {
      addNotification("Invalid coupon code. Try 'WEDDING2025' for a special discount.", "error");
    }
  };

  // Simulating Checkout Processing
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      addNotification("Payment Successful! Your Ethereal bridal package order has been placed.", "success");
      clearCart();
      setActivePage('home');
    }, 2500);
  };

  // Cost calculations
  const discountAmount = subtotal * discountPercent;
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.08; // 8% tax
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 15; // Free shipping above $500
  const total = taxableAmount + tax + shipping;

  // Empty State
  if (cart.length === 0) {
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
        <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '20px', borderRadius: '50%', display: 'inline-flex' }}>
          <ShoppingBag size={48} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Your Shopping Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.5 }}>
          Explore our 2025 designer gowns, suits, and accessories, and find your perfect fit today.
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
      {/* Title block */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Your Shopping Cart</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review your selected wedding attire items and finalize order requirements.</p>
      </div>

      {/* Cart Layout split view */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }} className="cart-grid">
        
        {/* Left Side: Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.map((item, index) => {
            const itemKey = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
            return (
              <div 
                key={itemKey}
                className="glass-card"
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                {/* Product Image */}
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  style={{
                    width: '90px',
                    height: '110px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{item.product.name}</h3>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>
                      {item.product.category}
                    </span>
                  </div>

                  {/* Attributes selected */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Size: <strong style={{ color: 'var(--text-main)' }}>{item.selectedSize}</strong>
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Color: <strong style={{ color: 'var(--text-main)' }}>{item.selectedColor}</strong>
                    </span>
                  </div>

                  {/* Pricing row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      ${item.product.price}
                    </span>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', padding: '2px 8px' }}>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: 'var(--text-muted)' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: 'var(--text-muted)' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '4px'
                  }}
                  title="Remove from Cart"
                >
                  <Trash2 size={18} className="hover-trash" />
                </button>
              </div>
            );
          })}

          <button
            onClick={() => setActivePage('shop')}
            className="btn btn-outline"
            style={{ width: 'fit-content', padding: '10px 20px', fontSize: '0.85rem' }}
          >
            Continue Shopping
          </button>
        </div>

        {/* Right Side: Order Summary Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Cost Summary Card */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '24px', 
              borderRadius: 'var(--radius-md)', 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-color)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px' 
            }}
          >
            <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Tag size={12} /> Coupon Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
              <span>Total Cost</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Simulated Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px'
              }}
            >
              {isCheckingOut ? (
                <>
                  <div className="spinner" /> Processing Payment...
                </>
              ) : (
                <>
                  Proceed to Checkout <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Coupon Entry Card */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '20px', 
              borderRadius: 'var(--radius-md)', 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-color)' 
            }}
          >
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Have a Voucher Code?</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    fontSize: '0.85rem',
                    flexGrow: 1,
                    textTransform: 'uppercase',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  Apply
                </button>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hint: Try typing <strong>WEDDING2025</strong></span>
            </form>
          </div>

        </div>

      </div>

      {/* Styled components inside file */}
      <style>{`
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .hover-trash:hover {
          color: #ef4444;
          transform: scale(1.1);
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
};

export default Cart;
