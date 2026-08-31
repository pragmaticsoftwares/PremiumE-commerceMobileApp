import { useState } from 'react';
import { useApp } from '../context';
import { coupons, addresses } from '../data';
import { TopBar, PrimaryBtn, EmptyState, Badge } from '../components/UI';

function QtyControl({ qty, onInc, onDec }: { qty: number; onInc: () => void; onDec: () => void }) {
  return (
    <div className="flex items-center gap-2 px-1 py-1 rounded-xl" style={{ background: '#F7F8FA', border: '1.5px solid #E8EBEF' }}>
      <button onClick={onDec} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#E8EBEF', color: '#374151' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827', minWidth: 18, textAlign: 'center' }}>{qty}</span>
      <button onClick={onInc} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#5B4EFF', color: '#fff' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
  );
}

export function CartScreen() {
  const { cart, updateQty, removeFromCart, navigate, goBack } = useApp();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const discount = appliedCoupon
    ? appliedCoupon.type === 'percent' ? subtotal * appliedCoupon.discount / 100 : appliedCoupon.discount
    : 0;
  const delivery = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + delivery;

  const applyCoupon = () => {
    const found = coupons.find(c => c.code === coupon.toUpperCase());
    if (!found) { setCouponError('Invalid coupon code'); return; }
    if (subtotal < found.minOrder) { setCouponError(`Minimum order $${found.minOrder} required`); return; }
    setAppliedCoupon(found);
    setCouponError('');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
        <div style={{ background: '#fff', paddingTop: 44 }}>
          <TopBar title="My Cart" onBack={goBack} />
        </div>
        <EmptyState icon="🛒" title="Your cart is empty" body="Add items from the shop to start your order." cta="Shop Now" onCta={() => navigate('categories')} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title={`My Cart (${cart.length})`} onBack={goBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 100 }}>
        {/* Cart items */}
        <div className="card p-4 flex flex-col gap-4">
          {cart.map((item, idx) => (
            <div key={`${item.product.id}-${item.color}`}>
              {idx > 0 && <div style={{ height: 1, background: '#F0F2F5', margin: '0 0 16px' }} />}
              <div className="flex gap-3">
                <div className="rounded-2xl overflow-hidden flex-shrink-0" style={{ width: 80, height: 80, background: '#F7F8FA' }}>
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 10, color: '#8892A4', fontFamily: 'Outfit', fontWeight: 500, marginBottom: 1 }}>{item.product.brand}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', fontFamily: 'Outfit', lineHeight: 1.3, marginBottom: 2 }}>{item.product.name}</p>
                  <p style={{ fontSize: 11, color: '#8892A4' }}>Color: {item.color}{item.size ? ` · Size: ${item.size}` : ''}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, color: '#5B4EFF' }}>
                      ${(item.product.price * item.qty).toFixed(2)}
                    </span>
                    <QtyControl qty={item.qty} onInc={() => updateQty(item.product.id, item.qty + 1)} onDec={() => updateQty(item.product.id, item.qty - 1)} />
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#FFF0F3', color: '#FF4D6A' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B4EFF" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827' }}>Apply Coupon</span>
          </div>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F0FFF4', border: '1.5px solid #22C55E' }}>
              <div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#166534' }}>{appliedCoupon.code}</p>
                <p style={{ fontSize: 12, color: '#16A34A' }}>{appliedCoupon.description}</p>
              </div>
              <button onClick={() => setAppliedCoupon(null)} style={{ color: '#16A34A', fontSize: 12, fontWeight: 600, fontFamily: 'Outfit' }}>Remove</button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  className="input-field flex-1"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  style={{ padding: '10px 14px' }}
                />
                <button onClick={applyCoupon} className="px-4 py-2.5 rounded-xl" style={{ background: '#5B4EFF', color: '#fff', fontFamily: 'Outfit', fontWeight: 700, fontSize: 14 }}>Apply</button>
              </div>
              {couponError && <p style={{ fontSize: 12, color: '#FF4D6A', marginTop: 6 }}>{couponError}</p>}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {coupons.map(c => (
                  <button key={c.code} onClick={() => setCoupon(c.code)} className="flex-shrink-0 px-3 py-1.5 rounded-xl" style={{ background: '#EEF0FF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 11, color: '#5B4EFF', border: '1px dashed #5B4EFF' }}>
                    {c.code}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="card p-4">
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 12 }}>Price Details</p>
          {[
            { label: `Subtotal (${cart.length} items)`, value: `$${subtotal.toFixed(2)}` },
            { label: 'Discount', value: `-$${discount.toFixed(2)}`, color: '#22C55E' },
            { label: 'Delivery', value: delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`, color: delivery === 0 ? '#22C55E' : undefined },
          ].map(row => (
            <div key={row.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid #F0F2F5' }}>
              <span style={{ fontSize: 14, color: '#374151' }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: row.color || '#111827' }}>{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between py-3 mt-1">
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, color: '#111827' }}>Total</span>
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#5B4EFF' }}>${total.toFixed(2)}</span>
          </div>
          {delivery === 0 && <p style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>🎉 You qualify for free shipping!</p>}
        </div>

        {/* Delivery estimate */}
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#EEF0FF' }}>🚚</div>
          <div>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>Estimated Delivery</p>
            <p style={{ fontSize: 13, color: '#22C55E', fontWeight: 600 }}>Sep 3–5, 2026 · Standard</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4" style={{ background: '#fff', borderTop: '1px solid #E8EBEF', paddingBottom: 20 }}>
        <PrimaryBtn onClick={() => navigate('checkout')}>
          Proceed to Checkout · ${total.toFixed(2)}
        </PrimaryBtn>
      </div>
    </div>
  );
}

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, Amex' },
  { id: 'apple', label: 'Apple Pay', icon: '🍎', sub: 'Touch ID or Face ID' },
  { id: 'google', label: 'Google Pay', icon: 'G', sub: 'Tap to pay instantly' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', sub: 'Redirect to PayPal' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', sub: 'Pay when delivered' },
];

const deliveryMethods = [
  { id: 'standard', label: 'Standard Delivery', eta: 'Sep 3–5', price: 'Free', icon: '📦' },
  { id: 'express', label: 'Express Delivery', eta: 'Sep 1', price: '$7.99', icon: '⚡' },
  { id: 'same', label: 'Same Day Delivery', eta: 'Today by 10 PM', price: '$14.99', icon: '🚀' },
];

export function CheckoutScreen() {
  const { cart, navigate, goBack } = useApp();
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('a1');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const delivery = deliveryMethod === 'express' ? 7.99 : deliveryMethod === 'same' ? 14.99 : 0;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('payment-success');
    }, 2000);
  };

  const steps = ['Address', 'Delivery', 'Payment', 'Review'];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Checkout" onBack={goBack} />
        {/* Step indicator */}
        <div className="flex items-center px-5 pb-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all" style={{
                  background: i + 1 <= step ? '#5B4EFF' : '#F0F2F5',
                  color: i + 1 <= step ? '#fff' : '#8892A4',
                  fontFamily: 'Outfit', fontWeight: 700, fontSize: 12,
                }}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 9, color: i + 1 === step ? '#5B4EFF' : '#8892A4', fontWeight: 600, fontFamily: 'Outfit', marginTop: 2 }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i + 1 < step ? '#5B4EFF' : '#E8EBEF', margin: '0 4px', marginBottom: 14 }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 100 }}>
        {/* Step 1: Address */}
        {step === 1 && (
          <>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#111827' }}>Select Delivery Address</p>
            {addresses.map(addr => (
              <button key={addr.id} onClick={() => setSelectedAddress(addr.id)} className="card p-4 w-full text-left transition-all" style={{ border: `2px solid ${selectedAddress === addr.id ? '#5B4EFF' : 'transparent'}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: addr.type === 'home' ? '#EEF0FF' : '#FFF7ED', flexShrink: 0 }}>
                    {addr.type === 'home' ? '🏠' : '🏢'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>{addr.name}</p>
                      {addr.isDefault && <Badge label="DEFAULT" color="#5B4EFF" />}
                    </div>
                    <p style={{ fontSize: 13, color: '#374151', marginTop: 2 }}>{addr.line1}</p>
                    <p style={{ fontSize: 13, color: '#374151' }}>{addr.city}, {addr.state} {addr.zip}</p>
                    <p style={{ fontSize: 12, color: '#8892A4', marginTop: 2 }}>{addr.phone}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: selectedAddress === addr.id ? '#5B4EFF' : '#E8EBEF' }}>
                    {selectedAddress === addr.id && <div className="w-3 h-3 rounded-full" style={{ background: '#5B4EFF' }} />}
                  </div>
                </div>
              </button>
            ))}
            <button onClick={() => navigate('add-address')} className="card p-4 flex items-center gap-3 w-full" style={{ border: '2px dashed #E8EBEF' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#EEF0FF' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B4EFF" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#5B4EFF' }}>Add New Address</span>
            </button>
          </>
        )}

        {/* Step 2: Delivery */}
        {step === 2 && (
          <>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#111827' }}>Choose Delivery Method</p>
            {deliveryMethods.map(m => (
              <button key={m.id} onClick={() => setDeliveryMethod(m.id)} className="card p-4 w-full text-left" style={{ border: `2px solid ${deliveryMethod === m.id ? '#5B4EFF' : 'transparent'}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: deliveryMethod === m.id ? '#EEF0FF' : '#F7F8FA' }}>{m.icon}</div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>{m.label}</p>
                    <p style={{ fontSize: 12, color: '#8892A4' }}>Arrives {m.eta}</p>
                  </div>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: m.price === 'Free' ? '#22C55E' : '#111827' }}>{m.price}</span>
                </div>
              </button>
            ))}
          </>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#111827' }}>Payment Method</p>
            {paymentMethods.map(m => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id)} className="card p-4 w-full text-left" style={{ border: `2px solid ${paymentMethod === m.id ? '#5B4EFF' : 'transparent'}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: paymentMethod === m.id ? '#EEF0FF' : '#F7F8FA', fontWeight: 700, fontFamily: 'Outfit', color: '#1877F2', fontSize: m.id === 'google' ? 14 : undefined }}>{m.icon}</div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>{m.label}</p>
                    <p style={{ fontSize: 12, color: '#8892A4' }}>{m.sub}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: paymentMethod === m.id ? '#5B4EFF' : '#E8EBEF' }}>
                    {paymentMethod === m.id && <div className="w-3 h-3 rounded-full" style={{ background: '#5B4EFF' }} />}
                  </div>
                </div>
              </button>
            ))}
          </>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <>
            <div className="card p-4">
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 12 }}>Order Summary</p>
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3 py-3" style={{ borderBottom: '1px solid #F0F2F5' }}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#F7F8FA' }}>
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', fontFamily: 'Outfit' }}>{item.product.name}</p>
                    <p style={{ fontSize: 11, color: '#8892A4' }}>Qty: {item.qty} · {item.color}</p>
                  </div>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#5B4EFF' }}>${(item.product.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between py-3">
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, color: '#111827' }}>Total</span>
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#5B4EFF' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-start gap-3">
                <span style={{ fontSize: 18 }}>{addresses.find(a => a.id === selectedAddress)?.type === 'home' ? '🏠' : '🏢'}</span>
                <div>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 2 }}>Delivering to</p>
                  <p style={{ fontSize: 13, color: '#374151' }}>{addresses.find(a => a.id === selectedAddress)?.line1}</p>
                  <p style={{ fontSize: 13, color: '#374151' }}>{addresses.find(a => a.id === selectedAddress)?.city}, {addresses.find(a => a.id === selectedAddress)?.state}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-5 py-4" style={{ background: '#fff', borderTop: '1px solid #E8EBEF', paddingBottom: 20 }}>
        {step < 4 ? (
          <PrimaryBtn onClick={() => setStep(s => s + 1)}>Continue →</PrimaryBtn>
        ) : (
          <PrimaryBtn onClick={handlePlaceOrder} loading={loading}>
            {loading ? 'Processing...' : `Place Order · $${total.toFixed(2)}`}
          </PrimaryBtn>
        )}
      </div>
    </div>
  );
}

export function PaymentSuccessScreen() {
  const { navigate } = useApp();
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center gap-6" style={{ background: '#fff' }}>
      <div className="relative">
        <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: '#F0FFF4' }}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xl" style={{ background: '#FFF' }}>🎉</div>
      </div>
      <div>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 10 }}>Order Confirmed!</h1>
        <p style={{ fontSize: 15, color: '#8892A4', lineHeight: 1.7 }}>Your order <strong style={{ color: '#374151' }}>#ORD-2024-9999</strong> has been placed successfully. You&apos;ll receive a confirmation email shortly.</p>
      </div>
      <div className="card p-4 w-full text-left">
        <div className="flex justify-between py-2"><span style={{ fontSize: 13, color: '#8892A4' }}>Order ID</span><span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#111827' }}>#ORD-2024-9999</span></div>
        <div className="flex justify-between py-2"><span style={{ fontSize: 13, color: '#8892A4' }}>Estimated Delivery</span><span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#22C55E' }}>Sep 3–5, 2026</span></div>
        <div className="flex justify-between py-2"><span style={{ fontSize: 13, color: '#8892A4' }}>Payment</span><span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#111827' }}>Credit Card ****4242</span></div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <PrimaryBtn onClick={() => navigate('orders')}>Track Order</PrimaryBtn>
        <PrimaryBtn onClick={() => navigate('home')} outline>Continue Shopping</PrimaryBtn>
      </div>
    </div>
  );
}

export function PaymentFailedScreen() {
  const { navigate, goBack } = useApp();
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center gap-6" style={{ background: '#fff' }}>
      <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: '#FFF0F3' }}>
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#FF4D6A" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      </div>
      <div>
        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 10 }}>Payment Failed</h1>
        <p style={{ fontSize: 15, color: '#8892A4', lineHeight: 1.7 }}>We couldn&apos;t process your payment. Your cart is saved — please try again with a different payment method.</p>
      </div>
      <div className="card p-4 w-full flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF0F3' }}>⚠️</div>
        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#111827' }}>Error: Insufficient funds</p>
          <p style={{ fontSize: 12, color: '#8892A4' }}>Code: CARD_DECLINED</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <PrimaryBtn onClick={goBack}>Try Again</PrimaryBtn>
        <PrimaryBtn onClick={() => navigate('home')} outline>Return to Home</PrimaryBtn>
      </div>
    </div>
  );
}
