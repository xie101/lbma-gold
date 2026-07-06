export default function Loading({ text = 'Loading...' }) {
  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 14 }}>
      <span>{text}</span>
    </div>
  );
}
