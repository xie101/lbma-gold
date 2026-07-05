import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrder } from '../api';

const TABS = [
  { key: 'pending', label: 'Pending completion' },
  { key: 'completed', label: 'Completed' },
  { key: 'all', label: 'All orders' },
];

export default function Record() {
  const nav = useNavigate();
  const [records, setRecords] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => { getOrder({ type: tab }).then(r => { const d = r.data?.data?.list || r.data?.data || r.data || []; setRecords(Array.isArray(d) ? d : []); }).catch(() => {}); }, [tab]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24"
      style={{ backgroundImage: "url('/images/logs_beijing.png')" }}>
      <div className="flex items-center px-4 pt-5 mb-10">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <div className="flex-1 flex justify-center gap-4">
          {TABS.map(t => (
            <span key={t.key} onClick={() => setTab(t.key)}
              className="text-xs px-2 py-1.5 rounded-full cursor-pointer flex items-center justify-center bg-center bg-no-repeat"
              style={{ backgroundImage: tab === t.key ? "url('/images/logs_xuanze.png')" : 'none', backgroundSize: '100% 100%', color: tab === t.key ? '#fff' : '#9ca3af' }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 flex flex-col gap-4">
        {records.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">No records found</p>
        ) : records.map((r, i) => (
          <div key={i} className="relative bg-contain bg-no-repeat bg-center p-4"
            style={{ backgroundImage: "url('/images/logs_kuang.png')", backgroundSize: '100% 100%' }}>
            <p className="text-gray-400 text-[10px] mb-2">order number: {r.orderNo || r.id}</p>
            <div className="flex items-center gap-3">
              <img src="/images/logs_haungjin.png" width="70" alt="gold" className="rounded-lg" />
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm text-left">{r.weight || '—'} oz</h4>
                <p className="text-gray-400 text-xs mt-1">Order Time: {r.createdAt || r.date || '—'}</p>
                <p className="text-gray-400 text-xs">Order details: {r.status || '—'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-white text-lg font-bold">$ {Number(r.amount || r.price || 0).toFixed(2)}</span>
                <p className="text-[var(--brand)] text-xs">{r.weight || '—'} oz</p>
                <p className="text-gray-400 text-xs">Actual amount paid</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
