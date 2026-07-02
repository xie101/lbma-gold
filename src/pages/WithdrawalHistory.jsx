import { useNavigate } from 'react-router-dom';

const records = [
  { time: '16/06/2026 21:20', orderNo: 'CO2606162120071973', amount: '686.00', status: 'Audit successful' },
];

export default function WithdrawalHistory() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Withdrawal History</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 flex flex-col gap-3 mt-2">
        {records.map((r, i) => (
          <div key={i} className="bg-[#0a1a3a] rounded-xl p-4 border border-[#1a2a4a]">
            <div className="flex justify-between py-1.5 border-b border-gray-800"><span className="text-gray-400 text-xs">Transaction Time</span><span className="text-white text-xs">{r.time}</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-800"><span className="text-gray-400 text-xs">Order Number</span><span className="text-white text-xs">{r.orderNo}</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-800"><span className="text-gray-400 text-xs">Amount(USDT)</span><span className="text-white text-xs font-bold">{r.amount}</span></div>
            <div className="flex justify-between py-1.5"><span className="text-gray-400 text-xs">Status</span><span className="text-[#c9a44c] text-xs font-bold">{r.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
