import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupport } from '../api';

export default function Service() {
  const nav = useNavigate();
  const [support, setSupport] = useState(null);

  useEffect(() => {
    getSupport().then(r => setSupport(r.data?.data)).catch(() => {});
  }, []);

  const channels = support?.list || (support && (support.url || support.telegram || support.whatsapp) ? [support] : []);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Help &amp; Support</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mb-3">
        <p className="text-gray-400 text-xs">Online customer service time (11:00-23:00)</p>
      </div>
      <div className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {channels.length ? (
            channels.map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noreferrer"
                className="flex items-center justify-between px-4 py-4 border-b border-[#1a2a4a] last:border-b-0 no-underline">
                <span className="text-white text-sm">{c.name || c.type || 'Support'}</span>
                <span className="text-[#c9a44c] text-xs break-all ml-2">{c.value || c.url || ''}</span>
              </a>
            ))
          ) : (
            <div className="text-gray-400 text-center text-sm py-10">No record available</div>
          )}
        </div>
      </div>
    </div>
  );
}
