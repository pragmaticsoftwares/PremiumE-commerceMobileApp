import { useState, useEffect } from 'react';
import { useApp } from '../context';
import { products, categories, banners } from '../data';
import { StatusBar, ProductCard, SearchBar, CartIcon, SectionHeader, Badge } from '../components/UI';

function PromoBanner({ banner, isActive }: { banner: typeof banners[0]; isActive: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl flex-shrink-0" style={{ width: 330, height: 160, background: banner.bg }}>
      <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div>
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1.2, whiteSpace: 'pre-line' }}>{banner.title}</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>{banner.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-white" style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, color: banner.bg }}>
            {banner.cta}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryChip({ cat }: { cat: typeof categories[0] }) {
  const { navigate } = useApp();
  return (
    <button onClick={() => navigate('categories', { categoryId: cat.id })} className="flex flex-col items-center gap-2 flex-shrink-0">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: cat.color }}>
        {cat.icon}
      </div>
      <span style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 600, color: '#374151', textAlign: 'center', maxWidth: 56 }}>{cat.name}</span>
    </button>
  );
}

export function HomeScreen() {
  const { navigate, cartCount } = useApp();
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveBanner(b => (b + 1) % banners.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const featured = products.filter(p => p.isFeatured);
  const newArrivals = products.filter(p => p.isNew);
  const recommendations = products.slice(0, 6);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      {/* Header */}
      <div className="px-5" style={{ background: '#5B4EFF', paddingBottom: 24 }}>
        <div style={{ paddingTop: 44 }} className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' }}>Brooklyn, New York</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#fff' }}>Good morning, Alex 👋</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('notifications')} className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#FF4D6A' }} />
            </button>
            <button onClick={() => navigate('cart')} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <CartIcon count={cartCount} />
            </button>
          </div>
        </div>
        <div onClick={() => navigate('search')} className="cursor-pointer">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: 'Inter', flex: 1 }}>Search products, brands...</span>
            <div className="px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.2)', fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: 'Outfit', fontWeight: 600 }}>🔍 AI</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 84 }}>
        {/* Promo Banners */}
        <div className="pt-5 pb-2">
          <div className="flex gap-4 overflow-x-auto px-5 pb-2">
            {banners.map((b, i) => <PromoBanner key={b.id} banner={b} isActive={i === activeBanner} />)}
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {banners.map((_, i) => (
              <div key={i} className="transition-all" style={{ width: i === activeBanner ? 20 : 6, height: 6, borderRadius: 3, background: i === activeBanner ? '#5B4EFF' : '#E8EBEF' }} />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-5 px-5">
          <SectionHeader title="Shop by Category" action="See all" onAction={() => navigate('categories')} />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map(cat => <CategoryChip key={cat.id} cat={cat} />)}
          </div>
        </div>

        {/* Flash Deals */}
        <div className="mt-6 px-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#111827' }}>Flash Deals</h2>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: '#FFF0F3' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF4D6A"><circle cx="12" cy="12" r="10"/></svg>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#FF4D6A', fontFamily: 'Outfit' }}>02:47:30</span>
              </div>
            </div>
            <button onClick={() => navigate('offers')} style={{ fontSize: 13, color: '#5B4EFF', fontWeight: 600, fontFamily: 'Outfit' }}>View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {featured.map(p => <ProductCard key={p.id} product={p} onPress={() => navigate('product', { productId: p.id })} />)}
          </div>
        </div>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <div className="mt-6 px-5">
            <SectionHeader title="New Arrivals" action="See all" onAction={() => navigate('categories')} />
            <div className="flex gap-4 overflow-x-auto pb-2">
              {newArrivals.map(p => <ProductCard key={p.id} product={p} onPress={() => navigate('product', { productId: p.id })} />)}
            </div>
          </div>
        )}

        {/* Special Offer Card */}
        <div className="mt-6 mx-5">
          <div className="rounded-3xl overflow-hidden relative" style={{ height: 120, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
            <div className="absolute inset-0 flex items-center px-6 gap-4">
              <div className="flex-1">
                <Badge label="EXCLUSIVE" color="#F59E0B" />
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: '#fff', marginTop: 6, lineHeight: 1.3 }}>Get 15% off your first order</h3>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Use code <strong style={{ color: '#F59E0B' }}>FIRST50</strong></p>
              </div>
              <div className="text-4xl">🎊</div>
            </div>
          </div>
        </div>

        {/* Recommended For You */}
        <div className="mt-6 px-5">
          <SectionHeader title="Recommended for You" action="See more" onAction={() => navigate('categories')} />
          <div className="grid grid-cols-2 gap-4 pb-4">
            {recommendations.map(p => (
              <div key={p.id} className="card overflow-hidden cursor-pointer active:scale-[0.97] transition-transform" onClick={() => navigate('product', { productId: p.id })}>
                <div className="relative" style={{ height: 160, background: '#F7F8FA' }}>
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  {p.discount > 0 && <div className="absolute top-2 left-2"><Badge label={`-${p.discount}%`} /></div>}
                </div>
                <div className="p-3">
                  <p style={{ fontSize: 11, color: '#8892A4', fontWeight: 500, fontFamily: 'Outfit' }}>{p.brand}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontFamily: 'Outfit', lineHeight: 1.3, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{p.name}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#5B4EFF' }}>${p.price}</span>
                    {p.originalPrice > p.price && <span style={{ fontSize: 11, color: '#8892A4', textDecoration: 'line-through' }}>${p.originalPrice}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
