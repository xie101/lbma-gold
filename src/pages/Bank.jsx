import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setBank, getBank } from '../api';
import { notyf } from '../utils/notify';

import { inp } from '../utils/inputs';

export default function Bank() {
  const nav = useNavigate();
  const { wallettype } = useParams();
  const [info, setInfo] = useState({ name: '', account: '', ifsc: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(null);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => { getBank().then(r => { const d = r.data?.data || r.data || {}; if (d.account) { setInfo({ name: d.name || '', account: d.account, ifsc: d.ifsc || '' }); setSaved(d); } }).catch(() => {}).finally(() => setInitLoading(false)); }, []);

  if (initLoading) return <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10"><Loading /></div>;
  const set = (k, v) => setInfo({ ...info, [k]: v });

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await setBank(info); notyf.success('Bank saved'); setSaved(info); }
    catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Bank Card{wallettype ? ` (${wallettype})` : ''}</span>
        <span className="w-[18px]"></span>
      </div>
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          {saved && <div className="text-green-400 text-xs bg-green-400/10 p-3 rounded">Bank info already saved ✓</div>}
          {[{ label: 'Bank Name', key: 'name', ph: 'Bank name' }, { label: 'Account Number', key: 'account', ph: 'Account number' }, { label: 'IFSC Code', key: 'ifsc', ph: 'IFSC code' }].map(({ label, key, ph }) => (
            <div key={key}><label className="text-gray-400 text-xs block mb-2">{label}</label><input type="text" style={inp} value={info[key]} onChange={e => set(key, e.target.value)} placeholder={ph} required={key !== 'ifsc'} /></div>
          ))}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: 'var(--brand)', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Saving...' : 'Save Bank'}
          </button>
        </div>
      </form>
    </div>
  );
}
