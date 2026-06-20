import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { TryOn } from './components/TryOn';
import { Contact } from './components/Contact';
import { Wishlist } from './components/Wishlist';
import { Cart } from './components/Cart';
import { Blog } from './components/Blog';
import { About } from './components/About';
import { Notification } from './components/Notification';
import { Onboarding } from './components/Onboarding';

const App: React.FC = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'tryon':
        return <TryOn />;
      case 'contact':
        return <Contact />;
      case 'wishlist':
        return <Wishlist />;
      case 'cart':
        return <Cart />;
      case 'blog':
        return <Blog />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container" style={{ fontSize: `calc(1rem * var(--font-scale))` }}>
      <Header />
      <main>{renderPage()}</main>
      <Footer />
      <Notification />
      <Onboarding />
    </div>
  );
};

export default App;
