import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamReport } from '../api';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';

const LEVELS = ['First level', 'Second level', 'Third level'];

export default function TeamReport() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [level, setLevel] = useState(0);
  const [data, setData] = useState({});
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    teamReport().then(r => {
      setData(r.data?.data || r.data || {});
    }).catch(() => {}).finally(() => setInitLoading(false));
  }, []);

  if (initLoading) return <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-20"><Loading /></div>;

  const STATS = [
    ['Team  balance', `USDT ${data.teamBalance || '0'}`],
    ['Team cash flow', `USDT ${data.teamCashFlow || '0'}`],
    ['Team total top up', `USDT ${data.teamTopUp || '0'}`],
    ['Team total withdraw', `USDT ${data.teamWithdraw || '0'}`],
    ['Team order commission', `USDT ${data.teamCommission || '0'}`],
    ['Headcount', String(data.headcount || '0')],
    ['Direct push', String(data.directPush || '0')],
    ['Team of people', String(data.teamPeople || '0')],
    ['New number of people', String(data.newPeople || '0')],
    ['Activity people', String(data.activityPeople || '0')],
  ];

  const list = data.list || [];

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-20">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Team report</span>
        <span className="w-[18px]"></span>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 grid grid-cols-2 gap-3">
          {STATS.map(([label, value], i) => (
            <div key={i} className="bg-[#0a0e1a] rounded-lg p-3">
              <p className="text-gray-400 text-[10px] mb-1">{label}</p>
              <p className="text-white text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex px-4 gap-2 mb-4">
        {LEVELS.map((name, i) => (
          <span key={i}
            className={`flex-1 text-center py-2 text-xs rounded-lg cursor-pointer font-bold ${level === i ? 'bg-[var(--brand)] text-[#1a1a2e]' : 'bg-[#0a1a3a] text-gray-400'}`}
            onClick={() => setLevel(i)}>
            {name}
          </span>
        ))}
      </div>

      <div className="px-4 flex flex-col gap-3">
        {list.length === 0 ? (
          <div className="text-gray-400 text-center text-sm mt-10">No record available</div>
        ) : list.map((r, i) => (
          <div key={i} className="bg-[#0a1a3a] rounded-lg px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-white text-sm">{r.email || r.name}</p>
              <p className="text-gray-400 text-xs">{r.date || r.createdAt}</p>
            </div>
            <span className="text-[var(--brand)] text-sm font-bold">+{r.commission || 0} USDT</span>
          </div>
        ))}
      </div>
    </div>
  );
}
