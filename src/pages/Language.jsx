import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setLang as apiSetLang } from '../api';

const LANGS = [
  'English', 'Arabic', 'Traditional Chinese', 'Portuguese',
  'Spanish', 'French', 'German', 'Thai',
  'Hindi', 'Russian', 'Bengali', 'Japanese', 'Korean',
];

const LANG_MAP = {
  'English': 'en', 'Arabic': 'ar', 'Traditional Chinese': 'zh', 'Portuguese': 'pt',
  'Spanish': 'es', 'French': 'fr', 'German': 'de', 'Thai': 'th',
  'Hindi': 'hi', 'Russian': 'ru', 'Bengali': 'bn', 'Japanese': 'ja', 'Korean': 'ko',
};

export default function Language() {
  const nav = useNavigate();
  const { i18n } = useTranslation();
  const [current, setCurrent] = useState(i18n.language || 'en');
  const [saving, setSaving] = useState(false);
  const currentName = Object.entries(LANG_MAP).find(([, code]) => code === current)?.[0] || 'English';

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await apiSetLang(current); } catch {}
    setSaving(false);
    nav(-1);
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Change Language</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {LANGS.map(name => {
            const selected = name === currentName;
            return (
              <div key={name}
                className={`flex items-center justify-between px-4 py-3.5 border-b border-[#1a2a4a] last:border-b-0 cursor-pointer active:bg-[#1a2a4a] ${selected ? 'bg-[#1a2a4a]' : ''}`}
                onClick={() => { i18n.changeLanguage(LANG_MAP[name]); setCurrent(LANG_MAP[name]); }}>
                <span className="text-white text-sm">{name}</span>
                {selected && <i className="fa-solid fa-check text-[var(--brand)] text-sm"></i>}
              </div>
            );
          })}
        </div>
      </div>
      <form className="px-4 mt-4" onSubmit={submit}>
        <button type="submit" disabled={saving} className="w-full h-[44px] rounded-xl bg-[var(--brand)] text-[#1a1a2e] font-bold text-sm border-none cursor-pointer disabled:opacity-60">
          {saving ? 'Saving...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
}
