import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CustomRequest {
  id: string;
  attireName: string;
  category: string;
  silhouette: string;
  fabric: string;
  color: string;
  measurements: {
    bust: string;
    waist: string;
    hips: string;
    height: string;
  };
  eventDate: string;
  notes: string;
  status: 'pending' | 'reviewed' | 'approved';
  submitTime: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export interface FiltersState {
  searchQuery: string;
  category: string;
  silhouette: string;
  color: string;
  theme: string;
  priceRange: [number, number];
  size: string;
}

interface AppContextType {
  theme: 'light' | 'dark';
  fontScale: number;
  activePage: string;
  cart: CartItem[];
  wishlist: Product[];
  customRequests: CustomRequest[];
  notifications: Notification[];
  filters: FiltersState;
  onboardingSeen: boolean;
  onboardingTour: { activeStep: number; isRunning: boolean };
  setTheme: (theme: 'light' | 'dark') => void;
  setFontScale: (scale: number) => void;
  setActivePage: (page: string) => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addCustomRequest: (request: Omit<CustomRequest, 'id' | 'status' | 'submitTime'>) => void;
  addNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeNotification: (id: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  resetFilters: () => void;
  setOnboardingSeen: (seen: boolean) => void;
  setOnboardingTour: React.Dispatch<React.SetStateAction<{ activeStep: number; isRunning: boolean }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Font scale accessibility state
  const [fontScale, setFontScaleState] = useState<number>(() => {
    const saved = localStorage.getItem('fontScale');
    return saved ? parseFloat(saved) : 1;
  });

  // Navigation router simulation
  const [activePage, setActivePageState] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  // Shopping cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Custom request submissions
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    const saved = localStorage.getItem('customRequests');
    return saved ? JSON.parse(saved) : [];
  });

  // Onboarding status
  const [onboardingSeen, setOnboardingSeenState] = useState<boolean>(() => {
    return localStorage.getItem('onboardingSeen') === 'true';
  });

  // Onboarding Active Tour
  const [onboardingTour, setOnboardingTour] = useState<{ activeStep: number; isRunning: boolean }>({
    activeStep: 0,
    isRunning: false
  });

  // Toast Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Advanced Shop Filters
  const initialFilters: FiltersState = {
    searchQuery: '',
    category: 'All',
    silhouette: 'All',
    color: 'All',
    theme: 'All',
    priceRange: [0, 2000],
    size: 'All'
  };
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  // Synchronize router simulation with browser history hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActivePageState(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setActivePage = (page: string) => {
    window.location.hash = page;
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync settings
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
    localStorage.setItem('fontScale', fontScale.toString());
  }, [fontScale]);

  // Sync state helpers
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('customRequests', JSON.stringify(customRequests));
  }, [customRequests]);

  const setTheme = (t: 'light' | 'dark') => setThemeState(t);
  const setFontScale = (scale: number) => setFontScaleState(scale);
  const setOnboardingSeen = (seen: boolean) => {
    setOnboardingSeenState(seen);
    localStorage.setItem('onboardingSeen', seen ? 'true' : 'false');
  };

  // Toast utilities
  const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeNotification(id), 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existing) {
        addNotification(`Increased ${product.name} quantity in Cart`, 'success');
        return prev.map((item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      addNotification(`Added ${product.name} to Cart`, 'success');
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) => {
      const target = prev.find(
        (item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (target) {
        addNotification(`Removed ${target.product.name} from Cart`, 'info');
      }
      return prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      );
    });
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Wishlist actions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addNotification(`Removed ${product.name} from Wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      }
      addNotification(`Saved ${product.name} to Wishlist`, 'success');
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Custom attire request submit helper
  const addCustomRequest = (request: Omit<CustomRequest, 'id' | 'status' | 'submitTime'>) => {
    const id = 'req_' + Math.random().toString(36).substring(2, 9);
    const submitTime = new Date().toLocaleString();
    const newRequest: CustomRequest = {
      ...request,
      id,
      status: 'pending',
      submitTime
    };
    setCustomRequests((prev) => [newRequest, ...prev]);
    addNotification('Your custom attire request was successfully submitted!', 'success');
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        fontScale,
        activePage,
        cart,
        wishlist,
        customRequests,
        notifications,
        filters,
        onboardingSeen,
        onboardingTour,
        setTheme,
        setFontScale,
        setActivePage,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addCustomRequest,
        addNotification,
        removeNotification,
        setFilters,
        resetFilters,
        setOnboardingSeen,
        setOnboardingTour
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
