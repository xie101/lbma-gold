import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionHistory } from '../api';

export default function TransactionLogs() {
  const nav = useNavigate();
  const [tab, setTab] = useState('all');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    transactionHistory().then(r => {
      const d = r.data?.data?.list || r.data?.data || r.data || [];
      setRecords(Array.isArray(d) ? d : []);
    }).catch(() => {});
  }, []);

  const filtered = tab === 'all' ? records : records.filter(r =>
    tab === 'withdraw list' ? r.type?.toLowerCase().includes('withdraw') : r.type?.toLowerCase().includes('deposit')
  );

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-20">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Account</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="flex px-4 gap-2 mb-4">
        {['All Types', 'Withdraw List', 'Deposit List'].map(t => (
          <span key={t} onClick={() => setTab(t.toLowerCase())}
            className={`flex-1 text-center py-2 text-xs rounded-lg cursor-pointer ${tab === t.toLowerCase() ? 'bg-[#c9a44c] text-[#1a1a2e] font-bold' : 'bg-[#0a1a3a] text-gray-400'}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="px-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-center text-sm py-10">No records</div>
        ) : filtered.map((r, i) => (
          <div key={i} className="bg-[#0a1a3a] rounded-xl p-4 border border-[#1a2a4a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px]">{r.date || r.createdAt}</p>
                <h3 className="text-white font-bold text-sm mt-1">{r.type}</h3>
                {r.description && r.description !== r.type && <p className="text-gray-400 text-xs mt-0.5">{r.description}</p>}
              </div>
              <span className="text-[#c9a44c] font-bold text-sm">
                {Number(r.amount) > 0 ? '+' : ''}{r.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
