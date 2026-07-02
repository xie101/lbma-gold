import { useNavigate } from 'react-router-dom';
import { removeToken } from '../api';

export default function Account() {
  const nav = useNavigate();

  const items = [
    { label: 'Avatar', path: null, extra: <img src="/images/head.png" height="24" className="h-[24px] rounded-full" alt="" /> },
    { label: 'Phone Number', path: null, right: '' },
    { label: 'Real Name', path: '/realname', right: 'Set', highlight: true },
    { label: 'Bank Info', path: '/bank' },
    { label: 'Password management', path: '/password' },
    { label: 'Withdraw Password management', path: '/withdraw-password' },
    { label: 'Language', path: '/language', right: '' },
    { label: 'Logout', path: null, action: () => { removeToken(); nav('/login'); } },
  ];

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </span>
        <span className="flex-1 text-center text-white font-bold text-base">Account</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {items.map((item, i) => {
            const clickable = !!(item.path || item.action);
            return (
              <div key={i}
                className={`flex items-center justify-between px-4 py-3.5 border-b border-[#1a2a4a] last:border-b-0 ${clickable ? 'cursor-pointer active:bg-[#1a2a4a]' : ''}`}
                onClick={item.action || (item.path ? () => nav(item.path) : undefined)}>
                <span className="text-white text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.extra}
                  {item.right !== undefined && <span className={item.highlight ? 'text-[#c9a44c] text-xs' : 'text-gray-400 text-xs'}>{item.right}</span>}
                  <i className="fa-solid fa-chevron-right text-gray-500 text-xs"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
