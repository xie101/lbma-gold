import { useNavigate } from 'react-router-dom';

export default function QnA() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Q&amp;A</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          <div className="text-gray-400 text-center text-sm py-10">No record available</div>
        </div>
      </div>
    </div>
  );
}
