import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAbout } from '../api';

const ABOUT_HTML = `
<p><strong>About LBMA GOLD</strong></p>
<p>&nbsp;</p>
<p>LBMA GOLD is a digital gold trading platform that enables users to buy, hold, and trade gold with real-time price tracking. Our mission is to make gold investment accessible, transparent, and secure for everyone.</p>
<p>&nbsp;</p>
<p><strong>1. Our Platform</strong></p>
<p>LBMA GOLD provides a simple and efficient way to participate in the gold market. Users can fund their accounts, place orders at live gold prices, and earn commissions through our referral program. We aggregate live price feeds so you always trade at fair market rates.</p>
<p>&nbsp;</p>
<p><strong>2. Security &amp; Trust</strong></p>
<p>Account security is our top priority. We use encrypted authentication, withdrawal passwords, and risk controls to protect user funds. All transactions are recorded on a tamper-evident ledger for full auditability.</p>
<p>&nbsp;</p>
<p><strong>3. VIP &amp; Rewards</strong></p>
<p>Our tiered VIP program rewards active users with higher commission rates as their balance grows. Invite friends to earn referral commissions and grow together.</p>
<p>&nbsp;</p>
<p><strong>4. Support</strong></p>
<p>Our customer service team is available to help with any question — deposits, withdrawals, orders, or account issues. Reach us through the in-app Help &amp; Support page.</p>
<p>&nbsp;</p>
<p>Trade gold with confidence. Welcome to LBMA GOLD.</p>
`;

export default function About() {
  const nav = useNavigate();
  const [html, setHtml] = useState(ABOUT_HTML);

  useEffect(() => {
    getAbout().then(r => { const c = r.data?.data?.content; if (c) setHtml(c); }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">about</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl p-4 text-gray-300 text-sm leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
        </div>
      </div>
    </div>
  );
}
