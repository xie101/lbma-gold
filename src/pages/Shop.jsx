import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api';

export default function Shop() {
  const nav = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(r => { setProfile(r.data?.data || r.data || {}); }).catch(() => {});
  }, []);

  return (
    <div
      className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24"
      style={{ backgroundImage: "url('/images/buy_beijing.png')" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-8 pb-2">
        <div className="flex items-center justify-start gap-2 relative">
          <img src="/images/buy_xingming.png" height="24" alt="user" className="h-[24px]" />
          <span className="text-white text-xs uppercase absolute left-[30px] top-[50%] translate-y-[-50%]">{profile?.realName || profile?.email || ''}</span>
        </div>
        <span className="text-white text-xl cursor-pointer">
          <i className="fa-solid fa-bars"></i>
        </span>
      </div>

      <h4 className="text-white text-xl font-bold px-3 flex">LBMA GOLD</h4>

      {/* Total Balance */}
      <div
        className="mx-3 mt-2 rounded-xl overflow-hidden px-3 py-4 flex flex-col justify-start gap-5"
        style={{ backgroundImage: "url('/images/buy_shuzi.png')", backgroundSize: '100% 100%' }}
      >
        <p className="text-white text-center text-sm">Total balance</p>
        <div className="relative flex justify-center">
          <span className="absolute top-[-20px] inset-0 flex items-center justify-center text-white font-bold text-lg">
            $0 USDT
          </span>
        </div>
        <div
          className="text-[#f3ba2d] mt-[-20px] pb-[20px] text-center text-xs cursor-pointer"
          onClick={() => nav('/deposit')}
        >
          Recent Activity
        </div>
      </div>

      {/* Gold Details */}
      <div
        className="mx-3 mt-3 rounded-2xl overflow-hidden p-4"
        style={{ backgroundImage: "url('/images/buy_kuang.png')", backgroundSize: '100% 100%' }}
      >
        <h4 className="text-white text-center text-sm font-bold pb-3 border-b border-gray-700">
          Gold details
        </h4>
        <div className="py-2">
          {[
            ['Total transaction amount', '0'],
            ['Amount frozen money', '0'],
            ['Comission today', '0'],
            ['purchased commission yesterday', '0'],
          ].map(([label, value], i) => (
            <div key={i} className="flex justify-between py-2">
              <span className="text-gray-400 text-xs">{label}</span>
              <span className="text-white text-xs">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Start Growth Button */}
      <div className="mx-3 mt-2">
        <button
          disabled
          className="w-full h-[44px] flex items-center justify-center text-white font-bold text-base bg-center bg-no-repeat disabled:opacity-50 border-none"
          style={{
            backgroundImage: "url('/images/buy_liji.png')",
            backgroundSize: '100% 100%',
            backgroundColor: 'transparent',
          }}
        >
          Start Growth
        </button>
      </div>
    </div>
  );
}
