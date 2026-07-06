import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getOrder } from '../api';
import Loading from '../components/Loading';

export default function Record() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [records, setRecords] = useState([]);
  const [tab, setTab] = useState('all');
  const [initLoading, setInitLoading] = useState(true);

  const TABS = [
    { key: 'pending', label: t('pending_completion') },
    { key: 'completed', label: t('completed') },
    { key: 'all', label: t('all_orders') },
  ];

  useEffect(() => { getOrder({ type: tab }).then(r => { const d = r.data?.data?.list || r.data?.data || r.data || []; setRecords(Array.isArray(d) ? d : []); }).catch(() => {}).finally(() => setInitLoading(false)); }, [tab]);

  if (initLoading) return <div className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24" style={{ backgroundImage: "url('/images/logs_beijing.png')" }}><Loading /></div>;

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-cover bg-top bg-no-repeat pb-24"
      style={{ backgroundImage: "url('/images/logs_beijing.png')" }}>
      <div className="flex items-center px-4 pt-5 mb-10">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <div className="flex-1 flex justify-center gap-4">
          {TABS.map(tt => (
            <span key={tt.key} onClick={() => setTab(tt.key)}
              className="text-xs px-2 py-1.5 rounded-full cursor-pointer flex items-center justify-center bg-center bg-no-repeat"
              style={{ backgroundImage: tab === tt.key ? "url('/images/logs_xuanze.png')" : 'none', backgroundSize: '100% 100%', color: tab === tt.key ? '#fff' : '#9ca3af' }}>
              {tt.label}
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 flex flex-col gap-4">
        {records.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">{t('no_data')}</p>
        ) : records.map((r, i) => (
          <div key={i} className="relative bg-contain bg-no-repeat bg-center p-4"
            style={{ backgroundImage: "url('/images/logs_kuang.png')", backgroundSize: '100% 100%' }}>
            <p className="text-gray-400 text-[10px] mb-2">{t('order_no')}: {r.orderNo || r.id}</p>
            <div className="flex items-center gap-3">
              <img src="/images/logs_haungjin.png" width="70" alt="gold" className="rounded-lg" />
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm text-left">{r.weight || '—'} oz</h4>
                <p className="text-gray-400 text-xs mt-1">{t('order_time')}: {r.createdAt || r.date || '—'}</p>
                <p className="text-gray-400 text-xs">{t('order_detail')}: {r.status || '—'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-white text-lg font-bold">$ {Number(r.amount || r.price || 0).toFixed(2)}</span>
                <p className="text-[var(--brand)] text-xs">{r.weight || '—'} oz</p>
                <p className="text-gray-400 text-xs">{t('actual_paid')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
