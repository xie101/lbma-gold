import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { setName, getProfile } from '../api';
import { useTranslation } from 'react-i18next';

import { inp } from '../utils/inputs';
const toBase64 = async (file) => {
  if (!file) return '';
  if (file.size > 5 * 1024 * 1024) { notyf.error('Image too large (max 5MB)'); return ''; }
  if (!file.type.startsWith('image/')) { notyf.error('Please upload an image file'); return ''; }
  return new Promise(r => { const rd = new FileReader(); rd.onload = () => r(rd.result); rd.readAsDataURL(file); });
};

export default function Realname() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [profile, setProfile] = useState(null);
  const [name, setNameVal] = useState('');
  const [idType, setIdType] = useState('ID Card');
  const [idNumber, setIdNumber] = useState('');
  const [idFront, setIdFront] = useState('');
  const [idBack, setIdBack] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile().then(r => {
      const d = r.data?.data || r.data || {};
      setProfile(d);
      setNameVal(d.realName || '');
      setIdType(d.id_type || 'ID Card');
      setIdNumber(d.id_number || '');
    }).catch(() => {});
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    if (!name) { notyf.error('Enter your name'); return; }
    setLoading(true);
    try {
      await setName({ realName: name, idType, idNumber, idFront, idBack });
      notyf.success('Verification submitted');
      const r = await getProfile();
      setProfile(r.data?.data || r.data);
      setIdFront(''); setIdBack('');
    } catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const kyc = profile?.kyc_status;

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">{t('realname')}</span>
        <span className="w-[18px]"></span>
      </div>

      {kyc === 'approved' && (
        <div className="px-4"><div className="bg-[#0a1a3a] rounded-xl p-4 text-center">
          <p className="text-green-400 text-sm font-bold">✓ Verified</p>
          <p className="text-gray-400 text-xs mt-1">{profile.realName} · {profile.id_type}</p>
        </div></div>
      )}
      {kyc === 'pending' && (
        <div className="px-4"><div className="bg-[#0a1a3a] rounded-xl p-4 text-center">
          <p className="text-yellow-400 text-sm font-bold">Under Review</p>
          <p className="text-gray-400 text-xs mt-1">Your verification is being processed</p>
        </div></div>
      )}
      {kyc === 'rejected' && (
        <div className="px-4"><div className="bg-[#0a1a3a] rounded-xl p-4">
          <p className="text-red-400 text-sm font-bold">Rejected</p>
          <p className="text-gray-400 text-xs mt-1">Reason: {profile.kyc_reject_reason || 'Not specified'}</p>
          <p className="text-gray-500 text-xs mt-2">You may resubmit below.</p>
        </div></div>
      )}

      {kyc !== 'approved' && kyc !== 'pending' && (
        <form onSubmit={handle} className="px-4 mt-4">
          <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
            <div><label className="text-gray-400 text-xs block mb-2">Real Name</label><input type="text" style={inp} value={name} onChange={e => setNameVal(e.target.value)} placeholder="Enter your real name" required /></div>
            <div><label className="text-gray-400 text-xs block mb-2">ID Type</label>
              <select style={inp} value={idType} onChange={e => setIdType(e.target.value)}>
                <option>ID Card</option><option>Passport</option><option>Driver License</option>
              </select>
            </div>
            <div><label className="text-gray-400 text-xs block mb-2">ID Number</label><input type="text" style={inp} value={idNumber} onChange={e => setIdNumber(e.target.value)} placeholder="Enter ID number" /></div>
            <div><label className="text-gray-400 text-xs block mb-2">ID Front Photo</label><input type="file" accept="image/*" style={{ color: '#fff', fontSize: 12 }} onChange={async e => setIdFront(await toBase64(e.target.files[0]))} /></div>
            <div><label className="text-gray-400 text-xs block mb-2">ID Back Photo</label><input type="file" accept="image/*" style={{ color: '#fff', fontSize: 12 }} onChange={async e => setIdBack(await toBase64(e.target.files[0]))} /></div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: 'var(--brand)', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
              {loading ? 'Submitting...' : kyc === 'rejected' ? 'Resubmit' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
