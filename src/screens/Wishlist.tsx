import { useApp } from '../context';
import { products } from '../data';
import { Badge, StarRating, EmptyState, PrimaryBtn } from '../components/UI';

export function WishlistScreen() {
  const { wishlist, toggleWishlist, navigate } = useApp();
  const wishlisted = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <div className="px-5 py-4 flex items-center justify-between">
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#111827' }}>Wishlist</h1>
          {wishlisted.length > 0 && (
            <span style={{ fontSize: 13, color: '#8892A4', fontWeight: 500 }}>{wishlisted.length} items</span>
          )}
        </div>
      </div>

      {wishlisted.length === 0 ? (
        <EmptyState
          icon="🤍"
          title="Your wishlist is empty"
          body="Save items you love by tapping the heart icon on any product."
          cta="Explore Products"
          onCta={() => navigate('categories')}
        />
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pt-4" style={{ paddingBottom: 84 }}>
          <div className="flex flex-col gap-4">
            {wishlisted.map(product => (
              <div key={product.id} className="card flex overflow-hidden cursor-pointer" onClick={() => navigate('product', { productId: product.id })}>
                <div className="relative flex-shrink-0" style={{ width: 110, height: 110, background: '#F7F8FA' }}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  {product.discount > 0 && <div className="absolute top-1.5 left-1.5"><Badge label={`-${product.discount}%`} /></div>}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <p style={{ fontSize: 11, color: '#8892A4', fontWeight: 500, fontFamily: 'Outfit', marginBottom: 1 }}>{product.brand}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'Outfit', lineHeight: 1.3, marginBottom: 4 }}>{product.name}</p>
                    <StarRating rating={product.rating} count={product.reviewCount} small />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 17, color: '#5B4EFF' }}>${product.price}</span>
                      {product.originalPrice > product.price && <span style={{ fontSize: 12, color: '#8892A4', textDecoration: 'line-through' }}>${product.originalPrice}</span>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: '#FFF0F3' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4D6A" stroke="#FF4D6A" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); navigate('product', { productId: product.id }); }}
                        className="px-3 py-1.5 rounded-xl"
                        style={{ background: '#5B4EFF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 11, color: '#fff' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <PrimaryBtn onClick={() => navigate('categories')}>Continue Shopping</PrimaryBtn>
          </div>
        </div>
      )}
    </div>
  );
}
