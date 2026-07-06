import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPages } from '../api';
import { useTranslation } from 'react-i18next';

export default function QnA() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    getPages().then(r => setFaq(r.data?.data?.list || [])).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Q&amp;A</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {faq.length ? (
            faq.map((item, i) => (
              <div key={i} className="px-4 py-3 border-b border-[#1a2a4a] last:border-b-0">
                <p className="text-white text-sm font-bold">Q: {item.question || item.q || ''}</p>
                <p className="text-gray-400 text-xs mt-1">A: {item.answer || item.a || ''}</p>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center text-sm py-10">No record available</div>
          )}
        </div>
      </div>
    </div>
  );
}
