import { useNavigate } from 'react-router-dom';

const STATS = [
  ['Team  balance', 'USDT 2111197.5935'],
  ['Team cash flow', 'USDT 61.7535'],
  ['Team total top up', 'USDT 0'],
  ['Team total withdraw', 'USDT 0'],
  ['Team order commission', 'USDT 0'],
  ['Total number of teams', '1115'],
  ['Direct subor', '0'],
  ['Total recharge', '0'],
];

export default function TeamReport() {
  const nav = useNavigate();

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
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className="text-white text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
