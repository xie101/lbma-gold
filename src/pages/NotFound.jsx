import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] flex flex-col items-center justify-center pb-10">
      <div className="flex items-center px-4 pt-3 pb-4 self-stretch">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1"></span>
      </div>
      <h2 style={{ color: 'var(--brand)', fontSize: 48, fontWeight: 700 }}>404</h2>
      <p style={{ color: '#999', marginTop: 10 }}>Page Not Found</p>
      <button onClick={() => nav('/home')}
        style={{ marginTop: 20, background: 'var(--brand)', color: '#000', border: 'none', padding: '10px 30px', borderRadius: 20, cursor: 'pointer', fontSize: 14 }}>
        Go Home
      </button>
    </div>
  );
}
