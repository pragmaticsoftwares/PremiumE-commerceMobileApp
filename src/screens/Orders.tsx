import { useState } from 'react';
import { useApp } from '../context';
import { mockOrders } from '../data';
import { TopBar, Badge, EmptyState } from '../components/UI';

const statusConfig = {
  processing: { label: 'Processing', color: '#F59E0B', bg: '#FFFBEB', icon: '⏳' },
  shipped: { label: 'Shipped', color: '#5B4EFF', bg: '#EEF0FF', icon: '📦' },
  'out-for-delivery': { label: 'Out for Delivery', color: '#3B82F6', bg: '#EFF6FF', icon: '🚚' },
  delivered: { label: 'Delivered', color: '#22C55E', bg: '#F0FFF4', icon: '✅' },
  cancelled: { label: 'Cancelled', color: '#FF4D6A', bg: '#FFF0F3', icon: '❌' },
};

const trackingSteps = [
  { label: 'Order Placed', sub: 'Aug 28, 10:14 AM' },
  { label: 'Processing', sub: 'Aug 28, 11:30 AM' },
  { label: 'Shipped', sub: 'Aug 29, 9:00 AM' },
  { label: 'Out for Delivery', sub: 'Aug 31, 7:45 AM' },
  { label: 'Delivered', sub: 'Pending' },
];

export function OrdersScreen() {
  const { navigate, goBack } = useApp();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filtered = mockOrders.filter(o => filter === 'All' || o.status === filter.toLowerCase().replace(' ', '-').replace('out-for-delivery', 'out-for-delivery'));

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="My Orders" />
        <div className="flex gap-2 overflow-x-auto px-5 pb-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full flex-shrink-0 transition-all"
              style={{
                background: filter === f ? '#5B4EFF' : '#F7F8FA',
                color: filter === f ? '#fff' : '#374151',
                fontFamily: 'Outfit', fontWeight: 600, fontSize: 12,
                border: filter === f ? 'none' : '1.5px solid #E8EBEF',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="📦" title="No orders yet" body="Your order history will appear here once you've placed your first order." />
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 84 }}>
          {filtered.map(order => {
            const cfg = statusConfig[order.status];
            return (
              <button key={order.id} onClick={() => navigate('order-detail', { orderId: order.id })} className="card p-4 w-full text-left">
                <div className="flex items-center justify-between mb-3">
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>{order.id}</p>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: cfg.bg }}>
                    <span style={{ fontSize: 11 }}>{cfg.icon}</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 11, color: cfg.color }}>{cfg.label}</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="w-14 h-14 rounded-xl overflow-hidden" style={{ background: '#F7F8FA' }}>
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: '#EEF0FF' }}>
                      <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#5B4EFF' }}>+{order.items.length - 3}</span>
                    </div>
                  )}
                </div>
                <div style={{ height: 1, background: '#F0F2F5', marginBottom: 12 }} />
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 12, color: '#8892A4' }}>Ordered {order.date}</p>
                    <p style={{ fontSize: 12, color: '#374151', marginTop: 1 }}>{order.items.length} item{order.items.length > 1 ? 's' : ''} · <strong style={{ color: '#5B4EFF', fontFamily: 'Outfit' }}>${order.total.toFixed(2)}</strong></p>
                  </div>
                  {order.status === 'out-for-delivery' && (
                    <span style={{ fontSize: 12, color: '#3B82F6', fontWeight: 600, fontFamily: 'Outfit' }}>📍 Track Live</span>
                  )}
                  {order.status === 'delivered' && (
                    <button className="px-3 py-1.5 rounded-xl" style={{ background: '#EEF0FF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 11, color: '#5B4EFF' }}>Rate Order</button>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function OrderDetailScreen({ orderId }: { orderId: string }) {
  const { goBack } = useApp();
  const order = mockOrders.find(o => o.id === orderId) || mockOrders[0];
  const cfg = statusConfig[order.status];
  const statusIdx = { processing: 0, shipped: 2, 'out-for-delivery': 3, delivered: 4, cancelled: -1 }[order.status];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Order Details" onBack={goBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 20 }}>
        {/* Status header */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p style={{ fontSize: 12, color: '#8892A4', fontFamily: 'Inter', marginBottom: 2 }}>Order ID</p>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827' }}>{order.id}</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: cfg.bg }}>
              <span>{cfg.icon}</span>
              <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, color: cfg.color }}>{cfg.label}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div><p style={{ fontSize: 11, color: '#8892A4' }}>Ordered on</p><p style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit' }}>{order.date}</p></div>
            <div><p style={{ fontSize: 11, color: '#8892A4' }}>Tracking ID</p><p style={{ fontSize: 13, fontWeight: 600, color: '#5B4EFF', fontFamily: 'Outfit' }}>{order.trackingId}</p></div>
            <div><p style={{ fontSize: 11, color: '#8892A4' }}>Est. Delivery</p><p style={{ fontSize: 13, fontWeight: 600, color: '#22C55E', fontFamily: 'Outfit' }}>{order.estimatedDelivery}</p></div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="card p-4">
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16 }}>Shipment Tracking</p>
          {trackingSteps.map((step, i) => {
            const done = i <= statusIdx;
            const active = i === statusIdx;
            return (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: done ? '#5B4EFF' : '#F0F2F5', border: active ? '3px solid #EEF0FF' : 'none' }}>
                    {done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      : <div className="w-3 h-3 rounded-full" style={{ background: '#E8EBEF' }} />}
                  </div>
                  {i < trackingSteps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: i < statusIdx ? '#5B4EFF' : '#E8EBEF', margin: '4px 0' }} />}
                </div>
                <div className="pb-5">
                  <p style={{ fontFamily: 'Outfit', fontWeight: done ? 700 : 500, fontSize: 14, color: done ? '#111827' : '#8892A4' }}>{step.label}</p>
                  <p style={{ fontSize: 12, color: '#8892A4', marginTop: 1 }}>{step.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Items */}
        <div className="card p-4">
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 12 }}>Items ({order.items.length})</p>
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3 py-3" style={{ borderBottom: i < order.items.length - 1 ? '1px solid #F0F2F5' : 'none' }}>
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: '#F7F8FA' }}>
                <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#111827' }}>{item.product.name}</p>
                <p style={{ fontSize: 11, color: '#8892A4', marginTop: 1 }}>{item.color} · Qty: {item.qty}</p>
              </div>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#5B4EFF' }}>${(item.product.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="card p-4">
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 12 }}>Delivery Address</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{order.address.name}</p>
          <p style={{ fontSize: 13, color: '#8892A4', marginTop: 2 }}>{order.address.line1}</p>
          <p style={{ fontSize: 13, color: '#8892A4' }}>{order.address.city}, {order.address.state} {order.address.zip}</p>
          <p style={{ fontSize: 13, color: '#8892A4', marginTop: 1 }}>{order.address.phone}</p>
        </div>

        {/* Total */}
        <div className="card p-4">
          <div className="flex justify-between"><span style={{ fontSize: 14, color: '#374151' }}>Order Total</span><span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#5B4EFF' }}>${order.total.toFixed(2)}</span></div>
        </div>

        {order.status === 'delivered' && (
          <button className="w-full py-4 rounded-2xl border-2 text-center" style={{ borderColor: '#FF4D6A', fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#FF4D6A' }}>
            Return / Exchange
          </button>
        )}
      </div>
    </div>
  );
}
