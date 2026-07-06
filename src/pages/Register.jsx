import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { register, setToken } from '../api';
import { useTranslation } from 'react-i18next';


function Field({ label, type, value, onChange, required }) {
  return (
    <div className="mb-4 text-left">
      <div className="MuiFormControl-root MuiTextField-root css-i44wyl" style={{ width: '100%' }}>
        <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-standard MuiFormLabel-colorPrimary css-4jrhyg"
          data-shrink="true">
          {label}{required && <span className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-1xpaobf"> *</span>}
        </label>
        <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl css-sz7pe0">
          <input required={required} type={type}
            className="MuiInputBase-input MuiInput-input css-1jhxu0"
            value={value} onChange={e => onChange(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { inviteCode } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [invite, setInvite] = useState(inviteCode || '');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPw) { notyf.error('Please fill in all fields'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { notyf.error('Invalid email format'); return; }
    if (password.length < 6) { notyf.error('Password must be at least 6 characters'); return; }
    if (password !== confirmPw) { notyf.error('Passwords do not match'); return; }
    if (!agreed) { notyf.error('Please agree to the Terms'); return; }
    setLoading(true);
    try {
      const res = await register({ email, password, inviteCode: invite });
      if (res.data?.token || res.data?.data?.token) {
        setToken(res.data.token || res.data.data.token);
        notyf.success('Registration successful');
        nav('/home');
      } else { notyf.error(res.data?.message || 'Registration failed'); }
    } catch (err) { notyf.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="login-page register-page min-h-[80vh] text-center bg-cover max-w-[400px] mx-auto">
      <img src="/images/auth_shang.png" alt="Register" style={{ width: '100%', display: 'block' }} />
      <div className="text-white px-5 pb-5 shadow-none font-['Urbanist',sans-serif] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/auth_xia.png')" }}>
        <form onSubmit={handleSubmit}>
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />
          <Field label="Confirm Password" type="password" value={confirmPw} onChange={setConfirmPw} required />
          <Field label="Invite Code" type="text" value={invite} onChange={setInvite} />

          <div className="mt-5">
            <button type="submit" disabled={loading}
              className="w-[200px] h-[80px] bg-transparent text-[#ffed88] border-none bg-cover bg-no-repeat bg-center disabled:opacity-50"
              style={{ backgroundImage: "url('/images/auth_denglu.png')" }}>
              <span className="mt-[-20px] flex items-center justify-center">{loading ? t('loading') : t('register')}</span>
            </button>
          </div>

          <div className="mt-5 text-gray-400 text-xs">
            Already have an account?
            <span className="inline cursor-pointer text-white ml-1" onClick={() => nav('/login')}>{t('login_now')}</span>
          </div>

          <div className="text-left mt-4 relative">
            <label className="flex items-start gap-2 cursor-pointer text-[9px] whitespace-nowrap text-gray-400">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-blue-500" />
              <span>{t('terms_agree')} <span className="cursor-pointer text-white" onClick={() => nav('/terms-conditions')}>{t('terms_service')}</span> {t('and')} <span className="cursor-pointer text-white" onClick={() => nav('/privacy-policy')}>{t('privacy_policy')}</span></span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
