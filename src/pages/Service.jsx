import { useNavigate } from 'react-router-dom';

const FAQS = [
  '1. What is the working description of the cnbn system?',
  '2. Where does cnbn come from?',
  '3. How to recharge?',
  '4. How long does deposit take?',
  '5. How to withdraw funds?',
  '6. What are the fees?',
];

export default function Service() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </span>
        <span className="flex-1 text-center text-white font-bold text-base">Help &amp; Support</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mb-3">
        <p className="text-gray-400 text-xs">Online customer service time (11:00-23:00)</p>
      </div>
      <div className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl overflow-hidden">
          <div className="text-gray-400 text-center text-sm py-10">No record available</div>
        </div>
      </div>
    </div>
  );
}
