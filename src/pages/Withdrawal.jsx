import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { postWithdraw } from '../api';

const notyf = new Notyf({ position: { x: 'center', y: 'top' }, duration: 3000 });
const inp = { width: '100%', padding: '10px 12px', background: '#0a0e1a', border: '1px solid #374151', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' };

export default function Withdrawal() {
  const nav = useNavigate();
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!amount || !account) { notyf.error('Please fill all fields'); return; }
    setLoading(true);
    try { await postWithdraw({ amount: Number(amount), account, ifsc, type: 'bank' }); notyf.success('Withdrawal submitted'); nav('/withdrawal-history'); }
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
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          {[{ label: 'Account Number', val: account, set: setAccount, ph: 'Enter account number' }, { label: 'IFSC Code', val: ifsc, set: setIfsc, ph: 'IFSC code' }, { label: 'Amount (USDT)', val: amount, set: setAmount, ph: 'Enter amount', type: 'number' }].map(({ label, val, set, ph, type }, i) => (
            <div key={i}><label className="text-gray-400 text-xs block mb-2">{label}</label><input type={type || 'text'} style={inp} value={val} onChange={e => set(e.target.value)} placeholder={ph} required /></div>
          ))}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#c9a44c', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
