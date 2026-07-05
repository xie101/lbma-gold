import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { setWithdrawPassword } from '../api';

import { inp } from '../utils/inputs';

export default function WithdrawPassword() {
  const nav = useNavigate();
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!pw || !confirm) { notyf.error('Fill all fields'); return; }
    if (pw !== confirm) { notyf.error('Passwords do not match'); return; }
    setLoading(true);
    try { await setWithdrawPassword({ withdrawPassword: pw }); notyf.success('Withdraw password set'); }
    catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Withdraw Password</span>
        <span className="w-[18px]"></span>
      </div>
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          <div><label className="text-gray-400 text-xs block mb-2">Withdraw Password</label><input type="password" style={inp} value={pw} onChange={e => setPw(e.target.value)} required /></div>
          <div><label className="text-gray-400 text-xs block mb-2">Confirm Password</label><input type="password" style={inp} value={confirm} onChange={e => setConfirm(e.target.value)} required /></div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: 'var(--brand)', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Setting...' : 'Set Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
