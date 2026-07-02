import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const nav = useNavigate();
  const items = [
    { label: 'Real Name', path: '/realname' },
    { label: 'Bind Wallet Address', path: '/bank' },
    { label: 'Password management', path: '/password' },
    { label: 'Withdraw Password management', path: '/withdraw-password' },
  ];

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Profile</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 border-b border-[#1a2a4a] last:border-b-0 cursor-pointer active:bg-[#1a2a4a]" onClick={() => nav(item.path)}>
              <span className="text-white text-sm">{item.label}</span>
              <i className="fa-solid fa-chevron-right text-gray-500 text-xs"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
