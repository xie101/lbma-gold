import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { postWithdraw, getProfile, getBank } from '../api';

const notyf = new Notyf({ position: { x: 'center', y: 'top' }, duration: 3000 });
const inp = { width: '100%', padding: '10px 12px', background: '#0a0e1a', border: '1px solid #374151', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' };

export default function Withdrawal() {
  const nav = useNavigate();
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile().then(r => setProfile(r.data?.data || r.data || {})).catch(() => {});
    getBank().then(r => { const d = r.data?.data || r.data || {}; if (d.account) { setAccount(d.account); setIfsc(d.ifsc || ''); } }).catch(() => {});
  }, []);

  const available = Number(profile.balance || 0) - Number(profile.frozen_balance || 0);

  const handle = async (e) => {
    e.preventDefault();
    if (!amount || !account) { notyf.error('Please fill all fields'); return; }
    if (!pwd) { notyf.error('Enter withdrawal password'); return; }
    if (Number(amount) > available) { notyf.error(`Exceeds available (${available.toFixed(2)})`); return; }
    setLoading(true);
    try { await postWithdraw({ amount: Number(amount), account, ifsc, type: 'bank', password: pwd }); notyf.success('Withdrawal submitted'); nav('/withdrawal-history'); }
    catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Bank Withdrawal</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mb-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4">
          <p className="text-gray-400 text-xs">Available Balance</p>
          <p className="text-[var(--brand)] text-2xl font-bold">{available.toFixed(2)} <span className="text-sm">USDT</span></p>
          {Number(profile.frozen_balance || 0) > 0 && <p className="text-gray-500 text-xs mt-1">Frozen: {profile.frozen_balance} USDT (pending withdrawal)</p>}
        </div>
      </div>
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          {[{ label: 'Account Number', val: account, set: setAccount, ph: 'Enter account number' }, { label: 'IFSC Code', val: ifsc, set: setIfsc, ph: 'IFSC code' }, { label: 'Amount (USDT)', val: amount, set: setAmount, ph: 'Enter amount', type: 'number', min: '0.01', step: '0.01' }].map(({ label, val, set, ph, type, min, step }, i) => (
            <div key={i}><label className="text-gray-400 text-xs block mb-2">{label}</label><input type={type || 'text'} min={min} step={step} style={inp} value={val} onChange={e => set(e.target.value)} placeholder={ph} required /></div>
          ))}
          <div><label className="text-gray-400 text-xs block mb-2">Withdrawal Password</label><input type="password" style={inp} value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Enter withdrawal password" required /></div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: 'var(--brand)', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
