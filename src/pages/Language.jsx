import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Traditional Chinese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'bn', name: 'Bengali' },
  { code: 'hi', name: 'Hindi' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
];

export default function Language() {
  const nav = useNavigate();
  const { i18n } = useTranslation();
  const [current, setCurrent] = useState(i18n.language || 'en');

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Change Language</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {LANGS.map(l => (
            <div key={l.code}
              className={`flex items-center justify-between px-4 py-3.5 border-b border-[#1a2a4a] last:border-b-0 cursor-pointer active:bg-[#1a2a4a] ${current === l.code ? 'bg-[#1a2a4a]' : ''}`}
              onClick={() => { i18n.changeLanguage(l.code); setCurrent(l.code); }}>
              <span className="text-white text-sm">{l.name}</span>
              {current === l.code && <i className="fa-solid fa-check text-[#c9a44c] text-sm"></i>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
