import { useState } from 'react';
import { useApp } from '../context';
import { products, categories } from '../data';
import { StatusBar, TopBar, ProductCard, SearchBar, Badge, StarRating, WishlistBtn, PrimaryBtn, SectionHeader } from '../components/UI';
import { reviews } from '../data';

const filters = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

export function CategoriesScreen() {
  const { navigate, goBack } = useApp();
  const [selected, setSelected] = useState('All');
  const [sort, setSort] = useState('Relevance');
  const [showSort, setShowSort] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  const filtered = products.filter(p => selected === 'All' || p.category === selected.toLowerCase().replace(' & ', '-').replace('home', 'home'));

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff' }}>
        <div style={{ paddingTop: 44 }}>
          <div className="flex items-center px-5 py-3 gap-3">
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#111827', flex: 1 }}>Explore</h1>
            <button onClick={() => setShowSort(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: '#EEF0FF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, color: '#5B4EFF' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>
              Sort
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: '#F7F8FA', fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, color: '#374151', border: '1.5px solid #E8EBEF' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter
            </button>
          </div>
        </div>
        <div className="px-5 mb-3">
          <SearchBar placeholder="Search in all categories..." />
        </div>
        <div className="flex gap-2 overflow-x-auto px-5 pb-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setSelected(f)}
              className="px-4 py-2 rounded-full flex-shrink-0 transition-all"
              style={{
                background: selected === f ? '#5B4EFF' : '#F7F8FA',
                color: selected === f ? '#fff' : '#374151',
                fontFamily: 'Outfit', fontWeight: 600, fontSize: 13,
                border: selected === f ? 'none' : '1.5px solid #E8EBEF',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4" style={{ paddingBottom: 84 }}>
        {selected === 'All' && (
          <div className="mb-6">
            <SectionHeader title="Shop by Category" />
            <div className="grid grid-cols-3 gap-3 mb-6">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelected(cat.name)} className="card p-3 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: cat.color }}>{cat.icon}</div>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 11, color: '#374151', textAlign: 'center' }}>{cat.name}</span>
                  <span style={{ fontSize: 10, color: '#8892A4' }}>{cat.productCount}+</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontSize: 13, color: '#8892A4' }}><strong style={{ color: '#111827' }}>{filtered.length}</strong> products found</p>
          <span style={{ fontSize: 12, color: '#5B4EFF', fontWeight: 600, fontFamily: 'Outfit' }}>Sort: {sort}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-4">
          {filtered.map(p => (
            <div key={p.id} className="card overflow-hidden cursor-pointer active:scale-[0.97] transition-transform" onClick={() => navigate('product', { productId: p.id })}>
              <div className="relative" style={{ height: 160, background: '#F7F8FA' }}>
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                {p.discount > 0 && <div className="absolute top-2 left-2"><Badge label={`-${p.discount}%`} /></div>}
                <div className="absolute top-2 right-2"><WishlistBtn productId={p.id} /></div>
              </div>
              <div className="p-3">
                <p style={{ fontSize: 10, color: '#8892A4', fontWeight: 500, fontFamily: 'Outfit', marginBottom: 1 }}>{p.brand}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontFamily: 'Outfit', lineHeight: 1.3, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{p.name}</p>
                <StarRating rating={p.rating} small />
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827' }}>${p.price}</span>
                  {p.originalPrice > p.price && <span style={{ fontSize: 11, color: '#8892A4', textDecoration: 'line-through' }}>${p.originalPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSort && (
        <>
          <div className="overlay" onClick={() => setShowSort(false)} />
          <div className="bottom-sheet px-5 pt-5">
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: '#E8EBEF' }} />
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 16 }}>Sort by</h3>
            {sortOptions.map(opt => (
              <button key={opt} onClick={() => { setSort(opt); setShowSort(false); }} className="w-full flex items-center justify-between py-4">
                <span style={{ fontFamily: 'Outfit', fontSize: 15, color: sort === opt ? '#5B4EFF' : '#374151', fontWeight: sort === opt ? 700 : 500 }}>{opt}</span>
                {sort === opt && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B4EFF" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProductDetailScreen({ productId }: { productId: string }) {
  const { navigate, goBack, addToCart, cartCount } = useApp();
  const product = products.find(p => p.id === productId) || products[0];
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || '');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedColor, qty, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const colorDots: Record<string, string> = {
    'Midnight Black': '#111827', 'Pearl White': '#F9FAFB', 'Rose Gold': '#F4A0A0',
    'Electric Blue': '#3B82F6', 'Volt Green': '#22C55E', 'Stealth Grey': '#6B7280',
    'Graphite': '#4B5563', 'Silver': '#D1D5DB', 'Gold': '#F59E0B',
    'Matte White': '#F9FAFB', 'Matte Black': '#111827',
    'Sage Green': '#84CC16', 'Lavender': '#A78BFA', 'Terracotta': '#EA580C', 'Slate Blue': '#6366F1',
    'Midnight Navy': '#1E3A5F', 'Forest Green': '#166534', 'Stone Beige': '#D4A574',
    'Charcoal': '#374151', 'Navy': '#1E3A8A', 'Olive': '#65A30D',
    'Standard': '#5B4EFF',
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#fff' }}>
      {/* Image Gallery */}
      <div className="relative" style={{ height: 360, background: '#F7F8FA', flexShrink: 0 }}>
        <div style={{ paddingTop: 44 }} className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3">
          <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div className="flex gap-2">
            <WishlistBtn productId={product.id} />
            <button onClick={() => navigate('cart')} className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#111827' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount > 0 && <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: '#FF4D6A', fontSize: 8, color: '#fff', fontWeight: 700 }}>{cartCount}</div>}
            </button>
          </div>
        </div>
        <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
          {product.images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} className="w-10 h-10 rounded-xl overflow-hidden border-2 transition-all" style={{ borderColor: i === activeImg ? '#5B4EFF' : 'transparent' }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        {product.discount > 0 && <div className="absolute bottom-4 left-4"><Badge label={`${product.discount}% OFF`} /></div>}
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <p style={{ fontSize: 12, color: '#8892A4', fontFamily: 'Outfit', fontWeight: 600, marginBottom: 3 }}>{product.brand}</p>
              <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: '#111827', lineHeight: 1.3 }}>{product.name}</h1>
            </div>
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#F7F8FA' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating} count={product.reviewCount} />
            <div style={{ width: 1, height: 14, background: '#E8EBEF' }} />
            <span style={{ fontSize: 12, color: product.inStock ? '#22C55E' : '#FF4D6A', fontWeight: 600, fontFamily: 'Outfit' }}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-5">
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#5B4EFF' }}>${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span style={{ fontSize: 16, color: '#8892A4', textDecoration: 'line-through' }}>${product.originalPrice}</span>
                <Badge label={`Save $${(product.originalPrice - product.price).toFixed(0)}`} color="#22C55E" />
              </>
            )}
          </div>

          {/* Colors */}
          <div className="mb-5">
            <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 10 }}>
              Color: <span style={{ color: '#111827', fontWeight: 700 }}>{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{ background: colorDots[color] || '#999', borderColor: selectedColor === color ? '#5B4EFF' : 'transparent', boxShadow: selectedColor === color ? '0 0 0 3px rgba(91,78,255,0.2)' : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-5">
              <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 10 }}>
                Size: <span style={{ color: '#111827', fontWeight: 700 }}>{selectedSize}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-xl border-2 transition-all"
                    style={{
                      borderColor: selectedSize === size ? '#5B4EFF' : '#E8EBEF',
                      background: selectedSize === size ? '#EEF0FF' : '#fff',
                      color: selectedSize === size ? '#5B4EFF' : '#374151',
                      fontFamily: 'Outfit', fontWeight: 600, fontSize: 13,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#374151' }}>Quantity</p>
            <div className="flex items-center gap-3 px-1 py-1 rounded-2xl" style={{ background: '#F7F8FA', border: '1.5px solid #E8EBEF' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: qty > 1 ? '#5B4EFF' : '#E8EBEF', color: qty > 1 ? '#fff' : '#8892A4' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#111827', minWidth: 20, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#5B4EFF', color: '#fff' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-4 border-b" style={{ borderColor: '#E8EBEF' }}>
            {(['desc', 'specs', 'reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-2.5 text-center transition-all" style={{
                fontFamily: 'Outfit', fontWeight: 600, fontSize: 13,
                color: activeTab === tab ? '#5B4EFF' : '#8892A4',
                borderBottom: activeTab === tab ? '2px solid #5B4EFF' : '2px solid transparent',
              }}>
                {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specs' : 'Reviews'}
              </button>
            ))}
          </div>

          {activeTab === 'desc' && (
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>
          )}
          {activeTab === 'specs' && (
            <div className="mb-6">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex py-3" style={{ borderBottom: '1px solid #F0F2F5' }}>
                  <span style={{ flex: 1, fontSize: 13, color: '#8892A4', fontWeight: 500 }}>{k}</span>
                  <span style={{ flex: 1, fontSize: 13, color: '#111827', fontWeight: 600, fontFamily: 'Outfit' }}>{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="mb-6 flex flex-col gap-4">
              {reviews.map(r => (
                <div key={r.id} className="card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#EEF0FF', color: '#5B4EFF', fontFamily: 'Outfit' }}>{r.avatar}</div>
                    <div>
                      <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#111827' }}>{r.user}</p>
                      <p style={{ fontSize: 11, color: '#8892A4' }}>{r.date}</p>
                    </div>
                    <div className="ml-auto"><StarRating rating={r.rating} small /></div>
                  </div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{r.comment}</p>
                  <button style={{ fontSize: 12, color: '#8892A4', marginTop: 8 }}>👍 Helpful ({r.helpful})</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-4 flex gap-3" style={{ background: '#fff', borderTop: '1px solid #E8EBEF', paddingBottom: 20 }}>
        <button
          onClick={() => navigate('cart')}
          className="flex-1 py-4 rounded-2xl border-2 text-center"
          style={{ borderColor: '#5B4EFF', fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#5B4EFF' }}
        >
          View Cart
        </button>
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="flex-1 py-4 rounded-2xl text-center transition-all active:scale-95"
          style={{ background: added ? '#22C55E' : '#5B4EFF', fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#fff' }}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
