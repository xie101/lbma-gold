import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { depositHistory } from '../api';
import Loading from '../components/Loading';

export default function DepositHistory() {
  const nav = useNavigate();
  const [records, setRecords] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    depositHistory().then(r => {
      const data = r.data?.data?.list || r.data?.data || r.data || [];
      setRecords(Array.isArray(data) ? data : []);
    }).catch(() => {}).finally(() => setInitLoading(false));
  }, []);

  if (initLoading) return <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10"><Loading /></div>;

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Deposit History</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 flex flex-col gap-3 mt-2">
        {records.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">No records</p>
        ) : records.map((r, i) => (
          <div key={i} className="bg-[#0a1a3a] rounded-xl p-4 border border-[#1a2a4a]">
            <div className="flex justify-between py-1.5 border-b border-gray-800"><span className="text-gray-400 text-xs">Transaction Time</span><span className="text-white text-xs">{r.createdAt || r.date || ''}</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-800"><span className="text-gray-400 text-xs">Order Number</span><span className="text-white text-xs">{r.orderNo || r.id}</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-800"><span className="text-gray-400 text-xs">Amount(USDT)</span><span className="text-white text-xs font-bold">{r.amount || 0}</span></div>
            <div className="flex justify-between py-1.5"><span className="text-gray-400 text-xs">Status</span><span className="text-[var(--brand)] text-xs font-bold">{r.status || 'pending'}</span></div>
            {r.rejectReason && <div className="py-1.5"><span className="text-red-400 text-xs">Reason: {r.rejectReason}</span></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
