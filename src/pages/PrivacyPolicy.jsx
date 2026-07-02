import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const nav = useNavigate();
  const sections = [
    ['1. Information Collection', 'We collect information you provide during registration, including email address and transaction data.'],
    ['2. Use of Information', 'Your information is used to provide and improve our services, process transactions, and communicate with you.'],
    ['3. Data Security', 'We implement industry-standard security measures to protect your personal information.'],
    ['4. Third-Party Services', 'We may share information with third-party service providers bound by confidentiality agreements.'],
    ['5. Contact Us', 'If you have questions about this Privacy Policy, please contact our support team.'],
  ];
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Privacy Policy</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 text-gray-400 text-xs leading-relaxed space-y-3">
          <p>Your privacy is important to us. This Privacy Policy explains how LBMA GOLD collects, uses, and protects your personal information.</p>
          {sections.map(([title, text], i) => (<div key={i}><h5 className="text-[#c9a44c] text-sm font-bold mb-1">{title}</h5><p>{text}</p></div>))}
        </div>
      </div>
    </div>
  );
}
