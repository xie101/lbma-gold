import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, removeToken } from '../api';

const MENU_ITEMS = [
  { img: '/images/my_re.png', label: 'Regarding data', path: '/record' },
  { img: '/images/my_top.png', label: 'Deposit', path: '/deposit' },
  { img: '/images/my_wi.png', label: 'withdrawals', path: '/withdrawalType' },
  { img: '/images/my_to.png', label: 'Deposit history', path: '/deposit-history' },
  { img: '/images/my_with.png', label: 'withdrawal history', path: '/withdrawal-history' },
  { img: '/images/home_ab.png', label: 'About', path: '/about' },
  { img: '/images/home_qa.png', label: 'Q&A', path: '/q-n-a' },
  { img: '/images/home_te.png', label: 'T&C', path: '/terms-conditions' },
  { img: '/images/home_la.png', label: 'Language', path: '/language' },
  { img: '/images/home_ce.png', label: 'Customer service', path: '/service' },
];

export default function My() {
  const nav = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(r => {
      setProfile(r.data?.data || r.data || {});
    }).catch(() => {});
  }, []);

  const handleLogout = () => { removeToken(); nav('/login'); };

  return (
    <>
      <div
        className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24 px-3"
        style={{ backgroundImage: "url('/images/my_beijing.png')" }}
      >
        <h4 className="text-white text-center text-lg font-bold pt-8 pb-4">
          Personal center
        </h4>

        {/* Profile Banner */}
        <div className="flex items-center gap-3 relative">
          <img src="/images/my_touxiag.png" width="50" alt="Profile" />
          <div className="flex-1 text-white text-xs">
            <p className="font-bold text-sm">
              Email : {profile?.email || '--'}
            </p>
            <p>Invite Code : {profile?.inviteCode || '--'}</p>
          </div>
          <span className="cursor-pointer absolute right-0 top-5" onClick={() => nav('/profile')}>
            <img src="/images/my_qinadao.png" className="relative" width="110" alt="Security Settings" />
            <span className="text-black text-[11px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              Security Settings
            </span>
          </span>
        </div>

        {/* Wallet Card */}
        <div className="mt-5 rounded-xl overflow-hidden relative">
          <img src="/images/my_qianabo.png" className="w-full" alt="Wallet" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-3">
            <p className="text-[#f4e6b9] text-xs font-bold tracking-wider">MY WALLET</p>
            <p className="text-white text-2xl font-bold mt-1">
              {profile?.balance ?? '--'} USDT
            </p>
            <div className="flex gap-2 mt-2">
              <span
                className="bg-[#292f44] text-[#e3d6ad] text-xs px-4 py-1 rounded cursor-pointer"
                onClick={() => nav('/deposit')}
              >Deposit</span>
              <span
                className="bg-[#292f44] text-[#e3d6ad] text-xs px-4 py-1 rounded cursor-pointer"
                onClick={() => nav('/withdrawalType')}
              >Withdraw</span>
            </div>
          </div>
        </div>

        {/* System Functions */}
        <h4 className="text-white text-center text-sm font-bold mt-6 mb-2">
          System functions
        </h4>
        <div className="flex flex-col gap-2 bg-[#0a1a3a] rounded-xl px-4">
          {MENU_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 cursor-pointer border-b border-[#8e8e8e]/50 border-dashed last:border-0"
              onClick={() => nav(item.path)}
            >
              <div className="flex items-center gap-3">
                <img src={item.img} width="28" alt={item.label} />
                <span className="text-white text-sm">{item.label}</span>
              </div>
              <img src="/images/my_jiantou.png" width="20" alt="arrow" />
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="my-6 cursor-pointer" onClick={handleLogout}>
          <img src="/images/my_tuicu.png" className="w-full" alt="Log Out" />
          <div className="relative -mt-[38px] text-center pb-3">
            <span className="text-white font-bold text-base">Log out</span>
          </div>
        </div>
      </div>
    </>
  );
}
