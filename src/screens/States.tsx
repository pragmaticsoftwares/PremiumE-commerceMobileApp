import { useApp } from '../context';
import { PrimaryBtn } from '../components/UI';

export function LoadingScreen() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6" style={{ background: '#fff' }}>
      <div className="relative w-20 h-20">
        <div className="w-20 h-20 rounded-full border-4 border-t-[#5B4EFF] border-r-[#EEF0FF] border-b-[#EEF0FF] border-l-[#EEF0FF] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">🛍️</div>
      </div>
      <div className="text-center">
        <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 6 }}>Loading...</p>
        <p style={{ fontSize: 14, color: '#8892A4' }}>Fetching your products</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="w-2 h-2 rounded-full shimmer" style={{ background: '#E8EBEF', animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

export function ErrorScreen() {
  const { goBack } = useApp();
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center gap-5" style={{ background: '#fff' }}>
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl" style={{ background: '#FFF0F3' }}>⚠️</div>
      <div>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, color: '#111827', marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ fontSize: 14, color: '#8892A4', lineHeight: 1.7 }}>We couldn&apos;t load the content. Please check your connection and try again.</p>
      </div>
      <div className="w-full flex flex-col gap-3">
        <PrimaryBtn onClick={goBack}>Try Again</PrimaryBtn>
        <PrimaryBtn onClick={goBack} outline>Go Back</PrimaryBtn>
      </div>
    </div>
  );
}

export function OfflineScreen() {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center gap-5" style={{ background: '#fff' }}>
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl" style={{ background: '#F7F8FA' }}>📡</div>
      <div>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, color: '#111827', marginBottom: 8 }}>You&apos;re Offline</h2>
        <p style={{ fontSize: 14, color: '#8892A4', lineHeight: 1.7 }}>It looks like you&apos;re not connected to the internet. Check your Wi-Fi or mobile data and try again.</p>
      </div>
      <div className="card p-4 w-full flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#F7F8FA' }}>🔌</div>
        <div className="text-left">
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#111827' }}>No internet connection</p>
          <p style={{ fontSize: 12, color: '#8892A4' }}>Last synced: 5 minutes ago</p>
        </div>
      </div>
      <PrimaryBtn onClick={() => {}}>Retry Connection</PrimaryBtn>
    </div>
  );
}
