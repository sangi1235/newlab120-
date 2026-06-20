import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, ClipboardList, Calendar, Ruler, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const { customRequests, addCustomRequest, addNotification } = useApp();

  // Form states
  const [attireName, setAttireName] = useState('');
  const [category, setCategory] = useState('Bridal');
  const [silhouette, setSilhouette] = useState('A-Line');
  const [fabric, setFabric] = useState('Italian Silk');
  const [color, setColor] = useState('Ivory');
  
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [height, setHeight] = useState('');
  
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!attireName || !bust || !waist || !hips || !height || !eventDate) {
      addNotification('Please fill in all requested fields, including measurements and event date.', 'error');
      return;
    }

    addCustomRequest({
      attireName,
      category,
      silhouette,
      fabric,
      color,
      measurements: { bust, waist, hips, height },
      eventDate,
      notes
    });

    // Reset Form
    setAttireName('');
    setCategory('Bridal');
    setSilhouette('A-Line');
    setFabric('Italian Silk');
    setColor('Ivory');
    setBust('');
    setWaist('');
    setHips('');
    setHeight('');
    setEventDate('');
    setNotes('');
  };

  const silhouettesList = ['A-Line', 'Ballgown', 'Slim-Fit', 'Empire', 'Tailored', 'Drape', 'Custom Silhouette'];
  const fabricsList = ['Italian Silk', 'French Lace', 'Imperial Satin', 'Hand-woven Brocade', 'Chiffon', 'Organza'];
  const colorsList = ['Ivory', 'Crimson', 'Charcoal', 'Blush', 'Cream', 'Emerald', 'Custom Color'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', animation: 'fadeIn var(--transition-smooth)' }}>
      
      {/* Page Title */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Bespoke Custom Requests</h1>
        <p style={{ color: 'var(--text-muted)' }}>Submit your measurements, select luxury fabrics, and track custom tailoring phases.</p>
      </div>

      {/* Grid Layout: Form vs History */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }} className="contact-grid">
        
        {/* LEFT COLUMN: Intake Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <form 
            onSubmit={handleSubmit}
            className="glass-card animate-scale-up"
            style={{
              padding: '30px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
              <Scissors size={20} style={{ color: 'var(--accent)' }} /> Tailoring Intake Form
            </h3>
            
            {/* Style / Name input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Attire Style Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Dream A-Line Gown, Royal Silk Tuxedo"
                value={attireName}
                onChange={(e) => setAttireName(e.target.value)}
              />
            </div>

            {/* Grid for Selectors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
              
              {/* Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Category</label>
                <select 
                  className="form-select" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Bridal">Bridal</option>
                  <option value="Groom">Groom</option>
                  <option value="Guests">Guests</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Silhouette */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Silhouette</label>
                <select 
                  className="form-select" 
                  value={silhouette} 
                  onChange={(e) => setSilhouette(e.target.value)}
                >
                  {silhouettesList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Fabric */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Luxury Fabric</label>
                <select 
                  className="form-select" 
                  value={fabric} 
                  onChange={(e) => setFabric(e.target.value)}
                >
                  {fabricsList.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Color */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fabric Color</label>
                <select 
                  className="form-select" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                >
                  {colorsList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

            </div>

            {/* Custom Measurements section */}
            <div 
              style={{
                border: '1px solid var(--border-color)',
                padding: '20px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ruler size={16} style={{ color: 'var(--primary-dark)' }} /> Tailoring Size (inches or cm)
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Bust</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 34B"
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                    style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Waist</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 27"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hips</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 38"
                    value={hips}
                    onChange={(e) => setHips(e.target.value)}
                    style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Height</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 5ft 6in"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Event date input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Wedding / Event Date</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  className="form-input"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  style={{ paddingRight: '40px' }}
                />
                <Calendar size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Styling notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Additional Styling Instructions &amp; Notes</label>
              <div style={{ position: 'relative' }}>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe your design modifications, color specifications, lace layouts..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
                <MessageSquare size={16} style={{ position: 'absolute', right: '12px', bottom: '12px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '14px', width: '100%', fontSize: '0.95rem' }}
            >
              Submit Tailoring Request
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Submitted Requests List & Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div 
            className="glass-card"
            style={{
              padding: '30px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              height: '100%',
              minHeight: '400px'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ClipboardList size={20} style={{ color: 'var(--primary-dark)' }} /> Your Active Requests ({customRequests.length})
            </h3>

            {/* Empty State */}
            {customRequests.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', margin: 'auto 0', textAlign: 'center', padding: '20px' }}>
                <Clock size={36} style={{ color: 'var(--text-muted)' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No requests submitted yet</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: 1.5 }}>
                  Fill out the intake form to submit your bespoke wedding attire dimensions to our atelier.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', maxHeight: '580px', paddingRight: '4px' }}>
                {customRequests.map((req) => {
                  
                  // Status helper
                  const statusColors = {
                    pending: { bg: 'var(--primary-light)', text: 'var(--primary-dark)', label: 'Pending Review' },
                    reviewed: { bg: '#fff9e6', text: '#b45309', label: 'In Stylist Review' },
                    approved: { bg: '#f0fdf4', text: '#15803d', label: 'Approved & In Tailoring' }
                  };
                  const currentStatus = statusColors[req.status] || statusColors.pending;

                  // Simulating tracker step index
                  // 1 = Recieved, 2 = Under Review, 3 = Handcrafted Tailoring, 4 = Shipping
                  const activeStep = req.status === 'approved' ? 3 : req.status === 'reviewed' ? 2 : 1;

                  return (
                    <div 
                      key={req.id} 
                      style={{ 
                        border: '1px solid var(--border-color)', 
                        padding: '20px', 
                        borderRadius: 'var(--radius-md)', 
                        background: 'var(--bg-main)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}
                      className="animate-slide-up"
                    >
                      {/* Request Header details */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{req.attireName}</h4>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {req.id} • Submitted {req.submitTime}</span>
                        </div>
                        <span 
                          className="badge" 
                          style={{ 
                            background: currentStatus.bg, 
                            color: currentStatus.text,
                            padding: '4px 10px',
                            fontSize: '0.7rem'
                          }}
                        >
                          {currentStatus.label}
                        </span>
                      </div>

                      {/* Request details info block */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Silhouette: </span>
                          <strong style={{ color: 'var(--text-main)' }}>{req.silhouette}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Fabric &amp; Color: </span>
                          <strong style={{ color: 'var(--text-main)' }}>{req.fabric} ({req.color})</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Event Date: </span>
                          <strong style={{ color: 'var(--text-main)' }}>{req.eventDate}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Sizes: </span>
                          <span style={{ color: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 700 }}>
                            B{req.measurements.bust} W{req.measurements.waist} H{req.measurements.hips} H{req.measurements.height}
                          </span>
                        </div>
                      </div>

                      {req.notes && (
                        <div style={{ fontSize: '0.8rem', background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
                          Notes: "{req.notes}"
                        </div>
                      )}

                      {/* Tailoring phase tracking stepper */}
                      <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tailoring Phase:</span>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0 10px' }}>
                          {/* Stepper Progress Line */}
                          <div style={{ position: 'absolute', top: '10px', left: '20px', right: '20px', height: '2px', background: 'var(--border-color)', zIndex: 0 }} />
                          <div style={{ position: 'absolute', top: '10px', left: '20px', width: `${((activeStep - 1) / 3) * 100}%`, height: '2px', background: 'var(--primary)', zIndex: 0, transition: 'width 0.4s ease' }} />
                          
                          {/* Step 1 */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeStep >= 1 ? 'var(--primary)' : 'var(--bg-surface)', border: activeStep >= 1 ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeStep >= 1 ? 'var(--text-on-primary)' : 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 700 }}>
                              {activeStep > 1 ? <CheckCircle size={12} /> : '1'}
                            </div>
                            <span style={{ fontSize: '0.65rem', marginTop: '6px', fontWeight: activeStep === 1 ? 700 : 500, color: activeStep >= 1 ? 'var(--text-main)' : 'var(--text-muted)' }}>Received</span>
                          </div>

                          {/* Step 2 */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeStep >= 2 ? 'var(--primary)' : 'var(--bg-surface)', border: activeStep >= 2 ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeStep >= 2 ? 'var(--text-on-primary)' : 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 700 }}>
                              {activeStep > 2 ? <CheckCircle size={12} /> : '2'}
                            </div>
                            <span style={{ fontSize: '0.65rem', marginTop: '6px', fontWeight: activeStep === 2 ? 700 : 500, color: activeStep >= 2 ? 'var(--text-main)' : 'var(--text-muted)' }}>Review</span>
                          </div>

                          {/* Step 3 */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeStep >= 3 ? 'var(--primary)' : 'var(--bg-surface)', border: activeStep >= 3 ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeStep >= 3 ? 'var(--text-on-primary)' : 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 700 }}>
                              {activeStep > 3 ? <CheckCircle size={12} /> : '3'}
                            </div>
                            <span style={{ fontSize: '0.65rem', marginTop: '6px', fontWeight: activeStep === 3 ? 700 : 500, color: activeStep >= 3 ? 'var(--text-main)' : 'var(--text-muted)' }}>Bespoke Fit</span>
                          </div>

                          {/* Step 4 */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: activeStep > 3 ? 'var(--primary)' : 'var(--bg-surface)', border: activeStep > 3 ? '1px solid var(--primary-dark)' : '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeStep > 3 ? 'var(--text-on-primary)' : 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 700 }}>
                              4
                            </div>
                            <span style={{ fontSize: '0.65rem', marginTop: '6px', fontWeight: activeStep > 3 ? 700 : 500, color: activeStep > 3 ? 'var(--text-main)' : 'var(--text-muted)' }}>Delivery</span>
                          </div>

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Contact;
