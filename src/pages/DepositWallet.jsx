import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { postDeposit } from '../api';
import { useTranslation } from 'react-i18next';

import { inp } from '../utils/inputs';

export default function DepositWallet() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('USDT');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!amount) { notyf.error('Please enter amount'); return; }
    setLoading(true);
    try { await postDeposit({ amount: Number(amount), type }); notyf.success('Deposit submitted'); nav('/deposit-history'); }
    catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Cryptocurrency Deposit</span>
        <span className="w-[18px]"></span>
      </div>
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          <div>
            <label className="text-gray-400 text-xs block mb-2">Currency</label>
            <select style={inp} value={type} onChange={e => setType(e.target.value)}>
              <option value="USDT">USDT (TRC20)</option>
              <option value="ETH">ETH (ERC20)</option>
              <option value="USDT_BSC">USDT (BSC)</option>
            </select>
          </div>
          <div><label className="text-gray-400 text-xs block mb-2">Amount</label><input type="number" min="0.01" step="0.01" style={inp} value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" required /></div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: 'var(--brand)', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
