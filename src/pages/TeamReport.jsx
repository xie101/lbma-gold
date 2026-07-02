import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  ['Team  balance', 'USDT 2111197.5935'],
  ['Team cash flow', 'USDT 61.7535'],
  ['Team total top up', 'USDT 0'],
  ['Team total withdraw', 'USDT 0'],
  ['Team order commission', 'USDT 0'],
  ['Headcount', '0'],
  ['Direct push', '0'],
  ['Team of people', '20'],
  ['New number of people', '0'],
  ['Activity people', '0'],
];

const LEVELS = ['First level', 'Second level', 'Third level'];

export default function TeamReport() {
  const nav = useNavigate();
  const [level, setLevel] = useState(0);

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
            className={`flex-1 text-center py-2 text-xs rounded-lg cursor-pointer font-bold ${level === i ? 'bg-[#c9a44c] text-[#1a1a2e]' : 'bg-[#0a1a3a] text-gray-400'}`}
            onClick={() => setLevel(i)}>
            {name}
          </span>
        ))}
      </div>

      <div className="px-4 flex flex-col gap-3">
        <div className="text-gray-400 text-center text-sm mt-10">No record available</div>
      </div>
    </div>
  );
}
