import { useState } from 'react';
import { useApp } from '../context';
import { StatusBar, PrimaryBtn } from '../components/UI';

function OnboardingSlide({ title, sub, emoji, bg }: { title: string; sub: string; emoji: string; bg: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 gap-6">
      <div className="w-48 h-48 rounded-[40px] flex items-center justify-center text-8xl" style={{ background: bg }}>
        {emoji}
      </div>
      <div>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#111827', lineHeight: 1.2, marginBottom: 12 }}>{title}</h2>
        <p style={{ fontSize: 15, color: '#8892A4', lineHeight: 1.7 }}>{sub}</p>
      </div>
    </div>
  );
}

export function SplashScreen() {
  const { navigate } = useApp();
  setTimeout(() => navigate('onboarding'), 2200);
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: '#5B4EFF' }}>
      <div className="flex flex-col items-center gap-4 fade-in">
        <div className="w-20 h-20 rounded-[28px] bg-white flex items-center justify-center shadow-2xl">
          <span style={{ fontSize: 40 }}>🛍️</span>
        </div>
        <div className="text-center">
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 36, color: '#fff', letterSpacing: '-0.5px' }}>Shopra</h1>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Your premium shopping destination</p>
        </div>
      </div>
      <div className="absolute bottom-16 flex gap-2">
        {[0, 1, 2].map(i => <div key={i} className={`progress-step ${i === 0 ? 'active' : ''}`} />)}
      </div>
    </div>
  );
}

export function OnboardingScreen() {
  const { navigate } = useApp();
  const [slide, setSlide] = useState(0);
  const slides = [
    { title: 'Discover Amazing Products', sub: 'Browse thousands of curated items from top brands worldwide.', emoji: '🎁', bg: '#EEF0FF' },
    { title: 'Fast & Secure Checkout', sub: 'One-tap checkout with your saved addresses and payment methods.', emoji: '⚡', bg: '#FFF0F3' },
    { title: 'Track Every Order', sub: 'Real-time tracking from warehouse to your doorstep.', emoji: '📦', bg: '#F0FFF4' },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: '#fff' }}>
      <StatusBar />
      <div className="flex-1 flex flex-col justify-center">
        <OnboardingSlide {...slides[slide]} />
      </div>
      <div className="px-6 pb-10 flex flex-col gap-4">
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, i) => <div key={i} className={`progress-step ${i === slide ? 'active' : ''}`} />)}
        </div>
        {slide < slides.length - 1 ? (
          <div className="flex gap-3">
            <button onClick={() => navigate('login')} className="flex-1 py-4 rounded-2xl text-center" style={{ fontFamily: 'Outfit', fontWeight: 600, color: '#8892A4', fontSize: 15 }}>Skip</button>
            <div className="flex-[2]"><PrimaryBtn onClick={() => setSlide(s => s + 1)}>Next →</PrimaryBtn></div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <PrimaryBtn onClick={() => navigate('signup')}>Get Started Free</PrimaryBtn>
            <button onClick={() => navigate('login')} style={{ fontFamily: 'Outfit', fontWeight: 600, color: '#5B4EFF', fontSize: 15 }}>I already have an account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function LoginScreen() {
  const { navigate, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); login(); }, 1400);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#fff' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center" style={{ background: '#EEF0FF' }}>
            <span style={{ fontSize: 24 }}>🛍️</span>
          </div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 30, color: '#111827', marginBottom: 8 }}>Welcome back</h1>
          <p style={{ fontSize: 15, color: '#8892A4' }}>Sign in to continue shopping</p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit', display: 'block', marginBottom: 8 }}>Email address</label>
            <input className="input-field" type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit', display: 'block', marginBottom: 8 }}>Password</label>
            <div className="relative">
              <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 48 }} />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#8892A4' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={showPass ? 'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24' : 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'}/>{showPass ? <line x1="1" y1="1" x2="23" y2="23"/> : <circle cx="12" cy="12" r="3"/>}</svg>
              </button>
            </div>
          </div>
          <button onClick={() => navigate('forgot')} className="text-right" style={{ fontSize: 13, color: '#5B4EFF', fontWeight: 600, fontFamily: 'Outfit' }}>Forgot password?</button>
        </div>

        <PrimaryBtn onClick={handleLogin} loading={loading}>Sign In</PrimaryBtn>

        <div className="flex items-center gap-3 my-6">
          <div style={{ flex: 1, height: 1, background: '#E8EBEF' }} />
          <span style={{ fontSize: 13, color: '#8892A4', fontFamily: 'Inter' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: '#E8EBEF' }} />
        </div>

        <div className="flex gap-3 mb-8">
          {[['G', '#EA4335', 'Google'], ['f', '#1877F2', 'Facebook'], ['🍎', '#000', 'Apple']].map(([icon, color, label]) => (
            <button key={label} className="flex-1 py-3 rounded-2xl border flex items-center justify-center gap-2" style={{ borderColor: '#E8EBEF', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, color: '#374151' }}>
              <span style={{ color: color === '#EA4335' ? color : undefined, fontSize: icon === '🍎' ? 16 : 14, fontWeight: 700 }}>{icon}</span>
            </button>
          ))}
        </div>

        <p className="text-center" style={{ fontSize: 14, color: '#8892A4' }}>
          Don&apos;t have an account?{' '}
          <button onClick={() => navigate('signup')} style={{ color: '#5B4EFF', fontWeight: 700, fontFamily: 'Outfit' }}>Sign up</button>
        </p>
      </div>
    </div>
  );
}

export function SignupScreen() {
  const { navigate } = useApp();
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('otp'); }, 1200);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#fff' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10">
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 30, color: '#111827', marginBottom: 8 }}>Create account</h1>
          <p style={{ fontSize: 15, color: '#8892A4' }}>Join millions of happy shoppers</p>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          {[
            { label: 'Full name', placeholder: 'Alex Morgan', type: 'text' },
            { label: 'Email address', placeholder: 'alex@example.com', type: 'email' },
            { label: 'Phone number', placeholder: '+1 (555) 000-0000', type: 'tel' },
            { label: 'Password', placeholder: 'At least 8 characters', type: 'password' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit', display: 'block', marginBottom: 8 }}>{f.label}</label>
              <input className="input-field" type={f.type} placeholder={f.placeholder} />
            </div>
          ))}
        </div>
        <div className="mb-6 flex gap-2 items-start">
          <input type="checkbox" id="terms" className="mt-0.5" style={{ accentColor: '#5B4EFF' }} />
          <label htmlFor="terms" style={{ fontSize: 13, color: '#8892A4', lineHeight: 1.5 }}>
            I agree to the <span style={{ color: '#5B4EFF', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: '#5B4EFF', fontWeight: 600 }}>Privacy Policy</span>
          </label>
        </div>
        <PrimaryBtn onClick={handleSignup} loading={loading}>Create Account</PrimaryBtn>
        <p className="text-center mt-6" style={{ fontSize: 14, color: '#8892A4' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('login')} style={{ color: '#5B4EFF', fontWeight: 700, fontFamily: 'Outfit' }}>Sign in</button>
        </p>
      </div>
    </div>
  );
}

export function OTPScreen() {
  const { login } = useApp();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const handleChange = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); login(); }, 1200);
  };

  return (
    <div className="flex flex-col h-full px-6 pt-4 pb-10" style={{ background: '#fff' }}>
      <StatusBar />
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl" style={{ background: '#EEF0FF' }}>📱</div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 10 }}>Verify your phone</h1>
          <p style={{ fontSize: 14, color: '#8892A4', lineHeight: 1.6 }}>We sent a 4-digit code to<br/><strong style={{ color: '#374151' }}>+1 (555) 000-0000</strong></p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((val, i) => (
            <input
              key={i}
              maxLength={1}
              value={val}
              onChange={e => handleChange(e.target.value, i)}
              className="text-center font-bold text-2xl rounded-2xl border-2 outline-none transition-colors"
              style={{ width: 64, height: 64, borderColor: val ? '#5B4EFF' : '#E8EBEF', fontFamily: 'Outfit', background: val ? '#EEF0FF' : '#F7F8FA', color: '#111827' }}
            />
          ))}
        </div>
        <PrimaryBtn onClick={handleVerify} loading={loading} disabled={otp.some(v => !v)}>Verify & Continue</PrimaryBtn>
        <div className="text-center mt-6">
          {resent ? <p style={{ fontSize: 14, color: '#22C55E', fontWeight: 600 }}>Code resent! ✓</p> : (
            <button onClick={() => setResent(true)} style={{ fontSize: 14, color: '#8892A4' }}>
              Didn&apos;t receive code? <span style={{ color: '#5B4EFF', fontWeight: 700 }}>Resend</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordScreen() {
  const { navigate, goBack } = useApp();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="flex flex-col h-full px-6 pt-4 pb-10" style={{ background: '#fff' }}>
      <StatusBar />
      <button onClick={goBack} className="mb-6 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#F7F8FA' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      </button>
      {!sent ? (
        <>
          <div className="mb-8">
            <div className="text-5xl mb-6">🔐</div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 8 }}>Forgot password?</h1>
            <p style={{ fontSize: 15, color: '#8892A4', lineHeight: 1.6 }}>No worries. Enter your email and we&apos;ll send you a reset link.</p>
          </div>
          <div className="mb-6">
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'Outfit', display: 'block', marginBottom: 8 }}>Email address</label>
            <input className="input-field" type="email" placeholder="alex@example.com" />
          </div>
          <PrimaryBtn onClick={handleSend} loading={loading}>Send Reset Link</PrimaryBtn>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <div className="text-6xl">📬</div>
          <div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#111827', marginBottom: 10 }}>Check your email</h2>
            <p style={{ fontSize: 15, color: '#8892A4', lineHeight: 1.6 }}>We sent a password reset link to<br/><strong style={{ color: '#374151' }}>alex@example.com</strong></p>
          </div>
          <PrimaryBtn onClick={() => navigate('login')}>Back to Sign In</PrimaryBtn>
        </div>
      )}
    </div>
  );
}
