import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { setPassword } from '../api';

const notyf = new Notyf({ position: { x: 'center', y: 'top' }, duration: 3000 });

const inp = { width: '100%', padding: '10px 12px', background: '#0a0e1a', border: '1px solid #374151', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' };

export default function Password() {
  const nav = useNavigate();
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!oldPw || !newPw || !confirm) { notyf.error('Fill all fields'); return; }
    if (newPw.length < 6) { notyf.error('New password must be at least 6 characters'); return; }
    if (newPw !== confirm) { notyf.error('Passwords do not match'); return; }
    if (newPw === oldPw) { notyf.error('New password must differ from old'); return; }
    setLoading(true);
    try { await setPassword({ oldPassword: oldPw, newPassword: newPw }); notyf.success('Password changed'); }
    catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Change Password</span>
        <span className="w-[18px]"></span>
      </div>
      <form onSubmit={handle} className="px-4">
        <div className="bg-[#0a1a3a] rounded-xl p-4 space-y-4">
          {['Old Password', 'New Password', 'Confirm Password'].map((l, i) => (
            <div key={i}>
              <label className="text-gray-400 text-xs block mb-2">{l}</label>
              <input type="password" style={inp} value={i === 0 ? oldPw : i === 1 ? newPw : confirm}
                onChange={e => (i === 0 ? setOldPw : i === 1 ? setNewPw : setConfirm)(e.target.value)} required />
            </div>
          ))}
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: 12, background: 'var(--brand)', color: '#000', fontWeight: 'bold', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
