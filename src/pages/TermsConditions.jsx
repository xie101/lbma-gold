import { useNavigate } from 'react-router-dom';

export default function TermsConditions() {
  const nav = useNavigate();
  const sections = [
    ['1. Acceptance of Terms', 'By creating an account or using our services, you acknowledge that you have read, understood, and agree to these terms.'],
    ['2. Account Registration', 'You must provide accurate and complete information when registering. You are responsible for maintaining the confidentiality of your account credentials.'],
    ['3. Trading Risks', 'Gold trading involves significant risk. Past performance is not indicative of future results.'],
    ['4. VIP Program', 'VIP membership levels and commissions are subject to change with prior notice.'],
    ['5. Limitation of Liability', 'LBMA GOLD shall not be liable for any indirect, incidental, or consequential damages.'],
  ];

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Terms & Conditions</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 text-gray-400 text-xs leading-relaxed space-y-3">
          <p>Welcome to LBMA GOLD. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
          {sections.map(([title, text], i) => (
            <div key={i}>
              <h5 className="text-[#c9a44c] text-sm font-bold mb-1">{title}</h5>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
