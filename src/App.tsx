import { ReactElement } from 'react';
import { AppProvider, useApp } from './context';
import { SplashScreen, OnboardingScreen, LoginScreen, SignupScreen, OTPScreen, ForgotPasswordScreen } from './screens/Auth';
import { HomeScreen } from './screens/Home';
import { CategoriesScreen, ProductDetailScreen } from './screens/Shopping';
import { WishlistScreen } from './screens/Wishlist';
import { CartScreen, CheckoutScreen, PaymentSuccessScreen, PaymentFailedScreen } from './screens/Cart';
import { OrdersScreen, OrderDetailScreen } from './screens/Orders';
import { ProfileScreen, ProfileDetailsScreen, AddressesScreen, AddAddressScreen, NotificationsScreen, OffersScreen } from './screens/Profile';
import { LoadingScreen, ErrorScreen, OfflineScreen } from './screens/States';

const noNavScreens = ['splash', 'onboarding', 'login', 'signup', 'otp', 'forgot', 'payment-success', 'payment-failed'];

function BottomNav() {
  const { activeTab, setTab, cartCount, wishlist, screen } = useApp();
  if (noNavScreens.includes(screen) || screen === 'product' || screen === 'checkout') return null;

  const tabs = [
    { id: 'home', label: 'Home', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#5B4EFF' : 'none'} stroke={active ? '#5B4EFF' : '#8892A4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
    { id: 'categories', label: 'Explore', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#5B4EFF' : 'none'} stroke={active ? '#5B4EFF' : '#8892A4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    )},
    { id: 'cart', label: 'Cart', icon: (active: boolean) => (
      <div className="relative">
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#5B4EFF' : 'none'} stroke={active ? '#5B4EFF' : '#8892A4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        {cartCount > 0 && <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#FF4D6A', fontSize: 9, color: '#fff', fontWeight: 700, fontFamily: 'Outfit' }}>{cartCount > 9 ? '9+' : cartCount}</div>}
      </div>
    )},
    { id: 'orders', label: 'Orders', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#5B4EFF' : 'none'} stroke={active ? '#5B4EFF' : '#8892A4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    )},
    { id: 'profile', label: 'Profile', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#5B4EFF' : 'none'} stroke={active ? '#5B4EFF' : '#8892A4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    )},
  ];

  const tabMap: Record<string, string> = { home: 'home', categories: 'categories', cart: 'cart', orders: 'orders', profile: 'profile' };

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: '#fff', borderTop: '1px solid #E8EBEF', display: 'flex', alignItems: 'flex-start', paddingTop: 8, zIndex: 200 }}>
      {tabs.map(tab => {
        const active = activeTab === tab.id || screen === tabMap[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className="flex-1 flex flex-col items-center gap-1 py-1"
          >
            {tab.icon(active)}
            <span style={{ fontFamily: 'Outfit', fontSize: 10, fontWeight: active ? 700 : 500, color: active ? '#5B4EFF' : '#8892A4' }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Router() {
  const { screen, screenParams, isLoggedIn, navigate } = useApp();

  // Auth guard
  if (!isLoggedIn && !noNavScreens.includes(screen)) {
    setTimeout(() => navigate('login'), 0);
    return <LoginScreen />;
  }

  const productId = (screenParams.productId as string) || '1';
  const orderId = (screenParams.orderId as string) || 'ORD-2024-9847';

  const screens: Record<string, ReactElement> = {
    splash: <SplashScreen />,
    onboarding: <OnboardingScreen />,
    login: <LoginScreen />,
    signup: <SignupScreen />,
    otp: <OTPScreen />,
    forgot: <ForgotPasswordScreen />,
    home: <HomeScreen />,
    categories: <CategoriesScreen />,
    product: <ProductDetailScreen productId={productId} />,
    wishlist: <WishlistScreen />,
    cart: <CartScreen />,
    checkout: <CheckoutScreen />,
    'payment-success': <PaymentSuccessScreen />,
    'payment-failed': <PaymentFailedScreen />,
    orders: <OrdersScreen />,
    'order-detail': <OrderDetailScreen orderId={orderId} />,
    profile: <ProfileScreen />,
    'profile-details': <ProfileDetailsScreen />,
    addresses: <AddressesScreen />,
    'add-address': <AddAddressScreen />,
    notifications: <NotificationsScreen />,
    offers: <OffersScreen />,
    loading: <LoadingScreen />,
    error: <ErrorScreen />,
    offline: <OfflineScreen />,
  };

  return <>{screens[screen] || <HomeScreen />}</>;
}

function PageNav() {
  const { screen, navigate, isLoggedIn } = useApp();

  // Design system navigation panel (visible when logged in, for demo purposes)
  if (!isLoggedIn) return null;
  if (noNavScreens.includes(screen)) return null;

  const pages = [
    { label: 'Home', screen: 'home' },
    { label: 'Product', screen: 'product', params: { productId: '1' } },
    { label: 'Cart', screen: 'cart' },
    { label: 'Checkout', screen: 'checkout' },
    { label: '✓ Success', screen: 'payment-success' },
    { label: '✗ Failed', screen: 'payment-failed' },
    { label: 'Orders', screen: 'orders' },
    { label: 'Profile', screen: 'profile' },
    { label: 'Notifications', screen: 'notifications' },
    { label: 'Offers', screen: 'offers' },
    { label: 'Loading', screen: 'loading' },
    { label: 'Error', screen: 'error' },
    { label: 'Offline', screen: 'offline' },
  ];

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 4, maxHeight: '90vh', overflowY: 'auto' }}>
      <div className="card p-3" style={{ minWidth: 140 }}>
        <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 11, color: '#8892A4', letterSpacing: '0.05em', marginBottom: 8 }}>SCREEN NAVIGATOR</p>
        {pages.map(p => (
          <button
            key={p.screen}
            onClick={() => navigate(p.screen, p.params || {})}
            className="w-full text-left px-2.5 py-1.5 rounded-lg transition-colors"
            style={{
              fontFamily: 'Outfit', fontSize: 12, fontWeight: screen === p.screen ? 700 : 500,
              color: screen === p.screen ? '#5B4EFF' : '#374151',
              background: screen === p.screen ? '#EEF0FF' : 'transparent',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

function AppInner() {
  return (
    <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f0e17 0%, #1a1a2e 50%, #0f0e17 100%)', padding: '20px' }}>
      {/* Phone frame */}
      <div className="phone-frame fade-in" style={{ position: 'relative', flexShrink: 0 }}>
        {/* Notch */}
        <div className="phone-notch" />
        {/* Screen */}
        <div className="screen-content">
          <Router />
          <BottomNav />
        </div>
      </div>
      {/* Side navigator */}
      {/* <PageNav /> */}
    </div>
  );
}

export default App;
