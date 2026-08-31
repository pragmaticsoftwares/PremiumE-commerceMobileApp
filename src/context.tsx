import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, products as allProducts } from './data';

interface CartItem { product: Product; qty: number; color: string; size?: string }

interface AppState {
  screen: string;
  prevScreen: string;
  screenParams: Record<string, unknown>;
  isLoggedIn: boolean;
  activeTab: string;
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  navigate: (screen: string, params?: Record<string, unknown>) => void;
  goBack: () => void;
  setTab: (tab: string) => void;
  login: () => void;
  logout: () => void;
  addToCart: (product: Product, color: string, qty?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState('splash');
  const [prevScreen, setPrevScreen] = useState('home');
  const [screenParams, setScreenParams] = useState<Record<string, unknown>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['1', '3']);

  const navigate = (s: string, params: Record<string, unknown> = {}) => {
    setPrevScreen(screen);
    setScreen(s);
    setScreenParams(params);
  };

  const goBack = () => {
    setScreen(prevScreen);
    setScreenParams({});
  };

  const setTab = (tab: string) => {
    setActiveTab(tab);
    const tabScreens: Record<string, string> = {
      home: 'home', categories: 'categories', wishlist: 'wishlist', orders: 'orders', profile: 'profile',
    };
    navigate(tabScreens[tab] || tab);
  };

  const login = () => { setIsLoggedIn(true); navigate('home'); };
  const logout = () => { setIsLoggedIn(false); navigate('login'); };

  const addToCart = (product: Product, color: string, qty = 1, size?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.color === color);
      if (existing) return prev.map(i => i.product.id === product.id && i.color === color ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty, color, size }];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(i => i.product.id !== productId));

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, qty } : i));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{ screen, prevScreen, screenParams, isLoggedIn, activeTab, cart, wishlist, cartCount, navigate, goBack, setTab, login, logout, addToCart, removeFromCart, updateQty, toggleWishlist, isWishlisted }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp outside provider');
  return ctx;
}

export { allProducts };
