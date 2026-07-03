import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Notyf } from 'notyf';
import { getProfile, submitOrder, vipList } from '../api';

const notyf = new Notyf({ position: { x: 'center', y: 'top' }, duration: 3000 });

export default function Shop() {
  const { tier } = useParams();
  const nav = useNavigate();
  const [profile, setProfile] = useState({});
  const [vip, setVip] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile().then(r => setProfile(r.data?.data || r.data || {})).catch(() => {});
    vipList().then(r => {
      const data = r.data?.data || r.data || {};
      const list = data.list || [];
      setVip(list.find(l => l.level === Number(tier)) || list[0] || null);
    }).catch(() => {});
  }, [tier]);

  const balance = Number(profile?.balance || 0);

  const start = async () => {
    if (balance <= 0) { notyf.error('Insufficient balance, please deposit first'); return; }
    setLoading(true);
    try {
      const r = await submitOrder({ tier: Number(tier) || 1, amount: balance });
      const orderNo = r.data?.data?.orderNo || r.data?.orderNo;
      notyf.success('Order submitted');
      nav('/order/' + orderNo);
    } catch (e) { notyf.error(e.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24"
      style={{ backgroundImage: "url('/images/buy_beijing.png')" }}>
      <div className="flex items-center justify-between px-3 pt-8 pb-2">
        <div className="flex items-center gap-2 relative">
          <img src="/images/buy_xingming.png" height="24" alt="user" className="h-[24px]" />
          <span className="text-white text-xs uppercase absolute left-[30px] top-[50%] translate-y-[-50%]">{profile?.email || ''}</span>
        </div>
        <span className="text-white text-xl cursor-pointer" onClick={() => nav('/record')}><i className="fa-solid fa-bars"></i></span>
      </div>

      <h4 className="text-white text-xl font-bold px-3 flex">LBMA GOLD</h4>

      <div className="mx-3 mt-2 rounded-xl overflow-hidden px-3 py-4 flex flex-col justify-start gap-5"
        style={{ backgroundImage: "url('/images/buy_shuzi.png')", backgroundSize: '100% 100%' }}>
        <p className="text-white text-center text-sm">Total balance</p>
        <div className="relative flex justify-center">
          <span className="absolute top-[-20px] inset-0 flex items-center justify-center text-white font-bold text-lg">
            ${balance.toFixed(2)} USDT
          </span>
        </div>
        <div className="text-[#f3ba2d] mt-[-20px] pb-[20px] text-center text-xs cursor-pointer" onClick={() => nav('/record')}>Recent Activity</div>
      </div>

      <div className="mx-3 mt-3 rounded-2xl overflow-hidden p-4"
        style={{ backgroundImage: "url('/images/buy_kuang.png')", backgroundSize: '100% 100%' }}>
        <h4 className="text-white text-center text-sm font-bold pb-3 border-b border-gray-700">
          Gold details{vip ? ` (Level ${vip.level})` : ''}
        </h4>
        <div className="py-2">
          {[
            ['Commission rate', vip?.commission || '--'],
            ['Min amount', vip?.min || '--'],
            ['Max amount', vip?.max || '--'],
            ['Invest amount', `$${balance.toFixed(2)}`],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between py-2">
              <span className="text-gray-400 text-xs">{label}</span>
              <span className="text-white text-xs">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-3 mt-2">
        <button onClick={start} disabled={loading || balance <= 0}
          className="w-full h-[44px] flex items-center justify-center text-white font-bold text-base bg-center bg-no-repeat disabled:opacity-50 border-none cursor-pointer"
          style={{ backgroundImage: "url('/images/buy_liji.png')", backgroundSize: '100% 100%', backgroundColor: 'transparent' }}>
          {loading ? 'Processing...' : 'Start Growth'}
        </button>
        {balance <= 0 && <p className="text-gray-500 text-center text-xs mt-2">Deposit required to start</p>}
      </div>
    </div>
  );
}
