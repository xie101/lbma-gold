import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTermsCondition } from '../api';

const CONTENT = `
<p><strong>TERMS OF SERVICE</strong></p>
<p>Welcome to LBMA GOLD. By using our platform you agree to these terms. Please read them carefully.</p>
<p>&nbsp;</p>
<p><strong>1. Eligibility</strong></p>
<p>You must be of legal age in your jurisdiction to use this service. By registering you confirm you meet this requirement.</p>
<p>&nbsp;</p>
<p><strong>2. Your Account</strong></p>
<p>You are responsible for keeping your login password and withdrawal password secure. We are not liable for losses arising from shared or compromised credentials. Notify support immediately if you suspect unauthorized access.</p>
<p>&nbsp;</p>
<p><strong>3. Trading</strong></p>
<p>Gold prices fluctuate in real time. Orders are executed at the prevailing market rate displayed at submission. Commissions are credited according to your VIP level and the platform's published rates.</p>
<p>&nbsp;</p>
<p><strong>4. Deposits &amp; Withdrawals</strong></p>
<p>Deposits are credited to your balance after administrative confirmation. Withdrawals are processed within 24 hours of approval and require your withdrawal password. Minimum deposit/withdrawal amounts and per-transaction limits apply as shown in the platform settings.</p>
<p>&nbsp;</p>
<p><strong>5. Prohibited Conduct</strong></p>
<p>Fraud, creating multiple accounts, market manipulation, abuse of the referral system, and any attempt to reverse-engineer or disrupt the service are prohibited. Violations may result in account suspension and forfeiture of balances obtained through misconduct.</p>
<p>&nbsp;</p>
<p><strong>6. Limitation of Liability</strong></p>
<p>The service is provided "as is" and "as available". We are not liable for losses resulting from market fluctuations, network or blockchain congestion, third-party service failures, or force majeure events.</p>
<p>&nbsp;</p>
<p><strong>7. Modifications</strong></p>
<p>We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
<p>&nbsp;</p>
<p>© LBMA GOLD. All rights reserved.</p>
`;

export default function TermsConditions() {
  const nav = useNavigate();
  const [html, setHtml] = useState(CONTENT);
  useEffect(() => {
    getTermsCondition().then(r => { const c = r.data?.data?.content; if (c) setHtml(c); }).catch(() => {});
  }, []);
  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">TERMS OF SERVICE</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl p-4">
          <div className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
        </div>
      </div>
    </div>
  );
}
