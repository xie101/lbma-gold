import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api';
import { useTranslation } from 'react-i18next';

export default function WithdrawalType() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile().then(r => setProfile(r.data?.data || {})).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Withdrawal Channel</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mb-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs">Available Balance</p>
          <p className="text-[var(--brand)] text-2xl font-bold mt-1">
            {(Number(profile?.balance || 0) - Number(profile?.frozen_balance || 0)).toFixed(2)} <span className="text-sm">USDT</span>
          </p>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-3">
        <a className="block bg-[#0a1a3a] rounded-xl px-4 py-4 text-white font-bold text-sm text-center no-underline border border-[#1a2a4a] hover:border-[var(--brand)] transition" onClick={() => nav('/withdrawalUSDT')} style={{ cursor: 'pointer', textDecoration: 'none' }}>USDT</a>
        <a className="block bg-[#0a1a3a] rounded-xl px-4 py-4 text-white font-bold text-sm text-center no-underline border border-[#1a2a4a] hover:border-[var(--brand)] transition" onClick={() => nav('/withdrawal')} style={{ cursor: 'pointer', textDecoration: 'none' }}>Bank Transfer</a>
      </div>
    </div>
  );
}
