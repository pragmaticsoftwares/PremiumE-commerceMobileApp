import { ReactNode } from 'react';
import { useApp } from '../context';

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex justify-between items-center px-6 pt-12 pb-2 ${dark ? 'text-white' : 'text-[#111827]'}`} style={{ paddingTop: '44px' }}>
      <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 15 }}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3"/><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.5"/><rect x="9" y="0" width="3" height="12" rx="1" opacity="0.75"/><rect x="13.5" y="0" width="2.5" height="12" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2C5.5 2 3.3 3.1 1.8 4.8L0.5 3.5C2.4 1.3 5.1 0 8 0s5.6 1.3 7.5 3.5L14.2 4.8C12.7 3.1 10.5 2 8 2zm0 4c-1.4 0-2.6.6-3.5 1.5L3.2 6.2C4.5 4.8 6.1 4 8 4s3.5.8 4.8 2.2L11.5 7.5C10.6 6.6 9.4 6 8 6zm0 4c-.8 0-1.5.3-2 .8L8 13l2-2.2C9.5 10.3 8.8 10 8 10z"/></svg>
        <div className="flex items-center gap-0.5">
          <div style={{ width: 22, height: 11, border: `1.5px solid currentColor`, borderRadius: 3, padding: 1.5, display: 'flex', gap: 1 }}>
            <div style={{ flex: 1, background: 'currentColor', borderRadius: 1 }} />
            <div style={{ flex: 1, background: 'currentColor', borderRadius: 1 }} />
            <div style={{ flex: 0.5, background: 'currentColor', borderRadius: 1, opacity: 0.3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopBar({ title, onBack, action, dark = false }: { title: string; onBack?: () => void; action?: ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-center px-5 py-3 gap-3 ${dark ? 'text-white' : 'text-[#111827]'}`}>
      {onBack && (
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: dark ? 'rgba(255,255,255,0.15)' : '#F7F8FA' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
      )}
      <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, flex: 1 }}>{title}</span>
      {action}
    </div>
  );
}

export function PrimaryBtn({ children, onClick, disabled = false, loading = false, outline = false, small = false, full = true }: { children: ReactNode; onClick?: () => void; disabled?: boolean; loading?: boolean; outline?: boolean; small?: boolean; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-primary flex items-center justify-center gap-2 font-semibold transition-all ${full ? 'w-full' : ''} ${small ? 'py-3 px-5 text-sm' : 'py-4 px-6 text-base'} ${outline ? 'bg-transparent border-2 border-[#5B4EFF] text-[#5B4EFF]' : ''} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
      style={{ fontFamily: 'Outfit', borderRadius: 14 }}
    >
      {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

export function StarRating({ rating, count, small = false }: { rating: number; count?: number; small?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} width={small ? 12 : 14} height={small ? 12 : 14} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#F59E0B' : '#E5E7EB'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <span style={{ fontSize: small ? 11 : 13, color: '#8892A4', fontWeight: 500 }}>
        {rating.toFixed(1)}{count ? ` (${count.toLocaleString()})` : ''}
      </span>
    </div>
  );
}

export function WishlistBtn({ productId }: { productId: string }) {
  const { toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(productId);
  return (
    <button onClick={() => toggleWishlist(productId)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-90">
      <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? '#FF4D6A' : 'none'} stroke={wishlisted ? '#FF4D6A' : '#8892A4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

export function Badge({ label, color = '#FF4D6A' }: { label: string; color?: string }) {
  return <span className="badge-sale" style={{ background: color }}>{label}</span>;
}

export function ProductCard({ product, onPress }: { product: import('../data').Product; onPress: () => void }) {
  const { toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);
  return (
    <div className="card overflow-hidden cursor-pointer active:scale-[0.98] transition-transform" onClick={onPress} style={{ minWidth: 160, flex: '0 0 160px' }}>
      <div className="relative" style={{ height: 160, background: '#F7F8FA' }}>
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        {product.discount > 0 && <div className="absolute top-2 left-2"><Badge label={`-${product.discount}%`} /></div>}
        {product.isNew && <div className="absolute top-2 left-2"><Badge label="NEW" color="#5B4EFF" /></div>}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? '#FF4D6A' : 'none'} stroke={wishlisted ? '#FF4D6A' : '#8892A4'} strokeWidth="2.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <p style={{ fontSize: 11, color: '#8892A4', fontWeight: 500, fontFamily: 'Outfit', marginBottom: 2 }}>{product.brand}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontFamily: 'Outfit', lineHeight: 1.3, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</p>
        <div className="flex items-center gap-1 mb-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span style={{ fontSize: 11, color: '#8892A4', fontWeight: 500 }}>{product.rating} ({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827' }}>${product.price}</span>
          {product.originalPrice > product.price && <span style={{ fontSize: 11, color: '#8892A4', textDecoration: 'line-through' }}>${product.originalPrice}</span>}
        </div>
      </div>
    </div>
  );
}

export function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#FF4D6A', fontSize: 9, color: '#fff', fontWeight: 700, fontFamily: 'Outfit' }}>{count > 9 ? '9+' : count}</div>
      )}
    </div>
  );
}

export function SearchBar({ placeholder = 'Search products...', onFocus }: { placeholder?: string; onFocus?: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: '#F7F8FA', border: '1.5px solid #E8EBEF' }} onClick={onFocus}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8892A4" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <span style={{ color: '#8892A4', fontSize: 14, fontFamily: 'Inter', flex: 1 }}>{placeholder}</span>
      <div style={{ width: 1, height: 18, background: '#E8EBEF' }} />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8892A4" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="9" y2="18"/></svg>
    </div>
  );
}

export function EmptyState({ icon, title, body, cta, onCta }: { icon: string; title: string; body: string; cta?: string; onCta?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center gap-4">
      <div className="text-6xl mb-2">{icon}</div>
      <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: '#111827' }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#8892A4', lineHeight: 1.6 }}>{body}</p>
      {cta && onCta && <PrimaryBtn onClick={onCta} full={false}>{cta}</PrimaryBtn>}
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: '#F0F2F5', margin: '0 -20px' }} />;
}

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#111827' }}>{title}</h2>
      {action && <button onClick={onAction} style={{ fontSize: 13, color: '#5B4EFF', fontWeight: 600, fontFamily: 'Outfit' }}>{action}</button>}
    </div>
  );
}
