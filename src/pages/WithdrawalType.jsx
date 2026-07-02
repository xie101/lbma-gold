import { useNavigate } from 'react-router-dom';

export default function WithdrawalType() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Withdrawal Channel</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 flex flex-col gap-3 mt-4">
        <a className="block bg-[#0a1a3a] rounded-xl px-4 py-4 text-white font-bold text-sm text-center no-underline border border-[#1a2a4a] hover:border-[#c9a44c] transition" onClick={() => nav('/withdrawalUSDT')} style={{ cursor: 'pointer', textDecoration: 'none' }}>USDT</a>
      </div>
    </div>
  );
}
