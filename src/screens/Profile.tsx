import { useState } from 'react';
import { useApp } from '../context';
import { notifications, addresses, coupons } from '../data';
import { TopBar, PrimaryBtn, Badge } from '../components/UI';

function SettingRow({ icon, label, sub, color = '#EEF0FF', iconColor = '#5B4EFF', onPress, danger = false, value }: { icon: string; label: string; sub?: string; color?: string; iconColor?: string; onPress?: () => void; danger?: boolean; value?: string }) {
  return (
    <button onClick={onPress} className="flex items-center gap-3 w-full py-3.5">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: color }}>{icon}</div>
      <div className="flex-1 text-left">
        <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: danger ? '#FF4D6A' : '#111827' }}>{label}</p>
        {sub && <p style={{ fontSize: 12, color: '#8892A4', marginTop: 1 }}>{sub}</p>}
      </div>
      {value && <span style={{ fontSize: 13, color: '#8892A4', fontFamily: 'Inter' }}>{value}</span>}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={danger ? '#FF4D6A' : '#8892A4'} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  );
}

export function ProfileScreen() {
  const { logout, navigate } = useApp();

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <div className="px-5 pt-2 pb-6">
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#111827', marginBottom: 16 }}>Profile</h1>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold" style={{ background: 'linear-gradient(135deg, #5B4EFF, #FF4D6A)', color: '#fff', fontFamily: 'Outfit' }}>AM</div>
            <div className="flex-1">
              <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#111827' }}>Alex Morgan</p>
              <p style={{ fontSize: 13, color: '#8892A4', marginTop: 1 }}>alex@example.com</p>
              <p style={{ fontSize: 12, color: '#8892A4' }}>+1 (917) 555-0142</p>
            </div>
            <button onClick={() => navigate('profile-details')} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#EEF0FF' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4EFF" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3 mt-5">
            {[['Orders', '12'], ['Wishlist', '8'], ['Reviews', '5']].map(([label, val]) => (
              <div key={label} className="flex-1 text-center py-3 rounded-2xl" style={{ background: '#F7F8FA', border: '1.5px solid #E8EBEF' }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: '#5B4EFF' }}>{val}</p>
                <p style={{ fontSize: 11, color: '#8892A4', fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 84 }}>
        {/* Account */}
        <div className="card px-4 py-2">
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8892A4', fontFamily: 'Outfit', paddingTop: 8, paddingBottom: 4, letterSpacing: '0.05em' }}>ACCOUNT</p>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="👤" label="Personal Details" sub="Name, email, phone" onPress={() => navigate('profile-details')} /></div>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="📍" label="Saved Addresses" sub="2 addresses saved" color="#FFF0F3" iconColor="#FF4D6A" onPress={() => navigate('addresses')} /></div>
          <SettingRow icon="💳" label="Payment Methods" sub="Visa ****4242 · Mastercard" color="#FFFBEB" iconColor="#F59E0B" />
        </div>

        {/* Shopping */}
        <div className="card px-4 py-2">
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8892A4', fontFamily: 'Outfit', paddingTop: 8, paddingBottom: 4, letterSpacing: '0.05em' }}>SHOPPING</p>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="📦" label="My Orders" sub="12 orders total" color="#F0FFF4" iconColor="#22C55E" onPress={() => navigate('orders')} /></div>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="🤍" label="Wishlist" sub="8 saved items" onPress={() => navigate('wishlist')} /></div>
          <SettingRow icon="🎟️" label="Coupons & Offers" sub="3 active coupons" color="#FDF4FF" iconColor="#A855F7" onPress={() => navigate('offers')} />
        </div>

        {/* Settings */}
        <div className="card px-4 py-2">
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8892A4', fontFamily: 'Outfit', paddingTop: 8, paddingBottom: 4, letterSpacing: '0.05em' }}>SETTINGS</p>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="🔔" label="Notifications" onPress={() => navigate('notifications')} value="On" /></div>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="🌍" label="Language" value="English" /></div>
          <div style={{ borderBottom: '1px solid #F0F2F5' }}><SettingRow icon="💬" label="Help & Support" /></div>
          <SettingRow icon="⭐" label="Rate the App" /></div>

        {/* Logout */}
        <div className="card px-4 py-2">
          <SettingRow icon="🚪" label="Sign Out" danger onPress={logout} color="#FFF0F3" />
        </div>

        <p className="text-center pb-4" style={{ fontSize: 12, color: '#C4C9D4', fontFamily: 'Outfit' }}>Shopra v2.4.1 · Privacy Policy · Terms</p>
      </div>
    </div>
  );
}

export function ProfileDetailsScreen() {
  const { goBack } = useApp();
  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Personal Details" onBack={goBack} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-6 flex flex-col gap-4" style={{ paddingBottom: 20 }}>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #5B4EFF, #FF4D6A)', color: '#fff', fontFamily: 'Outfit' }}>AM</div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#5B4EFF' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
          </div>
        </div>
        {[
          { label: 'Full Name', value: 'Alex Morgan', type: 'text' },
          { label: 'Email Address', value: 'alex@example.com', type: 'email' },
          { label: 'Phone Number', value: '+1 (917) 555-0142', type: 'tel' },
          { label: 'Date of Birth', value: 'March 15, 1990', type: 'text' },
          { label: 'Gender', value: 'Prefer not to say', type: 'text' },
        ].map(f => (
          <div key={f.label}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit', display: 'block', marginBottom: 8 }}>{f.label}</label>
            <input className="input-field" type={f.type} defaultValue={f.value} />
          </div>
        ))}
        <div className="pt-2"><PrimaryBtn onClick={goBack}>Save Changes</PrimaryBtn></div>
      </div>
    </div>
  );
}

export function AddressesScreen() {
  const { navigate, goBack } = useApp();
  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Saved Addresses" onBack={goBack} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 20 }}>
        {addresses.map(addr => (
          <div key={addr.id} className="card p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: addr.type === 'home' ? '#EEF0FF' : '#FFF7ED' }}>{addr.type === 'home' ? '🏠' : '🏢'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>{addr.name}</p>
                  {addr.isDefault && <Badge label="DEFAULT" color="#5B4EFF" />}
                </div>
                <p style={{ fontSize: 13, color: '#374151' }}>{addr.line1}</p>
                <p style={{ fontSize: 13, color: '#374151' }}>{addr.city}, {addr.state} {addr.zip}</p>
                <p style={{ fontSize: 12, color: '#8892A4', marginTop: 2 }}>{addr.phone}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => navigate('add-address', { addressId: addr.id })} className="flex-1 py-2.5 rounded-xl border text-center" style={{ borderColor: '#E8EBEF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, color: '#374151' }}>Edit</button>
              {!addr.isDefault && <button className="flex-1 py-2.5 rounded-xl border text-center" style={{ borderColor: '#5B4EFF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, color: '#5B4EFF' }}>Set Default</button>}
            </div>
          </div>
        ))}
        <button onClick={() => navigate('add-address')} className="card p-4 flex items-center gap-3 w-full" style={{ border: '2px dashed #E8EBEF' }}>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#EEF0FF' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B4EFF" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#5B4EFF' }}>Add New Address</span>
        </button>
      </div>
    </div>
  );
}

export function AddAddressScreen() {
  const { goBack } = useApp();
  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Add Address" onBack={goBack} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 20 }}>
        <div className="flex gap-3 mb-2">
          {['home', 'work', 'other'].map(t => (
            <button key={t} className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1.5 border-2" style={{ borderColor: t === 'home' ? '#5B4EFF' : '#E8EBEF', background: t === 'home' ? '#EEF0FF' : '#fff' }}>
              <span>{t === 'home' ? '🏠' : t === 'work' ? '🏢' : '📌'}</span>
              <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, color: t === 'home' ? '#5B4EFF' : '#374151', textTransform: 'capitalize' }}>{t}</span>
            </button>
          ))}
        </div>
        {[
          { label: 'Full Name', placeholder: 'Recipient name' },
          { label: 'Phone Number', placeholder: '+1 (555) 000-0000' },
          { label: 'Address Line 1', placeholder: 'Street address' },
          { label: 'Address Line 2', placeholder: 'Apt, suite (optional)' },
          { label: 'City', placeholder: 'City' },
          { label: 'State', placeholder: 'State' },
          { label: 'ZIP Code', placeholder: 'ZIP / Postal code' },
        ].map(f => (
          <div key={f.label}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit', display: 'block', marginBottom: 8 }}>{f.label}</label>
            <input className="input-field" placeholder={f.placeholder} />
          </div>
        ))}
        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="default" style={{ accentColor: '#5B4EFF', width: 18, height: 18 }} />
          <label htmlFor="default" style={{ fontSize: 14, color: '#374151', fontFamily: 'Outfit', fontWeight: 500 }}>Set as default address</label>
        </div>
        <div className="pt-2"><PrimaryBtn onClick={goBack}>Save Address</PrimaryBtn></div>
      </div>
    </div>
  );
}

export function NotificationsScreen() {
  const { goBack } = useApp();
  const icons: Record<string, string> = { order: '📦', offer: '🔥', promo: '📣', social: '👍', price: '💰' };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Notifications" onBack={goBack} action={<button style={{ fontSize: 13, color: '#5B4EFF', fontWeight: 600, fontFamily: 'Outfit' }}>Mark all read</button>} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-3" style={{ paddingBottom: 20 }}>
        {notifications.map(n => (
          <div key={n.id} className="card p-4 flex gap-3" style={{ opacity: n.read ? 0.7 : 1 }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: n.read ? '#F7F8FA' : '#EEF0FF' }}>{icons[n.type]}</div>
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <p style={{ fontFamily: 'Outfit', fontWeight: n.read ? 500 : 700, fontSize: 14, color: '#111827', flex: 1, lineHeight: 1.4 }}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#5B4EFF' }} />}
              </div>
              <p style={{ fontSize: 12, color: '#8892A4', marginTop: 3, lineHeight: 1.5 }}>{n.body}</p>
              <p style={{ fontSize: 11, color: '#C4C9D4', marginTop: 4 }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OffersScreen() {
  const { goBack } = useApp();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F7F8FA' }}>
      <div style={{ background: '#fff', paddingTop: 44 }}>
        <TopBar title="Coupons & Offers" onBack={goBack} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 flex flex-col gap-4" style={{ paddingBottom: 20 }}>
        {/* Flash offer */}
        <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #5B4EFF 0%, #FF4D6A 100%)', padding: '20px' }}>
          <div className="text-3xl mb-3">🔥</div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 4 }}>Today Only!</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>Get an extra 10% off on everything. Use at checkout.</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 py-2.5 px-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.2)', border: '2px dashed rgba(255,255,255,0.5)' }}>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, color: '#fff', letterSpacing: '0.05em' }}>SHOPRA10</span>
            </div>
            <button onClick={() => copy('SHOPRA10')} className="px-4 py-2.5 rounded-xl" style={{ background: '#fff', fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#5B4EFF' }}>
              {copied === 'SHOPRA10' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {coupons.map(c => (
          <div key={c.code} className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: '#5B4EFF', letterSpacing: '0.03em' }}>{c.code}</span>
                  <Badge label={c.type === 'percent' ? `${c.discount}% OFF` : `$${c.discount} OFF`} color="#5B4EFF" />
                </div>
                <p style={{ fontSize: 13, color: '#374151' }}>{c.description}</p>
                <p style={{ fontSize: 11, color: '#8892A4', marginTop: 2 }}>Min. order: ${c.minOrder}</p>
              </div>
            </div>
            <div style={{ height: 1, borderTop: '2px dashed #E8EBEF', margin: '0 -16px 12px' }} />
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: '#22C55E', fontWeight: 600 }}>✓ Valid until Sep 30, 2026</span>
              <button onClick={() => copy(c.code)} className="px-4 py-1.5 rounded-xl" style={{ background: '#EEF0FF', fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#5B4EFF' }}>
                {copied === c.code ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
