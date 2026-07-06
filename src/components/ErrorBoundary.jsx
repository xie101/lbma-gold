import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('[ErrorBoundary]', err, info?.componentStack); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0e1a', color: '#999', gap: 16 }}>
          <h2 style={{ color: 'var(--brand, #c9a44c)', fontSize: 24, margin: 0 }}>Something went wrong</h2>
          <button onClick={() => window.location.href = '/home'} style={{ background: 'var(--brand, #c9a44c)', color: '#000', border: 'none', padding: '10px 30px', borderRadius: 20, cursor: 'pointer', fontSize: 14 }}>Go Home</button>
        </div>
      );
    }
    return this.props.children;
  }
}
