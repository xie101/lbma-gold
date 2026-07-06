import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { getProfile } from '../api';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';

export default function Invite() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    getProfile().then(r => {
      const d = r.data?.data || r.data || {};
      if (d.inviteCode) setInviteCode(d.inviteCode);
    }).catch(() => {}).finally(() => setInitLoading(false));
  }, []);

  if (initLoading) return <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10"><Loading /></div>;

  const link = `https://goldslbma.com/register/${inviteCode}`;
  useEffect(() => {
    if (inviteCode && canvasRef.current) QRCode.toCanvas(canvasRef.current, link, { width: 128 }).catch(() => {});
  }, [inviteCode, link]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </span>
        <span className="flex-1 text-center text-white font-bold text-base">Invite Friend</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl p-6 flex flex-col items-center">
          <div className="mb-4">
            <img src="/images/auth_shang.png" alt="Logo" height="80" />
          </div>
          <div className="bg-white p-2 rounded-lg mb-3">
            <canvas ref={canvasRef} height="128" width="128" style={{ height: 128, width: 128 }}></canvas>
          </div>
          <h4 className="text-[var(--brand)] text-lg font-bold mb-4">{inviteCode}</h4>
          <div className="w-full">
            <label className="text-gray-400 text-xs block mb-2">Referral Url</label>
            <div className="flex items-center bg-[#0a0e1a] rounded-lg border border-[#374151] overflow-hidden">
              <input readOnly value={link}
                className="flex-1 bg-transparent text-white text-xs px-3 py-2.5 outline-none truncate" />
              <span onClick={() => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="text-[var(--brand)] text-xs cursor-pointer px-3 whitespace-nowrap">
                {copied ? 'Copied!' : 'copy'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
