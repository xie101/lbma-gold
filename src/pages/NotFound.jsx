import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="error-wrapper">
      <div className="content-wrapper">
        <h2 style={{ color: '#e7c907', fontSize: 48, fontWeight: 700 }}>404</h2>
        <p style={{ color: '#999', marginTop: 10 }}>Page Not Found</p>
        <button onClick={() => nav('/home')}
          style={{ marginTop: 20, background: '#e7c907', color: '#000', border: 'none', padding: '10px 30px', borderRadius: 20, cursor: 'pointer', fontSize: 14 }}>
          Go Home
        </button>
      </div>
    </div>
  );
}
