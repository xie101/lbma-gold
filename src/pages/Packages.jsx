import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vipList } from '../api';

const LEVELS = [
  { level: 1, commission: '4%', min: '$20.00', max: '$499.99' },
  { level: 2, commission: '8%', min: '$500.00', max: '$2,499.99' },
  { level: 3, commission: '12%', min: '$2,500.00', max: '$9,999.99' },
  { level: 4, commission: '15%', min: '$10,000.00', max: '$10,000,000.00' },
];

export default function Packages() {
  const nav = useNavigate();
  const [vipData, setVipData] = useState({ currentLevel: 5, progress: { current: 0, max: 0 } });

  useEffect(() => {
    vipList().then(r => {
      const data = r.data?.data || r.data || {};
      setVipData({
        currentLevel: data.currentLevel || 5,
        progress: data.progress || { current: 0, max: 0 },
      });
    }).catch(() => {});
  }, []);

  const pct = Math.min(100, (vipData.progress.current / Math.max(1, vipData.progress.max)) * 100);

  return (
    <>
      <div
        className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24"
        style={{ backgroundImage: "url('/images/shop_beijng.png')" }}
      >
        <h4 className="text-[#ecdbb8] text-left text-lg font-bold pt-8 px-5">
          LBMA GOLD
        </h4>

        {/* VIP Badge */}
        <div className="flex flex-col items-center mt-4">
          <img src="/images/shop_vip.png" width="120" alt="VIP" />
          <div className="mt-2 relative">
            <img src="/images/shop_dengji.png" height="28" alt="Level" className="h-[22px]" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#3a2a00]">
              LEVEL {vipData.currentLevel}
            </span>
          </div>
          <p className="text-[#ecdbb8] text-xs mt-1">current level</p>
        </div>

        {/* Progress Bar */}
        <div className="px-5 mt-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white text-xs">next level away</span>
            <span className="text-[#c9a44c] text-xs">
              {vipData.progress.current}/{vipData.progress.max}
            </span>
          </div>
          <div
            className="relative h-[10px] rounded-full overflow-hidden"
            style={{ backgroundImage: "url('/images/shop_heidi.png')", backgroundSize: '100% 100%' }}
          >
            <div
              className="h-full rounded-full bg-center bg-no-repeat"
              style={{ width: `${pct}%`, backgroundImage: "url('/images/shop_jindu.png')", backgroundSize: '100% 100%' }}
            />
          </div>
        </div>

        {/* Level Cards */}
        <div className="px-4 mt-6 flex flex-col gap-4">
          {LEVELS.map((lv) => (
            <div
              key={lv.level}
              className="relative rounded-xl overflow-hidden bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/shop_fangkuang.png')" }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-3 bg-[#1a1b1d] p-1">
                <div className="flex items-center gap-2">
                  <img src="/images/shop_huangjinbiao.png" width="24" alt="icon" />
                  <span className="text-[#d4bb94] font-bold text-[11px]">LEVEL {lv.level}</span>
                  <span className="text-[#d4bb94] font-bold text-[11px]">(Commission: {lv.commission})</span>
                </div>
                <span
                  className="cursor-pointer w-[70px] h-[26px] flex items-center justify-center text-[#ceb995] text-[10px] bg-[#2f2f27] border-1 border-[#5b5040] rounded-full"
                  onClick={() => nav('/record')}
                >
                  History
                </span>
              </div>

              {/* Min / Max */}
              <div className="flex gap-6 px-3 mb-3">
                <div>
                  <div className="flex items-center gap-1">
                    <img src="/images/shop_fnagkuai.png" width="8" alt="icon" />
                    <span className="text-gray-400 text-[10px]">Min</span>
                  </div>
                  <p className="text-white font-bold text-sm mt-0.5">{lv.min}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-[10px]">Max</span>
                  </div>
                  <p className="text-white font-bold text-sm mt-0.5">{lv.max}</p>
                </div>
              </div>

              {/* Upgrade button */}
              <div
                className="px-1 ml-3 mb-3 w-[110px] h-[28px] flex items-center justify-center gap-1 text-[10px] text-[#3a2a00] font-bold bg-center bg-no-repeat cursor-pointer"
                style={{ backgroundImage: "url('/images/shop_liji.png')", backgroundSize: '100% 100%' }}
                onClick={() => nav('/shop/' + lv.level)}
              >
                <span>Upgrade now</span>
                <img src="/images/shop_jiantou.png" width="14" alt="arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
