import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, X, Play } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { onboardingSeen, setOnboardingSeen, onboardingTour, setOnboardingTour, setActivePage } = useApp();

  // If already seen, or if tour is not explicitly running, show nothing.
  // We trigger the tour automatically if they haven't seen it yet.
  React.useEffect(() => {
    if (!onboardingSeen) {
      setOnboardingTour({ activeStep: 1, isRunning: true });
    }
  }, [onboardingSeen, setOnboardingTour]);

  if (!onboardingTour.isRunning) return null;

  const steps = [
    {
      title: "Welcome to Ethereal Elegance!",
      content: "Let us show you around. Ethereal Elegance brings you premium, trendsetting 2025 wedding attire collections. We have built high-fidelity interactive features for your perfect wedding planning experience.",
      actionLabel: "Start Tour",
      onAction: () => setOnboardingTour({ activeStep: 2, isRunning: true })
    },
    {
      title: "Try On Wedding Attire Virtually",
      content: "Step into our interactive Virtual Try-On studio. Upload your own photo or choose a model, select a dress, gown, or suit, and resize or position it to see your final wedding party look before ordering.",
      actionLabel: "Show Me Try-On",
      onAction: () => {
        setActivePage('tryon');
        setOnboardingTour({ activeStep: 3, isRunning: true });
      }
    },
    {
      title: "Submit Custom Dress Requests",
      content: "Need custom alterations, bespoke colors, or specific measurements? Use our Custom Requests page to fill out details, choose fabrics, select silks, and get custom quotes directly from our master designers.",
      actionLabel: "Show Me Custom Request",
      onAction: () => {
        setActivePage('contact');
        setOnboardingTour({ activeStep: 4, isRunning: true });
      }
    },
    {
      title: "Settings & Accessibility",
      content: "Finally, customize your browsing experience! Access app settings in the navbar header to toggle dark mode, or scale the font sizes to suit your accessibility preferences.",
      actionLabel: "Finish & Explore",
      onAction: () => {
        setOnboardingSeen(true);
        setOnboardingTour({ activeStep: 0, isRunning: false });
      }
    }
  ];

  const currentStepData = steps[onboardingTour.activeStep - 1];
  if (!currentStepData) return null;

  const handleSkip = () => {
    setOnboardingSeen(true);
    setOnboardingTour({ activeStep: 0, isRunning: false });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9995,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(24, 17, 19, 0.5)',
        backdropFilter: 'blur(6px)',
        padding: '20px'
      }}
    >
      <div
        className="glass-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '32px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          border: '1px solid var(--primary)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header Icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary-dark)',
              display: 'inline-flex'
            }}
          >
            <Sparkles size={24} />
          </div>
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            {currentStepData.title}
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {currentStepData.content}
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: onboardingTour.activeStep === i + 1 ? '24px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: onboardingTour.activeStep === i + 1 ? 'var(--primary)' : 'var(--border-color)',
                  transition: 'width 0.3s ease, background 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {onboardingTour.activeStep < steps.length && (
              <button
                onClick={handleSkip}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Skip Tour
              </button>
            )}
            <button
              onClick={currentStepData.onAction}
              className="btn btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem'
              }}
            >
              {currentStepData.actionLabel} <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export const OnboardingTrigger: React.FC = () => {
  const { setOnboardingTour } = useApp();

  return (
    <button
      onClick={() => setOnboardingTour({ activeStep: 1, isRunning: true })}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--primary)',
        background: 'var(--primary-light)',
        color: 'var(--primary-dark)',
        fontWeight: 600,
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'transform var(--transition-fast)'
      }}
      className="btn"
    >
      <Play size={14} fill="currentColor" /> Tour Guide
    </button>
  );
};
